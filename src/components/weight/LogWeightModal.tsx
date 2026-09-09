import React, { useState } from 'react';
import { Scale, Sun, Sunset, Moon } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

interface LogWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogWeightModal: React.FC<LogWeightModalProps> = ({ isOpen, onClose }) => {
  const { profile, logWeight, activeDate } = useApp();

  const [weightKg, setWeightKg] = useState<number>(profile?.currentWeightKg || 60.0);
  const [date, setDate] = useState<string>(activeDate || new Date().toISOString().split('T')[0]);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [isFasted, setIsFasted] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSave = () => {
    if (weightKg < 30 || weightKg > 250) {
      setErrorMsg('Please enter a realistic weight in kg (30 - 250 kg).');
      return;
    }
    setErrorMsg(null);
    logWeight(Number(weightKg), notes.trim() || undefined, isFasted, timeOfDay, date);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[1px]">
            <div className="w-full h-full bg-[#070A0F] rounded-xl flex items-center justify-center">
              <Scale className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Log Body Weight</h3>
            <p className="text-xs text-slate-400">Track daily weigh-ins for 7-day trend analysis</p>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Big Weight Input Display */}
        <div className="p-4 rounded-2xl bg-slate-800/40 border border-white/5 text-center space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Today's Weight
          </label>
          <div className="flex items-center justify-center gap-2">
            <input
              type="number"
              step="0.1"
              min="30"
              max="250"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="text-4xl font-extrabold text-white text-center font-mono bg-transparent w-40 border-b-2 border-cyan-400/60 focus:outline-none focus:border-cyan-300"
            />
            <span className="text-xl font-bold text-slate-400 font-mono">kg</span>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            {[-0.5, -0.1, +0.1, +0.5].map((delta) => (
              <button
                key={delta}
                type="button"
                onClick={() => setWeightKg((prev) => Number((prev + delta).toFixed(1)))}
                className="py-1 px-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-slate-300 border border-white/5"
              >
                {delta > 0 ? `+${delta}` : delta}
              </button>
            ))}
          </div>
        </div>

        {/* Date & Time of Day */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Log Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/70 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Time of Day
            </label>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'morning', icon: Sun, label: 'AM' },
                { id: 'afternoon', icon: Sunset, label: 'Mid' },
                { id: 'evening', icon: Moon, label: 'PM' },
              ].map((t) => {
                const Icon = t.icon;
                const isSelected = timeOfDay === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTimeOfDay(t.id as 'morning' | 'afternoon' | 'evening')}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-slate-800/40 text-slate-400 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[10px]">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Fasted Checkbox */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-white/5">
          <div>
            <span className="text-xs font-semibold text-white">Fasted Morning Weigh-in</span>
            <p className="text-[11px] text-slate-400">Recommended for lowest fluid variance</p>
          </div>
          <input
            type="checkbox"
            checked={isFasted}
            onChange={(e) => setIsFasted(e.target.checked)}
            className="w-5 h-5 accent-cyan-400 rounded cursor-pointer"
          />
        </div>

        {/* Optional Notes */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Notes (Optional)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Post high carb refeed, post leg workout"
            className="w-full px-3 py-2.5 rounded-xl bg-slate-800/70 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="py-2.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white font-bold text-xs shadow-[0_4px_20px_rgba(6,182,212,0.35)] transition-all"
          >
            Save Weigh-in
          </button>
        </div>
      </div>
    </Modal>
  );
};
