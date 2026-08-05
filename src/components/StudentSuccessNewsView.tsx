import React, { useState } from 'react';
import { 
  Award, 
  Newspaper, 
  Sparkles, 
  CheckCircle2, 
  Quote, 
  Calendar, 
  User, 
  Tag, 
  Share2, 
  Bell,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

export const StudentSuccessNewsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'success' | 'news'>('success');

  // Testimonials & Cadet Completion Stories
  const cadetTestimonials = [
    {
      id: 'test-1',
      name: 'Cadet James Ochieng',
      badge: 'CRIM-884-VX',
      course: 'CRIM101: Introduction to Criminology',
      completionDate: 'July 2026',
      grade: 'Distinction (96%)',
      financialStatus: '100% Scholarship Aid Graduate',
      quote: 'CRIMIVEX Academy opened doors I thought were closed due to tuition constraints. The text-based lectures and quiz challenges prepared me directly for my security management career.',
      role: 'Private Security Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'test-2',
      name: 'Scholar Amina Hassan',
      badge: 'CRIM-912-VX',
      course: 'Cybersecurity & Threat Intelligence',
      completionDate: 'June 2026',
      grade: 'Distinction (98%)',
      financialStatus: 'Standard Cadet',
      quote: 'Instructor Farah Abdi Hassan’s modules on Threat Intelligence and OSINT investigation provided hands-on, practical insights that I use daily in my IT auditing work.',
      role: 'Junior SOC Analyst',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'test-3',
      name: 'Cadet Emmanuel Kiprop',
      badge: 'CRIM-104-VX',
      course: 'Digital Forensics & Incident Response',
      completionDate: 'August 2026',
      grade: 'Merit (92%)',
      financialStatus: 'PWD Financial Aid Grantee',
      quote: 'The instant certificate verification ledger allowed my employer to verify my credentials in seconds. High quality, accessible, and deeply structured educational platform.',
      role: 'Compliance & Legal Investigator',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    }
  ];

  // Official Announcements & News
  const announcements = [
    {
      id: 'news-1',
      date: 'August 04, 2026',
      category: 'NEW COURSE RELEASE',
      title: 'CRIMIVEX Academy Launches Digital Forensics & OSINT Practical Module',
      author: 'Farah Abdi Hassan (Founder)',
      summary: 'CRIMIVEX Academy is proud to announce the immediate availability of FOR-401 Digital Forensics Basics. Students can now practice memory dump extraction and network packet decoding inside the online simulator.',
      tag: 'Curriculum Update',
      isHighPriority: true
    },
    {
      id: 'news-[#2]',
      date: 'July 28, 2026',
      category: 'SCHOLARSHIP ANNOUNCEMENT',
      title: 'Expanded 100% Free Financial Aid Sponsorship for 2026 Cohort',
      author: 'CRIMIVEX Admissions Board',
      summary: 'In alignment with our founding mission, CRIMIVEX Academy has expanded financial aid funding to guarantee 100% free tuition for all verified orphans and cadets with disabilities across East Africa.',
      tag: 'Financial Aid',
      isHighPriority: false
    },
    {
      id: 'news-3',
      date: 'July 15, 2026',
      category: 'SYSTEM ENHANCEMENT',
      title: 'Public Certificate Verification Ledger System Deployed',
      author: 'Technical Operations',
      summary: 'Employers and academic institutions can now instantly authenticate CRIMIVEX Certificates using unique document serial hashes and direct QR code scans on our verification tab.',
      tag: 'Platform Tech',
      isHighPriority: false
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn text-left font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#0B0C0E] border-2 border-cyan-500/40 p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest mb-2">
              <Award className="w-4 h-4" />
              <span>COMMUNITY & ACADEMY PULSE</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              LEARNER SUCCESS & ACADEMY NEWS
            </h1>
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold mt-1">
              Criminology • Criminal Justice • Forensic Science • Cybersecurity
            </p>
          </div>

          <div className="flex bg-zinc-950 p-1 border border-slate-700 font-mono text-xs">
            <button
              onClick={() => setActiveTab('success')}
              className={`px-4 py-2 font-bold uppercase transition ${
                activeTab === 'success'
                  ? 'bg-cyan-500 text-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LEARNER SUCCESS ({cadetTestimonials.length})
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-4 py-2 font-bold uppercase transition ${
                activeTab === 'news'
                  ? 'bg-cyan-500 text-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ANNOUNCEMENTS ({announcements.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'success' ? (
        <div className="space-y-8">
          
          {/* Metrics summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-[#111111] p-5 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase block">TOTAL PROGRAM COMPLETIONS</span>
              <span className="text-cyan-400 font-black text-2xl">840+ Completed</span>
              <p className="text-slate-400 text-[11px]">Across 10+ professional training tracks</p>
            </div>

            <div className="bg-[#111111] p-5 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase block">SATISFACTION RATING</span>
              <span className="text-emerald-400 font-black text-2xl">99.4% Approval</span>
              <p className="text-slate-400 text-[11px]">Based on verified post-training surveys</p>
            </div>

            <div className="bg-[#111111] p-5 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase block">LEARNING SUPPORT BENEFICIARIES</span>
              <span className="text-cyan-400 font-black text-2xl">380+ Sponsored Learners</span>
              <p className="text-slate-400 text-[11px]">100% Free support awarded to PWDs & Orphans</p>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cadetTestimonials.map((item) => (
              <div 
                key={item.id}
                className="bg-[#111111] border border-slate-800 p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.avatar} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-none border border-cyan-500/40" 
                    />
                    <div>
                      <h3 className="text-sm font-black text-white uppercase">{item.name}</h3>
                      <span className="text-cyan-400 font-mono text-[10px] font-bold block">{item.badge}</span>
                      <span className="text-slate-400 font-mono text-[10px]">{item.role}</span>
                    </div>
                  </div>

                  <div className="bg-zinc-950 p-3 border border-slate-800 font-mono text-[11px] space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>COURSE:</span>
                      <span className="text-white font-bold">{item.course}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>SCORE:</span>
                      <span className="text-emerald-400 font-bold">{item.grade}</span>
                    </div>
                    <div className="text-cyan-400 text-[10px] pt-1">
                      {item.financialStatus}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-mono italic leading-relaxed pt-2">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>COMPLETED: {item.completionDate}</span>
                  <span className="text-emerald-400 flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>VERIFIED CADET</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <div className="space-y-6">
          {announcements.map((news) => (
            <div 
              key={news.id}
              className={`bg-[#111111] border p-6 space-y-3 font-mono text-xs ${
                news.isHighPriority 
                  ? 'border-cyan-500/80 shadow-[0_0_15px_rgba(0,229,255,0.15)]' 
                  : 'border-slate-800'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-bold px-2 py-0.5 text-[10px] uppercase">
                    {news.category}
                  </span>
                  <span className="text-slate-400 text-[11px]">{news.date}</span>
                </div>
                <span className="text-slate-500 text-[10px] uppercase">AUTHOR: {news.author}</span>
              </div>

              <h2 className="text-lg font-black text-white uppercase tracking-tight">
                {news.title}
              </h2>

              <p className="text-slate-300 leading-relaxed">
                {news.summary}
              </p>

              <div className="flex justify-between items-center pt-2">
                <span className="text-cyan-400 text-[10px] font-bold">TAG: #{news.tag}</span>
                <span className="text-slate-500 text-[10px]">CRIMIVEX ACADEMY OFFICIAL PRESS</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
