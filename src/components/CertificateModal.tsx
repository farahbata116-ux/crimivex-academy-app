import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Printer, 
  Download, 
  Share2, 
  CheckCircle2, 
  X, 
  QrCode,
  ExternalLink
} from 'lucide-react';
import { CertificateRecord } from '../types';

interface CertificateModalProps {
  certificate: CertificateRecord | null;
  onClose: () => void;
  onNavigateToVerify?: (certId: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
  onNavigateToVerify
}) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const certJson = {
      academy: "CRIMIVEX Academy",
      tagline: "Criminology • Criminal Justice • Forensic Science • Cybersecurity",
      founder: "Farah Abdi Hassan",
      contact: "farahbata116@gmail.com",
      certificateId: certificate.certId,
      studentName: certificate.studentName,
      studentBadge: certificate.studentBadge,
      courseCode: certificate.courseCode,
      courseTitle: certificate.courseTitle,
      issueDate: certificate.issueDate,
      grade: certificate.grade,
      modulesCompleted: certificate.modulesCompleted,
      verificationHash: certificate.verificationHash,
      status: certificate.status,
      legalDisclaimer: "Certificate of Completion issued by CRIMIVEX Academy. This certificate confirms successful completion of professional training and does not represent a government-accredited degree or diploma unless formally recognized by the relevant authority."
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(certJson, null, 2));
    const anchor = document.createElement('a');
    anchor.setAttribute("href", dataStr);
    anchor.setAttribute("download", `CRIMIVEX_Certificate_${certificate.certId}.json`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const handleShare = () => {
    const verifyUrl = `${window.location.origin}?tab=verify-cert&id=${certificate.certId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(verifyUrl);
      alert(`Official Certificate Verification Link copied to clipboard:\n${verifyUrl}`);
    } else {
      alert(`Certificate Verification ID: ${certificate.certId}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0B0C0E] border-2 border-cyan-500/60 max-w-3xl w-full p-6 md:p-8 space-y-6 shadow-[0_0_50px_rgba(0,229,255,0.25)] relative text-left">
        
        {/* Top Header Actions */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>OFFICIAL CRIMIVEX ACADEMY CREDENTIAL DOCUMENT</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 bg-zinc-900 border border-slate-700 hover:border-cyan-500 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Display Canvas */}
        <div className="bg-[#0B0C0E] border-4 border-double border-cyan-500/40 p-6 md:p-10 space-y-6 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/60 via-zinc-950 to-black">
          
          {/* Decorative Corner Watermarks */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-500/40" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-500/40" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-500/40" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-500/40" />

          {/* Header Block: Logo & Title */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-cyan-500/30 pb-6 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-950 to-black border-2 border-cyan-400 text-cyan-400 flex items-center justify-center font-black shadow-[0_0_20px_rgba(0,229,255,0.3)] shrink-0">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
                  CRIMIVEX<span className="text-cyan-400">.</span> ACADEMY
                </h2>
                <p className="text-[10px] md:text-xs text-cyan-400 font-mono uppercase font-bold tracking-widest mt-0.5">
                  Criminology • Criminal Justice • Forensic Science • Cybersecurity
                </p>
                <p className="text-[9px] text-slate-400 font-mono uppercase mt-0.5">
                  Independent Online Education & Professional Training Platform
                </p>
              </div>
            </div>

            <div className="text-left md:text-right font-mono text-xs space-y-1">
              <span className="text-slate-400 text-[9px] block uppercase">DOCUMENT SERIAL CODE</span>
              <span className="text-cyan-400 font-black text-sm tracking-widest px-2 py-0.5 bg-zinc-950 border border-cyan-500/40 inline-block">
                {certificate.certId}
              </span>
            </div>
          </div>

          {/* Student & Course Details Body */}
          <div className="text-center space-y-4 py-4 bg-zinc-950/70 border border-slate-800 p-6">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
              THIS CERTIFICATE IS OFFICIALLY PRESENTED TO
            </span>

            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight border-b-2 border-cyan-400 inline-block pb-1 px-4">
              {certificate.studentName}
            </h3>

            <p className="text-xs font-mono text-slate-300 uppercase tracking-widest max-w-lg mx-auto pt-2">
              FOR SUCCESSFUL COMPLETION OF ALL ACADEMIC LECTURE READINGS, QUIZZES, AND ASSIGNMENT ASSESSMENTS FOR
            </p>

            <h4 className="text-lg md:text-2xl font-black text-cyan-300 uppercase tracking-wide max-w-2xl mx-auto leading-tight">
              {certificate.courseTitle}
            </h4>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs bg-zinc-950 p-4 border border-cyan-500/30">
            <div>
              <span className="text-slate-400 text-[9px] block uppercase">COURSE CODE</span>
              <span className="text-white font-bold">{certificate.courseCode}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[9px] block uppercase">DATE ISSUED</span>
              <span className="text-white font-bold">{certificate.issueDate}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[9px] block uppercase">GRADE / SCORE</span>
              <span className="text-emerald-400 font-bold">{certificate.grade}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[9px] block uppercase">STATUS</span>
              <span className="text-emerald-400 font-bold uppercase">{certificate.status}</span>
            </div>
          </div>

          {/* Signatures & QR Code Block */}
          <div className="pt-4 border-t border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
            
            {/* Left: Cryptographic Hash & QR Link */}
            <div className="space-y-2 max-w-xs text-left">
              <span className="text-slate-400 text-[9px] uppercase block font-bold">VERIFICATION QR & HASH</span>
              <div className="flex items-center space-x-3 bg-black p-2 border border-slate-800">
                <div className="w-12 h-12 bg-white p-1 shrink-0 flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-black" />
                </div>
                <div className="text-[9px] text-slate-300 font-mono break-all leading-tight">
                  <span className="text-cyan-400 font-bold block mb-0.5">SHA-256 HASH:</span>
                  {certificate.verificationHash.slice(0, 32)}...
                </div>
              </div>
            </div>

            {/* Right: Signature Block */}
            <div className="text-center md:text-right space-y-1 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
              <div className="font-serif italic text-lg text-white font-bold tracking-wide">
                Farah Abdi Hassan
              </div>
              <div className="border-t border-slate-700 w-48 ml-auto pt-1">
                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                  {certificate.instructorName || 'Farah Abdi Hassan'}
                </p>
                <p className="text-[9px] text-slate-400 uppercase">
                  {certificate.instructorTitle || 'Founder & Lead Instructor, CRIMIVEX Academy'}
                </p>
                <p className="text-[9px] text-slate-400 font-mono">farahbata116@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Mandatory Legal Notice */}
          <div className="pt-4 border-t border-slate-800 text-[9px] font-mono text-slate-400 text-center uppercase tracking-wider space-y-1 leading-normal">
            <p className="font-bold text-slate-300">LEGAL NOTICE & CERTIFICATION MANDATE:</p>
            <p className="max-w-2xl mx-auto text-slate-400">
              "Certificate of Completion issued by CRIMIVEX Academy. This certificate confirms successful completion of professional training and does not represent a government-accredited degree or diploma unless formally recognized by the relevant authority."
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs pt-2">
          {onNavigateToVerify && (
            <button
              onClick={() => {
                onClose();
                onNavigateToVerify(certificate.certId);
              }}
              className="bg-zinc-900 border border-slate-700 hover:border-cyan-500 text-cyan-400 px-4 py-2.5 flex items-center space-x-2 font-bold uppercase transition"
            >
              <ExternalLink className="w-4 h-4" />
              <span>TEST IN PUBLIC REGISTRY</span>
            </button>
          )}

          <div className="flex items-center space-x-3 ml-auto">
            <button
              onClick={handleShare}
              className="bg-zinc-900 border border-slate-700 hover:border-cyan-500 text-slate-200 px-4 py-2.5 flex items-center space-x-2 font-bold uppercase transition"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>SHARE LINK</span>
            </button>

            <button
              onClick={handleDownload}
              className="bg-zinc-900 border border-slate-700 hover:border-cyan-500 text-slate-200 px-4 py-2.5 flex items-center space-x-2 font-bold uppercase transition"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>DOWNLOAD JSON RECEIPT</span>
            </button>

            <button
              onClick={handlePrint}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-6 py-2.5 flex items-center space-x-2 uppercase transition shadow-lg"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / SAVE PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
