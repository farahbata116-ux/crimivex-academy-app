import React from 'react';
import { 
  Shield, 
  Target, 
  Compass, 
  Award, 
  BookOpen, 
  User, 
  CheckCircle2, 
  AlertTriangle,
  FileCheck,
  Lock,
  GraduationCap,
  Scale
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn text-left">
      {/* Page Header */}
      <div className="bg-[#0B0C0E] border-2 border-cyan-500/40 p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest mb-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>OFFICIAL ACADEMY OVERVIEW & PROFILE</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              CRIMIVEX ACADEMY PROFILE
            </h1>
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold mt-1">
              Criminology • Criminal Justice • Forensic Science • Cybersecurity
            </p>
            <p className="text-slate-300 text-sm font-mono mt-2 max-w-3xl leading-relaxed">
              To provide accessible, ethical, and professional learning in criminology, criminal justice, forensic science, and cybersecurity through modern digital education.
            </p>
          </div>
          <div className="bg-zinc-950 border border-cyan-500/30 p-4 font-mono text-xs space-y-1 text-right shadow-md">
            <span className="text-slate-400 text-[10px] block uppercase">FOUNDER & LEAD INSTRUCTOR</span>
            <span className="text-white font-bold block text-sm">FARAH ABDI HASSAN</span>
            <span className="text-cyan-400 text-[10px] block uppercase font-bold">farahbata116@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Official Academy Profile Grid Card */}
      <div className="bg-[#111111] border-2 border-cyan-500/40 p-8 space-y-6 shadow-xl font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              ACADEMY PROFILE & OPERATIONAL STRUCTURE
            </h2>
          </div>
          <span className="bg-cyan-500 text-black px-3 py-1 font-black text-xs uppercase tracking-widest">
            OFFICIAL PROFILE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">ACADEMY NAME & TYPE</span>
            <h3 className="text-base font-black text-white uppercase">CRIMIVEX Academy</h3>
            <span className="inline-block bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 font-bold uppercase text-[10px]">
              Online Learning Platform
            </span>
          </div>

          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">FOCUS AREAS</span>
            <p className="text-cyan-400 font-bold uppercase text-xs">
              Criminology • Criminal Justice • Forensic Science • Cybersecurity
            </p>
          </div>

          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">FOUNDER & INSTRUCTOR</span>
            <h3 className="text-base font-black text-white uppercase">Farah Abdi Hassan</h3>
            <span className="text-slate-400 text-[10px] block">Lead Academic Faculty & Director</span>
          </div>

          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">TRAINING PROGRAMS</span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Professional short courses, certificate programs, and digital learning opportunities designed to provide practical knowledge and career-focused skills.
            </p>
          </div>

          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">LEARNING MODEL</span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Online education with structured modules, assessments, learning resources, and student support.
            </p>
          </div>

          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">CERTIFICATE VERIFICATION</span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Secure certificate validation system to support authenticity and verification of issued certificates.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-zinc-950 border-l-4 border-cyan-500 p-5 space-y-2">
          <span className="text-cyan-400 font-bold uppercase text-[11px] block">OUR MISSION</span>
          <p className="text-white text-sm leading-relaxed font-bold">
            "To provide accessible, ethical, and professional learning in criminology, criminal justice, forensic science, and cybersecurity through modern digital education."
          </p>
        </div>
      </div>

      {/* Official Legal & Compliance Section */}
      <div className="bg-[#111111] border-2 border-cyan-500/50 p-8 space-y-8 shadow-2xl font-mono">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
          <div className="flex items-center space-x-3">
            <Scale className="w-7 h-7 text-cyan-400" />
            <div>
              <span className="text-cyan-400 font-bold uppercase text-[10px] tracking-widest block">CRIMIVEX ACADEMY DIRECTIVE</span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                LEGAL & COMPLIANCE
              </h2>
            </div>
          </div>
          <span className="bg-cyan-500 text-black px-3 py-1 font-black text-xs uppercase tracking-widest">
            OFFICIAL TERMS & POLICIES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* About CRIMIVEX Academy */}
          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
              <Shield className="w-4 h-4" />
              <span>About CRIMIVEX Academy</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              CRIMIVEX Academy is an independent online professional training academy that delivers self-paced learning in Criminology, Criminal Justice, Forensic Science, Cybersecurity, and related professional fields.
            </p>
          </div>

          {/* Legal Status */}
          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>Legal Status</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              CRIMIVEX Academy is not currently an accredited university and does not award bachelor's, master's, doctoral, or other academic degree qualifications.
            </p>
            <p className="text-slate-400 leading-relaxed text-[10px] pt-1">
              Certificates issued by CRIMIVEX Academy are Certificates of Completion or Professional Training Certificates for the specific course completed. They are not government-recognized academic degrees unless expressly authorized by the relevant regulatory authority.
            </p>
          </div>

          {/* Educational Purpose */}
          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
              <GraduationCap className="w-4 h-4" />
              <span>Educational Purpose</span>
            </div>
            <p className="text-slate-400 text-[10px] uppercase font-bold">Our courses are designed to:</p>
            <ul className="text-slate-300 text-[11px] space-y-1.5 pl-2 border-l-2 border-cyan-500">
              <li>• Build professional knowledge and practical skills.</li>
              <li>• Support continuing professional development (CPD).</li>
              <li>• Promote lifelong learning.</li>
              <li>• Prepare learners for further study and career development.</li>
            </ul>
          </div>

          {/* Academic Integrity */}
          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
            <div className="flex items-center space-x-2 text-red-400 font-bold text-xs uppercase">
              <FileCheck className="w-4 h-4" />
              <span>Academic Integrity</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Learners are expected to complete all coursework honestly and ethically. Academic misconduct, including plagiarism, cheating, or certificate fraud, may result in suspension or permanent removal from the Academy.
            </p>
          </div>

          {/* Intellectual Property */}
          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
              <Lock className="w-4 h-4" />
              <span>Intellectual Property</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              All course materials, videos, assessments, logos, certificates, and learning resources are the intellectual property of CRIMIVEX Academy unless otherwise stated. Unauthorized copying, distribution, or commercial use is prohibited.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
            <div className="flex items-center space-x-2 text-slate-300 font-bold text-xs uppercase">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Limitation of Liability</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              CRIMIVEX Academy makes reasonable efforts to provide accurate and up-to-date educational content. However, the Academy does not guarantee employment, professional licensing, admission to other institutions, or legal recognition of certificates by third parties.
            </p>
          </div>

          {/* Privacy */}
          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2 md:col-span-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
              <Lock className="w-4 h-4" />
              <span>Privacy</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              The Academy collects only the information necessary to provide educational services and protect user accounts. Personal information is handled in accordance with the Academy's Privacy Policy.
            </p>
          </div>

        </div>

        {/* Acceptance Notice */}
        <div className="bg-cyan-950/40 border border-cyan-500/50 p-4 text-cyan-300 text-xs font-bold uppercase tracking-wider text-center">
          ACCEPTANCE: By creating an account or using the CRIMIVEX Academy app, you acknowledge that you have read, understood, and agreed to these Legal & Compliance terms.
        </div>
      </div>

      {/* Mandatory Legal Disclaimer Banner */}
      <div className="bg-amber-950/40 border-2 border-amber-600/50 p-6 text-amber-100 space-y-3">
        <div className="flex items-center space-x-3 text-amber-500 font-black text-sm uppercase tracking-wider">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span>OFFICIAL LEGAL DISCLAIMER & ACADEMIC NOTICE</span>
        </div>
        <p className="text-xs md:text-sm font-mono leading-relaxed text-amber-200/90 pl-8">
          "CRIMIVEX Academy is an independent online education and professional training platform. Courses provide skills development and professional learning. Certificates issued by CRIMIVEX Academy are certificates of completion and are not equivalent to government-accredited diplomas or degrees unless formally recognized by relevant authorities."
        </p>
      </div>

      {/* Mission, Vision & Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mission */}
        <div className="bg-[#111111] border border-white/10 p-6 space-y-4 hover:border-red-600/50 transition">
          <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-wider">OUR MISSION</h3>
          <p className="text-xs text-zinc-400 font-mono leading-relaxed">
            To deliver structured, high-quality, text-based professional education in criminology, forensic science, and cybersecurity—democratizing access for aspiring investigators, legal scholars, and IT security professionals regardless of financial background.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-[#111111] border border-white/10 p-6 space-y-4 hover:border-red-600/50 transition">
          <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-wider">OUR VISION</h3>
          <p className="text-xs text-zinc-400 font-mono leading-relaxed">
            To become a premier independent online academy recognized globally for equipping cadets with analytical rigor, ethical forensic practices, and digital intelligence capabilities needed in modern justice systems.
          </p>
        </div>

        {/* Values */}
        <div className="bg-[#111111] border border-white/10 p-6 space-y-4 hover:border-red-600/50 transition">
          <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-wider">CORE VALUES</h3>
          <ul className="text-xs text-zinc-400 font-mono space-y-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              <span><strong>Integrity:</strong> Unwavering ethical standards in evidence & analysis.</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              <span><strong>Accessibility:</strong> 100% Free aid for orphans & disadvantaged students.</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              <span><strong>Rigor:</strong> Comprehensive, text-based digital notes & quizzes.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Founder & Instructor Profile */}
      <div className="bg-[#111111] border border-white/10 p-8 space-y-8 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              FOUNDER & INSTRUCTOR PROFILE
            </h2>
          </div>
          <span className="text-xs font-mono bg-red-600 text-white px-3 py-1 font-bold uppercase tracking-widest">
            LEAD ACADEMIC FACULTY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Instructor Image & Quick Meta */}
          <div className="space-y-4">
            <div className="relative border border-white/20 overflow-hidden bg-zinc-900 group">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                alt="Farah Abdi Hassan - Founder & Instructor"
                className="w-full h-80 object-cover object-top grayscale hover:grayscale-0 transition duration-500"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
                <h3 className="text-xl font-black text-white uppercase tracking-wider">FARAH ABDI HASSAN</h3>
                <p className="text-xs font-mono text-red-500 font-bold uppercase tracking-wider">Founder & Lead Instructor</p>
              </div>
            </div>

            <div className="bg-zinc-900 border border-white/10 p-4 space-y-2 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-500 uppercase">ACADEMY ROLE</span>
                <span className="text-white font-bold">Founder & Director</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-500 uppercase">CONTACT EMAIL</span>
                <span className="text-red-400 font-bold">farahbata116@gmail.com</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-500 uppercase">STUDENTS MENTORED</span>
                <span className="text-white font-bold">1,400+ Global Cadets</span>
              </div>
            </div>
          </div>

          {/* Specialization & Biography */}
          <div className="md:col-span-2 space-y-6">
            {/* Specialization Badges */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                CORE ACADEMIC SPECIALIZATIONS
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-zinc-900 border border-red-600/40 text-red-400 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider">
                  Criminology Theory & Behavior
                </span>
                <span className="bg-zinc-900 border border-red-600/40 text-red-400 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider">
                  Criminal Justice Systems
                </span>
                <span className="bg-zinc-900 border border-red-600/40 text-red-400 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider">
                  Forensic Science Fundamentals
                </span>
                <span className="bg-zinc-900 border border-red-600/40 text-red-400 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider">
                  Cybersecurity Education & OSINT
                </span>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-red-500" />
                <span>INSTRUCTOR BIOGRAPHY</span>
              </h4>
              <p className="text-xs text-zinc-300 font-mono leading-relaxed bg-zinc-900/60 p-4 border border-white/5">
                Farah Abdi Hassan is the visionary Founder & Lead Instructor of CRIMIVEX Academy. Driven by a passion for accessible legal literacy, forensic truth, and cyber threat awareness, Farah established CRIMIVEX Academy as an independent, text-focused professional learning platform. With extensive background in criminology theories, criminal law frameworks, and digital footprint analysis, Farah designs comprehensive reading curricula, interactive case simulations, and evidence documentation standards.
              </p>
            </div>

            {/* Academic Background & Professional Certificates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Academic Background */}
              <div className="bg-zinc-900 border border-white/10 p-4 space-y-3">
                <div className="flex items-center space-x-2 text-white font-black text-xs uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-red-500" />
                  <span>ACADEMIC BACKGROUND</span>
                </div>
                <ul className="text-[11px] font-mono text-zinc-400 space-y-2">
                  <li className="border-l-2 border-red-600 pl-2">
                    <strong className="text-zinc-200 block">Advanced Studies in Criminology</strong>
                    Focus on crime causation theories, criminal profiling, and societal deterrence models.
                  </li>
                  <li className="border-l-2 border-red-600 pl-2">
                    <strong className="text-zinc-200 block">Criminal Law & Due Process</strong>
                    Specializing in rules of evidence, chain of custody protocols, and legal ethics.
                  </li>
                </ul>
              </div>

              {/* Professional Certificates */}
              <div className="bg-zinc-900 border border-white/10 p-4 space-y-3">
                <div className="flex items-center space-x-2 text-white font-black text-xs uppercase tracking-wider">
                  <FileCheck className="w-4 h-4 text-red-500" />
                  <span>PROFESSIONAL CERTIFICATIONS</span>
                </div>
                <ul className="text-[11px] font-mono text-zinc-400 space-y-2">
                  <li className="border-l-2 border-red-600 pl-2">
                    <strong className="text-zinc-200 block">Certified Forensic Evidence Specialist</strong>
                    Expertise in physical trace analysis, latent prints, and scene cordoning.
                  </li>
                  <li className="border-l-2 border-red-600 pl-2">
                    <strong className="text-zinc-200 block">Cyber Intelligence & OSINT Analyst</strong>
                    Specializing in digital forensics headers, OSINT investigations, and threat intelligence.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
