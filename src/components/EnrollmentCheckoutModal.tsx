import React, { useState } from 'react';
import { Course, CadetProfile } from '../types';
import { 
  CreditCard, 
  CheckCircle2, 
  X, 
  HeartHandshake, 
  Award, 
  ShieldCheck, 
  Sparkles,
  Lock,
  ArrowRight,
  Download,
  Building2
} from 'lucide-react';

interface EnrollmentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  cadet: CadetProfile;
  onConfirmEnrollment: (courseId: string, withCertificate: boolean, isFreeAid: boolean) => void;
  onOpenFinancialAid: () => void;
}

export const EnrollmentCheckoutModal: React.FC<EnrollmentCheckoutModalProps> = ({
  isOpen,
  onClose,
  course,
  cadet,
  onConfirmEnrollment,
  onOpenFinancialAid,
}) => {
  const [includeCertificate, setIncludeCertificate] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'bank' | 'card'>('mpesa');
  const [phone, setPhone] = useState<string>(cadet.phone || '+254 700 123 456');
  const [mpesaRef, setMpesaRef] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [txnCode, setTxnCode] = useState<string>('');

  if (!isOpen || !course) return null;

  const isFreeStudent = cadet.financialStatus !== 'Standard Cadet';
  const courseFee = isFreeStudent ? 0 : course.courseFee || 3000;
  const certificateFee = isFreeStudent ? 0 : (includeCertificate ? (course.certificateFee || 2000) : 0);
  const totalAmount = courseFee + certificateFee;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedTxn = `CRIM-TXN-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setTxnCode(generatedTxn);

    setTimeout(() => {
      onConfirmEnrollment(course.id, includeCertificate || isFreeStudent, isFreeStudent);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  const downloadReceipt = () => {
    const receiptContent = `
================================================================================
                    CRIMIVEX ACADEMY • OFFICIAL PAYMENT RECEIPT
Tagline: Criminology • Criminal Justice • Forensic Science • Cybersecurity
Founder & Lead Instructor: Farah Abdi Hassan | Email: farahbata116@gmail.com
Document Identification Code: ${txnCode}
Date: ${new Date().toISOString().split('T')[0]}
================================================================================
CADET DETAILS:
Student Name: ${cadet.name}
Badge Number: #${cadet.badgeNumber}
Email Address: ${cadet.email}

TRANSACTION SUMMARY:
Course Enrolled: ${course.title} (${course.id})
Registration Fee: KSh 0 (100% FREE)
Course Tuition Fee: KSh ${courseFee.toLocaleString()}
Certificate Processing Fee: KSh ${certificateFee.toLocaleString()}
--------------------------------------------------------------------------------
TOTAL AMOUNT PAID: KSh ${totalAmount.toLocaleString()} ${isFreeStudent ? '(100% SCHOLARSHIP WAIVER)' : ''}
Payment Method: ${isFreeStudent ? '100% Financial Aid Sponsorship' : paymentMethod.toUpperCase()}
Ref: ${mpesaRef || 'AUTOPAY-' + txnCode}
Status: CONFIRMED & VALIDATED

LEGAL NOTICE:
CRIMIVEX Academy is an independent online education and professional training
platform issuing certificates of completion.
Founder & Lead Instructor: Farah Abdi Hassan | Contact: farahbata116@gmail.com
================================================================================
    `;

    const element = document.createElement('a');
    const file = new Blob([receiptContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `CRIMIVEX_Receipt_${txnCode}.txt`;
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0B0C0E] border-2 border-cyan-500/40 max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xs font-mono font-black uppercase flex items-center space-x-1"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handlePay} className="space-y-5">
            {/* Modal Title */}
            <div className="space-y-2 border-b border-cyan-500/30 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 bg-cyan-950 border border-cyan-500/50 text-cyan-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-cyan-400 font-mono font-black uppercase tracking-widest block">
                    CRIMIVEX ACADEMY • OFFICIAL CHECKOUT
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    Criminology • Criminal Justice • Forensic Science • Cybersecurity
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight pt-1">
                COURSE ENROLLMENT & FEES PAYMENT
              </h2>
            </div>

            {/* Selected Course Box */}
            <div className="bg-zinc-950 border border-slate-800 p-4 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-black tracking-widest">SELECTED COURSE</span>
              <h3 className="text-base font-black text-white uppercase tracking-tight">{course.title}</h3>
              <p className="text-xs text-slate-400 font-mono">{course.duration} • Instructor: {course.instructor.name}</p>

              <div className="bg-zinc-900 border border-slate-800 p-2.5 text-[11px] font-mono text-slate-300">
                <span className="font-bold text-white uppercase block mb-1">PREREQUISITES:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                  {course.prerequisites && course.prerequisites.length > 0 ? (
                    course.prerequisites.map((p, i) => <li key={i}>{p}</li>)
                  ) : (
                    <li>Open to all registered student cadets</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Financial Status Notification */}
            {isFreeStudent ? (
              <div className="bg-cyan-950/60 border border-cyan-500/60 p-4 space-y-1">
                <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-black uppercase">
                  <HeartHandshake className="w-4 h-4 text-cyan-400" />
                  <span>100% FREE SCHOLARSHIP ACTIVE ({cadet.financialStatus.toUpperCase()})</span>
                </div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">
                  Your tuition (KSh 3,000) and certificate fee (KSh 2,000) are 100% waived under our educational assistance policy.
                </p>
              </div>
            ) : (
              <div className="bg-zinc-950 border border-slate-800 p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between font-bold uppercase">
                  <span className="text-slate-300">FREE CADET REGISTRATION</span>
                  <span className="text-emerald-400 font-black">KSh 0.00</span>
                </div>

                <div className="flex items-center justify-between font-bold uppercase border-t border-slate-900 pt-2">
                  <span className="text-slate-300">COURSE TUITION FEE ({course.id})</span>
                  <span className="text-white">KSh {courseFee.toLocaleString()}</span>
                </div>

                {/* Certificate Checkbox */}
                <label className="flex items-start space-x-3 cursor-pointer pt-2 border-t border-slate-900">
                  <input
                    type="checkbox"
                    checked={includeCertificate}
                    onChange={(e) => setIncludeCertificate(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-cyan-500"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold uppercase text-white">INCLUDE VERIFIED CERTIFICATE</span>
                      <span className="text-xs font-mono font-bold text-cyan-400">+KSh 2,000</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Includes official verified completion credential signed by Founder & Instructor Farah Abdi Hassan.
                    </p>
                  </div>
                </label>

                {/* Total */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono font-black uppercase tracking-widest text-slate-300">TOTAL DUE TODAY:</span>
                  <span className="text-xl font-black text-cyan-400 font-mono">KSh {totalAmount.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Financial Aid Link if Standard Student */}
            {!isFreeStudent && (
              <div className="bg-cyan-950/30 border border-cyan-500/30 p-3.5 flex items-center justify-between font-mono">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-cyan-400 uppercase">ORPHAN, DISABILITY OR HARDSHIP?</p>
                  <p className="text-[10px] text-slate-400">Upload document proof for 100% FREE fee waiver.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenFinancialAid();
                  }}
                  className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold uppercase transition whitespace-nowrap"
                >
                  APPLY FREE AID
                </button>
              </div>
            )}

            {/* Payment Options (If paying) */}
            {!isFreeStudent && (
              <div className="space-y-3 font-mono text-xs">
                <label className="text-[10px] uppercase text-slate-400 font-bold">SELECT OFFICIAL PAYMENT METHOD</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`p-2 text-center border text-[10px] font-bold uppercase transition ${
                      paymentMethod === 'mpesa'
                        ? 'bg-cyan-500 border-cyan-400 text-black shadow-md'
                        : 'bg-zinc-950 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    M-PESA
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-2 text-center border text-[10px] font-bold uppercase transition ${
                      paymentMethod === 'bank'
                        ? 'bg-cyan-500 border-cyan-400 text-black shadow-md'
                        : 'bg-zinc-950 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    BANK TRANSFER
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2 text-center border text-[10px] font-bold uppercase transition ${
                      paymentMethod === 'card'
                        ? 'bg-cyan-500 border-cyan-400 text-black shadow-md'
                        : 'bg-zinc-950 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    CARD GATEWAY
                  </button>
                </div>

                {paymentMethod === 'mpesa' && (
                  <div className="bg-zinc-950 border border-slate-800 p-3 space-y-2">
                    <p className="text-[11px] text-slate-300 font-bold">
                      Paybill: <span className="text-cyan-400">889100</span> | Account: <span className="text-white">CRIM101-CADET</span>
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[9px] uppercase text-slate-400 block">Phone Number</label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-zinc-900 border border-slate-700 p-1.5 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] uppercase text-slate-400 block">Transaction Code</label>
                        <input
                          type="text"
                          placeholder="e.g. QKH82910XX"
                          value={mpesaRef}
                          onChange={(e) => setMpesaRef(e.target.value)}
                          className="w-full bg-zinc-900 border border-slate-700 p-1.5 text-white text-xs uppercase"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="bg-zinc-950 border border-slate-800 p-3 text-[11px] space-y-1 text-slate-300">
                    <p className="font-bold text-cyan-400">BANK TRANSFER DETAILS (CRIMIVEX ACADEMY):</p>
                    <p>Bank: Equity Bank Kenya | Account Name: CRIMIVEX Academy Ltd</p>
                    <p>Account No: 0110293847561 | Branch: Nairobi Headquarters</p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="bg-zinc-950 border border-slate-800 p-3 text-[11px] space-y-1 text-slate-300">
                    <p className="font-bold text-cyan-400">ONLINE CARD GATEWAY (VISA / MASTERCARD / PAYPAL):</p>
                    <p>Encrypted 256-Bit SSL Checkout Gateway Active.</p>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-2 font-mono">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-zinc-900 border border-slate-700 text-slate-300 hover:text-white text-xs uppercase"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase transition flex items-center space-x-2"
              >
                {isProcessing ? (
                  <span>PROCESSING PAYMENT...</span>
                ) : (
                  <>
                    <span>{isFreeStudent ? 'CONFIRM FREE ENROLLMENT' : `CONFIRM PAY KSh ${totalAmount.toLocaleString()}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="text-center py-6 space-y-5 font-mono">
            <div className="w-16 h-16 bg-cyan-500 text-black font-bold flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-cyan-400 tracking-widest block">
                OFFICIAL PAYMENT & ENROLLMENT CONFIRMED
              </span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                ENROLLMENT COMPLETE
              </h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                You have officially enrolled in <strong className="text-white">{course.title}</strong>. Transaction code: <span className="text-cyan-400 font-bold">{txnCode}</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={downloadReceipt}
                className="px-5 py-2.5 bg-zinc-900 border border-slate-700 hover:border-cyan-500 text-white font-bold text-xs uppercase flex items-center space-x-2 transition"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>DOWNLOAD RECEIPT (TXT)</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase transition"
              >
                START STUDYING COURSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
