import React, { useState } from 'react';
import { CadetProfile, FinancialStatusCategory } from '../types';
import { 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Upload, 
  CheckCircle2, 
  X, 
  HeartHandshake,
  Award,
  Sparkles
} from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  cadet: CadetProfile;
  onRegister: (updatedProfile: Partial<CadetProfile>, doc?: { docName: string; docType: any }) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  cadet,
  onRegister,
}) => {
  const [name, setName] = useState(cadet.name || '');
  const [email, setEmail] = useState(cadet.email || '');
  const [phone, setPhone] = useState(cadet.phone || '');
  const [nationalId, setNationalId] = useState(cadet.nationalId || '');
  const [financialStatus, setFinancialStatus] = useState<FinancialStatusCategory>(cadet.financialStatus || 'Standard Cadet');
  const [docType, setDocType] = useState<'Disability Card' | 'Orphan Status Certificate' | 'Financial Hardship Letter' | 'Government Admin Recommendation'>('Financial Hardship Letter');
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docName, setDocName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDocFile(file);
      setDocName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const isFreeAid = financialStatus !== 'Standard Cadet';
      const newDoc = docName ? { docName, docType } : undefined;

      onRegister(
        {
          name,
          email,
          phone,
          nationalId,
          financialStatus,
          isRegistered: true,
          registrationDate: new Date().toISOString().split('T')[0],
          badgeNumber: cadet.badgeNumber || `CRIM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        },
        newDoc
      );

      setIsSubmitting(false);
      setStep('success');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-white/20 max-w-xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xs font-mono font-black uppercase flex items-center space-x-1"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div className="space-y-2 border-b border-cyan-500/30 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 bg-cyan-950 border border-cyan-500/50 text-cyan-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-cyan-400 font-mono font-black uppercase tracking-widest block">
                    CRIMIVEX ACADEMY • OFFICIAL ENROLLMENT FORM
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    Criminology • Criminal Justice • Forensic Science • Cybersecurity
                  </span>
                </div>
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight pt-1">
                FREE STUDENT CADET REGISTRATION
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Registration at CRIMIVEX Academy is <strong>100% FREE</strong>. Create your official student cadet profile to access text-based digital course readers, handbooks, and apply for financial aid.
              </p>
            </div>

            {/* General Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-zinc-400 font-bold">FULL STUDENT NAME *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Farah Abdi Hassan"
                    className="w-full bg-black border border-white/10 pl-9 pr-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-zinc-400 font-bold">EMAIL ADDRESS *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cadet@crimivex.academy"
                    className="w-full bg-black border border-white/10 pl-9 pr-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-zinc-400 font-bold">PHONE NUMBER</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 700 000 000"
                    className="w-full bg-black border border-white/10 pl-9 pr-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-zinc-400 font-bold">NATIONAL ID / STUDENT NO.</label>
                <input
                  type="text"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  placeholder="ID or Index Number"
                  className="w-full bg-black border border-white/10 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            {/* Financial Status & Sponsorship Category */}
            <div className="bg-black/60 border border-white/10 p-4 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-black text-red-500 uppercase tracking-widest font-mono">
                <HeartHandshake className="w-4 h-4" />
                <span>TUITION & FINANCIAL ASSISTANCE CATEGORY</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Design registration is <strong>FREE</strong>. Standard mini-courses are KSh 3,000 and KSh 2,000 for verified certificates. 
                <span className="text-emerald-400 font-bold"> Orphans, persons with disabilities (PWD), or financially disadvantaged students receive 100% FREE courses & certificates upon document verification.</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {[
                  { id: 'Standard Cadet', label: 'Standard Cadet', sub: 'Course 3,000sh • Cert 2,000sh' },
                  { id: 'Orphan Student', label: 'Orphan Student', sub: '100% FREE Sponsorship' },
                  { id: 'Person with Disability (PWD)', label: 'Disability / PWD', sub: '100% FREE Sponsorship' },
                  { id: 'Financially Disadvantaged', label: 'Financially Disadvantaged', sub: '100% FREE Sponsorship' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setFinancialStatus(item.id as FinancialStatusCategory)}
                    className={`p-3 text-left border text-xs transition ${
                      financialStatus === item.id
                        ? 'bg-red-600 border-red-500 text-white font-bold'
                        : 'bg-zinc-900 border-white/10 text-zinc-300 hover:border-red-600/50'
                    }`}
                  >
                    <p className="font-black uppercase tracking-wider">{item.label}</p>
                    <p className="text-[10px] opacity-80 mt-0.5 font-mono">{item.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Document Verification Upload (If applying for aid) */}
            {financialStatus !== 'Standard Cadet' && (
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-black text-emerald-400 uppercase tracking-wider font-mono">
                  <FileText className="w-4 h-4" />
                  <span>SUPPORTING DOCUMENT UPLOAD FOR 100% FREE WAIVER</span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  Please attach supporting proof (e.g., Disability ID Card, Guardian Death Certificate, Local Administrator Recommendation, or Hardship Letter) to qualify for 100% free tuition & certificates.
                </p>

                <div className="space-y-2">
                  <select
                    value={docType}
                    onChange={(e: any) => setDocType(e.target.value)}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Financial Hardship Letter">Financial Hardship Letter</option>
                    <option value="Disability Card">Disability Card / PWD Certificate</option>
                    <option value="Orphan Status Certificate">Orphan Status Certificate / Death Cert</option>
                    <option value="Government Admin Recommendation">Local Chief / Admin Recommendation</option>
                  </select>

                  <div className="relative border border-dashed border-emerald-500/50 bg-black/60 p-4 text-center cursor-pointer hover:bg-black transition">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-6 h-6 mx-auto text-emerald-400 mb-1" />
                    <p className="text-xs font-mono text-emerald-300 uppercase font-bold">
                      {docName ? `Attached: ${docName}` : 'CLICK TO UPLOAD VERIFICATION DOCUMENT'}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-mono">PDF, PNG, JPG or DOC (Max 10MB)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-widest"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest transition flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <span>REGISTERING CADET...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>COMPLETE FREE REGISTRATION</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Registration Success Screen */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 bg-red-600 text-white rounded-none flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-black uppercase text-red-500 tracking-widest">
                REGISTRATION CONFIRMED
              </span>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                WELCOME TO CRIMIVEX ACADEMY
              </h2>
              <p className="text-xs text-zinc-400 max-w-md mx-auto font-mono">
                Your Cadet ID has been generated: <strong className="text-white">{cadet.badgeNumber}</strong>. 
                {financialStatus !== 'Standard Cadet' ? (
                  <span className="text-emerald-400 font-bold block mt-2">
                    ✓ Document proof ({docType}) received for verification! Your 100% Free Financial Aid Sponsorship is active.
                  </span>
                ) : (
                  <span className="block mt-2 text-zinc-300">
                    You can now browse mini-courses (3,000 sh) and request completion certificates (2,000 sh).
                  </span>
                )}
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest transition"
            >
              BROWSE MINI-COURSES CATALOG NOW
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
