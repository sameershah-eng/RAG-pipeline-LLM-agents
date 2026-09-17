import React from 'react';
import {
  FileCheck2,
  Users,
  FileText,
  Briefcase,
  BarChart3,
  Settings,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { NavItemKey } from '../types';
import { REVISION_CHECK_DATA, RECENT_QUOTES_LIST } from '../mockData';

interface SubViewsProps {
  activeView: NavItemKey;
  onReturnToDashboard: () => void;
  onCreateQuote: () => void;
  onCompareRfq: () => void;
}

export const SubViews: React.FC<SubViewsProps> = ({
  activeView,
  onReturnToDashboard,
  onCreateQuote,
  onCompareRfq,
}) => {
  if (activeView === 'dashboard') return null;

  const renderContent = () => {
    switch (activeView) {
      case 'revisions':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Revision Check &amp; Automated Tolerance Diff
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automated geometric and BOM comparison across incoming CAD drawings and RFQs
                </p>
              </div>
              <button
                onClick={onCompareRfq}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#D5D9E0] text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
              >
                Launch Side-by-Side Diff
              </button>
            </div>

            <div className="bg-white rounded-[16px] border border-[#EAECEF] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              <div className="divide-y divide-[#F1F3F5]">
                {REVISION_CHECK_DATA.map((rev) => (
                  <div key={rev.id} className="p-5 hover:bg-[#FAFAFC] transition">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#E8830C] flex items-center justify-center font-bold">
                          <FileCheck2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">
                              {rev.part}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-600">
                              {rev.document}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">
                            {rev.detectedDelta}
                          </p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-end justify-between gap-1 shrink-0">
                        <span className="text-xs font-semibold text-[#E8830C]">
                          {rev.costImpact}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{rev.analyzedAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Strategic Accounts &amp; Quoting Partners
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Key customer accounts currently active in the quoting pipeline
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Apex Dynamics Corp', tier: 'Tier 1 Aerospace', activeBids: 4, pipeline: '$210,000', marginAvg: '28.4%' },
                { name: 'Vanguard Industrial', tier: 'Tier 1 Heavy Equip', activeBids: 3, pipeline: '$145,000', marginAvg: '25.1%' },
                { name: 'BioNexus Instruments', tier: 'High Precision Med', activeBids: 2, pipeline: '$164,000', marginAvg: '31.2%' },
              ].map((c) => (
                <div key={c.name} className="bg-white rounded-[16px] p-5 border border-[#EAECEF] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {c.tier}
                      </span>
                      <Users className="w-4 h-4 text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">Active bids in market: {c.activeBids}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Pipeline Value:</span>
                    <span className="font-bold text-slate-900 font-mono">{c.pipeline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'bids':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Open Bids Ledger
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Commercial bids dispatched to client purchasing departments
                </p>
              </div>
              <button
                onClick={onCreateQuote}
                className="px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition shadow-xs"
              >
                + New Bid Package
              </button>
            </div>

            <div className="bg-white rounded-[16px] border border-[#EAECEF] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAFC] border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Package</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Rev</th>
                    <th className="p-4 text-right">Value</th>
                    <th className="p-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RECENT_QUOTES_LIST.map((b) => (
                    <tr key={b.id} className="hover:bg-[#F9FAFB]">
                      <td className="p-4 font-semibold text-slate-900">{b.title}</td>
                      <td className="p-4 text-slate-600">{b.customer}</td>
                      <td className="p-4 font-mono text-slate-500">{b.revision}</td>
                      <td className="p-4 text-right font-mono font-bold text-slate-900">
                        ${b.value.toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'deals':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Deals Pipeline &amp; Conversion Tracker
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Active conversion funnel monitoring win rate and negotiation cycle time
              </p>
            </div>
            <div className="bg-white rounded-[16px] p-6 border border-[#EAECEF] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs text-slate-400">Total Awarded Q4</span>
                  <p className="text-2xl font-bold text-slate-900 mt-1">38 Deals</p>
                  <span className="text-xs text-emerald-600 font-medium">76% of Q4 Target reached</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Average Turnaround</span>
                  <p className="text-2xl font-bold text-slate-900 mt-1">17 Days</p>
                  <span className="text-xs text-slate-500 font-medium">-3.2 days vs. prior year</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Closing Efficiency</span>
                  <p className="text-2xl font-bold text-[#16A34A] mt-1">24.0%</p>
                  <span className="text-xs text-slate-500 font-medium">Top quartile benchmark</span>
                </div>
              </div>
              <div className="mt-4 text-xs text-slate-500 flex justify-between items-center">
                <span>Next review scheduled with sales director: Friday 2:00 PM</span>
                <button
                  onClick={onCreateQuote}
                  className="text-[#2563EB] font-semibold hover:underline"
                >
                  Generate Quote for Pending Deal &rarr;
                </button>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Executive Quoting Intelligence
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Historical margin protection and turnaround velocity telemetry
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-[16px] p-5 border border-[#EAECEF] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                <h4 className="text-sm font-bold text-slate-900 mb-2">Margin Distribution by Account</h4>
                <p className="text-xs text-slate-500 mb-4">Cumulative variance across high-tolerance machined assemblies</p>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1 text-slate-700">
                      <span>Aerospace &amp; Defense</span>
                      <span className="font-bold text-[#E8830C]">29.8% avg margin</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="bg-[#E8830C] h-full rounded-full w-[85%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-slate-700">
                      <span>Precision Medical</span>
                      <span className="font-bold text-[#E8830C]">31.2% avg margin</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="bg-[#2A1E12] h-full rounded-full w-[90%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-slate-700">
                      <span>Energy Systems</span>
                      <span className="font-bold text-[#E8830C]">22.0% avg margin</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="bg-slate-700 h-full rounded-full w-[65%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[16px] p-5 border border-[#EAECEF] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Cycle Time Reduction</h4>
                  <p className="text-xs text-slate-500 mb-3">AI CAD revision diffing saved 84 engineering hours this month alone.</p>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800">
                    <span className="font-bold block">Target Exceeded:</span>
                    Quoting turnaround down from 22 days to 17 days.
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-4">
                  Data synchronized in memory for current guest session.
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Operations System Preferences
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure quoting rules, default margin thresholds, and stateless mode behavior
              </p>
            </div>
            <div className="bg-white rounded-[16px] p-6 border border-[#EAECEF] shadow-[0_2px_8px_rgba(0,0,0,0.03)] max-w-2xl space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Default Minimum Margin</span>
                  <span className="text-[11px] text-slate-500">Flag bids below target threshold</span>
                </div>
                <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-mono font-bold text-slate-800">
                  20.0%
                </span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Stateless Operating Mode</span>
                  <span className="text-[11px] text-slate-500">Run exclusively in-memory without persistent local storage</span>
                </div>
                <span className="px-3 py-1 bg-amber-50 text-[#E8830C] rounded-full text-xs font-semibold">
                  Enabled
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Active Team Profile</span>
                  <span className="text-[11px] text-slate-500">Current workspace designation</span>
                </div>
                <span className="text-xs font-mono text-slate-600">
                  Mark (Lead Quoting Engineer)
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      <button
        id="btn-return-to-dashboard"
        onClick={onReturnToDashboard}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-[#E5E7EB] hover:border-slate-300 transition shadow-2xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Dashboard Overview</span>
      </button>

      {renderContent()}
    </div>
  );
};
