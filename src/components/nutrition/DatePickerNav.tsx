import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDatePretty } from '../../utils/formatters';

export const DatePickerNav: React.FC = () => {
  const { activeDate, setActiveDate } = useApp();

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
    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10">
      <button
        onClick={handlePrevDay}
        className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Previous day"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-emerald-400" />
        <span className="text-sm sm:text-base font-bold text-white font-sans">
          {formatDatePretty(activeDate)}
        </span>
        {isToday && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            Today
          </span>
        )}
      </div>

      <button
        onClick={handleNextDay}
        className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Next day"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
