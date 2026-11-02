import React, { useEffect, Suspense, lazy, useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "./firebase-config";

import "./App.css";
import LoadingFallback from "./component/LoadingFallback";
import ErrorBoundary from "./component/ErrorBoundary";
import ScrollToTop from "./component/ScrollToTop";
import AIPopupChat from "./component/AIChatbot/AIPopupChat";

// Code-split heavy components with React.lazy
const CoursePlayer = lazy(
  () => import("./component/SCS California Bulk/CoursePlayer"),
);
const Sidebar2 = lazy(() => import("./component/SpectrumBusiness/Sidebar2"));
const Introduction = lazy(
  () => import("./component/SpectrumBusiness/Introduction"),
);
const WhatsChanging = lazy(
  () => import("./component/SpectrumBusiness/WhatsChanging"),
);
const PriceGuarantees = lazy(
  () => import("./component/SpectrumBusiness/PriceGuarantees"),
);
const SpectrumMoDiscount = lazy(
  () => import("./component/SpectrumBusiness/SpectrumMoDiscount"),
);
const BusinessRules = lazy(
  () => import("./component/SpectrumBusiness/BusinessRules"),
);
const AcquisitionStrategy = lazy(
  () => import("./component/SpectrumBusiness/AcquisitionStrategy"),
);
const ShowWhatYouKnow = lazy(
  () => import("./component/SpectrumBusiness/ShowWhatYouKnow"),
);
const Summary = lazy(() => import("./component/SpectrumBusiness/Summary"));

const Homepage = lazy(() => import("./Page/Homepage"));

const Sidebar3 = lazy(
  () => import("./component/Selling Partner Playbook/Sidebar3"),
);
const WhySpectrum = lazy(
  () => import("./component/Selling Partner Playbook/WhySpectrum"),
);
const Benefits = lazy(
  () => import("./component/Selling Partner Playbook/Benefits"),
);
const Internet = lazy(
  () => import("./component/Selling Partner Playbook/Internet"),
);
const Voice = lazy(() => import("./component/Selling Partner Playbook/Voice"));
const Video = lazy(() => import("./component/Selling Partner Playbook/Video"));
const Mobile = lazy(
  () => import("./component/Selling Partner Playbook/Mobile"),
);
const ThankYou = lazy(
  () => import("./component/Selling Partner Playbook/ThankYou"),
);
const Pricing = lazy(
  () => import("./component/Selling Partner Playbook/Pricing"),
);
const BusinessRules2 = lazy(
  () => import("./component/Selling Partner Playbook/BusinessRuls2"),
);

const Login = lazy(() => import("./component/LoginPage/Login"));
const SignUp = lazy(() => import("./component/LoginPage/SignUp"));

const AdminDashboard = lazy(() => import("./Page/AdminDashboard"));
const TrainerResults = lazy(() => import("./Page/TrainerResults"));
const Profile = lazy(() => import("./Page/Profile"));

const Sidebar4 = lazy(
  () => import("./component/How the 8-Day Training Program Works/Sidebar4"),
);
const WelcomeAboard = lazy(
  () =>
    import("./component/How the 8-Day Training Program Works/WelcomeAbroad"),
);
const AlldayTraining = lazy(
  () =>
    import("./component/How the 8-Day Training Program Works/AlldayTraining"),
);
const AboutCompany = lazy(
  () => import("./component/How the 8-Day Training Program Works/AboutCompany"),
);

const Sidebar5 = lazy(() => import("./component/TrainingModule/Sidebar5"));
const Day1 = lazy(() => import("./component/TrainingModule/Day1"));
const Day2 = lazy(() => import("./component/TrainingModule/Day2"));
const Day3 = lazy(() => import("./component/TrainingModule/Day3"));
const Day4 = lazy(() => import("./component/TrainingModule/Day4"));
const Day5 = lazy(() => import("./component/TrainingModule/Day5"));
const Day6 = lazy(() => import("./component/TrainingModule/Day6"));
const Day7 = lazy(() => import("./component/TrainingModule/Day7"));
const Day8 = lazy(() => import("./component/TrainingModule/Day8"));
const AITrainingAssistant = lazy(
  () => import("./component/AIChatbot/AITrainingAssistant"),
);

/** ✅ Fast protected wrapper:
 * - Public routes never wait for auth
 * - Protected routes show loader only when auth is still verifying
 */
const PrivateRoutes = ({ user, loading }) => {
  if (loading) return <LoadingFallback />;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoutes = ({ user }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const checkAdmin = async () => {
      if (!user) {
        if (!cancelled) setIsAdmin(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, "training_web_users", user.uid));
        const ok = userDoc.exists() && userDoc.data().role === "admin";
        if (!cancelled) setIsAdmin(ok);
      } catch (error) {
        console.error("Error checking admin role:", error);
        if (!cancelled) setIsAdmin(false);
      }
    };

    checkAdmin();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (isAdmin === null) return <LoadingFallback />;
  if (!user) return <Navigate to="/login" replace />;
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

/** ✅ Router-aware guard & smooth redirect handler */
function AppShell({ user, loading }) {
  const location = useLocation();
  const [forceRedirect, setForceRedirect] = useState(false);

  const isAuthPage = useMemo(() => {
    return location.pathname === "/login" || location.pathname === "/signup";
  }, [location.pathname]);

  useEffect(() => {
    // If we're already on /login, don't keep blocking the UI
    if (location.pathname === "/login" || location.pathname === "/signup") {
      setForceRedirect(false);
    }
  }, [location.pathname]);

  // ✅ Firestore revoke listener only when:
  // - user exists
  // - NOT on auth pages (prevents kick during login flow)
  useEffect(() => {
    if (!user || !user.email || isAuthPage) return;

    const q = query(
      collection(db, "jobApplications"),
      where("email", "==", user.email),
    );

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        // User doc not found OR isApproved not true => revoke
        const shouldRevoke =
          snapshot.empty || snapshot.docs[0]?.data()?.isApproved !== true;

        if (shouldRevoke) {
          try {
            await signOut(auth);
          } finally {
            // ✅ Smooth redirect without full reload
            setForceRedirect(true);
          }
        }
      },
      (err) => {
        console.error("Revoke listener error:", err);
      },
    );

    return () => unsubscribe();
  }, [user, isAuthPage]);

  if (forceRedirect && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<Homepage />} />

        {/* --- PROTECTED ROUTES --- */}
        <Route element={<PrivateRoutes user={user} loading={loading} />}>
          <Route path="/courseplayer" element={<CoursePlayer />} />
          <Route path="/sidebar2" element={<Sidebar2 />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/whats-changing" element={<WhatsChanging />} />
          <Route path="/price-guarantees" element={<PriceGuarantees />} />
          <Route path="/mobile-discounts" element={<SpectrumMoDiscount />} />
          <Route path="/business-rules" element={<BusinessRules />} />
          <Route
            path="/acquisition-strategy"
            element={<AcquisitionStrategy />}
          />
          <Route path="/quiz" element={<ShowWhatYouKnow />} />
          <Route path="/summary" element={<Summary />} />

          <Route path="/sidebar3" element={<Sidebar3 />} />
          <Route path="/why-spectrum" element={<WhySpectrum />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/internet" element={<Internet />} />
          <Route path="/voice" element={<Voice />} />
          <Route path="/video" element={<Video />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/business-rules2" element={<BusinessRules2 />} />

          <Route path="/sidebar4" element={<Sidebar4 />} />
          <Route path="/welcome-aboard" element={<WelcomeAboard />} />
          <Route path="/allday-training" element={<AlldayTraining />} />
          <Route path="/about-company" element={<AboutCompany />} />

          <Route path="/sidebar5" element={<Sidebar5 />} />
          <Route path="/day1" element={<Day1 />} />
          <Route path="/day2" element={<Day2 />} />
          <Route path="/day3" element={<Day3 />} />
          <Route path="/day4" element={<Day4 />} />
          <Route path="/day5" element={<Day5 />} />
          <Route path="/day6" element={<Day6 />} />
          <Route path="/day7" element={<Day7 />} />
          <Route path="/day8" element={<Day8 />} />
          <Route path="/ai-trainer" element={<AITrainingAssistant />} />
          <Route path="/ai-assistant" element={<AITrainingAssistant />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<AdminRoutes user={user} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/trainer-results" element={<TrainerResults />} />
        </Route>

        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* Floating AI Training Chatbox Popup */}
      <AIPopupChat user={user} />
    </>
  );
}

function App() {
  // --- Setup Authentication State ---
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Auth listener (lightweight)
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <AppShell user={user} loading={loading} />
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
