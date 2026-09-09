import React, { useState } from 'react';
import { Bot, Send, Sparkles, User } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AskCoachChat: React.FC = () => {
  const { profile, targets, weightTrend } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'ai',
      text: `Hello ${profile?.name || 'Athlete'}! I'm your MYGAIN AI Coach. I analyze your Mifflin-St Jeor surplus (+${targets?.surplusCalories || 250} kcal), protein pacing, and 7-day weight velocity. What weight-gain or nutrition questions can I help you with today?`,
      timestamp: 'Just now',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'How do I hit my protein goal easily?',
    'I feel too full in a surplus. How to eat more?',
    'Best calorie-dense Indian snacks for weight gain?',
    'Is my weekly weight gain rate on track?',
  ];

  const handleSendMessage = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Dynamic AI response generation based on user's actual live targets and prompt
    setTimeout(() => {
      let reply = '';
      const text = userText.toLowerCase();

      if (text.includes('protein')) {
        reply = `To hit your target (${targets?.proteinGrams || 96}g/day) without feeling overstuffed:\n1. Add 100g fresh paneer (18g protein) to your lunch or dinner.\n2. Include 2-3 boiled eggs (13-18g protein) at breakfast.\n3. Drink 1 glass of whole milk (8.5g protein) with roasted peanuts (10g protein) as an evening snack.\n4. If needed, 1 scoop of whey protein in 250ml milk effortlessly provides 33g complete protein!`;
      } else if (text.includes('full') || text.includes('appetite') || text.includes('eat more')) {
        reply = `Feeling full is very common when transitioning to a caloric surplus (+${targets?.surplusCalories || 250} kcal). Here are high-gain pro strategies:\n1. Switch to liquid calories: A smoothie with 250ml whole milk, 40g oats, 2 tbsp peanut butter, and 1 banana gives you ~600 kcal without triggering heavy gastric stretch receptors.\n2. Add 1-2 tsp of pure desi ghee to your rotis or dal (+90-180 clean kcal with zero volume).\n3. Snack on roasted almonds or cashews between meals—they are calorie-dense and easy to digest.`;
      } else if (text.includes('indian') || text.includes('snack')) {
        reply = `Top Indian calorie-dense snacks for clean weight gain:\n• Roasted Peanuts with Jaggery (Gur): ~320 kcal, 11g protein\n• Paneer Bhurji with Toast: ~340 kcal, 20g protein\n• Banana & Peanut Butter Milkshake: ~580 kcal, 25g protein\n• Sattu Drink (with roasted chickpea flour & whole milk): ~280 kcal, 16g protein\n• Moong Dal / Besan Chilla with Paneer stuffing: ~290 kcal, 15g protein.`;
      } else if (text.includes('rate') || text.includes('track') || text.includes('weight')) {
        reply = `Your targeted weekly gain is ${targets?.targetWeeklyGainKgMin || 0.15} to ${targets?.targetWeeklyGainKgMax || 0.30} kg/week (0.25% - 0.50% of your bodyweight).\n${weightTrend.statusHeadline}: ${weightTrend.recommendation}\nRemember: 7-day rolling moving averages filter out day-to-day hydration shifts. Stick to your +${targets?.surplusCalories || 250} kcal target consistently.`;
      } else {
        reply = `Great question! For controlled lean weight gain, the key is consistency with your +${targets?.surplusCalories || 250} kcal surplus and hitting at least ${targets?.proteinGrams || 96}g of protein daily. Prioritize whole nutrient-dense foods (rice, dal, paneer, eggs, nuts, and whole milk) and progressive resistance training.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <GlassCard className="p-5 sm:p-6 space-y-4 flex flex-col h-[520px]">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[1px]">
            <div className="w-full h-full bg-[#070A0F] rounded-xl flex items-center justify-center">
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Ask MYGAIN AI Coach</h3>
            <p className="text-[11px] text-slate-400">Context-aware nutrition intelligence</p>
          </div>
        </div>

        <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Online
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  isAI
                    ? 'bg-slate-900/90 text-slate-200 border border-white/10'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-md'
                }`}
              >
                {msg.text}
                <span className="block text-[9px] text-slate-400 mt-1 text-right font-mono">
                  {msg.timestamp}
                </span>
              </div>

              {!isAI && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-slate-300" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>AI Coach is formulating advice...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0 no-scrollbar">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 rounded-xl bg-white/[0.04] hover:bg-emerald-500/15 text-slate-300 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/30 text-[11px] font-medium shrink-0 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="flex items-center gap-2 pt-2 border-t border-white/5 shrink-0"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question about your macros, weight gain..."
          className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-800/70 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500/60"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="p-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-40 transition-all shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Disclaimer */}
      <p className="text-[10px] text-slate-500 text-center shrink-0">
        AI Coach provides educational guidance & estimation. Not intended for medical diagnosis.
      </p>
    </GlassCard>
  );
};
