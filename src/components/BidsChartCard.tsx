import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { BidMonthData } from '../types';

interface BidsChartCardProps {
  data: BidMonthData[];
}

export const BidsChartCard: React.FC<BidsChartCardProps> = ({ data }) => {
  const formatYAxis = (val: number) => {
    if (val === 0) return '$0k';
    return `$${val / 1000}k`;
  };

  return (
    <div
      id="bids-in-market-card"
      className="bg-white rounded-[16px] p-6 border border-[#EAECEF] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between"
    >
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Bids in market
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cumulative value of sent bids (last 6 months)
          </p>
        </div>

        {/* Legend / Key indicators */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-gradient-to-b from-[#E8830C] to-[#2A1E12]" />
            <span className="text-slate-600 font-medium">Pipeline Value</span>
          </div>
          <div className="hidden sm:inline-flex items-center text-slate-400 font-mono text-[11px]">
            Peak: $500k (Oct)
          </div>
        </div>
      </div>

      {/* Recharts Bar Chart Area */}
      <div className="w-full h-[280px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 12, right: 10, left: 4, bottom: 4 }}
          >
            <defs>
              <linearGradient id="orangeBrownGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E8830C" stopOpacity={1} />
                <stop offset="100%" stopColor="#2A1E12" stopOpacity={0.94} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F0F2F5"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
              dy={6}
            />

            <YAxis
              domain={[0, 600000]}
              ticks={[0, 150000, 300000, 450000, 600000]}
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
              dx={-6}
            />

            <Tooltip
              cursor={{ fill: 'rgba(247, 248, 250, 0.8)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as BidMonthData;
                  return (
                    <div className="bg-white border border-[#E2E8F0] p-3 rounded-xl shadow-lg text-xs min-w-[170px]">
                      <div className="flex items-center justify-between pb-1.5 border-b border-[#F1F5F9] mb-1.5">
                        <span className="font-bold text-slate-900">
                          {item.month} 2026
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-[#E8830C] font-semibold">
                          Active
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-slate-500">
                          <span>Cumulative:</span>
                          <span className="font-bold text-slate-900">
                            {item.displayValue}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-slate-500">
                          <span>Active Bids:</span>
                          <span className="font-medium text-slate-700">
                            {item.bidCount} packages
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-slate-500">
                          <span>Avg. Margin:</span>
                          <span className="font-semibold text-[#E8830C]">
                            {item.avgMargin}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar
              dataKey="value"
              fill="url(#orangeBrownGradient)"
              radius={[6, 6, 0, 0]}
              maxBarSize={44}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
