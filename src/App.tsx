/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { MetricCard } from './components/MetricCard';
import { BidsChartCard } from './components/BidsChartCard';
import { DealsConversionCard } from './components/DealsConversionCard';
import { SubViews } from './components/SubViews';
import {
  CreateQuoteModal,
  CompareRfqModal,
  ViewAllDealsModal,
} from './components/Modals';
import {
  METRIC_CARDS_BY_RANGE,
  BIDS_IN_MARKET_DATA,
  DEALS_CONVERSION_STATS,
  RECENT_QUOTES_LIST,
} from './mockData';
import { NavItemKey, QuoteItem, TeamMode, TimeRange } from './types';

export default function App() {
  // Navigation & UI states (all in-memory, no localStorage)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState<NavItemKey>('dashboard');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [teamMode, setTeamMode] = useState<TeamMode>('sales');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isCreateQuoteOpen, setIsCreateQuoteOpen] = useState(false);
  const [isCompareRfqOpen, setIsCompareRfqOpen] = useState(false);
  const [isViewAllDealsOpen, setIsViewAllDealsOpen] = useState(false);

  // In-memory data
  const [quotes, setQuotes] = useState<QuoteItem[]>(RECENT_QUOTES_LIST);

  const handleSaveQuote = (newQuote: QuoteItem) => {
    setQuotes((prev) => [newQuote, ...prev]);
  };

  const metricCards = useMemo(() => {
    return METRIC_CARDS_BY_RANGE[timeRange];
  }, [timeRange]);

  const getTimeRangeSubtitle = () => {
    switch (timeRange) {
      case '30d':
        return 'Your operations control center, Last 30 days';
      case 'quarter':
        return 'Your operations control center, Quarter';
      case 'year':
        return 'Your operations control center, Year';
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. TOP BAR (full width, white) */}
      <TopBar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        teamMode={teamMode}
        onTeamModeChange={setTeamMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* BODY WITH LEFT SIDEBAR AND MAIN CONTENT */}
      <div className="flex-1 flex flex-row overflow-hidden relative">
        {/* 2. LEFT SIDEBAR (white, fixed width around 250px) */}
        <Sidebar
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
          activeItem={activeNav}
          onSelectItem={(item) => setActiveNav(item)}
        />

        {/* 3. MAIN CONTENT AREA */}
        <main
          id="main-content-area"
          className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-7 max-w-7xl mx-auto w-full transition-all"
        >
          {/* If user clicked a non-dashboard sidebar menu, show dedicated subview */}
          {activeNav !== 'dashboard' ? (
            <SubViews
              activeView={activeNav}
              onReturnToDashboard={() => setActiveNav('dashboard')}
              onCreateQuote={() => setIsCreateQuoteOpen(true)}
              onCompareRfq={() => setIsCompareRfqOpen(true)}
            />
          ) : (
            <div className="space-y-6">
              {/* Header row: big bold greeting & segmented toggle */}
              <div
                id="dashboard-header-row"
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
                    Welcome back, Mark
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {getTimeRangeSubtitle()}
                  </p>
                </div>

                {/* Segmented toggle: Last 30 days (dark background), Quarter, Year */}
                <div
                  id="time-range-segmented-toggle"
                  className="inline-flex items-center p-1 rounded-xl bg-white border border-[#E2E5EB] shadow-2xs self-start sm:self-auto"
                >
                  <button
                    id="btn-range-30d"
                    onClick={() => setTimeRange('30d')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      timeRange === '30d'
                        ? 'bg-[#18181B] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Last 30 days
                  </button>

                  <button
                    id="btn-range-quarter"
                    onClick={() => setTimeRange('quarter')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      timeRange === 'quarter'
                        ? 'bg-[#18181B] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Quarter
                  </button>

                  <button
                    id="btn-range-year"
                    onClick={() => setTimeRange('year')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      timeRange === 'year'
                        ? 'bg-[#18181B] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Year
                  </button>
                </div>
              </div>

              {/* Search filter indicator if user typed in top search */}
              {searchQuery && (
                <div className="px-4 py-2.5 bg-blue-50/70 border border-blue-200/60 rounded-xl text-xs text-blue-900 flex items-center justify-between">
                  <span>
                    Showing filtered operational view for: <strong>"{searchQuery}"</strong>
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-blue-700 hover:underline font-semibold"
                  >
                    Clear filter
                  </button>
                </div>
              )}

              {/* A row of FOUR metric cards */}
              <div
                id="metrics-card-grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
              >
                {metricCards.map((card) => (
                  <MetricCard key={card.id} card={card} />
                ))}
              </div>

              {/* TWO COLUMN section: LEFT (wider) Bids in market, RIGHT (narrower) Deals & conversion */}
              <div
                id="two-column-analytics-section"
                className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch"
              >
                {/* LEFT (wider) card */}
                <div className="lg:col-span-7 xl:col-span-7">
                  <BidsChartCard data={BIDS_IN_MARKET_DATA} />
                </div>

                {/* RIGHT (narrower) card */}
                <div className="lg:col-span-5 xl:col-span-5">
                  <DealsConversionCard
                    stats={DEALS_CONVERSION_STATS}
                    onCreateQuote={() => setIsCreateQuoteOpen(true)}
                    onCompareRfq={() => setIsCompareRfqOpen(true)}
                    onViewAll={() => setIsViewAllDealsOpen(true)}
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals for Create Quote, Compare RFQ, and View All Deals */}
      <CreateQuoteModal
        isOpen={isCreateQuoteOpen}
        onClose={() => setIsCreateQuoteOpen(false)}
        onSaveQuote={handleSaveQuote}
      />

      <CompareRfqModal
        isOpen={isCompareRfqOpen}
        onClose={() => setIsCompareRfqOpen(false)}
      />

      <ViewAllDealsModal
        isOpen={isViewAllDealsOpen}
        onClose={() => setIsViewAllDealsOpen(false)}
        quotes={quotes}
      />
    </div>
  );
}
