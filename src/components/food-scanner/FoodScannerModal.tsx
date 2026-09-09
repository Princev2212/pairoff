import React, { useState, useRef } from 'react';
import {
  ScanLine,
  UploadCloud,
  Camera,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { FoodAnalysisView } from './FoodAnalysisView';
import { PRESET_SAMPLE_MEALS, analyzeFoodImage } from '../../services/aiFoodScanner';
import type { FoodAnalysisResult } from '../../types';

interface FoodScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FoodScannerModal: React.FC<FoodScannerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'upload' | 'camera'>('presets');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStepText, setScanStepText] = useState<string>('Detecting meal items...');
  const [scanResult, setScanResult] = useState<FoodAnalysisResult | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartScan = async (imageSrc: string, presetId?: string) => {
    setIsScanning(true);
    setPreviewImage(imageSrc);

    // Multi-stage simulated neural progress
    setScanStepText('Segmenting plate contours...');
    setTimeout(() => {
      setScanStepText('Estimating volumetric portions & cooking fats...');
    }, 450);

    setTimeout(() => {
      setScanStepText('Running nutritional macro decomposition...');
    }, 900);

    try {
      const result = await analyzeFoodImage(imageSrc, presetId);
      setScanResult(result);
    } catch (err) {
      console.error('Scan error:', err);
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
        handleStartScan(src);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetScanner = () => {
    setScanResult(null);
    setPreviewImage(null);
    setIsScanning(false);
  };

  const handleClose = () => {
    handleResetScanner();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="2xl"
      title={
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[1px]">
            <div className="w-full h-full bg-[#070A0F] rounded-xl flex items-center justify-center">
              <ScanLine className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">AI Food Scanner</h3>
            <p className="text-xs text-slate-400">Photo-based nutritional estimation engine</p>
          </div>
        </div>
      }
    >
      {/* If we have a completed scan result, render the analysis view */}
      {scanResult ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2">
            <button
              onClick={handleResetScanner}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Scan another plate</span>
            </button>
          </div>
          <FoodAnalysisView result={scanResult} onDone={handleClose} />
        </div>
      ) : isScanning ? (
        /* Neural Scanning HUD Animation */
        <div className="py-12 flex flex-col items-center justify-center space-y-6 animate-fade-in">
          <div className="relative w-64 h-64 rounded-3xl overflow-hidden border-2 border-emerald-500/50 bg-slate-950 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
            {previewImage && (
              <img
                src={previewImage}
                alt="Scanning..."
                className="w-full h-full object-cover opacity-60"
              />
            )}

            {/* Glowing Laser Sweep Line */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34D399] animate-scan-laser" />

            {/* HUD Corner Targets */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-emerald-500/30 animate-ping" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
              <span className="text-sm font-bold text-white font-mono">{scanStepText}</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Analyzing ingredients, geometric portion volume, and caloric density...
            </p>
          </div>
        </div>
      ) : (
        /* Source Selection Mode */
        <div className="space-y-6">
          {/* Source Tabs */}
          <div className="flex rounded-2xl bg-slate-800/60 p-1 border border-white/5">
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'presets'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_#34D399]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sample Meals (Instant)</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'upload'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_#34D399]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload Photo</span>
            </button>

            <button
              onClick={() => setActiveTab('camera')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'camera'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_#34D399]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Camera</span>
            </button>
          </div>

          {/* TAB 1: Presets */}
          {activeTab === 'presets' && (
            <div className="space-y-3 animate-fade-in">
              <p className="text-xs text-slate-400">
                Select any realistic food plate below to test the neural scanner instantly:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRESET_SAMPLE_MEALS.map((preset) => (
                  <div
                    key={preset.id}
                    onClick={() => handleStartScan(preset.imageThumbnail, preset.id)}
                    className="group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 hover:border-emerald-500/40 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(16,185,129,0.2)]"
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={preset.imageThumbnail}
                        alt={preset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {preset.title}
                        </h4>
                        <Badge variant="emerald" size="xs">
                          {preset.category}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        {preset.items.map((i) => i.name).join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Upload */}
          {activeTab === 'upload' && (
            <div className="space-y-4 animate-fade-in">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 sm:p-12 border-2 border-dashed border-white/15 hover:border-emerald-500/50 rounded-3xl bg-slate-900/40 hover:bg-slate-900/70 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  Upload a photo of your food plate
                </h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  Drag and drop JPG, PNG, or WEBP. Our vision model will estimate portions and macros.
                </p>
                <button
                  type="button"
                  className="mt-5 py-2 px-5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-semibold text-slate-200 border border-white/10"
                >
                  Browse Files
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Camera */}
          {activeTab === 'camera' && (
            <div className="space-y-4 animate-fade-in text-center py-6">
              <div className="p-8 rounded-3xl border border-white/10 bg-slate-900/40 flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Camera className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Live Camera Capture</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Take a clear, top-down photo of your meal for best volumetric segmentation.
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  id="camera-capture-input"
                  className="hidden"
                />
                <label
                  htmlFor="camera-capture-input"
                  className="py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-[0_4px_20px_rgba(16,185,129,0.35)] cursor-pointer hover:from-emerald-400 hover:to-teal-400 transition-all inline-block"
                >
                  Open Device Camera
                </label>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
