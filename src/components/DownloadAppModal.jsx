import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Apple, Download, CheckCircle2, X, Sparkles, ShieldCheck } from 'lucide-react';

export default function DownloadAppModal({ onClose }) {
  const [deviceInfo, setDeviceInfo] = useState({
    os: 'Unknown',
    type: 'Desktop / Web',
    icon: 'Monitor',
    recommended: 'Web App / PWA',
    downloadUrl: '#'
  });

  const [pwaPrompt, setPwaPrompt] = useState(window.deferredPwaPrompt || null);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const platform = navigator.platform || '';

    let detectedOS = 'Windows Desktop';
    let deviceType = 'Desktop (x64 / 32-bit)';
    let rec = 'Windows Desktop App / PWA';

    if (/android/i.test(userAgent)) {
      detectedOS = 'Android';
      deviceType = 'Android Smartphone / Tablet';
      rec = 'Native Android APK Package';
    } else if (/iPad|iPhone|iPod/.test(userAgent) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      detectedOS = 'iOS';
      deviceType = 'Apple iPhone / iPad';
      rec = 'iOS WebApp / TestFlight';
    } else if (/Mac/i.test(userAgent)) {
      detectedOS = 'macOS';
      deviceType = 'Apple Mac Desktop';
      rec = 'macOS Desktop PWA';
    } else if (/Linux/i.test(userAgent)) {
      detectedOS = 'Linux';
      deviceType = 'Linux PC';
      rec = 'Linux WebApp';
    }

    setDeviceInfo({
      os: detectedOS,
      type: deviceType,
      recommended: rec
    });

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      window.deferredPwaPrompt = e;
      setPwaPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleTriggerInstall = () => {
    if (pwaPrompt) {
      pwaPrompt.prompt();
      pwaPrompt.userChoice.then(() => {
        window.deferredPwaPrompt = null;
        setPwaPrompt(null);
      });
    } else if (deviceInfo.os === 'Android') {
      // Trigger direct APK download or PWA install
      const link = document.createElement('a');
      link.href = '/sukhihu-android.apk';
      link.download = 'sukhihu-android.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (deviceInfo.os === 'iOS') {
      alert('📱 To install on iOS iPhone/iPad:\n1. Tap the Share button in Safari\n2. Select "Add to Home Screen"');
    } else {
      alert('🖥️ Desktop Installation:\n1. Click the Install icon in your browser address bar\n2. Or choose Menu > Install sukhihu App');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-100">Download sukhihu App</h3>
              <p className="text-xs text-emerald-400 font-semibold">Cross-Platform Smart Installer</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold hover:bg-slate-700 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Auto-Detected Device Status Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Auto-Detected Device</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black">
              ✓ Ready for Installation
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
              {deviceInfo.os === 'Android' ? <Smartphone className="w-5 h-5" /> : deviceInfo.os === 'iOS' ? <Apple className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-100">{deviceInfo.os} ({deviceInfo.type})</h4>
              <p className="text-xs text-emerald-400 font-semibold">Package: {deviceInfo.recommended}</p>
            </div>
          </div>
        </div>

        {/* Primary Download / Install Trigger Button */}
        <button
          type="button"
          onClick={handleTriggerInstall}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition"
        >
          <Download className="w-4 h-4 stroke-[3]" />
          <span>Start Instant Download / Install</span>
        </button>

        {/* Feature Highlights */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> Zero Storage Footprint & Works Offline
          </div>
          <p className="text-slate-400">
            Automatically syncs your personalized hydration, DRI targets, and meal logs across Mobile, Desktop, and Web.
          </p>
        </div>

      </div>
    </div>
  );
}
