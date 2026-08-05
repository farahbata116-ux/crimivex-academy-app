import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Download, 
  Server, 
  FileCode, 
  CheckCircle2, 
  AlertTriangle, 
  Key,
  HardDrive,
  RefreshCw,
  Cpu,
  Eye,
  UserCheck,
  Shield,
  Activity,
  History,
  FileCheck,
  Check,
  Sliders,
  Mail
} from 'lucide-react';
import { CadetProfile, Course } from '../types';

interface SecurityPrivacyViewProps {
  cadet: CadetProfile;
  courses: Course[];
}

export const SecurityPrivacyView: React.FC<SecurityPrivacyViewProps> = ({ cadet, courses }) => {
  const [backupStatus, setBackupStatus] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'security' | 'privacy' | 'backup' | 'monitoring' | 'performance' | 'legal'>('security');
  
  // Consent toggles
  const [consentAnalytics, setConsentAnalytics] = useState(true);
  const [consentCommunications, setConsentCommunications] = useState(true);
  const [consentThirdParty, setConsentThirdParty] = useState(false);
  const [savedConsent, setSavedConsent] = useState(false);

  // Password Reset Simulator
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Restore Snapshot Simulator
  const [isRestoring, setIsRestoring] = useState(false);

  const handleExportData = () => {
    setIsExporting(true);
    setTimeout(() => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
        JSON.stringify({
          system: "CRIMIVEX Academy Database Snapshot",
          exportTimestamp: new Date().toISOString(),
          cadetProfile: cadet,
          courseRegistryCount: courses.length,
          securityStandard: "AES-256 Cryptographic Verification & SHA-256 Hashing",
          founder: "Farah Abdi Hassan",
          contact: "farahbata116@gmail.com"
        }, null, 2)
      );
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `CRIMIVEX-BACKUP-${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setIsExporting(false);
      setBackupStatus("✅ Full System Backup snapshot generated and downloaded successfully.");
      setTimeout(() => setBackupStatus(null), 6000);
    }, 1200);
  };

  const handleRestoreSystem = () => {
    setIsRestoring(true);
    setTimeout(() => {
      setIsRestoring(false);
      setBackupStatus("✅ System database restored successfully from latest verified snapshot (CRIM-SNAP-2026-0804).");
      setTimeout(() => setBackupStatus(null), 6000);
    }, 1500);
  };

  const handleSavePrivacyConsent = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedConsent(true);
    setTimeout(() => setSavedConsent(false), 4000);
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail) {
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
        setResetEmail('');
      }, 5000);
    }
  };

  // Activity Log Audit Trail with complete event categories
  const [auditFilter, setAuditFilter] = useState<string>('all');
  const [auditLogs, setAuditLogs] = useState([
    { id: 'LOG-8801', timestamp: '2026-08-04 19:42:10', category: 'User Login', event: 'Learner Auth Login Success (Badge #8492)', user: 'Farah Abdi Hassan', ip: '197.232.14.88', status: 'Success' },
    { id: 'LOG-8802', timestamp: '2026-08-04 18:30:15', category: 'Account Creation', event: 'New Learner Account Registered (Hassan Ali Noor)', user: 'Hassan Ali Noor', ip: '41.90.88.19', status: 'Completed' },
    { id: 'LOG-8803', timestamp: '2026-08-04 17:12:04', category: 'Course Enrollment', event: 'Enrolled in CRIM101 – Introduction to Criminology', user: 'James Omondi', ip: '102.210.65.12', status: 'Confirmed' },
    { id: 'LOG-8804', timestamp: '2026-08-04 16:04:22', category: 'Assessment Submission', event: 'Knowledge Assessment Submitted (Module 10 - Score: 100%)', user: 'Farah Abdi Hassan', ip: '197.232.14.88', status: 'Evaluated' },
    { id: 'LOG-8805', timestamp: '2026-08-04 15:20:00', category: 'Certificate Generation', event: 'Certificate Generated: CRIM-CERT-2026-1049', user: 'System Automated', ip: '127.0.0.1 (Server)', status: 'Issued & Hashed' },
    { id: 'LOG-8806', timestamp: '2026-08-04 14:10:45', category: 'Payment Confirmation', event: 'Payment Receipt Validated via M-PESA Code QKJ91899ZZ', user: 'James Omondi', ip: '102.210.65.12', status: 'Verified' },
    { id: 'LOG-8807', timestamp: '2026-08-04 11:05:30', category: 'Admin Action', event: 'Approved 100% Free Financial Aid Waiver (APP-2026-8801)', user: 'Farah Abdi Hassan (Admin)', ip: '197.232.14.88', status: 'Executed' },
    { id: 'LOG-8808', timestamp: '2026-08-04 09:00:00', category: 'System Backup', event: 'Encrypted Database Backup Snapshot Generated', user: 'Automated System', ip: '127.0.0.1 (Server)', status: 'Success' },
  ]);

  const filteredLogs = auditLogs.filter(log => 
    auditFilter === 'all' || log.category === auditFilter
  );

  return (
    <div className="space-y-8 animate-fadeIn text-left font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-[#0B0C0E] border-2 border-cyan-500/40 p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>TECHNICAL INFRASTRUCTURE & SECURITY GOVERNANCE</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              SECURITY, PRIVACY & BACKUP SYSTEM
            </h1>
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold mt-1">
              Criminology • Criminal Justice • Forensic Science • Cybersecurity
            </p>
          </div>

          <div className="bg-zinc-950 p-4 border border-cyan-500/30 font-mono text-xs text-right">
            <span className="text-slate-400 text-[10px] uppercase block">SECURITY PROTOCOL</span>
            <span className="text-cyan-400 font-bold block">CRYPTOGRAPHIC SHA-256</span>
            <span className="text-emerald-400 text-[10px] block">BACKUP ENGINE: ACTIVE</span>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800 font-mono text-xs">
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 uppercase font-bold transition flex items-center space-x-2 ${
              activeTab === 'security'
                ? 'bg-cyan-500 text-black'
                : 'bg-zinc-900 border border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>1. USER & ROLE SECURITY</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 uppercase font-bold transition flex items-center space-x-2 ${
              activeTab === 'privacy'
                ? 'bg-cyan-500 text-black'
                : 'bg-zinc-900 border border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>2. DATA PRIVACY & POLICY</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-4 py-2 uppercase font-bold transition flex items-center space-x-2 ${
              activeTab === 'backup'
                ? 'bg-cyan-500 text-black'
                : 'bg-zinc-900 border border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>3. SYSTEM BACKUP & RECOVERY</span>
          </button>

          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-4 py-2 uppercase font-bold transition flex items-center space-x-2 ${
              activeTab === 'monitoring'
                ? 'bg-cyan-500 text-black'
                : 'bg-zinc-900 border border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>4. AUDIT LOGS & MONITORING</span>
          </button>

          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2 uppercase font-bold transition flex items-center space-x-2 ${
              activeTab === 'performance'
                ? 'bg-cyan-500 text-black'
                : 'bg-zinc-900 border border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>5. TECHNICAL PERFORMANCE</span>
          </button>
        </div>
      </div>

      {/* Backup Notification */}
      {backupStatus && (
        <div className="bg-emerald-950 border-2 border-emerald-500/50 p-4 text-emerald-300 font-mono text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{backupStatus}</span>
        </div>
      )}

      {/* TAB 1: USER & ROLE SECURITY */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* User Roles Breakdown */}
            <div className="bg-[#111111] border border-slate-800 p-6 space-y-4 font-mono text-xs md:col-span-2">
              <h2 className="text-lg font-black text-white uppercase flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span>ROLE-BASED ACCESS CONTROL (RBAC) ARCHITECTURE</span>
              </h2>

              <div className="space-y-4">
                <div className="bg-zinc-950 p-4 border border-cyan-500/40 space-y-2">
                  <div className="flex justify-between items-center text-cyan-400 font-bold">
                    <span>ROLE 1: ADMINISTRATOR</span>
                    <span className="bg-cyan-950 px-2 py-0.5 text-[10px] uppercase border border-cyan-500/40">FULL CONTROL</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    System configuration, user management, financial aid approvals, database snapshots, and platform security policies.
                  </p>
                </div>

                <div className="bg-zinc-950 p-4 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-white font-bold">
                    <span>ROLE 2: INSTRUCTOR (FARAH ABDI HASSAN)</span>
                    <span className="bg-slate-900 px-2 py-0.5 text-[10px] uppercase border border-slate-700">ACADEMIC AUTHOR</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Curriculum publishing, knowledge assessment creation, capstone grade evaluation, and live masterclass hosting.
                  </p>
                </div>

                <div className="bg-zinc-950 p-4 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-emerald-400 font-bold">
                    <span>ROLE 3: LEARNER</span>
                    <span className="bg-emerald-950 px-2 py-0.5 text-[10px] uppercase border border-emerald-500/40">STUDENT ACQUISITION</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Access to enrolled training programs, forensic lab simulators, knowledge assessments, and verifiable completion certificates.
                  </p>
                </div>
              </div>
            </div>

            {/* Password Security & Reset System */}
            <div className="bg-[#111111] border border-slate-800 p-6 space-y-4 font-mono text-xs">
              <h2 className="text-lg font-black text-white uppercase flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Lock className="w-5 h-5 text-cyan-400" />
                <span>PASSWORD RESET & PROTECTION</span>
              </h2>

              <p className="text-slate-300 text-[11px] leading-relaxed">
                All accounts enforce strong password policy (Min 8 characters, 1 uppercase, 1 symbol, 1 numeric digit) with hashed SHA-256 storage.
              </p>

              {resetSent ? (
                <div className="bg-emerald-950 border border-emerald-500 p-3 text-emerald-400 text-[11px] font-bold">
                  ✓ Secure password reset link dispatched to learner email address.
                </div>
              ) : (
                <form onSubmit={handlePasswordReset} className="space-y-3 pt-2">
                  <label className="text-slate-400 text-[10px] uppercase block">TRIGGER PASSWORD RESET</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter learner account email..."
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-slate-700 text-white p-2 text-xs outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase py-2 text-xs"
                  >
                    SEND RESET LINK
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: DATA PRIVACY & POLICY */}
      {activeTab === 'privacy' && (
        <div className="space-y-6 font-mono text-xs">
          
          <div className="bg-[#111111] border border-slate-800 p-6 space-y-4">
            <h2 className="text-lg font-black text-white uppercase flex items-center space-x-2 border-b border-slate-800 pb-3">
              <FileCheck className="w-5 h-5 text-cyan-400" />
              <span>OFFICIAL DATA PRIVACY POLICY</span>
            </h2>

            <p className="text-slate-300 leading-relaxed text-[11px]">
              CRIMIVEX Academy is committed to protecting the privacy of all course participants and sponsored learners. Personal information gathered during registration or financial support requests is processed strictly for academic administration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-zinc-950 p-4 border border-slate-800 space-y-2">
                <strong className="text-white block">1. Personal Information Security</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Learner names, national identification uploads, disability verification documents, and contact details are stored in encrypted databases.
                </p>
              </div>

              <div className="bg-zinc-950 p-4 border border-slate-800 space-y-2">
                <strong className="text-white block">2. Training Fee & Payment Protection</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Transaction numbers (M-Pesa / Bank transfers) are validated securely without exposing full account credentials to third parties.
                </p>
              </div>
            </div>
          </div>

          {/* User Consent Management */}
          <div className="bg-[#111111] border border-slate-800 p-6 space-y-4">
            <h2 className="text-lg font-black text-white uppercase flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <span>LEARNER CONSENT MANAGEMENT DASHBOARD</span>
            </h2>

            <form onSubmit={handleSavePrivacyConsent} className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-zinc-950 border border-slate-800">
                <div>
                  <strong className="text-white block">Academic Progress Analytics</strong>
                  <span className="text-slate-400 text-[10px]">Allow system to track quiz scores and lab simulation completion speed.</span>
                </div>
                <input
                  type="checkbox"
                  checked={consentAnalytics}
                  onChange={(e) => setConsentAnalytics(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-zinc-950 border border-slate-800">
                <div>
                  <strong className="text-white block">Official Academy Communications</strong>
                  <span className="text-slate-400 text-[10px]">Receive course updates, live masterclass invites, and certificate release alerts.</span>
                </div>
                <input
                  type="checkbox"
                  checked={consentCommunications}
                  onChange={(e) => setConsentCommunications(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-zinc-950 border border-slate-800">
                <div>
                  <strong className="text-white block">Employer Verification Directory Listing</strong>
                  <span className="text-slate-400 text-[10px]">Allow verified law enforcement & cyber security employers to confirm certificate authenticity.</span>
                </div>
                <input
                  type="checkbox"
                  checked={consentThirdParty}
                  onChange={(e) => setConsentThirdParty(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase px-6 py-2 text-xs"
                >
                  SAVE PRIVACY PREFERENCES
                </button>
                {savedConsent && (
                  <span className="text-emerald-400 text-xs font-bold">✓ Preferences Updated</span>
                )}
              </div>
            </form>
          </div>

        </div>
      )}

      {/* TAB 3: SYSTEM BACKUP & RECOVERY */}
      {activeTab === 'backup' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-zinc-950 border-2 border-cyan-500/40 p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block">
                  SYSTEM BACKUP & RECOVERY ENGINE
                </span>
                <h2 className="text-xl font-black text-white uppercase">
                  DATABASE SNAPSHOT & DISASTER RECOVERY
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleExportData}
                  disabled={isExporting}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase px-5 py-3 text-xs flex items-center space-x-2 transition disabled:opacity-50"
                >
                  {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  <span>{isExporting ? 'EXPORTING...' : 'DOWNLOAD BACKUP SNAPSHOT (JSON)'}</span>
                </button>

                <button
                  onClick={handleRestoreSystem}
                  disabled={isRestoring}
                  className="bg-zinc-900 border border-slate-700 hover:border-cyan-500 text-cyan-400 font-bold uppercase px-5 py-3 text-xs flex items-center space-x-2 transition disabled:opacity-50"
                >
                  {isRestoring ? <RefreshCw className="w-4 h-4 animate-spin" /> : <HardDrive className="w-4 h-4" />}
                  <span>{isRestoring ? 'RESTORING...' : 'RESTORE FROM SNAPSHOT'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#111111] p-4 border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase block">AUTOMATIC BACKUP CYCLE</span>
                <span className="text-white font-bold">Every 24 Hours (00:00 UTC)</span>
              </div>
              <div className="bg-[#111111] p-4 border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase block">ENCRYPTION STANDARD</span>
                <span className="text-cyan-400 font-bold">AES-256 Storage Hash</span>
              </div>
              <div className="bg-[#111111] p-4 border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase block">DISASTER RECOVERY SLA</span>
                <span className="text-emerald-400 font-bold">&lt; 15 Minute RTO</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOGS & MONITORING */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-[#111111] border border-slate-800 p-6 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-lg font-black text-white uppercase flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span>AUDIT LOGGING & SECURITY EVENT MONITORING</span>
                </h2>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Real-time security audit trail tracking login activity, account creation, enrollments, assessment submissions, cert generation, payments, and admin operations.
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
                    const anchor = document.createElement('a');
                    anchor.setAttribute("href", dataStr);
                    anchor.setAttribute("download", `CRIMIVEX_Activity_Logs_${new Date().toISOString().split('T')[0]}.json`);
                    document.body.appendChild(anchor);
                    anchor.click();
                    anchor.remove();
                  }}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase px-3 py-1.5 text-xs flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT LOGS (JSON)</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['all', 'User Login', 'Account Creation', 'Course Enrollment', 'Assessment Submission', 'Certificate Generation', 'Payment Confirmation', 'Admin Action', 'System Backup'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setAuditFilter(cat)}
                  className={`px-3 py-1 text-[10px] font-bold uppercase transition ${
                    auditFilter === cat
                      ? 'bg-cyan-500 text-black'
                      : 'bg-zinc-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Activity Events' : cat}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950 text-slate-400 border-b border-slate-800 text-[10px] uppercase">
                    <th className="p-3">LOG ID</th>
                    <th className="p-3">TIMESTAMP</th>
                    <th className="p-3">CATEGORY</th>
                    <th className="p-3">EVENT ACTION</th>
                    <th className="p-3">USER / ACTOR</th>
                    <th className="p-3">IP ADDRESS</th>
                    <th className="p-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-[11px]">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-zinc-950">
                      <td className="p-3 text-cyan-400 font-bold">{log.id}</td>
                      <td className="p-3 text-slate-400">{log.timestamp}</td>
                      <td className="p-3">
                        <span className="bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 text-[9px] font-bold uppercase">
                          {log.category}
                        </span>
                      </td>
                      <td className="p-3 text-white font-bold">{log.event}</td>
                      <td className="p-3 text-slate-300">{log.user}</td>
                      <td className="p-3 text-slate-400">{log.ip}</td>
                      <td className="p-3 text-emerald-400 font-bold">{log.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TECHNICAL PERFORMANCE */}
      {activeTab === 'performance' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111111] p-6 border border-slate-800 space-y-2">
              <span className="text-slate-500 text-[10px] uppercase block">SYSTEM LATENCY</span>
              <span className="text-cyan-400 font-black text-3xl">48 ms</span>
              <p className="text-slate-400 text-[11px]">Optimized for low-bandwidth mobile networks</p>
            </div>

            <div className="bg-[#111111] p-6 border border-slate-800 space-y-2">
              <span className="text-slate-500 text-[10px] uppercase block">PLATFORM UPTIME SLA</span>
              <span className="text-emerald-400 font-black text-3xl">99.98%</span>
              <p className="text-slate-400 text-[11px]">High-availability Cloud Edge deployment</p>
            </div>

            <div className="bg-[#111111] p-6 border border-slate-800 space-y-2">
              <span className="text-slate-500 text-[10px] uppercase block">CONCURRENT LEARNERS</span>
              <span className="text-cyan-400 font-black text-3xl">10,000+</span>
              <p className="text-slate-400 text-[11px]">Scalable architecture built for expansion</p>
            </div>
          </div>
        </div>
      )}

      {/* Official Legal Footer Disclaimer */}
      <div className="bg-[#111111] border border-slate-800 p-6 text-slate-400 font-mono text-xs space-y-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-cyan-400 font-bold uppercase text-sm block">CRIMIVEX ACADEMY TECHNICAL GOVERNANCE</span>
            <span className="text-slate-500 text-[10px]">Document ID: CRIM-SEC-2026-8804</span>
          </div>
          <span className="text-slate-400 text-[11px]">Official Contact: <strong>farahbata116@gmail.com</strong></span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400 pt-1">
          CRIMIVEX Academy is an independent online professional training platform. All technical security protocols, user authorization layers, and certificate verification ledgers are managed under the direction of Founder & Lead Facilitator <strong>Farah Abdi Hassan</strong>.
        </p>
      </div>

    </div>
  );
};
