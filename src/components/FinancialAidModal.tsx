import React, { useState } from 'react';
import { Course, CadetProfile, FinancialStatusCategory } from '../types';
import { 
  HeartHandshake, 
  Upload, 
  FileCheck, 
  CheckCircle2, 
  X, 
  ShieldAlert, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface FinancialAidModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  cadet: CadetProfile;
  onApplyAid: (courseId: string, status: FinancialStatusCategory, docName: string, docType: string, reason: string) => void;
}

export const FinancialAidModal: React.FC<FinancialAidModalProps> = ({
  isOpen,
  onClose,
  course,
  cadet,
  onApplyAid,
}) => {
  const [category, setCategory] = useState<FinancialStatusCategory>(
    cadet.financialStatus !== 'Standard Cadet' ? cadet.financialStatus : 'Orphan Student'
  );
  const [docType, setDocType] = useState<'Disability Card' | 'Orphan Status Certificate' | 'Financial Hardship Letter' | 'Government Admin Recommendation'>('Financial Hardship Letter');
  const [docName, setDocName] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen || !course) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDoc = docName || `Verification_Proof_${category.replace(/\s+/g, '_')}.pdf`;
    onApplyAid(course.id, category, finalDoc, docType, reason);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-emerald-500/50 max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xs font-mono font-black uppercase flex items-center space-x-1"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div className="space-y-2 border-b border-cyan-500/30 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 bg-cyan-950 border border-cyan-500/50 text-cyan-400 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="text-[10px] text-cyan-400 font-mono font-black uppercase tracking-widest block">
                    CRIMIVEX ACADEMY • SCHOLARSHIP & AID FORM
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    Criminology • Criminal Justice • Forensic Science • Cybersecurity
                  </span>
                </div>
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight pt-1">
                DOCUMENT VERIFICATION & 100% FEE WAIVER
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                CRIMIVEX Academy guarantees <strong>100% FREE tuition (3,000 sh waiver) and certificates (2,000 sh waiver)</strong> for Orphans, Persons with Disabilities (PWD), or Financially Disadvantaged students upon document review.
              </p>
            </div>

            {/* Selected Course Banner */}
            <div className="bg-black/80 border border-white/10 p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-black">APPLYING AID FOR:</span>
                <p className="text-xs font-black text-white uppercase truncate max-w-[280px]">{course.title}</p>
              </div>
              <span className="text-xs font-black px-2.5 py-1 bg-emerald-600 text-white uppercase font-mono tracking-widest">
                100% FREE
              </span>
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-zinc-300 font-bold">SELECT YOUR ASSISTANCE CATEGORY *</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'Orphan Student', label: 'Orphan Student', desc: 'Parent/Guardian death cert or orphan status verification document required.' },
                  { id: 'Person with Disability (PWD)', label: 'Person with Disability (PWD)', desc: 'National Disability Council ID Card or medical certificate required.' },
                  { id: 'Financially Disadvantaged', label: 'Financially Disadvantaged', desc: 'Financial hardship letter or local chief/admin recommendation required.' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id as FinancialStatusCategory)}
                    className={`p-3 text-left border text-xs transition ${
                      category === cat.id
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-black border-white/10 text-zinc-400 hover:border-emerald-500/50'
                    }`}
                  >
                    <p className="font-black uppercase tracking-wider">{cat.label}</p>
                    <p className="text-[10px] opacity-80 mt-0.5 font-mono">{cat.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Document Type & Upload */}
            <div className="space-y-3 pt-1">
              <label className="text-[10px] font-mono uppercase text-zinc-300 font-bold">DOCUMENT PROOF TYPE *</label>
              <select
                value={docType}
                onChange={(e: any) => setDocType(e.target.value)}
                className="w-full bg-black border border-white/10 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Financial Hardship Letter">Financial Hardship Letter</option>
                <option value="Disability Card">Disability Card / PWD Certificate</option>
                <option value="Orphan Status Certificate">Orphan Status Certificate / Guardian Death Cert</option>
                <option value="Government Admin Recommendation">Local Chief / Administrator Recommendation</option>
              </select>

              <div className="relative border border-dashed border-emerald-500/60 bg-black p-4 text-center cursor-pointer hover:bg-emerald-950/20 transition">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-7 h-7 mx-auto text-emerald-400 mb-2" />
                <p className="text-xs font-mono text-emerald-300 uppercase font-black">
                  {docName ? `DOCUMENT ATTACHED: ${docName}` : 'CLICK OR DRAG DOCUMENT TO ATTACH PROOF'}
                </p>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">Scanned Copy or Photo of Certificate / Card (PDF, PNG, JPG)</p>
              </div>
            </div>

            {/* Brief Statement */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-zinc-300 font-bold">ADDITIONAL STATEMENT / NOTES (OPTIONAL)</label>
              <textarea
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly state any context for the review team..."
                className="w-full bg-black border border-white/10 p-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white text-xs font-mono uppercase"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-emerald-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest transition flex items-center space-x-2"
              >
                <FileCheck className="w-4 h-4" />
                <span>SUBMIT FOR 100% FREE ENROLLMENT</span>
              </button>
            </div>
          </form>
        ) : (
          /* Submission Confirmation */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-none flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-black uppercase text-emerald-400 tracking-widest">
                VERIFICATION DOCUMENT RECEIVED & APPROVED
              </span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                100% FREE ENROLLMENT GRANTED
              </h2>
              <p className="text-xs text-zinc-300 font-mono max-w-md mx-auto leading-relaxed">
                Thank you, cadet. We have logged your document <strong className="text-emerald-400">{docName || 'Verification Proof'}</strong> under category <strong className="text-white">{category}</strong>. Your tuition fee (3,000 sh) and certificate fee (2,000 sh) are fully waived!
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-emerald-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest transition"
            >
              ACCESS ENROLLED COURSE SYLLABUS NOW
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
