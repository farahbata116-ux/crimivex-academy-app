import React from 'react';
import { AcademyTab, CadetProfile, UserRole } from '../types';
import { 
  GraduationCap, 
  FlaskConical, 
  FolderGit2, 
  Bot, 
  Award, 
  Calendar, 
  Shield, 
  Flame, 
  Search,
  Bell,
  Info,
  CreditCard,
  ShieldCheck,
  Mail,
  UserCheck,
  UserCog,
  BookOpen,
  Newspaper,
  Lock,
  Sun,
  Moon,
  Smartphone,
  Monitor
} from 'lucide-react';

export type ThemeMode = 'dark' | 'light' | 'system';

interface HeaderProps {
  activeTab: AcademyTab;
  setActiveTab: (tab: AcademyTab) => void;
  cadet: CadetProfile;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userRole?: UserRole;
  setUserRole?: (role: UserRole) => void;
  themeMode?: ThemeMode;
  setThemeMode?: (theme: ThemeMode) => void;
  onOpenMobileApp?: () => void;
  isMobileSimulatorActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cadet,
  searchQuery,
  setSearchQuery,
  userRole = 'student',
  setUserRole,
  themeMode = 'dark',
  setThemeMode,
  onOpenMobileApp,
  isMobileSimulatorActive = false
}) => {
  const tabs: { id: AcademyTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'App Home', icon: <Shield className="w-4 h-4" /> },
    { id: 'courses', label: 'Training Programs', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'about', label: 'About & Founder', icon: <Info className="w-4 h-4" /> },
    { id: 'admission-aid', label: 'Admission & Support', icon: <CreditCard className="w-4 h-4" />, badge: '100% Free Support' },
    { id: 'success-news', label: 'Success & News', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'verify-cert', label: 'Verify Certificate', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'contact', label: 'FAQ & Support', icon: <Mail className="w-4 h-4" /> },
    { id: 'security-privacy', label: 'Security & Backup', icon: <Lock className="w-4 h-4" /> },
    { id: 'forensic-lab', label: 'Forensic Lab', icon: <FlaskConical className="w-4 h-4" />, badge: 'Interactive' },
    { id: 'cold-cases', label: 'Cold Cases', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'crimivex-ai', label: 'Crimivex AI', icon: <Bot className="w-4 h-4" />, badge: 'Gemini 3.6' },
    { id: 'cadet-dossier', label: 'Learner Dashboard', icon: <Award className="w-4 h-4" /> },
    { id: 'instructor-dashboard', label: 'Instructor Portal', icon: <UserCheck className="w-4 h-4" />, badge: 'Farah Abdi' },
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: <UserCog className="w-4 h-4" />, badge: 'System' },
    { id: 'workshops', label: 'Masterclasses', icon: <Calendar className="w-4 h-4" />, badge: 'LIVE' },
  ];

  const xpPercentage = Math.min(100, Math.round((cadet.xp / cadet.nextRankXp) * 100));

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-cyan-500/30 text-zinc-100 shadow-2xl">
      {/* Top Banner / Announcement Ticker */}
      <div className="bg-[#0B0C0E] border-b border-cyan-500/30 px-4 py-1.5 text-xs text-slate-200 font-mono font-bold uppercase tracking-wider flex justify-between items-center overflow-hidden">
        <div className="flex items-center space-x-3 text-[11px] truncate">
          <span className="bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 text-[9px] font-mono tracking-widest font-black">
            CRIMIVEX ACADEMY BRAND IDENTITY
          </span>
          <span className="truncate text-slate-300">
            Criminology • Criminal Justice • Forensic Science • Cybersecurity • FOUNDER & INSTRUCTOR: FARAH ABDI HASSAN
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-3 text-[11px] font-mono font-bold tracking-widest text-slate-400 shrink-0">
          {/* Quick Role Switcher */}
          <div className="flex items-center bg-zinc-950 border border-cyan-500/30 p-0.5 text-[10px]">
            <button
              onClick={() => {
                setUserRole?.('student');
                setActiveTab('cadet-dossier');
              }}
              className={`px-2 py-0.5 transition ${userRole === 'student' ? 'bg-cyan-500 text-black font-black' : 'text-slate-400 hover:text-white'}`}
            >
              LEARNER
            </button>
            <button
              onClick={() => {
                setUserRole?.('instructor');
                setActiveTab('instructor-dashboard');
              }}
              className={`px-2 py-0.5 transition ${userRole === 'instructor' ? 'bg-cyan-500 text-black font-black' : 'text-slate-400 hover:text-white'}`}
            >
              INSTRUCTOR
            </button>
            <button
              onClick={() => {
                setUserRole?.('admin');
                setActiveTab('admin-dashboard');
              }}
              className={`px-2 py-0.5 transition ${userRole === 'admin' ? 'bg-cyan-500 text-black font-black' : 'text-slate-400 hover:text-white'}`}
            >
              ADMIN
            </button>
          </div>
          <span className="opacity-40">|</span>
          <span className="text-slate-200">CADET #{cadet.badgeNumber}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 border-b border-white/10">
          
          {/* Brand & Logo */}
          <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => setActiveTab('courses')}>
            <div className="w-11 h-11 bg-gradient-to-br from-cyan-600 via-zinc-900 to-black text-cyan-400 flex items-center justify-center font-black text-xl tracking-tighter border-2 border-cyan-500/40 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <Shield className="w-6 h-6 text-cyan-400 fill-cyan-950/50" />
            </div>
            <div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-black text-2xl tracking-tighter uppercase text-white">
                  CRIMIVEX<span className="text-cyan-400">.</span>
                </span>
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-300 bg-zinc-900 border border-slate-700/60 px-2 py-0.5">
                  ACADEMY
                </span>
              </div>
              <p className="text-[9px] text-cyan-400/90 font-mono tracking-wider uppercase font-bold">
                Criminology • Criminal Justice • Forensic Science • Cybersecurity
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="SEARCH CURRICULUM, FORENSIC LABS, CASE FILES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-none pl-10 pr-4 py-2 text-xs font-mono text-zinc-100 placeholder-zinc-600 uppercase focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          {/* Cadet Status & Theme & Mobile App Launcher */}
          <div className="flex items-center space-x-3">
            
            {/* Mobile App Modal Button */}
            <button
              onClick={onOpenMobileApp}
              className={`px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider border flex items-center space-x-1.5 transition ${
                isMobileSimulatorActive 
                  ? 'bg-cyan-500 text-black border-cyan-400'
                  : 'bg-zinc-900 text-cyan-400 border-cyan-500/40 hover:bg-cyan-950'
              }`}
              title="Download Smartphone App (Android APK / iOS PWA)"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">MOBILE APP</span>
              <span className="bg-cyan-950 text-cyan-400 border border-cyan-500/50 px-1 py-0.2 text-[9px]">APK</span>
            </button>

            {/* Dark / Light Theme Toggle */}
            <div className="flex items-center bg-zinc-900 border border-slate-800 p-0.5 font-mono text-[10px]">
              <button
                onClick={() => setThemeMode?.('dark')}
                className={`p-1.5 transition ${themeMode === 'dark' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Dark Theme (Obsidian Black & Aurora Cyan)"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setThemeMode?.('light')}
                className={`p-1.5 transition ${themeMode === 'light' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Light Theme (Titanium Silver Canvas)"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Streak */}
            <div className="hidden lg:flex items-center space-x-1.5 bg-zinc-900 border border-white/10 px-3 py-1.5 text-xs font-mono text-zinc-200">
              <Flame className="w-4 h-4 text-red-600 fill-red-600" />
              <span className="font-black">{cadet.streakDays}D</span>
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">STREAK</span>
            </div>

            {/* Level & XP */}
            <div 
              onClick={() => setActiveTab('cadet-dossier')}
              className="flex items-center space-x-3 bg-zinc-900 border border-white/10 hover:border-cyan-500 px-3.5 py-1.5 cursor-pointer transition"
            >
              <div className="w-8 h-8 bg-cyan-500 font-black text-black text-xs flex items-center justify-center tracking-tighter">
                L{cadet.level}
              </div>
              <div className="hidden sm:block text-left">
                <div className="flex items-center justify-between gap-3 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <span className="text-zinc-200 truncate max-w-[110px]">{cadet.rank}</span>
                  <span className="text-cyan-400">{cadet.xp} XP</span>
                </div>
                {/* Progress bar */}
                <div className="w-24 bg-zinc-800 h-1.5 mt-1 overflow-hidden">
                  <div 
                    className="bg-cyan-500 h-full transition-all duration-500" 
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Notifications Button */}
            <button 
              onClick={() => setActiveTab('workshops')}
              className="relative p-2.5 bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-cyan-500 transition"
              title="Academy Alerts & Masterclasses"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-[#0A0A0A] px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 overflow-x-auto py-2 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-colors duration-150 ${
                  isActive
                    ? 'bg-cyan-500 text-black shadow-lg font-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 font-mono uppercase tracking-widest ${
                    isActive
                      ? 'bg-black text-cyan-400'
                      : 'bg-zinc-800 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
