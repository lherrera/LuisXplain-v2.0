import React from 'react';
import { Sparkles } from './icons';

interface IntentCardProps {
  intent: string;
  type: 'Informational' | 'Transactional' | 'Navigational' | 'General';
}

const IntentCard: React.FC<IntentCardProps> = ({ intent, type }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-red-50 to-slate-50 p-4 border-b border-red-100 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-red-600" />
        <h2 className="font-semibold text-slate-800">Query Intent Analysis</h2>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-4 items-start">
          <div className="flex-1">
            <p className="text-slate-600 leading-relaxed text-lg">
              {intent}
            </p>
          </div>
          <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wider border border-red-100 whitespace-nowrap">
            {type || 'General'} Intent
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntentCard;