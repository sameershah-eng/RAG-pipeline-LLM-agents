import React, { useState } from 'react';
import {
  PanelLeftClose,
  PanelLeft,
  Search,
  Globe,
  Bell,
  Check,
  X,
} from 'lucide-react';
import { TeamMode } from '../types';
import { RECENT_NOTIFICATIONS } from '../mockData';

interface TopBarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  teamMode: TeamMode;
  onTeamModeChange: (mode: TeamMode) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  teamMode,
  onTeamModeChange,
  searchQuery,
  onSearchChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(RECENT_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header
      id="top-bar"
      className="sticky top-0 z-30 w-full bg-white border-b border-[#EAECEF] h-16 px-4 md:px-6 flex items-center justify-between gap-4 transition-all"
    >
      {/* Left section: Collapse icon + Stateless Mode badge */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          id="btn-collapse-sidebar"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-[#F2F4F7] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeft className="w-5 h-5" />
          )}
        </button>

        <div
          id="stateless-mode-badge"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F8FA] border border-[#E5E7EB] text-xs font-medium text-slate-700 select-none"
        >
          <span className="w-2 h-2 rounded-full bg-[#E8830C] animate-pulse" />
          <span className="whitespace-nowrap">Stateless Mode: Active</span>
        </div>
      </div>

      {/* Center: wide rounded search input */}
      <div className="flex-1 max-w-xl mx-2 hidden sm:block">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Customers, bids, projects..."
            className="w-full pl-10 pr-9 py-2 text-sm bg-[#F7F8FA] hover:bg-[#F0F2F5] focus:bg-white text-slate-800 placeholder-slate-400 rounded-full border border-transparent focus:border-[#2563EB] focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right: text, globe, notifications, avatar, pill toggles */}
      <div className="flex items-center gap-2 md:gap-3.5 shrink-0">
        <span className="text-xs text-slate-500 font-mono hidden xl:inline-block">
          Signed in as guest@
        </span>

        {/* Language selector indicator */}
        <div
          id="language-indicator"
          className="hidden md:flex items-center gap-1 text-xs text-slate-600 px-2 py-1 rounded-md hover:bg-[#F2F4F7] transition cursor-pointer select-none"
          title="Language: English"
        >
          <Globe className="w-4 h-4 text-slate-500" />
          <span className="font-semibold text-xs text-slate-700">EN</span>
        </div>

        {/* Bell notification icon */}
        <div className="relative">
          <button
            id="btn-notifications-toggle"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-[#F2F4F7] transition-colors focus:outline-none"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E8830C]" />
            )}
          </button>

          {/* Notification dropdown */}
          {showNotifications && (
            <div
              id="notifications-popover"
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-[#E5E7EB] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="px-3.5 py-2 border-b border-[#F0F2F5] flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Operational Alerts
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-[#2563EB] hover:underline font-medium flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark read
                  </button>
                )}
              </div>
              <div className="divide-y divide-[#F7F8FA] max-h-72 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-3.5 py-2.5 hover:bg-[#F9FAFB] transition ${
                      notif.unread ? 'bg-amber-50/40' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-800 leading-snug">
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                      {notif.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User avatar: round blue avatar with letter "G" and name "guest" */}
        <div
          id="user-profile-summary"
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-[#F7F8FA] transition cursor-pointer select-none"
        >
          <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            G
          </div>
          <span className="text-xs font-semibold text-slate-800 hidden sm:inline-block">
            guest
          </span>
        </div>

        {/* Two pill toggle buttons "Sales" and "Purchasing" */}
        <div
          id="team-mode-toggle"
          className="flex items-center p-1 bg-[#F1F3F5] rounded-full text-xs font-medium border border-[#E5E7EB]"
        >
          <button
            id="btn-mode-sales"
            onClick={() => onTeamModeChange('sales')}
            className={`px-3 py-1 rounded-full transition-all duration-150 ${
              teamMode === 'sales'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sales
          </button>
          <button
            id="btn-mode-purchasing"
            onClick={() => onTeamModeChange('purchasing')}
            className={`px-3 py-1 rounded-full transition-all duration-150 ${
              teamMode === 'purchasing'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Purchasing
          </button>
        </div>
      </div>
    </header>
  );
};
