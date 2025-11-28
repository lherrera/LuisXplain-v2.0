
import React from 'react';
import { AlertCircle } from './icons';

interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-red-700 animate-in fade-in slide-in-from-bottom-2">
      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="font-semibold">Analysis Failed</h3>
        <p className="text-sm opacity-90">{error}</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;
