import React from 'react';
import {
  LayoutDashboard,
  Utensils,
  ScanLine,
  TrendingUp,
  Bot,
  User,
  Sparkles,
  Scale,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab }) => {
  const { profile, targets, openLogWeight, openScanner } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'scan', label: 'Scan Food', icon: ScanLine, highlight: true },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'coach', label: 'AI Coach', icon: Bot, badge: 'AI' },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 h-screen sticky top-0 bg-[#06090E]/80 backdrop-blur-2xl border-r border-white/[0.08] p-5 z-30">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2 py-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-[1.5px] shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <div className="w-full h-full bg-[#070A0F] rounded-2xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              MY<span className="text-emerald-400">GAIN</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              AI
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Controlled Lean Surplus</p>
        </div>
      </div>

      {/* Quick Action Button */}
      <div className="px-1 mb-6">
        <button
          onClick={() => openScanner()}
          className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm shadow-[0_4px_20px_-2px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 transition-all duration-200"
        >
          <ScanLine className="w-4 h-4 text-emerald-100" />
          <span>AI Food Scanner</span>
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 space-y-1.5 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <Badge variant="cyan" size="xs">
                    {item.badge}
                  </Badge>
                )}
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile / Quick Weigh-in Snapshot */}
      {profile && (
        <div className="pt-4 border-t border-white/[0.08] px-1">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Weight Target</span>
              <span className="font-bold text-white font-mono">
                {profile.currentWeightKg} <span className="text-slate-500">→</span> {profile.targetWeightKg} kg
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Daily Target</span>
              <span className="font-semibold text-emerald-400 font-mono">
                {targets ? targets.targetCalories : 2650} kcal
              </span>
            </div>

            <button
              onClick={openLogWeight}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-slate-200 transition-colors border border-white/5"
            >
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>Log Today's Weight</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
