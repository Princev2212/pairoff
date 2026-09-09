import React from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Flame,
  Scale,
  Sparkles,
  User,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDatePretty, getGreetingTime } from '../../utils/formatters';
import { Badge } from '../common/Badge';

interface HeaderProps {
  onSelectTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectTab }) => {
  const { profile, activeDate, setActiveDate, openLogWeight, weightEntries } = useApp();

  const handlePrevDay = () => {
    const d = new Date(activeDate);
    d.setDate(d.getDate() - 1);
    setActiveDate(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(activeDate);
    d.setDate(d.getDate() + 1);
    setActiveDate(d.toISOString().split('T')[0]);
  };

  const isToday = activeDate === new Date().toISOString().split('T')[0];

  return (
    <header className="sticky top-0 z-20 bg-[#070A0F]/80 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Left: User greeting or breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[1px]">
            <div className="w-full h-full bg-[#070A0F] rounded-xl flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <span className="font-bold text-base tracking-tight text-white">
            MY<span className="text-emerald-400">GAIN</span>
          </span>
        </div>

        <div className="hidden sm:block">
          <h2 className="text-sm font-medium text-slate-400">
            {getGreetingTime()}, <span className="font-bold text-white">{profile?.name || 'Athlete'}</span> 👋
          </h2>
        </div>
      </div>

      {/* Center: Date Picker Navigator */}
      <div className="flex items-center bg-slate-900/80 border border-white/10 rounded-2xl p-1 shadow-inner">
        <button
          onClick={handlePrevDay}
          aria-label="Previous day"
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="px-3 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs sm:text-sm font-semibold text-slate-200 font-sans">
            {formatDatePretty(activeDate)}
          </span>
          {isToday && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
          )}
        </div>

        <button
          onClick={handleNextDay}
          aria-label="Next day"
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Streak & Quick Profile/Weight Action */}
      <div className="flex items-center gap-2.5">
        {/* Consistent Tracking Streak Badge */}
        <Badge variant="emerald" size="sm" icon={<Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}>
          <span className="font-mono font-bold text-slate-200">
            {Math.max(1, weightEntries.length)}d
          </span>
        </Badge>

        {/* Quick Log Weight (Desktop & Tablet) */}
        <button
          onClick={openLogWeight}
          className="hidden sm:flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-xs font-medium text-slate-200 transition-all duration-200"
        >
          <Scale className="w-3.5 h-3.5 text-cyan-400" />
          <span>Weigh-in</span>
        </button>

        {/* User Profile Avatar Link */}
        <button
          onClick={() => onSelectTab('profile')}
          aria-label="Profile settings"
          className="w-9 h-9 rounded-xl bg-slate-800/80 border border-white/10 hover:border-emerald-500/40 flex items-center justify-center text-slate-300 hover:text-emerald-300 transition-colors"
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
