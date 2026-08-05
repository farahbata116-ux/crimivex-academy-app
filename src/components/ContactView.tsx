import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  HelpCircle, 
  CheckCircle2, 
  Globe, 
  Shield, 
  User,
  ExternalLink
} from 'lucide-react';
import { FaqSection } from './FaqSection';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 5000);
  };

  return (
    <div className="space-y-12 animate-fadeIn text-left">
      {/* Header */}
      <div className="bg-[#111111] border border-cyan-500/40 p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest mb-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>ACADEMY COMMUNICATIONS & HELP DESK</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              CONTACT & LEARNER SUPPORT
            </h1>
            <p className="text-slate-300 text-xs font-mono mt-2 max-w-3xl leading-relaxed">
              Have questions about program admissions, 100% Free Learning Support, certificate verification, or academic mentorship? Our support desk is ready to assist.
            </p>
          </div>
          <div className="bg-zinc-950 border border-slate-800 p-4 font-mono text-xs space-y-1 text-right">
            <span className="text-slate-500 text-[10px] block uppercase">RESPONSE TIME</span>
            <span className="text-emerald-400 font-bold block">WITHIN 24 HOURS</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-[#111111] border border-slate-800 p-8 space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-black text-white uppercase tracking-wider">
              SEND ACADEMY SUPPORT MESSAGE
            </h2>
          </div>

          {submitted ? (
            <div className="bg-emerald-950/40 border-2 border-emerald-500/50 p-6 text-center space-y-3 font-mono animate-fadeIn">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-black text-white uppercase">MESSAGE RECEIVED BY ACADEMY SECRETARIAT</h3>
              <p className="text-xs text-emerald-200/90 max-w-md mx-auto">
                Thank you for reaching out. Founder & Lead Instructor Farah Abdi Hassan and the academic support team will reply to your email within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1.5">YOUR FULL NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.G. FARAH ABDI"
                    className="w-full bg-zinc-950 border border-slate-700 px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1.5">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="E.G. CADET@EXAMPLE.COM"
                    className="w-full bg-zinc-950 border border-slate-700 px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1.5">SUBJECT / CATEGORY</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-zinc-950 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Course Admission & Fees">Course Admission & Fees</option>
                  <option value="Financial Aid Sponsorship Application">Learning Support Program Application</option>
                  <option value="Certificate Verification Assistance">Certificate Verification Assistance</option>
                  <option value="Academic Mentorship with Instructor Farah">Academic Mentorship with Instructor Farah</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1.5">YOUR MESSAGE *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="PLEASE DESCRIBE YOUR INQUIRY IN DETAIL..."
                  className="w-full bg-zinc-950 border border-slate-700 px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-widest py-3 border border-cyan-400 transition flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT MESSAGE TO ACADEMY</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & Channels */}
        <div className="space-y-6">
          <div className="bg-[#111111] border border-slate-800 p-6 space-y-6 font-mono text-xs">
            <h3 className="text-base font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>DIRECT CONTACT CHANNELS</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase font-bold">LEARNER SUPPORT EMAIL</span>
                  <a href="mailto:farahbata116@gmail.com" className="text-white hover:text-cyan-400 font-bold block transition">
                    farahbata116@gmail.com
                  </a>
                  <span className="text-slate-400 text-[10px]">support@crimivex.academy</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase font-bold">WHATSAPP / HELPLINE</span>
                  <span className="text-white font-bold block">+254 700 000 000</span>
                  <span className="text-slate-400 text-[10px]">Mon–Fri: 08:00 – 17:00 EAT</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase font-bold">ACADEMY HEADQUARTERS</span>
                  <span className="text-white font-bold block">CRIMIVEX Academy Secretariat</span>
                  <span className="text-slate-400 text-[10px]">Independent Online Education Platform</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <User className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase font-bold">FOUNDER & INSTRUCTOR</span>
                  <span className="text-white font-bold block">Farah Abdi Hassan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-[#111111] border border-slate-800 p-6 space-y-4 font-mono text-xs">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center space-x-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>ACADEMIC COMMUNITY LINKS</span>
            </h4>
            <div className="space-y-2">
              <a 
                href="#forum" 
                onClick={(e) => e.preventDefault()}
                className="flex items-center justify-between p-2.5 bg-zinc-950 hover:border-cyan-500 border border-slate-800 text-slate-300 hover:text-white transition"
              >
                <span>Learner Discussion Forum</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>
              <a 
                href="#linkedin" 
                onClick={(e) => e.preventDefault()}
                className="flex items-center justify-between p-2.5 bg-zinc-950 hover:border-cyan-500 border border-slate-800 text-slate-300 hover:text-white transition"
              >
                <span>LinkedIn Learning Network</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Categorized Section */}
      <FaqSection />
    </div>
  );
};

