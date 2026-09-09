import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Camera,
  Sparkles,
  Info,
  RefreshCw,
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { FoodAnalysisView } from '../components/food-scanner/FoodAnalysisView';
import { PRESET_SAMPLE_MEALS, analyzeFoodImage } from '../services/aiFoodScanner';
import type { FoodAnalysisResult } from '../types';

export const FoodScanPage: React.FC = () => {
  const [activeSource, setActiveSource] = useState<'presets' | 'upload' | 'camera'>('presets');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('Initializing neural scanner...');
  const [result, setResult] = useState<FoodAnalysisResult | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScan = async (imgUrl: string, presetId?: string) => {
    setIsScanning(true);
    setPreviewSrc(imgUrl);

    setScanStep('Segmenting ingredients on plate...');
    setTimeout(() => {
      setScanStep('Estimating volumetric depth & cooking fats...');
    }, 450);

    setTimeout(() => {
      setScanStep('Calibrating macronutrient breakdown...');
    }, 900);

    try {
      const scanOutput = await analyzeFoodImage(imgUrl, presetId);
      setResult(scanOutput);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        handleScan(src);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setResult(null);
    setPreviewSrc(null);
    setIsScanning(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vision AI Nutrition Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          AI Food Scanner
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Upload any food photo to decompose ingredients, estimate portion weights, and automatically calculate protein, carbs, and calories.
        </p>
      </div>

      {result ? (
        /* Results View */
        <GlassCard className="p-6 sm:p-8 space-y-6" glowColor="emerald">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Scan Results & Breakdown
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Scan another plate</span>
            </button>
          </div>

          <FoodAnalysisView result={result} onDone={handleReset} />
        </GlassCard>
      ) : isScanning ? (
        /* Neural Scanning HUD */
        <GlassCard className="p-12 flex flex-col items-center justify-center space-y-6 text-center" glowColor="emerald">
          <div className="relative w-72 h-72 rounded-3xl overflow-hidden border-2 border-emerald-500/60 bg-slate-950 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
            {previewSrc && (
              <img src={previewSrc} alt="Analyzing plate" className="w-full h-full object-cover opacity-60" />
            )}
            <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#34D399] animate-scan-laser" />
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-emerald-400" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-emerald-400" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-emerald-400" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-emerald-400" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
              <span className="text-sm sm:text-base font-bold text-white font-mono">{scanStep}</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Extracting geometric boundaries, food textures, and estimated lipid absorption...
            </p>
          </div>
        </GlassCard>
      ) : (
        /* Source Selection Mode */
        <div className="space-y-6">
          {/* Source Tabs */}
          <div className="flex rounded-2xl bg-slate-900/80 p-1.5 border border-white/10 max-w-md mx-auto">
            <button
              onClick={() => setActiveSource('presets')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeSource === 'presets'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_#34D399]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sample Plates</span>
            </button>

            <button
              onClick={() => setActiveSource('upload')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeSource === 'upload'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_#34D399]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload Photo</span>
            </button>

            <button
              onClick={() => setActiveSource('camera')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeSource === 'camera'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_#34D399]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Camera</span>
            </button>
          </div>

          {/* TAB 1: PRESET TEST MEALS */}
          {activeSource === 'presets' && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center">
                <span className="text-xs text-slate-400">
                  Select a calibrated food plate to test the vision estimation engine:
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PRESET_SAMPLE_MEALS.map((preset) => (
                  <GlassCard
                    key={preset.id}
                    hoverEffect
                    glowColor="emerald"
                    onClick={() => handleScan(preset.imageThumbnail, preset.id)}
                    className="p-4 space-y-3 cursor-pointer group"
                  >
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-950">
                      <img
                        src={preset.imageThumbnail}
                        alt={preset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 right-2.5">
                        <Badge variant="emerald" size="xs">
                          {preset.category}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {preset.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {preset.items.map((i) => i.name).join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                      <span className="text-emerald-400 font-bold font-mono">
                        {preset.items.reduce((acc, c) => acc + c.calories, 0)} kcal
                      </span>
                      <span className="text-slate-400 font-mono">
                        {preset.items.reduce((acc, c) => acc + c.protein, 0).toFixed(1)}g Protein
                      </span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD */}
          {activeSource === 'upload' && (
            <GlassCard className="p-10 text-center animate-fade-in space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 border-2 border-dashed border-white/15 hover:border-emerald-500/50 rounded-3xl cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white">Upload plate photo</h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  Click or drag and drop your meal photo (JPG, PNG, WEBP).
                </p>
              </div>
            </GlassCard>
          )}

          {/* TAB 3: CAMERA */}
          {activeSource === 'camera' && (
            <GlassCard className="p-10 text-center animate-fade-in space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto">
                <Camera className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-white">Capture Food Plate</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Position your phone camera directly above your plate for accurate volumetric estimation.
              </p>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                id="camera-direct-input"
                className="hidden"
              />
              <label
                htmlFor="camera-direct-input"
                className="inline-block py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-md cursor-pointer hover:from-emerald-400 hover:to-teal-400 transition-all"
              >
                Open Camera
              </label>
            </GlassCard>
          )}

          {/* Product Principle & Transparency Disclaimer */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Vision AI Transparency & Science</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              No photo-based application can measure the exact chemical macronutrients of a cooked meal without destructive lab calorimetry. MYGAIN uses computer vision heuristics to segment food items and estimate volumetric density. You can adjust all gram portions and calories prior to confirmation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
