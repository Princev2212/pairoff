import React from 'react';
import {
  LayoutDashboard,
  Utensils,
  ScanLine,
  TrendingUp,
  Bot,
} from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenScan: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenScan,
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'nutrition', label: 'Meals', icon: Utensils },
    { id: 'scan_center', label: 'Scan', icon: ScanLine, isCenter: true },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'coach', label: 'Coach', icon: Bot },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#06090E]/90 backdrop-blur-2xl border-t border-white/[0.08] px-3 py-2 pb-safe">
      <nav className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={onOpenScan}
                className="relative -top-5 flex flex-col items-center group focus:outline-none"
              >
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-[1.5px] shadow-[0_8px_25px_rgba(16,185,129,0.5)] transform transition-transform group-hover:scale-105 active:scale-95">
                  <div className="w-full h-full bg-[#070A0F] rounded-2xl flex items-center justify-center">
                    <ScanLine className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 mt-1">Scan</span>
              </button>
            );
          }

          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 ${
                isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[11px] mt-1 tracking-tight">{tab.label}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-emerald-400 mt-0.5 shadow-[0_0_6px_#34D399]" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
