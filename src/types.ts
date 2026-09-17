export type TimeRange = '30d' | 'quarter' | 'year';

export type TeamMode = 'sales' | 'purchasing';

export type NavItemKey =
  | 'dashboard'
  | 'revisions'
  | 'customers'
  | 'bids'
  | 'deals'
  | 'analytics'
  | 'settings';

export interface MetricCardData {
  id: string;
  title: string;
  value: string;
  trend?: string;
  trendColor?: 'orange' | 'green' | 'default';
  trendDirection?: 'up' | 'down' | 'neutral';
  secondaryText?: string;
  iconName: 'dollar' | 'clock' | 'file-text' | 'file-check';
}

export interface BidMonthData {
  month: string;
  value: number; // e.g. 190000
  displayValue: string; // "$190k"
  bidCount: number;
  avgMargin: string;
}

export interface DealConversionStats {
  wonJobs: number;
  avgDurationDays: number;
  closeRate: number; // e.g. 24
  quarterlyGoal: number;
  currentCompleted: number;
}

export interface QuoteItem {
  id: string;
  title: string;
  customer: string;
  value: number;
  status: 'Draft' | 'Submitted' | 'Won' | 'Under Review';
  date: string;
  margin: string;
  revision: string;
}

export interface RfqComparisonItem {
  id: string;
  rfqNumber: string;
  client: string;
  partDescription: string;
  internalEstimate: number;
  quotedPrice: number;
  deltaPercent: string;
  leadTime: string;
  riskScore: 'Low' | 'Medium' | 'High';
}
