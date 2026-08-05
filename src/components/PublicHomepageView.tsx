import React, { useState } from 'react';
import { 
  Shield, 
  BookOpen, 
  Award, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  CreditCard, 
  Share2, 
  Copy, 
  Mail, 
  FileText, 
  FlaskConical, 
  Lock, 
  Globe, 
  Check, 
  ChevronRight,
  AlertTriangle,
  Star,
  ExternalLink,
  Gift
} from 'lucide-react';
import { Course } from '../types';

interface PublicHomepageViewProps {
  courses: Course[];
  onNavigateTab: (tab: any) => void;
  onOpenRegister: () => void;
  onSelectCourseEnroll: (course: Course) => void;
  onSelectCourseAid: (course: Course) => void;
}

export const PublicHomepageView: React.FC<PublicHomepageViewProps> = ({
  courses,
  onNavigateTab,
  onOpenRegister,
  onSelectCourseEnroll,
  onSelectCourseAid
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [referralCode, setReferralCode] = useState('CRIM-REF-FARAH-2026');
  const [copiedRef, setCopiedRef] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://crimivex.academy/register?ref=${referralCode}`);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 3000);
  };

  // Core 4 Featured Courses requested
  const featuredCourses = courses.slice(0, 4);

  return (
    <div className="space-y-12 animate-fadeIn text-left font-sans">
      
      {/* 1. Promotional Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-zinc-950 to-black border-2 border-cyan-500/50 p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono shadow-xl">
        <div className="flex items-center space-x-3 text-slate-200">
          <span className="bg-cyan-500 text-black px-2.5 py-1 font-black uppercase text-[10px] tracking-widest shrink-0">
            100% LEARNING SUPPORT PROGRAM
          </span>
          <p className="text-slate-300 font-bold">
            Orphans, Persons with Disabilities (PWD), & Disadvantaged Cadets qualify for <strong>100% Free Training Fee Sponsorship</strong>.
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('admission-aid')}
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase px-4 py-2 text-xs tracking-wider shrink-0 transition flex items-center space-x-1"
        >
          <span>APPLY FOR LEARNING SUPPORT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Hero Section */}
      <div className="bg-[#0B0C0E] border-2 border-cyan-500/40 p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-6">
          
          <div className="inline-flex items-center space-x-2 bg-zinc-950 border border-cyan-500/40 px-3 py-1 font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest">
            <Shield className="w-4 h-4 text-cyan-400 fill-cyan-950/50" />
            <span>CRIMIVEX ACADEMY • OFFICIAL ONLINE TRAINING PLATFORM</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-none">
            INDEPENDENT ONLINE EDUCATION IN <span className="text-cyan-400">CRIMINOLOGY</span> & <span className="text-cyan-400">FORENSICS</span>
          </h1>

          <p className="text-cyan-400 font-mono text-sm md:text-base font-bold uppercase tracking-widest border-l-4 border-cyan-500 pl-4 py-1">
            Criminology • Criminal Justice • Forensic Science • Cybersecurity
          </p>

          <p className="text-slate-300 font-mono text-xs md:text-sm leading-relaxed max-w-3xl">
            Welcome to <strong>CRIMIVEX Academy</strong>—an independent online professional training platform specializing in criminology, criminal justice, forensic science, and cybersecurity. Designed for aspiring legal scholars, forensic investigators, law enforcement officers, and cyber intelligence practitioners worldwide.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onOpenRegister}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-black text-xs md:text-sm uppercase tracking-wider px-8 py-4 shadow-[0_0_20px_rgba(0,229,255,0.4)] transition flex items-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>CREATE ACCOUNT / ENROLL</span>
            </button>

            <button
              onClick={() => onNavigateTab('courses')}
              className="bg-zinc-900 hover:bg-zinc-800 border-2 border-slate-700 hover:border-cyan-500 text-white font-mono font-bold text-xs md:text-sm uppercase tracking-wider px-6 py-4 transition flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>BROWSE TRAINING PROGRAMS</span>
            </button>

            <button
              onClick={() => onNavigateTab('verify-cert')}
              className="bg-zinc-950 hover:bg-slate-900 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-xs uppercase tracking-wider px-5 py-4 transition flex items-center space-x-2"
            >
              <Award className="w-4 h-4" />
              <span>VERIFY CERTIFICATE</span>
            </button>
          </div>

          <div className="pt-6 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-500 text-[10px] block uppercase">ACADEMY MODEL</span>
              <span className="text-white font-black text-base">Online Learning Platform</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block uppercase">FOUNDER & INSTRUCTOR</span>
              <span className="text-cyan-400 font-bold text-base">Farah Abdi Hassan</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block uppercase">CERTIFICATE VERIFICATION</span>
              <span className="text-emerald-400 font-black text-base">Secure Verification System</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block uppercase">LEARNING SUPPORT</span>
              <span className="text-cyan-400 font-black text-base">100% Support Program</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. About CRIMIVEX Highlight Section */}
      <div className="bg-[#111111] border border-slate-800 p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest block">
              INSTITUTIONAL OVERVIEW
            </span>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              ABOUT CRIMIVEX ACADEMY
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('about')}
            className="text-xs font-mono font-bold text-cyan-400 hover:text-white uppercase flex items-center space-x-1"
          >
            <span>LEARN MORE ABOUT FOUNDER</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs md:text-sm text-slate-300 font-mono leading-relaxed">
          CRIMIVEX Academy is positioned as an online professional training academy specializing in criminology, criminal justice, forensic science, and cybersecurity. Founded and led by <strong>Farah Abdi Hassan</strong>, CRIMIVEX delivers text-driven, self-paced academic modules, interactive crime scene investigation laboratories, cold case analysis tasks, and verifiable completion credentials.
        </p>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-zinc-950 p-4 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="text-cyan-400 font-bold flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>TEXT-BASED RIGOR</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              In-depth digital reading modules, criminal statutes, case law precedents, and comprehensive text quizzes.
            </p>
          </div>

          <div className="bg-zinc-950 p-4 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="text-emerald-400 font-bold flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span>100% FREE AID</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Full tuition waivers for Orphans, Persons with Disabilities, and financially disadvantaged students.
            </p>
          </div>

          <div className="bg-zinc-950 p-4 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="text-cyan-400 font-bold flex items-center space-x-2">
              <FlaskConical className="w-4 h-4" />
              <span>FORENSIC LAB SIM</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Interactive physical trace analysis, latent fingerprint powder development, and OSINT digital forensics tool.
            </p>
          </div>

          <div className="bg-zinc-950 p-4 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="text-yellow-400 font-bold flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>VERIFIABLE CREDENTIALS</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Public QR verification ledger preventing transcript fraud with unique document identification codes.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Featured Courses Showcase */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest block">
              ACADEMIC CURRICULUM CATALOG
            </span>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              FEATURED COURSES SHOWCASE
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('courses')}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-black text-xs uppercase px-4 py-2 flex items-center space-x-1"
          >
            <span>VIEW ALL COURSES</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredCourses.map((course) => (
            <div 
              key={course.id}
              className="bg-[#111111] border border-slate-800 hover:border-cyan-500 transition p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="bg-zinc-950 border border-cyan-500/40 text-cyan-400 font-bold px-2.5 py-0.5 uppercase text-[10px]">
                    {course.category}
                  </span>
                  <span className="text-slate-400 font-bold">{course.duration}</span>
                </div>

                <h3 className="text-xl font-black text-white uppercase leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-300 font-mono leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                <div className="bg-zinc-950 p-3 border border-slate-800 font-mono text-xs space-y-1">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Modules: <strong>{course.totalModules || 10} Modules</strong></span>
                    <span>Level: <strong>{course.level}</strong></span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Assessment: <strong>Quizzes & Capstone Exam</strong></span>
                    <span>Instructor: <strong>{course.instructor.name}</strong></span>
                  </div>
                  <div className="pt-1 text-cyan-400 font-bold text-[11px]">
                    Certificate: Official Digital Credential of Completion
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">TRAINING FEE</span>
                  <span className="text-white font-black text-sm">
                    {course.courseFee ? `KSh ${course.courseFee.toLocaleString()}` : 'KSh 3,000'} 
                    <span className="text-[10px] text-cyan-400 font-normal ml-1">(Free with Support)</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onSelectCourseEnroll(course)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase px-4 py-2 text-xs transition"
                  >
                    ENROLL NOW
                  </button>
                  <button
                    onClick={() => onSelectCourseAid(course)}
                    className="bg-zinc-900 border border-slate-700 hover:border-cyan-500 text-cyan-400 font-bold uppercase px-3 py-2 text-xs transition"
                  >
                    APPLY AID
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Why Choose CRIMIVEX & Student Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Why Choose CRIMIVEX */}
        <div className="bg-[#111111] border border-slate-800 p-8 space-y-4">
          <h3 className="text-xl font-black text-white uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            <span>WHY CHOOSE CRIMIVEX ACADEMY?</span>
          </h3>

          <ul className="space-y-4 font-mono text-xs">
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold shrink-0 mt-0.5">
                1
              </div>
              <div>
                <strong className="text-white block text-sm">Text-Based Academic Rigor</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Carefully authored text lectures, statute references, and case analysis modules optimized for thorough comprehension without streaming requirements.
                </p>
              </div>
            </li>

            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold shrink-0 mt-0.5">
                2
              </div>
              <div>
                <strong className="text-white block text-sm">100% Free Financial Aid Policy</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  No deserving student is left behind. Orphans, PWDs, and low-income cadets receive complete fee waivers upon verification.
                </p>
              </div>
            </li>

            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold shrink-0 mt-0.5">
                3
              </div>
              <div>
                <strong className="text-white block text-sm">Interactive Forensic Science Laboratory</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Hands-on digital simulators for physical trace identification, latent fingerprint development, and cyber threat intelligence.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Student Benefits */}
        <div className="bg-[#111111] border border-slate-800 p-8 space-y-4">
          <h3 className="text-xl font-black text-white uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Award className="w-5 h-5 text-cyan-400" />
            <span>STUDENT BENEFITS & CREDENTIALS</span>
          </h3>

          <ul className="space-y-4 font-mono text-xs">
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <strong className="text-white block text-sm">Verifiable Digital Certificates</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Every graduate receives an official CRIMIVEX certificate of completion featuring cryptographic hashes for instant employer verification.
                </p>
              </div>
            </li>

            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <strong className="text-white block text-sm">Gamified XP & Cadet Ranks</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Earn XP, streak badges, and rank advancement from Cadet Level 1 up to Senior Forensic Specialist.
                </p>
              </div>
            </li>

            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <strong className="text-white block text-sm">Direct Instructor Guidance</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Direct contact with Founder & Instructor Farah Abdi Hassan via the online cadet portal.
                </p>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* 6. Marketing Features: Share Links, Referral & Newsletter */}
      <div className="bg-zinc-950 border-2 border-cyan-500/30 p-8 space-y-8 font-mono text-xs">
        <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block">
              COMMUNITY & GROWTH
            </span>
            <h3 className="text-xl font-black text-white uppercase">
              SHARE COURSES & JOIN THE CRIMIVEX NETWORK
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopyLink}
              className="bg-zinc-900 border border-slate-700 hover:border-cyan-500 text-cyan-400 font-bold px-4 py-2 uppercase flex items-center space-x-2 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? 'LINK COPIED!' : 'SHARE ACADEMY LINK'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Referral Link Generator */}
          <div className="bg-[#111111] p-6 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white uppercase flex items-center space-x-2">
              <Gift className="w-5 h-5 text-cyan-400" />
              <span>STUDENT REFERRAL CODE GENERATOR</span>
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Invite fellow cadets to enroll in CRIMIVEX Academy courses. Share your unique referral link to grant them priority financial aid processing.
            </p>

            <div className="bg-zinc-950 p-3 border border-slate-700 flex items-center justify-between">
              <span className="text-cyan-400 font-bold font-mono">CODE: {referralCode}</span>
              <button
                onClick={handleCopyReferral}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-3 py-1 uppercase text-[10px] flex items-center space-x-1"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedRef ? 'COPIED' : 'COPY REFERRAL LINK'}</span>
              </button>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="bg-[#111111] p-6 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white uppercase flex items-center space-x-2">
              <Mail className="w-5 h-5 text-cyan-400" />
              <span>ACADEMY NEWSLETTER SUBSCRIPTION</span>
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Subscribe to receive new course releases, forensic lab updates, and masterclass schedules directly to your inbox.
            </p>

            {newsletterSubscribed ? (
              <div className="bg-emerald-950 border border-emerald-600/40 p-3 text-emerald-400 font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! You are subscribed to CRIMIVEX Academy news.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-zinc-950 border border-slate-700 text-white px-3 py-2 outline-none flex-1 text-xs"
                />
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase px-4 py-2 text-xs"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* 7. Official Legal Notice Banner */}
      <div className="bg-amber-950/30 border-2 border-amber-600/40 p-6 text-amber-200 font-mono text-xs space-y-2">
        <div className="flex items-center space-x-2 font-black text-amber-500 uppercase">
          <AlertTriangle className="w-4 h-4" />
          <span>MANDATORY LEGAL DISCLAIMER & STATUS CONFIRMATION</span>
        </div>
        <p className="text-[11px] leading-relaxed text-amber-200/90 pl-6">
          "CRIMIVEX Academy is an independent online professional training academy offering self-paced short development courses in criminology, criminal justice, forensic science, and cybersecurity. It is not currently an accredited university and does not award degree qualifications unless explicitly recognized by local regulatory bodies."
        </p>
      </div>

    </div>
  );
};
