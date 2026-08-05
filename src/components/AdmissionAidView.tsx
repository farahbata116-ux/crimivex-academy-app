import React, { useState } from 'react';
import { 
  CreditCard, 
  HeartHandshake, 
  CheckCircle2, 
  HelpCircle, 
  ShieldAlert, 
  FileText, 
  Send, 
  Download,
  Building2,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Clock,
  ExternalLink
} from 'lucide-react';
import { CadetProfile, Course } from '../types';

interface AdmissionAidViewProps {
  cadet: CadetProfile;
  courses: Course[];
  onOpenFinancialAid: (course: Course) => void;
  onOpenEnrollment: (course: Course) => void;
  onOpenRegistration: () => void;
}

export const AdmissionAidView: React.FC<AdmissionAidViewProps> = ({
  cadet,
  courses,
  onOpenFinancialAid,
  onOpenEnrollment,
  onOpenRegistration,
}) => {
  const [selectedTab, setSelectedTab] = useState<'fees_methods' | 'history' | 'financial_aid'>('fees_methods');
  const defaultCourse = courses[0];

  // Mock payment transaction history for demonstration
  const paymentHistory = [
    {
      id: 'CRIM-TXN-2026-98124',
      date: '2026-08-01',
      item: 'CRIM101 - Introduction to Criminology & Criminal Justice',
      amount: cadet.financialStatus !== 'Standard Cadet' ? 0 : 3000,
      method: cadet.financialStatus !== 'Standard Cadet' ? '100% Free Aid Waiver' : 'M-PESA (Paybill 889100)',
      status: 'CONFIRMED',
      refCode: 'QKJ91827XX'
    },
    {
      id: 'CRIM-TXN-2026-44120',
      date: '2026-07-28',
      item: 'CRIMIVEX Official Verified Certificate Processing',
      amount: cadet.financialStatus !== 'Standard Cadet' ? 0 : 2000,
      method: cadet.financialStatus !== 'Standard Cadet' ? '100% Free Aid Waiver' : 'M-PESA (Paybill 889100)',
      status: 'CONFIRMED',
      refCode: 'QKJ44120YY'
    }
  ];

  const downloadReceipt = (txn: typeof paymentHistory[0]) => {
    const receiptContent = `
================================================================================
                    CRIMIVEX ACADEMY • OFFICIAL PAYMENT RECEIPT
Tagline: Criminology • Criminal Justice • Forensic Science • Cybersecurity
Founder & Lead Instructor: Farah Abdi Hassan | Email: farahbata116@gmail.com
Document Serial Code: ${txn.id}
Date Issued: ${txn.date}
================================================================================
CADET ACCOUNT DETAILS:
Cadet Full Name: ${cadet.name}
Badge Number: #${cadet.badgeNumber}
Cadet Email: ${cadet.email}
Financial Category: ${cadet.financialStatus}

TRANSACTION BREAKDOWN:
Item Description: ${txn.item}
Amount Charged: KSh ${txn.amount.toLocaleString()}
Payment Gateway/Method: ${txn.method}
M-PESA Transaction Ref: ${txn.refCode}
Payment Verification Status: ${txn.status}

OFFICIAL ACADEMY AUDIT DISCLAMER:
CRIMIVEX Academy is an independent online education and professional training
platform issuing certificates of completion.
Founder & Lead Instructor: Farah Abdi Hassan | Contact: farahbata116@gmail.com
================================================================================
    `;

    const element = document.createElement('a');
    const file = new Blob([receiptContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${txn.id}_Receipt.txt`;
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Brand Header Banner */}
      <div className="bg-[#0B0C0E] border-2 border-cyan-500/40 p-6 md:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>CRIMIVEX ACADEMY • FINANCIAL & PAYMENT MANAGEMENT SYSTEM</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              ADMISSIONS, FEES & 100% FINANCIAL AID
            </h1>
            <p className="text-slate-300 text-xs font-mono max-w-3xl leading-relaxed">
              Tagline: Criminology • Criminal Justice • Forensic Science • Cybersecurity. Transparent fee schedules, official M-PESA/Bank gateways, payment receipts, and 100% Free Financial Aid for orphans, persons with disabilities, and disadvantaged students.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {!cadet.isRegistered && (
              <button
                onClick={onOpenRegistration}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-wider px-5 py-3 transition flex items-center space-x-2"
              >
                <span>REGISTER AS CADET</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mt-6 pt-4 space-x-2 font-mono text-xs">
          <button
            onClick={() => setSelectedTab('fees_methods')}
            className={`px-4 py-2 font-bold uppercase border-b-2 transition ${
              selectedTab === 'fees_methods'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            FEE STRUCTURE & PAYMENT METHODS
          </button>
          <button
            onClick={() => setSelectedTab('history')}
            className={`px-4 py-2 font-bold uppercase border-b-2 transition ${
              selectedTab === 'history'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            PAYMENT HISTORY & RECEIPTS
          </button>
          <button
            onClick={() => setSelectedTab('financial_aid')}
            className={`px-4 py-2 font-bold uppercase border-b-2 transition ${
              selectedTab === 'financial_aid'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            100% FREE FINANCIAL AID SPONSORSHIP
          </button>
        </div>
      </div>

      {/* TAB 1: FEES & PAYMENT METHODS */}
      {selectedTab === 'fees_methods' && (
        <div className="space-y-8">
          {/* Admission & Registration Process */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 border-b border-slate-800 pb-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-black text-white uppercase tracking-wider">
                1. ADMISSION & REGISTRATION PROCESS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono">
              <div className="bg-zinc-950 border border-slate-800 p-4 space-y-2">
                <span className="text-2xl font-black text-cyan-400 block">01</span>
                <h3 className="text-xs font-bold text-white uppercase">FREE ACCOUNT REGISTRATION</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Register at CRIMIVEX Academy 100% free with your email and basic details to issue your cadet ID (#CADET).
                </p>
              </div>

              <div className="bg-zinc-950 border border-slate-800 p-4 space-y-2">
                <span className="text-2xl font-black text-cyan-400 block">02</span>
                <h3 className="text-xs font-bold text-white uppercase">SELECT STUDY TRACK</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Choose from Criminology (CRIM101), Crime Scene Investigation, or Digital Forensics.
                </p>
              </div>

              <div className="bg-zinc-950 border border-slate-800 p-4 space-y-2">
                <span className="text-2xl font-black text-cyan-400 block">03</span>
                <h3 className="text-xs font-bold text-white uppercase">PAYMENT OR AID SPONSORSHIP</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Pay tuition fees via M-PESA/Bank or apply for 100% free financial aid waiver with documents.
                </p>
              </div>

              <div className="bg-zinc-950 border border-slate-800 p-4 space-y-2">
                <span className="text-2xl font-black text-cyan-400 block">04</span>
                <h3 className="text-xs font-bold text-white uppercase">INSTANT COURSE & CERTIFICATE ACCESS</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Unlock reading materials, assignments, quizzes, and downloadable verified completion certificates.
                </p>
              </div>
            </div>
          </div>

          {/* Fee Breakdown & Payment Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-mono">
            {/* Standard Fee Structure */}
            <div className="bg-zinc-950 border border-slate-800 p-6 space-y-5">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  2. STANDARD COURSE FEES & PRICING
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-900/60 border border-slate-800 p-3.5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white uppercase">Student Cadet Registration</span>
                    <span className="text-emerald-400 font-bold">100% FREE</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Create cadet account, view sample modules, and access cadet community.
                  </p>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-3.5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white uppercase">Course Tuition (CRIM101)</span>
                    <span className="text-cyan-400 font-bold text-sm">KSh 3,000</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Full access to 10 course modules, lecture notes, case studies, assignments, and exam access.
                  </p>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-3.5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white uppercase">Verified Certificate Processing</span>
                    <span className="text-cyan-400 font-bold text-sm">KSh 2,000</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Official certificate generation with serial validation ID, signed by Founder & Instructor Farah Abdi Hassan.
                  </p>
                </div>

                <div className="bg-cyan-950/40 border border-cyan-500/40 p-3.5 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-cyan-400 uppercase">100% Free Financial Aid Sponsorship</span>
                    <span className="text-emerald-400 font-bold">KSh 0.00</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    100% fee waiver covering tuition & certificate for eligible orphans, persons with disabilities, and disadvantaged students.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-zinc-950 border border-slate-800 p-6 space-y-5">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  3. OFFICIAL PAYMENT METHODS
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                {/* M-PESA */}
                <div className="bg-slate-900/60 border border-slate-800 p-4 space-y-2">
                  <div className="flex items-center justify-between font-bold uppercase text-emerald-400">
                    <span>M-PESA PAYBILL</span>
                    <span className="text-[10px] bg-emerald-950 border border-emerald-500/50 px-2 py-0.5 text-emerald-300">
                      INSTANT CONFIRMATION
                    </span>
                  </div>
                  <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside">
                    <li>Paybill Business No: <strong className="text-white">889100</strong> (CRIMIVEX Academy)</li>
                    <li>Account No: <strong className="text-cyan-400">#{cadet.badgeNumber || 'CRIM101-CADET'}</strong></li>
                    <li>Enter Amount: KSh 3,000 (Tuition) or KSh 5,000 (Tuition + Certificate)</li>
                    <li>Submit M-PESA reference code upon course checkout.</li>
                  </ul>
                </div>

                {/* Bank Transfer */}
                <div className="bg-slate-900/60 border border-slate-800 p-4 space-y-2">
                  <div className="flex items-center justify-between font-bold uppercase text-slate-200">
                    <span>BANK DIRECT TRANSFER</span>
                    <span className="text-[10px] bg-slate-800 border border-slate-700 px-2 py-0.5 text-slate-400">
                      ELECTRONIC EFT / RTGS
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Bank: Equity Bank Kenya | Account Name: CRIMIVEX Academy Ltd | Account No: 0110293847561 | Swift: EQBLKENA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PAYMENT HISTORY & RECEIPTS */}
      {selectedTab === 'history' && (
        <div className="space-y-6 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-lg font-black text-white uppercase tracking-wider">
                STUDENT PAYMENT HISTORY & OFFICIAL RECEIPTS
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Download verified payment receipts and check transaction statuses.
              </p>
            </div>
            <div className="text-right text-xs">
              <span className="text-slate-400 block">CADET BADGE</span>
              <span className="text-cyan-400 font-bold">#{cadet.badgeNumber}</span>
            </div>
          </div>

          <div className="bg-zinc-950 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-cyan-400 uppercase font-bold text-[11px]">
                  <th className="p-3">DOC CODE</th>
                  <th className="p-3">DATE</th>
                  <th className="p-3">ITEM DESCRIPTION</th>
                  <th className="p-3">AMOUNT</th>
                  <th className="p-3">METHOD</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {paymentHistory.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-white">{txn.id}</td>
                    <td className="p-3 text-slate-400">{txn.date}</td>
                    <td className="p-3">{txn.item}</td>
                    <td className="p-3 font-bold text-cyan-400">KSh {txn.amount.toLocaleString()}</td>
                    <td className="p-3 text-slate-400">{txn.method}</td>
                    <td className="p-3">
                      <span className="bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-[10px] font-bold px-2 py-0.5 uppercase">
                        {txn.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => downloadReceipt(txn)}
                        className="px-3 py-1 bg-cyan-950 border border-cyan-500/40 hover:bg-cyan-500 hover:text-black text-cyan-400 text-[10px] font-bold uppercase flex items-center space-x-1 ml-auto transition"
                      >
                        <Download className="w-3 h-3" />
                        <span>RECEIPT</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: 100% FREE FINANCIAL AID SPONSORSHIP */}
      {selectedTab === 'financial_aid' && (
        <div className="bg-zinc-950 border-2 border-cyan-500/50 p-6 md:p-8 space-y-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6 relative z-10">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest mb-1">
                <HeartHandshake className="w-4 h-4" />
                <span>ACADEMY EQUALITY & INCLUSION PROGRAM</span>
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                100% FREE FINANCIAL AID SPONSORSHIP
              </h2>
              <p className="text-slate-400 text-xs font-mono mt-1 max-w-2xl">
                We ensure zero financial barriers for deserving students. 100% free tuition and certificate sponsorship is reserved for orphans, students with disabilities, and financially constrained individuals.
              </p>
            </div>

            <div className="bg-slate-900 border border-cyan-500/30 p-4 text-right font-mono text-xs">
              <span className="text-cyan-400 font-bold text-sm block">SPONSORSHIPS REMAINING</span>
              <span className="text-white text-xl font-black block">42 / 100 SLOTS</span>
              <span className="text-slate-500 text-[10px] uppercase">AUGUST 2026 INTAKE</span>
            </div>
          </div>

          {/* Current Cadet Financial Aid Status */}
          <div className="bg-slate-900 border border-slate-800 p-5 font-mono text-xs space-y-3">
            <span className="text-slate-400 uppercase font-bold text-[10px] block">YOUR CURRENT CADET FINANCIAL AID STATUS:</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-cyan-950 border border-cyan-500/50 text-cyan-400 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-white font-bold text-sm uppercase block">{cadet.financialStatus}</span>
                  <span className="text-slate-400 text-[11px]">
                    {cadet.financialStatus !== 'Standard Cadet'
                      ? '100% Free Tuition & Certificate Waiver Granted.'
                      : 'Eligible to apply for 100% free aid with supporting verification document.'}
                  </span>
                </div>
              </div>

              {defaultCourse && cadet.financialStatus === 'Standard Cadet' && (
                <button
                  onClick={() => onOpenFinancialAid(defaultCourse)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase px-5 py-2.5 transition flex items-center space-x-2"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>APPLY NOW FOR 100% AID</span>
                </button>
              )}
            </div>
          </div>

          {/* Eligibility Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="bg-slate-900/60 border border-slate-800 p-5 space-y-3">
              <span className="font-bold text-cyan-400 uppercase tracking-wider block border-b border-slate-800 pb-2">
                CATEGORY A: ORPHAN STUDENTS
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Full 100% waiver for students who have lost one or both parents. Supporting document requirement: Death Certificate, Chief’s Verification Letter, or Guardian Proof.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-5 space-y-3">
              <span className="font-bold text-cyan-400 uppercase tracking-wider block border-b border-slate-800 pb-2">
                CATEGORY B: PERSONS WITH DISABILITY (PWD)
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Full 100% waiver for students living with physical or sensory disabilities. Supporting document requirement: Disability Council Registration Card or Medical Assessment.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-5 space-y-3">
              <span className="font-bold text-cyan-400 uppercase tracking-wider block border-b border-slate-800 pb-2">
                CATEGORY C: ECONOMIC HARDSHIP
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Full 100% waiver for students facing severe financial constraints. Supporting document requirement: Local Administration/Chief Letter or Hardship Declaration.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Official Legal Notice Footer */}
      <div className="border-t border-slate-800 pt-6 text-center font-mono text-xs text-slate-400 space-y-1">
        <p className="text-slate-300 font-bold uppercase">CRIMIVEX ACADEMY • INDEPENDENT PROFESSIONAL TRAINING PLATFORM</p>
        <p className="text-[11px]">
          Tagline: Criminology • Criminal Justice • Forensic Science • Cybersecurity | Founder & Lead Instructor: Farah Abdi Hassan
        </p>
        <p className="text-[10px] text-slate-500">Official Contact: farahbata116@gmail.com | Serial Document Verification Code: CRIM-DOC-2026-PAY88</p>
      </div>
    </div>
  );
};

