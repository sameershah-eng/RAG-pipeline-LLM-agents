import React from 'react';
import {
  LayoutDashboard,
  FileCheck2,
  Users,
  FileText,
  Briefcase,
  BarChart3,
  Settings,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import { NavItemKey } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile: () => void;
  activeItem: NavItemKey;
  onSelectItem: (item: NavItemKey) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onCloseMobile,
  activeItem,
  onSelectItem,
}) => {
  const navItems: { key: NavItemKey; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4.5 h-4.5 shrink-0" />,
    },
    {
      key: 'revisions',
      label: 'Revision check',
      icon: <FileCheck2 className="w-4.5 h-4.5 shrink-0" />,
      badge: '3',
    },
    {
      key: 'customers',
      label: 'Customers',
      icon: <Users className="w-4.5 h-4.5 shrink-0" />,
    },
    {
      key: 'bids',
      label: 'Bids',
      icon: <FileText className="w-4.5 h-4.5 shrink-0" />,
      badge: '12',
    },
    {
      key: 'deals',
      label: 'Deals',
      icon: <Briefcase className="w-4.5 h-4.5 shrink-0" />,
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-4.5 h-4.5 shrink-0" />,
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4.5 h-4.5 shrink-0" />,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-35 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed md:static inset-y-0 left-0 z-40 w-[250px] bg-white border-r border-[#EAECEF] flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:overflow-hidden md:border-r-0'
        }`}
      >
        <div className="p-4 flex-1 overflow-y-auto">
          {/* Small heading label NAVIGATION */}
          <div className="px-3 pt-2 pb-3">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase select-none">
              Navigation
            </span>
          </div>

          {/* Vertical menu items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeItem === item.key;
              return (
                <button
                  key={item.key}
                  id={`nav-item-${item.key}`}
                  onClick={() => {
                    onSelectItem(item.key);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-[#F2F5FA] text-[#1E293B] border border-[#DCE4F0] shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-[#F8F9FA] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`transition-colors ${
                        isActive
                          ? 'text-[#2563EB]'
                          : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 text-[11px] rounded-full font-medium ${
                        isActive
                          ? 'bg-[#2563EB] text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Operational Quick Status Card */}
          <div className="mt-8 mx-1 p-3 rounded-xl bg-[#F7F8FA] border border-[#E9ECEF]">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#E8830C]" />
              <span>Audit Log: In-Memory</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              All quotes and revision diffs are tracked locally during this session.
            </p>
          </div>
        </div>

        {/* Bottom small "guest" user row */}
        <div
          id="sidebar-user-row"
          className="p-3 border-t border-[#EAECEF] bg-[#FAFAFC]"
        >
          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-white transition border border-transparent hover:border-[#E5E7EB]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                G
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900 truncate">
                  guest
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  guest@ops-portal.internal
                </p>
              </div>
            </div>

            <button
              title="Session active (read-only)"
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
