import React from 'react';
import {
  DollarSign,
  Clock,
  FileText,
  FileCheck2,
  TrendingUp,
} from 'lucide-react';
import { MetricCardData } from '../types';

interface MetricCardProps {
  card: MetricCardData;
}

export const MetricCard: React.FC<MetricCardProps> = ({ card }) => {
  const renderIcon = () => {
    switch (card.iconName) {
      case 'dollar':
        return <DollarSign className="w-4.5 h-4.5 text-slate-400" />;
      case 'clock':
        return <Clock className="w-4.5 h-4.5 text-slate-400" />;
      case 'file-text':
        return <FileText className="w-4.5 h-4.5 text-slate-400" />;
      case 'file-check':
        return <FileCheck2 className="w-4.5 h-4.5 text-slate-400" />;
      default:
        return <FileText className="w-4.5 h-4.5 text-slate-400" />;
    }
  };

  const getTrendStyle = () => {
    if (card.trendColor === 'orange') {
      return 'text-[#E8830C] bg-[#FFF8F0]';
    }
    if (card.trendColor === 'green') {
      return 'text-[#16A34A] bg-[#F0FDF4]';
    }
    return 'text-slate-600 bg-slate-100';
  };

  return (
    <div
      id={`metric-card-${card.id}`}
      className="bg-white rounded-[16px] p-5 border border-[#EAECEF] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all duration-200 flex flex-col justify-between"
    >
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-slate-500">
          {card.title}
        </span>
        <div className="p-2 rounded-xl bg-[#F7F8FA] border border-[#F0F2F5]">
          {renderIcon()}
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-baseline gap-2.5">
          <span className="text-3xl font-bold tracking-tight text-slate-900">
            {card.value}
          </span>
          {card.secondaryText && (
            <span className="text-sm font-medium text-slate-400">
              {card.secondaryText}
            </span>
          )}
        </div>

        {card.trend && (
          <div className="mt-2.5 flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold ${getTrendStyle()}`}
            >
              <TrendingUp className="w-3 h-3 stroke-[2.5]" />
              {card.trend}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
