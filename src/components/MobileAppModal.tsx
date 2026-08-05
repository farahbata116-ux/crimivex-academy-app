import React, { useState } from 'react';
import { 
  Smartphone, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Bell, 
  WifiOff, 
  ExternalLink,
  Shield,
  Monitor
} from 'lucide-react';

interface MobileAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMobileSimulatorActive: boolean;
  onToggleMobileSimulator: () => void;
}

export const MobileAppModal: React.FC<MobileAppModalProps> = ({
  isOpen,
  onClose,
  isMobileSimulatorActive,
  onToggleMobileSimulator
}) => {
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadComplete, setDownloadComplete] = useState<boolean>(false);
  const [offlineSyncEnabled, setOfflineSyncEnabled] = useState<boolean>(true);
  const [pushNotifsEnabled, setPushNotifsEnabled] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleSimulateApkDownload = () => {
    setDownloadProgress(0);
    setDownloadComplete(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setDownloadProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setDownloadComplete(true);
        setTimeout(() => setDownloadProgress(null), 3000);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn font-mono text-xs">
      <div className="bg-[#0B0C0E] border-2 border-cyan-500 max-w-2xl w-full p-6 space-y-6 shadow-2xl relative text-left">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-[11px] uppercase tracking-widest">
              <Smartphone className="w-4 h-4" />
              <span>OFFICIAL SMARTPHONE MOBILE APPLICATION PLATFORM</span>
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-wide">
              CRIMIVEX ACADEMY MOBILE APP
            </h2>
            <p className="text-slate-400 text-[11px]">
              Criminology • Criminal Justice • Forensic Science • Cybersecurity
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-black text-lg p-1"
          >
            ✕
          </button>
        </div>

        {/* Smartphone App Features Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Android APK Download Card */}
          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <span className="text-cyan-400 font-bold uppercase text-[10px]">ANDROID OS PACKAGE</span>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[9px] px-2 py-0.5 font-bold uppercase">
                v3.8 APK (24.2 MB)
              </span>
            </div>
            
            <h3 className="text-sm font-black text-white uppercase">
              Download Android Smartphone APK
            </h3>
            
            <p className="text-slate-400 text-[10px] leading-relaxed">
              Install directly on Samsung, Tecno, Infinix, Xiaomi, & all Android smartphones. Includes offline course PDF reader & assessment suite.
            </p>

            {downloadProgress !== null ? (
              <div className="space-y-1 pt-2">
                <div className="flex justify-between text-[10px] text-cyan-400 font-bold">
                  <span>Downloading APK...</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div className="w-full bg-zinc-900 h-2 border border-slate-800 overflow-hidden">
                  <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${downloadProgress}%` }} />
                </div>
              </div>
            ) : downloadComplete ? (
              <div className="bg-emerald-950 border border-emerald-500 p-2 text-emerald-400 text-[10px] font-bold flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>APK Package Ready! Launching Android Installer...</span>
              </div>
            ) : (
              <button
                onClick={handleSimulateApkDownload}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase py-2.5 flex items-center justify-center space-x-2 transition"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD ANDROID APK</span>
              </button>
            )}
          </div>

          {/* iOS PWA Install Card */}
          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-3 relative">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <span className="text-cyan-400 font-bold uppercase text-[10px]">APPLE iOS / WEB APP</span>
              <span className="bg-cyan-950 text-cyan-400 border border-cyan-500/40 text-[9px] px-2 py-0.5 font-bold uppercase">
                PWA INSTALLER
              </span>
            </div>
            
            <h3 className="text-sm font-black text-white uppercase">
              Apple iOS App (Safari PWA)
            </h3>
            
            <p className="text-slate-400 text-[10px] leading-relaxed">
              Tap "Share" on your iPhone Safari browser and select <strong>"Add to Home Screen"</strong> for instant native iOS app experience.
            </p>

            <button
              onClick={() => alert("📱 To install on iPhone: Open Safari -> Tap Share Icon -> Tap 'Add to Home Screen'")}
              className="w-full bg-zinc-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold uppercase py-2.5 flex items-center justify-center space-x-2 transition"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>INSTALL iOS HOMESCREEN APP</span>
            </button>
          </div>
        </div>

        {/* Mobile Settings Controls */}
        <div className="bg-zinc-950 border border-slate-800 p-4 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase border-b border-slate-900 pb-2 flex items-center space-x-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>SMARTPHONE PREFERENCES & ACCESS MODES</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setOfflineSyncEnabled(!offlineSyncEnabled)}
              className={`p-3 border text-left font-bold text-[11px] flex items-center justify-between ${
                offlineSyncEnabled ? 'bg-cyan-950/40 border-cyan-500 text-cyan-400' : 'bg-zinc-900 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2">
                <WifiOff className="w-4 h-4" />
                <span>Offline Learning Cache</span>
              </div>
              <span>{offlineSyncEnabled ? 'ENABLED' : 'DISABLED'}</span>
            </button>

            <button
              onClick={() => setPushNotifsEnabled(!pushNotifsEnabled)}
              className={`p-3 border text-left font-bold text-[11px] flex items-center justify-between ${
                pushNotifsEnabled ? 'bg-cyan-950/40 border-cyan-500 text-cyan-400' : 'bg-zinc-900 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Push Alerts & Reminders</span>
              </div>
              <span>{pushNotifsEnabled ? 'ENABLED' : 'DISABLED'}</span>
            </button>
          </div>

          {/* Smartphone Frame Device Simulator Toggle */}
          <div className="pt-2">
            <button
              onClick={() => {
                onToggleMobileSimulator();
                onClose();
              }}
              className={`w-full p-3 font-mono font-black text-xs uppercase border flex items-center justify-center space-x-2 transition ${
                isMobileSimulatorActive
                  ? 'bg-red-600 text-white border-red-500'
                  : 'bg-cyan-500 text-black border-cyan-400 hover:bg-cyan-400'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>
                {isMobileSimulatorActive
                  ? 'DISABLE SMARTPHONE BEZEL PREVIEW (RETURN TO FULL SCREEN)'
                  : 'TOGGLE SMARTPHONE APP PREVIEW MODE (RENDER INSIDE MOBILE BEZEL)'}
              </span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-slate-500 text-center uppercase tracking-widest pt-2">
          CRIMIVEX ACADEMY MOBILE APP • VERSION 3.8.0 • BUILD #8892 • ALL RIGHTS RESERVED
        </div>
      </div>
    </div>
  );
};
