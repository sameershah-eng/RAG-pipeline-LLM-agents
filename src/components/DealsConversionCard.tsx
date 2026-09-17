import React from 'react';
import {
  Trophy,
  Timer,
  Percent,
  Plus,
  ArrowRight,
  GitCompare,
} from 'lucide-react';
import { DealConversionStats } from '../types';

interface DealsConversionCardProps {
  stats: DealConversionStats;
  onCreateQuote: () => void;
  onCompareRfq: () => void;
  onViewAll: () => void;
}

export const DealsConversionCard: React.FC<DealsConversionCardProps> = ({
  stats,
  onCreateQuote,
  onCompareRfq,
  onViewAll,
}) => {
  const percentage = Math.round(
    (stats.currentCompleted / stats.quarterlyGoal) * 100
  );
  const remainingDeals = stats.quarterlyGoal - stats.currentCompleted;

  return (
    <div
      id="deals-conversion-card"
      className="bg-white rounded-[16px] p-6 border border-[#EAECEF] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between"
    >
      <div>
        {/* Header section with View all link */}
        <div className="flex items-start justify-between gap-2 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Deals &amp; conversion
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Performance overview, current quarter
            </p>
          </div>

          <button
            id="btn-view-all-deals"
            onClick={onViewAll}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-blue-700 transition hover:underline shrink-0 pt-0.5"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Three small stat tiles in a row */}
        <div className="grid grid-cols-3 gap-2.5 mt-2">
          {/* Tile 1: Won jobs */}
          <div
            id="stat-tile-won"
            className="p-3 rounded-xl bg-[#F7F8FA] border border-[#F0F2F5] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium text-slate-500">Won</span>
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">
                {stats.wonJobs}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                jobs
              </div>
            </div>
          </div>

          {/* Tile 2: Avg. duration */}
          <div
            id="stat-tile-duration"
            className="p-3 rounded-xl bg-[#F7F8FA] border border-[#F0F2F5] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium text-slate-500 truncate">
                Avg. duration
              </span>
              <Timer className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">
                {stats.avgDurationDays}
              </div>
              <div className="text-[11px] text-slate-400 font-medium leading-tight">
                days to close
              </div>
            </div>
          </div>

          {/* Tile 3: Rate */}
          <div
            id="stat-tile-rate"
            className="p-3 rounded-xl bg-[#F7F8FA] border border-[#F0F2F5] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium text-slate-500">Rate</span>
              <Percent className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#16A34A]">
                {stats.closeRate}%
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                close rate
              </div>
            </div>
          </div>
        </div>

        {/* Quarterly goal progress section */}
        <div className="mt-5 p-3.5 rounded-xl bg-[#FAFAFC] border border-[#F0F2F5]">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span>Quarterly goal: {stats.quarterlyGoal} deals</span>
            <span className="font-mono text-slate-900 font-bold">
              {stats.currentCompleted}/{stats.quarterlyGoal}
            </span>
          </div>

          {/* Rounded progress bar filled ~76% in near black */}
          <div className="w-full bg-[#E5E7EB] rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#18181B] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>{percentage}% completed</span>
            <span>{remainingDeals} deals remaining</span>
          </div>
        </div>
      </div>

      {/* Two action buttons side-by-side at the bottom */}
      <div className="grid grid-cols-2 gap-3 mt-6 pt-2">
        <button
          id="btn-create-quote"
          onClick={onCreateQuote}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm shadow-xs transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create Quote</span>
        </button>

        <button
          id="btn-compare-rfq"
          onClick={onCompareRfq}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm border border-[#D5D9E0] shadow-2xs transition-all active:scale-[0.98] focus:outline-none"
        >
          <GitCompare className="w-4 h-4 text-slate-500" />
          <span>Compare RFQ</span>
        </button>
      </div>
    </div>
  );
};
