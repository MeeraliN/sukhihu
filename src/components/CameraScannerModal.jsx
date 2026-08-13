import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, CheckCircle2, Sliders, ShieldCheck } from 'lucide-react';
import { analyzeFoodImage } from '../services/visionEngine';

export default function CameraScannerModal({ onClose, onLogDetectedFood }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [portionGram, setPortionGram] = useState(150);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const src = evt.target.result;
      setImagePreview(src);
      runVisionAnalysis(src);
    };
    reader.readAsDataURL(file);
  };

  const runVisionAnalysis = async (src) => {
    setIsScanning(true);
    setAnalysisResult(null);

    // Simulate scanning pass
    setTimeout(async () => {
      const res = await analyzeFoodImage(src);
      setAnalysisResult(res);
      setPortionGram(res.portionGrams);
      setIsScanning(false);
    }, 1200);
  };

  const handleConfirmLog = () => {
    if (!analysisResult) return;

    const item = analysisResult.detectedItem;
    onLogDetectedFood(item, portionGram);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col justify-between p-4 max-w-md mx-auto overflow-y-auto">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Zero-Cost AI Food Scanner</h3>
            <p className="text-[10px] text-emerald-400 font-medium">100% Free • Client-Side Vision</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center font-bold text-xs"
        >
          ✕
        </button>
      </div>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />

        {!imagePreview ? (
          <div className="w-full h-64 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center p-6 text-center space-y-4 bg-slate-900/50">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-pulse">
              <Camera className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Snap or Upload Food Picture</h4>
              <p className="text-xs text-slate-400 mt-1">
                Take a photo of your meal or upload from gallery to extract 40+ micronutrients instantly.
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition active:scale-95"
            >
              <Upload className="w-4 h-4" />
              <span>Choose Photo / Camera</span>
            </button>
          </div>
        ) : (
          <div className="w-full space-y-4">
            
            {/* Image Preview Container with Scanner line animation */}
            <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <img src={imagePreview} alt="Food scan preview" className="w-full h-full object-cover" />

              {isScanning && (
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs flex flex-col items-center justify-center">
                  <div className="animate-scan-line" />
                  <Sparkles className="w-8 h-8 text-emerald-400 animate-spin mb-2" />
                  <span className="text-xs font-bold text-emerald-300">Analyzing Food & Micronutrients...</span>
                </div>
              )}
            </div>

            {/* Analysis Result Card */}
            {analysisResult && (
              <div className="p-4 rounded-2xl glass-card border border-emerald-500/30 space-y-3 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{analysisResult.detectedItem.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm">{analysisResult.detectedItem.name}</h4>
                      <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> {analysisResult.confidence}% AI Confidence Match
                      </p>
                    </div>
                  </div>
                </div>

                {/* Portion Gram Adjuster */}
                <div className="pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5 text-slate-400" /> Portion Weight (Grams):
                    </span>
                    <span className="font-bold text-emerald-400">{portionGram}g</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="500"
                    step="5"
                    value={portionGram}
                    onChange={(e) => setPortionGram(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                {/* Confirm Log Button */}
                <button
                  type="button"
                  onClick={handleConfirmLog}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Add {portionGram}g to Daily Intake Log</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                setAnalysisResult(null);
              }}
              className="w-full py-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 font-semibold rounded-xl text-xs"
            >
              Take Another Photo
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
