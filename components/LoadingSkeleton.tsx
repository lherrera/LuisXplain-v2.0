
import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-24 bg-white rounded-xl shadow-sm border border-slate-100"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 h-48"></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
