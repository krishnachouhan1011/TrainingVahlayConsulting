/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";

import logo1 from "../../assets/logo1.png";
import logoRing from "../../assets/logorings.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // NEW: State to watch the user while they wait for approval
  const [pendingEmail, setPendingEmail] = useState(null);

  const navigate = useNavigate();

  // 1. --- MAIN AUTH LISTENER (Handles logged-in users & immediate revoke) ---
  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        const q = query(
          collection(db, "jobApplications"),
          where("email", "==", user.email),
        );

        unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const userData = snapshot.docs[0].data();

            if (userData.isApproved !== true) {
              // Immediately log out if admin revokes access
              signOut(auth);
              setError(
                "Your access has been revoked or is pending Admin Approval.",
              );
              setIsLoading(false);
            } else {
              // If fully approved, push them to the dashboard
              if (window.location.pathname === "/login") {
                navigate("/");
              }
            }
          } else {
            // Document deleted
            signOut(auth);
            setError("Your account has been removed by an Admin.");
            setIsLoading(false);
          }
        });
      } else {
        if (unsubscribeSnapshot) {
          unsubscribeSnapshot();
          unsubscribeSnapshot = null;
        }
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, [navigate]);

  // 2. --- REAL-TIME WATCHER FOR PENDING USERS (Handles immediate approval login) ---
  useEffect(() => {
    if (!pendingEmail || !password) return;

    const q = query(
      collection(db, "jobApplications"),
      where("email", "==", pendingEmail),
    );

    // Watch their document even while they sit on the login screen
    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data();

          if (userData.isApproved === true) {
            // ADMIN JUST APPROVED THEM!
            setError(null);
            setMessage("Approval granted! Logging you in...");
            setPendingEmail(null); // Stop watching

            try {
              setIsLoading(true);
              // Automatically sign them back in
              await signInWithEmailAndPassword(auth, pendingEmail, password);
              // The main Auth Listener (above) will catch this and navigate to "/"
            } catch (err) {
              setIsLoading(false);
              setError("Account approved! Please click Sign In again.");
            }
          }
        }
      },
      (err) => {
        // If Firestore rules prevent reading while logged out, ignore silently.
        // They will just need to click "Sign In" manually once approved.
        console.log("Waiting for approval...", err.message);
      },
    );

    return () => unsubscribe();
  }, [pendingEmail, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);
    setPendingEmail(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // --- CHECK FIRESTORE FOR INITIAL APPROVAL ---
      const q = query(
        collection(db, "jobApplications"),
        where("email", "==", user.email),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();

        if (userData.isApproved !== true) {
          // Block pending users
          await signOut(auth);
          setError("Your account is pending Admin Approval. Please wait.");
          setPendingEmail(user.email); // Set email to start the real-time watcher
          setIsLoading(false);
          return;
        }
      } else {
        // If NO application exists, create a new pending one
        await setDoc(doc(db, "jobApplications", user.uid), {
          email: user.email,
          displayName: user.displayName || email.split("@")[0],
          isApproved: false,
          role: "user",
          createdAt: new Date().toISOString(),
        });

        await signOut(auth);
        setError(
          "Your application has been received and is pending Admin Approval.",
        );
        setPendingEmail(user.email); // Set email to start the real-time watcher
        setIsLoading(false);
        return;
      }

      // LocalStorage for username
      const displayName = user.displayName;
      if (displayName) {
        localStorage.setItem("spectrum_username", displayName);
      } else {
        localStorage.setItem("spectrum_username", email.split("@")[0]);
      }
      window.dispatchEvent(new Event("usernameUpdated"));

      navigate("/");
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password. Please try again.");
      } else if (err.code !== "permission-denied") {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError(
        "Please enter your email address in the field below to reset your password.",
      );
      setMessage(null);
      return;
    }

    try {
      setError(null);
      setMessage(null);

      const q = query(
        collection(db, "jobApplications"),
        where("email", "==", email),
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No account found with this email address in our system.");
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Please check your email inbox.");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email address.");
      } else {
        setError("Could not send reset email. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-poppins relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-red-50 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#dc2626_1px,transparent_0)] bg-size-[40px_40px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden relative">
          <div className="bg-linear-to-br from-red-600 to-slate-900 px-6 py-8 text-center relative overflow-hidden">
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                <img
                  src={logo1}
                  alt="Logo"
                  className="w-full h-full object-contain relative z-10"
                />
                <motion.img
                  src={logoRing}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 12,
                  }}
                  alt="Ring"
                />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-batangas font-bold text-white mb-2 tracking-tight">
              Welcome
            </h2>
            <p className="text-red-100/80 text-sm font-medium">
              Access your training dashboard
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    className="bg-rose-50 text-rose-600 text-xs sm:text-sm p-4 rounded-xl border border-rose-100 text-center font-medium shadow-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {message && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    className="bg-emerald-50 text-emerald-700 text-xs sm:text-sm p-4 rounded-xl border border-emerald-100 text-center font-medium shadow-sm"
                  >
                    {message}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2 group">
                <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all outline-none bg-gray-50 focus:bg-white text-slate-900 font-medium text-sm sm:text-base placeholder:text-gray-400 placeholder:font-normal"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <div className="flex justify-between items-center">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider block">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-bold text-red-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all outline-none bg-gray-50 focus:bg-white text-slate-900 font-medium text-sm sm:text-base placeholder:text-gray-400 placeholder:font-normal"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer uppercase tracking-widest text-xs sm:text-sm shadow-lg shadow-red-600/20 hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="pb-6 text-center px-6 border-t border-gray-100 pt-5 bg-gray-50/50">
            <p className="text-gray-600 text-xs sm:text-sm font-medium">
              Don't have an account? Go to{" "}
              <a
                className="text-red-600 font-bold hover:underline transition-colors"
                href="https://vahlayconsulting.com"
                target="_blank"
                rel="noreferrer"
              >
                vahlayconsulting.com
              </a>{" "}
              to sign up for access.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
