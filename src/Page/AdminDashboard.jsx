import React, { useState, useEffect, memo } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import {
  CheckCircle,
  XCircle,
  Search,
  User,
  Loader2,
  Award,
  Bot,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import AdminChatbotManagement from "../component/AIChatbot/AdminChatbotManagement";
import AdminVideoManagement from "../component/VideoPlayer/AdminVideoManagement";

const AdminDashboard = () => {
  const [adminSection, setAdminSection] = useState("users"); // "users" | "chatbot" | "videos"
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending"); // pending, approved, all

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      let q;
      if (filter === "pending") {
        q = query(
          collection(db, "training_web_users"),
          where("isApproved", "==", false),
        );
      } else if (filter === "approved") {
        q = query(
          collection(db, "training_web_users"),
          where("isApproved", "==", true),
        );
      } else {
        q = collection(db, "training_web_users");
      }

      const querySnapshot = await getDocs(q);
      const userList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleApprove = async (userId) => {
    try {
      await updateDoc(doc(db, "training_web_users", userId), {
        isApproved: true,
      });
      alert(`User Approved! They can now log in.`);
      // Refresh list
      fetchUsers();
    } catch (error) {
      console.error("Error approving user:", error);
      alert("Error approving user: " + error.message);
    }
  };

  const handleReject = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This cannot be undone.",
      )
    ) {
      try {
        await deleteDoc(doc(db, "training_web_users", userId));
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-red-600 font-batangas">Admin Dashboard</h1>
              <p className="text-gray-600">Manage user access, AI chatbot knowledge, and trainee assessments.</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                to="/ai-trainer"
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Bot size={16} />
                <span>Open AI Trainer</span>
              </Link>
              <Link
                to="/trainer-results"
                className="px-4 sm:px-5 py-2.5 bg-slate-900 hover:bg-red-600 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 self-start sm:self-auto shadow-sm hover:shadow-md cursor-pointer"
              >
                <Award size={16} className="text-red-400" />
                <span>Trainee Test Results</span>
              </Link>
            </div>
          </header>

          {/* Admin Primary Section Switcher */}
          <div className="flex border-b border-gray-200 mb-6 gap-2">
            <button
              onClick={() => setAdminSection("users")}
              className={`pb-3 px-4 text-sm font-bold transition flex items-center gap-2 border-b-2 cursor-pointer ${adminSection === "users"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:text-slate-800"
                }`}
            >
              <Users size={16} />
              <span>Candidate User Approvals</span>
            </button>
            <button
              onClick={() => setAdminSection("chatbot")}
              className={`pb-3 px-4 text-sm font-bold transition flex items-center gap-2 border-b-2 cursor-pointer ${adminSection === "chatbot"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:text-slate-800"
                }`}
            >
              <Bot size={16} />
              <span>AI Chatbot & Knowledge Control</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-100 text-red-700 font-semibold">
                RAG
              </span>
            </button>
            <button
              onClick={() => setAdminSection("videos")}
              className={`pb-3 px-4 text-sm font-bold transition flex items-center gap-2 border-b-2 cursor-pointer ${adminSection === "videos"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:text-slate-800"
                }`}
            >
              <Video size={16} />
              <span>Video Streaming & Performance</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-700 font-semibold">
                FastStart
              </span>
            </button>
          </div>

          {adminSection === "videos" ? (
            <AdminVideoManagement />
          ) : adminSection === "chatbot" ? (
            <AdminChatbotManagement />
          ) : (
            <>
              {/* Filters */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-wrap gap-4">
                <button
                  onClick={() => setFilter("pending")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${filter === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  Pending Approval
                </button>
                <button
                  onClick={() => setFilter("approved")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${filter === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  Approved Users
                </button>
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${filter === "all"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  All Users
                </button>
              </div>

              {/* User List */}
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <p className="text-gray-500">No users found for this filter.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {users.map((user) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            <User size={20} />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {user.displayName || "No Name"}
                            </h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isApproved
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {user.isApproved ? "Approved" : "Pending"}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                        {!user.isApproved && (
                          <button
                            onClick={() => handleApprove(user.id)}
                            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer text-sm font-medium"
                          >
                            <CheckCircle size={16} />
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleReject(user.id)}
                          className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors cursor-pointer text-sm font-medium ml-auto"
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(AdminDashboard);
