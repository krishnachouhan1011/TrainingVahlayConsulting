import React, { useState, useEffect, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GlobalSearch = ({ isOpen, onClose, initialQuery = "" }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  // Fetch all courses data
  useEffect(() => {
    const fetchCourses = () => {
      try {

        const courses = [
          {
            id: 30,
            title: "How the 8-Day Training Program Works",
            type: "SCORM Package",
            path: "/welcome-aboard",
          },
          {
            id: 40,
            title: "Training Module by Hansal Kava",
            type: "SCORM Package",
            path: "/day1",
          },
          {
            id: 20,
            title: "Spectrum Playbook",
            type: "SCORM Package",
            path: "/why-spectrum",
          },
          {
            id: 2,
            title: "Updated Spectrum Business Pricing and Packaging",
            type: "SCORM Package",
            path: "/introduction",
          },
        ];

        setAllCourses(courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (isOpen) {
      fetchCourses();
      setSearchQuery(initialQuery);
    }
  }, [isOpen, initialQuery]);

  // Filter courses based on search query
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return allCourses.filter((course) => {
      const titleMatch = course.title.toLowerCase().includes(query);
      const typeMatch = course.type.toLowerCase().includes(query);
      return titleMatch || typeMatch;
    });
  }, [searchQuery, allCourses]);

  useEffect(() => {
    setResults(filteredResults);
  }, [filteredResults]);


  const handleResultClick = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Search Modal */}
      <div
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white border-b border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Search Input in Navbar - Just showing results here */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {searchQuery && results.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg font-medium">
                    No courses found for "{searchQuery}"
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Try searching with different keywords
                  </p>
                </div>
              )}

              {results.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleResultClick(course.path)}
                  className="group p-4 bg-white border border-slate-100 rounded-xl hover:border-red-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_4px_12px_rgba(220,38,38,0.1)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 text-base mb-1 group-hover:text-red-600 transition-colors truncate">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">
                        {course.type}
                      </p>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-gray-400 group-hover:text-red-600 ml-4 transition-all group-hover:translate-x-1 shrink-0"
                    />
                  </div>
                </div>
              ))}

              {!searchQuery && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg font-medium">
                    Start typing to search
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalSearch;
