import React from "react";

// Optimized Card Component for consistent, memoized rendering
export const OptimizedListItem = React.memo(
  ({ onClick, className, children }) => (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  ),
);

OptimizedListItem.displayName = "OptimizedListItem";

// Reusable Section Container
export const SectionContainer = React.memo(({ children, className = "" }) => (
  <div
    className={`bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-8 ${className}`}
  >
    {children}
  </div>
));

SectionContainer.displayName = "SectionContainer";

// Reusable Icon Badge
export const IconBadge = React.memo(({ Icon, color = "red" }) => (
  <div
    className={`w-12 h-12 bg-${color}-50 text-${color}-600 border border-${color}-100 rounded-lg flex items-center justify-center`}
  >
    <Icon size={24} />
  </div>
));

IconBadge.displayName = "IconBadge";

// Loading state for Suspense boundaries
export const SectionLoader = () => (
  <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-8 h-48 flex items-center justify-center">
    <div className="w-8 h-8 border-3 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
  </div>
);

export default SectionLoader;
