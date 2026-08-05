import React, { useState } from 'react';
import { CadetProfile, CadetBadge, CertificateRecord } from '../types';
import { CertificateModal } from './CertificateModal';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Flame, 
  Printer, 
  Sparkles,
  BookOpen,
  Calendar,
  Lock
} from 'lucide-react';

interface CadetDossierViewProps {
  cadet: CadetProfile;
  badges: CadetBadge[];
  onNavigateToVerify?: (certId: string) => void;
}

export const CadetDossierView: React.FC<CadetDossierViewProps> = ({ cadet, badges, onNavigateToVerify }) => {
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  const sampleCertRecord: CertificateRecord = {
    certId: `CRIM-CERT-${cadet.badgeNumber || '2026-101'}`,
    studentName: cadet.name,
    studentBadge: cadet.badgeNumber,
    courseCode: 'CRIM101',
    courseTitle: 'CRIM101 – Introduction to Criminology and Criminal Justice',
    issueDate: 'August 04, 2026',
    grade: 'Distinction (Score: 100%)',
    modulesCompleted: 10,
    verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    status: 'Valid',
    instructorName: 'Farah Abdi Hassan',
    instructorTitle: 'Founder & Lead Instructor, CRIMIVEX Academy'
  };

  const xpPercent = Math.min(100, Math.round((cadet.xp / cadet.nextRankXp) * 100));

  return (
    <div className="space-y-6">

      {/* Profile Dossier Header Card */}
      <div className="bg-zinc-900 border border-white/10 p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-red-600 p-1 flex items-center justify-center">
              <div className="w-full h-full bg-black flex flex-col items-center justify-center">
                <span className="text-white font-black text-2xl font-mono">L{cadet.level}</span>
                <span className="text-[9px] font-mono font-bold uppercase text-red-500 tracking-widest">LEVEL</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-black px-3 py-1 bg-red-600 text-white uppercase tracking-widest">
                  {cadet.badgeNumber}
                </span>
                <span className="text-xs text-zinc-400 font-mono">{cadet.email}</span>
              </div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                {cadet.name}
              </h1>
              <p className="text-xs text-red-500 font-mono font-black uppercase tracking-widest">
                RANK: {cadet.rank}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCertificateModal(true)}
              className="px-6 py-3 bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest flex items-center space-x-2 transition"
            >
              <Printer className="w-4 h-4" />
              <span>GENERATE OFFICIAL CERTIFICATE</span>
            </button>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="bg-black p-4 border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-zinc-400 uppercase font-bold">Academy Experience Points (XP)</span>
            <span className="font-black text-red-500">{cadet.xp} / {cadet.nextRankXp} XP ({xpPercent}%)</span>
          </div>
          <div className="w-full bg-zinc-800 h-3 overflow-hidden border border-white/10">
            <div
              className="bg-red-600 h-full transition-all duration-500"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'CASES SOLVED', value: cadet.solvedCasesCount, sub: 'Cold Case Solves', icon: <CheckCircle2 className="w-5 h-5 text-red-500" /> },
          { label: 'QUIZ ACCURACY', value: `${cadet.accuracyRate}%`, sub: 'First Attempt Rate', icon: <Zap className="w-5 h-5 text-red-500" /> },
          { label: 'ACTIVE STREAK', value: `${cadet.streakDays} DAYS`, sub: 'Daily Training', icon: <Flame className="w-5 h-5 text-red-500" /> },
          { label: 'BADGES UNLOCKED', value: `${badges.filter((b) => b.unlocked).length} / ${badges.length}`, sub: 'Achievements', icon: <Award className="w-5 h-5 text-red-500" /> },
        ].map((m, idx) => (
          <div key={idx} className="bg-zinc-900 border border-white/10 p-5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-400 font-mono uppercase font-black tracking-widest">{m.label}</span>
              {m.icon}
            </div>
            <p className="text-2xl font-black text-white uppercase tracking-tight">{m.value}</p>
            <p className="text-[10px] text-zinc-500 font-mono uppercase">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Competency Skill Domain Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-zinc-900 border border-white/10 p-6 space-y-4 shadow-xl">
          <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/10 pb-3">
            FORENSIC COMPETENCY BREAKDOWN
          </h3>

          <div className="space-y-3 font-mono">
            {[
              { label: 'CRIME SCENE PRESERVATION & CSI', val: cadet.radarStats.forensicScience },
              { label: 'CYBER FORENSICS & OSINT', val: cadet.radarStats.cyberOsint },
              { label: 'LEGAL EVIDENCE RULES & PRECEDENT', val: cadet.radarStats.legalKnowledge },
              { label: 'BEHAVIORAL PROFILING & PSYCHOLOGY', val: cadet.radarStats.profiling },
              { label: 'EVIDENCE CHAIN OF CUSTODY', val: cadet.radarStats.evidenceHandling },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300 font-bold">{stat.label}</span>
                  <span className="font-black text-red-500">{stat.val}%</span>
                </div>
                <div className="w-full bg-black h-2 overflow-hidden border border-white/10">
                  <div
                    className="bg-red-600 h-full"
                    style={{ width: `${stat.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Grid */}
        <div className="lg:col-span-6 bg-zinc-900 border border-white/10 p-6 space-y-4 shadow-xl">
          <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/10 pb-3">
            ACADEMY INSIGNIA & MEDALS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-4 border text-xs flex items-start space-x-3 transition ${
                  b.unlocked
                    ? 'bg-red-600/10 border-red-600 text-white'
                    : 'bg-black border-white/10 text-zinc-500 opacity-60'
                }`}
              >
                <div className="mt-0.5">
                  {b.unlocked ? (
                    <ShieldCheck className="w-5 h-5 text-red-500" />
                  ) : (
                    <Lock className="w-5 h-5 text-zinc-600" />
                  )}
                </div>
                <div>
                  <p className="font-black uppercase tracking-wider">{b.title}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5 font-light">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Certificate Modal */}
      {showCertificateModal && (
        <CertificateModal
          certificate={sampleCertRecord}
          onClose={() => setShowCertificateModal(false)}
          onNavigateToVerify={onNavigateToVerify}
        />
      )}

    </div>
  );
};
