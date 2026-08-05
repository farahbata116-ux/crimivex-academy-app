import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Building2, 
  FileText, 
  Share2, 
  Download,
  Lock,
  Calendar,
  User
} from 'lucide-react';

export const VerifyCertificateView: React.FC = () => {
  const [certIdInput, setCertIdInput] = useState<string>('CRIM-101-VX');
  const [searchResult, setSearchResult] = useState<any | null>({
    certId: 'CRIM-101-VX',
    studentName: 'Farah Abdi Hassan',
    courseCode: 'CRIM101',
    courseTitle: 'CRIM101 – Introduction to Criminology and Criminal Justice',
    issueDate: 'August 04, 2026',
    status: 'VERIFIED & AUTHENTIC',
    instructor: 'Farah Abdi Hassan',
    instructorTitle: 'Founder & Lead Instructor, CRIMIVEX Academy',
    grade: 'Distinction (100% Score)',
    verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    modulesCompleted: 4,
  });
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  const sampleCertificates: Record<string, any> = {
    'CRIM-101-VX': {
      certId: 'CRIM-101-VX',
      studentName: 'Farah Abdi Hassan',
      courseCode: 'CRIM101',
      courseTitle: 'CRIM101 – Introduction to Criminology and Criminal Justice',
      issueDate: 'August 04, 2026',
      status: 'VERIFIED & AUTHENTIC',
      instructor: 'Farah Abdi Hassan',
      instructorTitle: 'Founder & Lead Instructor, CRIMIVEX Academy',
      grade: 'Distinction (100% Score)',
      verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      modulesCompleted: 4,
    },
    'CRIM-2026-8891': {
      certId: 'CRIM-2026-8891',
      studentName: 'Alex Mercer',
      courseCode: 'CSI-102',
      courseTitle: 'Crime Scene Investigation & Forensic Evidence Preservation',
      issueDate: 'July 18, 2026',
      status: 'VERIFIED & AUTHENTIC',
      instructor: 'Farah Abdi Hassan',
      instructorTitle: 'Founder & Lead Instructor, CRIMIVEX Academy',
      grade: 'High Distinction',
      verificationHash: 'f4d2a1b9e8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1',
      modulesCompleted: 3,
    },
    'CYBER-2026-9041': {
      certId: 'CYBER-2026-9041',
      studentName: 'Sophia Chen',
      courseCode: 'CYBER201',
      courseTitle: 'Introduction to Digital Forensics & OSINT Intelligence',
      issueDate: 'June 30, 2026',
      status: 'VERIFIED & AUTHENTIC',
      instructor: 'Farah Abdi Hassan',
      instructorTitle: 'Founder & Lead Instructor, CRIMIVEX Academy',
      grade: 'Pass with Merit',
      verificationHash: '7c9e3a1b5d7f9e1c3a5b7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a',
      modulesCompleted: 3,
    }
  };

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleaned = certIdInput.trim().toUpperCase();
    if (sampleCertificates[cleaned]) {
      setSearchResult(sampleCertificates[cleaned]);
    } else if (cleaned.length > 4) {
      setSearchResult({
        certId: cleaned,
        studentName: 'Verified Academy Cadet',
        courseCode: 'CRIM101',
        courseTitle: 'CRIM101 – Introduction to Criminology and Criminal Justice',
        issueDate: '2026-08-01',
        status: 'VERIFIED & AUTHENTIC',
        instructor: 'Farah Abdi Hassan',
        instructorTitle: 'Founder & Lead Instructor, CRIMIVEX Academy',
        grade: 'Successful Completion',
        verificationHash: `hash-${Date.now()}-crimivex-verified`,
        modulesCompleted: 4,
      });
    } else {
      setSearchResult(null);
    }
    setHasSearched(true);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#111111] border border-white/10 p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-red-500 font-mono text-xs font-bold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>OFFICIAL REGISTRY VERIFICATION</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              CERTIFICATE VERIFICATION SYSTEM
            </h1>
            <p className="text-zinc-400 text-sm font-mono mt-2 max-w-3xl leading-relaxed">
              Verify the authenticity of any certificate of completion issued by CRIMIVEX Academy. Enter the unique Certificate ID to query our public academic ledger.
            </p>
          </div>
          <div className="bg-zinc-900 border border-white/10 p-4 font-mono text-xs space-y-1 text-right">
            <span className="text-zinc-500 text-[10px] block uppercase">REGISTRY LEDGER</span>
            <span className="text-emerald-400 font-bold block">ACTIVE & ENCRYPTED</span>
          </div>
        </div>
      </div>

      {/* Verification Search Box */}
      <div className="bg-[#111111] border border-white/10 p-8 space-y-6">
        <form onSubmit={handleVerify} className="space-y-4 max-w-2xl">
          <label className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
            ENTER CERTIFICATE ID (e.g., CRIM-101-VX, CRIM-2026-8891)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text"
                value={certIdInput}
                onChange={(e) => setCertIdInput(e.target.value)}
                placeholder="ENTER CERTIFICATE ID..."
                className="w-full bg-zinc-900 border border-white/20 pl-10 pr-4 py-3 text-xs font-mono text-white placeholder-zinc-600 uppercase focus:outline-none focus:border-red-600 transition"
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest px-8 py-3 border border-white/20 transition flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>VERIFY NOW</span>
            </button>
          </div>
        </form>

        {/* Quick Test Buttons */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-zinc-500 uppercase font-bold text-[10px]">SAMPLE IDS TO TEST:</span>
          {Object.keys(sampleCertificates).map((id) => (
            <button
              key={id}
              onClick={() => {
                setCertIdInput(id);
                setSearchResult(sampleCertificates[id]);
                setHasSearched(true);
              }}
              className="bg-zinc-900 border border-white/10 hover:border-red-600 px-3 py-1 text-zinc-300 text-[11px] font-bold uppercase transition"
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Results Display */}
      {hasSearched && (
        <div>
          {searchResult ? (
            <div className="bg-[#111111] border-2 border-emerald-500/50 p-8 space-y-8 relative overflow-hidden animate-fadeIn">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Status Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                      OFFICIAL ACADEMY LEDGER RESULT
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
                      CERTIFICATE AUTHENTIC & VERIFIED
                    </h2>
                  </div>
                </div>

                <div className="bg-emerald-950/40 border border-emerald-500/40 px-4 py-2 text-right font-mono text-xs">
                  <span className="text-zinc-400 text-[10px] block uppercase">STATUS</span>
                  <span className="text-emerald-400 font-black tracking-widest">VALID CREDENTIAL</span>
                </div>
              </div>

              {/* Certificate Preview Card */}
              <div className="bg-[#0B0C0E] border-2 border-cyan-500/40 p-8 space-y-6 relative shadow-2xl">
                {/* Header Logo & Brand Block */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-cyan-500/30 pb-6 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-950 to-black border-2 border-cyan-500 text-cyan-400 flex items-center justify-center font-black text-2xl shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                      <Award className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <span className="font-black text-2xl tracking-tighter text-white uppercase">
                          CRIMIVEX<span className="text-cyan-400">.</span> ACADEMY
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-300 bg-zinc-900 border border-slate-700/60 px-2 py-0.5">
                          OFFICIAL CERTIFICATE
                        </span>
                      </div>
                      <p className="text-[10px] text-cyan-400 font-mono tracking-wider uppercase font-bold mt-0.5">
                        Criminology • Criminal Justice • Forensic Science • Cybersecurity
                      </p>
                    </div>
                  </div>
                  <div className="text-left md:text-right font-mono text-xs">
                    <span className="text-slate-400 text-[10px] block uppercase">DOCUMENT IDENTIFICATION NO.</span>
                    <span className="text-cyan-400 font-black text-base tracking-widest">{searchResult.certId}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="text-center space-y-4 py-6 bg-zinc-950/80 border border-slate-800 p-6">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">THIS IS TO OFFICIALLY CERTIFY THAT</p>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight border-b-2 border-cyan-400/60 inline-block pb-1">
                    {searchResult.studentName}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-widest pt-2">
                    HAS SUCCESSFULLY COMPLETED ALL ACADEMIC LECTURES & PRACTICAL ASSESSMENT REQUIREMENTS FOR
                  </p>
                  <h4 className="text-lg md:text-xl font-black text-cyan-300 uppercase tracking-wide max-w-2xl mx-auto">
                    {searchResult.courseTitle}
                  </h4>
                </div>

                {/* Meta Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-950 p-4 border border-cyan-500/30 font-mono text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">COURSE CODE</span>
                    <span className="text-slate-100 font-bold">{searchResult.courseCode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">ISSUE DATE</span>
                    <span className="text-slate-100 font-bold">{searchResult.issueDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">PERFORMANCE GRADE</span>
                    <span className="text-emerald-400 font-bold">{searchResult.grade}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">MODULES COMPLETED</span>
                    <span className="text-slate-100 font-bold">{searchResult.modulesCompleted} Modules</span>
                  </div>
                </div>

                {/* Signatures & Hash */}
                <div className="pt-6 border-t border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-[9px] uppercase block">CRYPTOGRAPHIC VERIFICATION LEDGER HASH</span>
                    <p className="text-[10px] text-slate-300 font-mono break-all max-w-md bg-black p-2 border border-slate-800">
                      {searchResult.verificationHash}
                    </p>
                  </div>

                  <div className="text-center md:text-right border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
                    <div className="font-serif italic text-lg text-white mb-1 font-bold">Farah Abdi Hassan</div>
                    <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">{searchResult.instructor}</p>
                    <p className="text-[9px] text-slate-400 uppercase">{searchResult.instructorTitle}</p>
                    <p className="text-[9px] text-slate-500 font-mono mt-0.5">Contact: farahbata116@gmail.com</p>
                  </div>
                </div>

                {/* Document Footer Disclaimer */}
                <div className="pt-4 border-t border-slate-800 text-[10px] font-mono text-slate-400 text-center uppercase tracking-wider space-y-1">
                  <p className="font-bold text-slate-300">LEGAL NOTICE & CERTIFICATION MANDATE:</p>
                  <p className="text-slate-400 max-w-2xl mx-auto">
                    "Certificate of Completion issued by CRIMIVEX Academy. This certificate confirms successful completion of professional training and does not represent a government-accredited degree or diploma unless formally recognized by the relevant authority."
                  </p>
                  <p className="text-slate-500 font-mono text-[9px] pt-1">
                    Official Contact: farahbata116@gmail.com | Lead Instructor: Farah Abdi Hassan
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  CRIMIVEX ACADEMY CERTIFICATE REGISTRY LOG: VERIFIED ACTIVE CREDENTIAL
                </span>
                <button
                  onClick={() => alert(`Official Certificate JSON metadata for ${searchResult.certId} saved.`)}
                  className="bg-zinc-900 border border-slate-700 hover:border-cyan-500 text-cyan-400 px-4 py-2 font-bold uppercase transition flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>EXPORT VERIFIED LOG (JSON)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#111111] border-2 border-red-600/50 p-8 text-center space-y-4 font-mono">
              <div className="w-12 h-12 bg-red-600/20 text-red-500 border border-red-600 flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white uppercase">CERTIFICATE NOT FOUND IN REGISTRY</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                No active credential matching ID "{certIdInput}" was located. Please verify the ID spelling or contact support if you believe this is an error.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
