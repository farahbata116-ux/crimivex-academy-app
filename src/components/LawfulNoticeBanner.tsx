import React from 'react';
import { Scale, ShieldCheck } from 'lucide-react';

export const LawfulNoticeBanner: React.FC = () => {
  return (
    <div className="bg-[#0B0C0E] border-b border-cyan-500/30 p-4 md:p-6 select-none shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Left info */}
        <div className="flex items-start space-x-3.5 max-w-3xl">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-950 to-black border-2 border-cyan-500/50 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(0,229,255,0.2)]">
            <Scale className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400 font-mono">
                CRIMIVEX ACADEMY DIRECTIVE
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 bg-zinc-900 text-slate-300 border border-slate-700/60 uppercase font-bold">
                Criminology • Criminal Justice • Forensic Science • Cybersecurity
              </span>
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              INDEPENDENT PROFESSIONAL EDUCATION & FIELD ACADEMY
            </h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              CRIMIVEX Academy is an independent professional education platform dedicated strictly to <strong>lawful, ethical, and academic instruction</strong> in Criminology, Legal Procedure, Forensic Evidence, and Cybersecurity. All course handbooks, certificates, and student materials carry official CRIMIVEX Academy branding under Lead Instructor <strong>Farah Abdi Hassan</strong>.
            </p>
          </div>
        </div>

        {/* Right Fee Quick Badge */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 shrink-0">
          <div className="bg-zinc-950 border border-cyan-500/30 p-3 text-left font-mono space-y-0.5 shadow-md">
            <span className="text-[9px] text-slate-400 uppercase font-bold block">STUDENT REGISTRATION</span>
            <span className="text-xs font-black text-cyan-400 uppercase">100% FREE (KSh 0)</span>
          </div>

          <div className="bg-zinc-950 border border-slate-700/60 p-3 text-left font-mono space-y-0.5 shadow-md">
            <span className="text-[9px] text-slate-400 uppercase font-bold block">MINI-COURSE TUITION</span>
            <span className="text-xs font-black text-slate-100 uppercase">KSh 3,000 / course</span>
          </div>

          <div className="bg-zinc-950 border border-emerald-500/40 p-3 text-left font-mono space-y-0.5 shadow-md">
            <span className="text-[9px] text-slate-400 uppercase font-bold block">FINANCIAL AID SCHOLARSHIP</span>
            <span className="text-xs font-black text-emerald-400 uppercase">100% FREE WAIVER</span>
          </div>
        </div>

      </div>
    </div>
  );
};
