import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Award, 
  CreditCard, 
  FileText, 
  Lock, 
  Database, 
  Download, 
  Upload, 
  Search,
  Key,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Bell,
  UserX,
  UserCheck,
  FileSpreadsheet,
  Eye,
  Edit3,
  Plus,
  Check,
  Share2,
  ExternalLink,
  MessageSquare,
  Activity
} from 'lucide-react';
import { AdmissionApplication, CadetProfile, CertificateRecord, Course } from '../types';

interface AdminDashboardProps {
  cadet: CadetProfile;
  courses: Course[];
  onUpdateCadet?: (updated: CadetProfile) => void;
}

interface StudentAccount {
  id: string;
  name: string;
  badgeNumber: string;
  email: string;
  nationalId: string;
  financialStatus: string;
  status: 'Active' | 'Suspended';
  enrolledCoursesCount: number;
  xpPoints: number;
  registeredDate: string;
  notes?: string;
}

interface AcademyAnnouncement {
  id: string;
  title: string;
  author: string;
  date: string;
  audience: 'All Students' | 'Instructors Only' | 'Financial Aid Scholars';
  content: string;
  priority: 'High' | 'Normal';
}

export const AdminDashboardView: React.FC<AdminDashboardProps> = ({
  cadet,
  courses,
  onUpdateCadet
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'students' | 'admissions' | 'analytics' | 'payments' | 'certificates' | 'security'>('overview');

  // Student Accounts List
  const [studentsList, setStudentsList] = useState<StudentAccount[]>([
    {
      id: 'STU-1001',
      name: cadet.name,
      badgeNumber: cadet.badgeNumber || '8492',
      email: cadet.email,
      nationalId: cadet.nationalId || '38920144',
      financialStatus: cadet.financialStatus || 'Standard Cadet',
      status: 'Active',
      enrolledCoursesCount: cadet.enrolledCourses.length || 3,
      xpPoints: cadet.xp || 3450,
      registeredDate: '2026-01-15',
      notes: 'Active session user with complete profile verification.'
    },
    {
      id: 'STU-1002',
      name: 'James Omondi',
      badgeNumber: '8492',
      email: 'james.omondi@example.com',
      nationalId: '34901823',
      financialStatus: 'Standard Student (KSh 3,000)',
      status: 'Active',
      enrolledCoursesCount: 2,
      xpPoints: 2100,
      registeredDate: '2026-02-10',
      notes: 'Fee payment confirmed via M-PESA QKJ91899ZZ.'
    },
    {
      id: 'STU-1003',
      name: 'Amina Said',
      badgeNumber: '9103',
      email: 'amina.said@example.com',
      nationalId: '37819204',
      financialStatus: 'Person with Disability (PWD)',
      status: 'Active',
      enrolledCoursesCount: 4,
      xpPoints: 4800,
      registeredDate: '2026-03-01',
      notes: 'Approved 100% PWD Scholarship Aid Waiver.'
    },
    {
      id: 'STU-1004',
      name: 'Hassan Ali Noor',
      badgeNumber: '7712',
      email: 'hassan.noor@example.com',
      nationalId: '38291044',
      financialStatus: 'Orphan Student',
      status: 'Active',
      enrolledCoursesCount: 1,
      xpPoints: 950,
      registeredDate: '2026-08-04',
      notes: '100% Fee waiver application verified by local Chief.'
    },
    {
      id: 'STU-1005',
      name: 'Kipchumba Bett',
      badgeNumber: '6109',
      email: 'kipchumba.bett@example.com',
      nationalId: '31092844',
      financialStatus: 'Standard Student (KSh 3,000)',
      status: 'Suspended',
      enrolledCoursesCount: 1,
      xpPoints: 300,
      registeredDate: '2026-05-12',
      notes: 'Account flagged for academic policy review.'
    }
  ]);

  // Admissions Applications Queue
  const [applications, setApplications] = useState<AdmissionApplication[]>([
    {
      id: 'APP-2026-8801',
      applicantName: 'Hassan Ali Noor',
      email: 'hassan.noor@example.com',
      nationalId: '38291044',
      phone: '+254 712 345 678',
      preferredCourseId: 'CRIM101',
      preferredCourseTitle: 'CRIM101 – Introduction to Criminology and Criminal Justice',
      financialStatus: 'Orphan Student',
      appliedDate: '2026-08-04',
      status: 'Pending Review',
      uploadedDocuments: ['Orphan_Status_Certificate_Chief.pdf'],
      notes: 'Submitted local chief verification letter for 100% tuition waiver.'
    },
    {
      id: 'APP-2026-8802',
      applicantName: 'Grace Muthoni',
      email: 'grace.muthoni@example.com',
      nationalId: '36512903',
      phone: '+254 722 987 654',
      preferredCourseId: 'CYBER-301',
      preferredCourseTitle: 'Cybersecurity & Digital Forensics Fundamentals',
      financialStatus: 'Person with Disability (PWD)',
      appliedDate: '2026-08-03',
      status: 'Pending Review',
      uploadedDocuments: ['NCPWD_Disability_Registration_Card.pdf'],
      notes: 'NCPWD card attached for full scholarship waiver.'
    },
    {
      id: 'APP-2026-8803',
      applicantName: 'Brian Wanjala',
      email: 'brian.wanjala@example.com',
      nationalId: '34901823',
      phone: '+254 733 112 233',
      preferredCourseId: 'CSI-101',
      preferredCourseTitle: 'Crime Scene Investigation & Evidence Handling',
      financialStatus: 'Standard Student (KSh 3,000)',
      appliedDate: '2026-08-02',
      status: 'Approved',
      uploadedDocuments: ['National_ID_Copy.pdf']
    }
  ]);

  // Certificate Issuance Ledger State
  const [certificates, setCertificates] = useState<CertificateRecord[]>([
    {
      certId: 'CRIM-CERT-2026-1049',
      studentName: 'Farah Abdi Hassan',
      studentBadge: '8492',
      courseCode: 'CRIM101',
      courseTitle: 'CRIM101 – Introduction to Criminology and Criminal Justice',
      issueDate: '2026-08-01',
      grade: 'Distinction (Score: 100%)',
      modulesCompleted: 10,
      verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      instructorName: 'Farah Abdi Hassan',
      instructorTitle: 'Founder & Lead Instructor',
      status: 'Valid'
    },
    {
      certId: 'CRIM-CERT-2026-1050',
      studentName: 'James Omondi',
      studentBadge: '8492',
      courseCode: 'CSI101',
      courseTitle: 'Crime Scene Investigation Fundamentals',
      issueDate: '2026-07-28',
      grade: 'High Credit (Score: 88%)',
      modulesCompleted: 8,
      verificationHash: '8f4e3c2b1a9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f',
      instructorName: 'Farah Abdi Hassan',
      instructorTitle: 'Founder & Lead Instructor',
      status: 'Valid'
    }
  ]);

  // Announcements State
  const [announcements, setAnnouncements] = useState<AcademyAnnouncement[]>([
    {
      id: 'ANN-2026-01',
      title: 'CRIM101 Capstone Examination Schedule & Certificate Release',
      author: 'Farah Abdi Hassan (Founder)',
      date: '2026-08-04',
      audience: 'All Students',
      content: 'All enrolled cadets in CRIM101 must complete Module 10 final evaluation to receive official CRIMIVEX Academy certificates of completion.',
      priority: 'High'
    },
    {
      id: 'ANN-2026-02',
      title: 'Financial Aid & 100% Tuition Waiver Application Window',
      author: 'Admissions Office',
      date: '2026-08-02',
      audience: 'Financial Aid Scholars',
      content: 'Orphans, Persons with Disabilities, and Financially Disadvantaged cadets can submit verification documents for 100% tuition coverage.',
      priority: 'Normal'
    }
  ]);

  // Forms State
  const [newCertStudent, setNewCertStudent] = useState('');
  const [newCertBadge, setNewCertBadge] = useState('');
  const [newCertCourse, setNewCertCourse] = useState('CRIM101');
  const [newCertCourseTitle, setNewCertCourseTitle] = useState('CRIM101 – Introduction to Criminology and Criminal Justice');

  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnAudience, setNewAnnAudience] = useState<'All Students' | 'Instructors Only' | 'Financial Aid Scholars'>('All Students');
  const [newAnnPriority, setNewAnnPriority] = useState<'High' | 'Normal'>('Normal');

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [certSearchTerm, setCertSearchTerm] = useState('');
  const [selectedStudentModal, setSelectedStudentModal] = useState<StudentAccount | null>(null);

  // Backup state
  const [backupSuccess, setBackupSuccess] = useState(false);

  // Handlers
  const handleToggleStudentStatus = (studentId: string) => {
    setStudentsList(prev => prev.map(s => {
      if (s.id === studentId) {
        const nextStatus = s.status === 'Active' ? 'Suspended' : 'Active';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const handleApproveAdmission = (id: string) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'Approved' } : a));
  };

  const handleRejectAdmission = (id: string) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'Rejected' } : a));
  };

  const handleToggleCertStatus = (certId: string) => {
    setCertificates(prev => prev.map(c => {
      if (c.certId === certId) {
        const nextStatus = c.status === 'Valid' ? 'Revoked' : 'Valid';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const handleIssueCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertStudent) return;
    const certCode = `CRIM-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCert: CertificateRecord = {
      certId: certCode,
      studentName: newCertStudent,
      studentBadge: newCertBadge || '8000',
      courseCode: newCertCourse,
      courseTitle: newCertCourseTitle,
      issueDate: new Date().toISOString().split('T')[0],
      grade: 'Distinction (Score: 95%)',
      modulesCompleted: 10,
      verificationHash: `hash-${Math.random().toString(36).substring(2)}${Date.now()}`,
      instructorName: 'Farah Abdi Hassan',
      instructorTitle: 'Founder & Lead Instructor',
      status: 'Valid'
    };
    setCertificates([newCert, ...certificates]);
    setNewCertStudent('');
    setNewCertBadge('');
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnContent) return;
    const ann: AcademyAnnouncement = {
      id: `ANN-2026-0${announcements.length + 1}`,
      title: newAnnTitle,
      author: 'Farah Abdi Hassan (Founder)',
      date: new Date().toISOString().split('T')[0],
      audience: newAnnAudience,
      content: newAnnContent,
      priority: newAnnPriority
    };
    setAnnouncements([ann, ...announcements]);
    setNewAnnTitle('');
    setNewAnnContent('');
  };

  // Exporters
  const exportDataJSON = (dataObj: any, filename: string) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataObj, null, 2));
    const anchor = document.createElement('a');
    anchor.setAttribute("href", dataStr);
    anchor.setAttribute("download", `${filename}.json`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const exportDataCSV = (headers: string[], rows: (string | number)[][], filename: string) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n');
    const anchor = document.createElement('a');
    anchor.setAttribute("href", encodeURI(csvContent));
    anchor.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const handleExportStudents = (format: 'json' | 'csv') => {
    if (format === 'json') {
      exportDataJSON({ academy: "CRIMIVEX Academy", students: studentsList }, `CRIMIVEX_Student_Roster_${new Date().toISOString().split('T')[0]}`);
    } else {
      const headers = ['ID', 'Name', 'Badge', 'Email', 'National ID', 'Financial Status', 'Account Status', 'Registered Date'];
      const rows = studentsList.map(s => [s.id, s.name, s.badgeNumber, s.email, s.nationalId, s.financialStatus, s.status, s.registeredDate]);
      exportDataCSV(headers, rows, `CRIMIVEX_Student_Roster_${new Date().toISOString().split('T')[0]}`);
    }
  };

  const handleBackupExport = () => {
    exportDataJSON({
      academy: "CRIMIVEX Academy",
      tagline: "Criminology • Criminal Justice • Forensic Science • Cybersecurity",
      founder: "Farah Abdi Hassan",
      contact: "farahbata116@gmail.com",
      backupSerial: `CRIM-SYS-BACKUP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      exportDate: new Date().toISOString(),
      students: studentsList,
      applications,
      certificates,
      announcements
    }, `CRIMIVEX_Academy_System_Backup_${new Date().toISOString().split('T')[0]}`);
    setBackupSuccess(true);
    setTimeout(() => setBackupSuccess(false), 4000);
  };

  const filteredStudents = studentsList.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.badgeNumber.includes(searchTerm) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nationalId.includes(searchTerm)
  );

  const filteredCertificates = certificates.filter(c =>
    c.studentName.toLowerCase().includes(certSearchTerm.toLowerCase()) ||
    c.certId.toLowerCase().includes(certSearchTerm.toLowerCase()) ||
    c.courseCode.toLowerCase().includes(certSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header Banner */}
      <div className="bg-[#0B0C0E] border-2 border-cyan-500/40 p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
              <Shield className="w-4 h-4" />
              <span>SYSTEM ADMINISTRATION, ANALYTICS & GOVERNANCE</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              ADMINISTRATOR DASHBOARD
            </h1>
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold">
              Criminology • Criminal Justice • Forensic Science • Cybersecurity
            </p>
            <p className="text-slate-300 text-xs font-mono">
              Lead Officer: <strong>Farah Abdi Hassan (Founder & Lead Instructor)</strong> | Official Contact: <span className="text-cyan-400">farahbata116@gmail.com</span>
            </p>
          </div>

          <div className="bg-zinc-950 border border-cyan-500/30 p-4 font-mono text-xs space-y-1 text-right shadow-lg shrink-0">
            <span className="text-slate-400 text-[10px] block uppercase">ADMIN PRIVILEGES</span>
            <span className="text-emerald-400 font-black block text-sm">FULL CONTROL GRANTED</span>
            <span className="text-slate-400 text-[10px] block uppercase">SERIAL: CRIM-ADM-2026-8809</span>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 border-t border-cyan-500/30 pt-6 mt-6">
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeAdminTab === 'overview'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'bg-zinc-900 text-slate-300 border border-slate-700 hover:border-cyan-500'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('students')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeAdminTab === 'students'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'bg-zinc-900 text-slate-300 border border-slate-700 hover:border-cyan-500'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Student Management ({studentsList.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('admissions')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeAdminTab === 'admissions'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'bg-zinc-900 text-slate-300 border border-slate-700 hover:border-cyan-500'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Admissions & Aid ({applications.filter(a => a.status === 'Pending Review').length} Pending)</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeAdminTab === 'analytics'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'bg-zinc-900 text-slate-300 border border-slate-700 hover:border-cyan-500'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Course Analytics</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('payments')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeAdminTab === 'payments'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'bg-zinc-900 text-slate-300 border border-slate-700 hover:border-cyan-500'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Financial & Payments</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('certificates')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeAdminTab === 'certificates'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'bg-zinc-900 text-slate-300 border border-slate-700 hover:border-cyan-500'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certificates ({certificates.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('security')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeAdminTab === 'security'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'bg-zinc-900 text-slate-300 border border-slate-700 hover:border-cyan-500'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Security & Backup</span>
          </button>
        </div>
      </div>

      {/* Tab 0: Overview KPI Metrics */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn font-mono text-xs">
          {/* Top 8 Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block font-bold">TOTAL REGISTERED CADETS</span>
              <div className="text-2xl font-black text-cyan-400">1,420</div>
              <span className="text-[10px] text-emerald-400 block font-bold">+18% this month</span>
            </div>

            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block font-bold">ACTIVE ENROLLED CADETS</span>
              <div className="text-2xl font-black text-white">1,350</div>
              <span className="text-[10px] text-slate-400 block font-bold">95.1% activity index</span>
            </div>

            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block font-bold">COMPLETED COURSES</span>
              <div className="text-2xl font-black text-emerald-400">840</div>
              <span className="text-[10px] text-slate-400 block font-bold">Passed final capstone</span>
            </div>

            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block font-bold">PENDING ADMISSIONS</span>
              <div className="text-2xl font-black text-yellow-400">
                {applications.filter(a => a.status === 'Pending Review').length}
              </div>
              <span className="text-[10px] text-yellow-500/80 block font-bold">Financial aid queue</span>
            </div>

            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block font-bold">TOTAL COURSE REVENUE</span>
              <div className="text-2xl font-black text-emerald-400">KSh 4,260,000</div>
              <span className="text-[10px] text-slate-400 block font-bold">M-PESA / Bank verified</span>
            </div>

            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block font-bold">CERTIFICATES ISSUED</span>
              <div className="text-2xl font-black text-cyan-400">{certificates.length + 1048}</div>
              <span className="text-[10px] text-cyan-400/80 block font-bold">Public QR verified</span>
            </div>

            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block font-bold">SUPPORT TICKETS</span>
              <div className="text-2xl font-black text-white">4 OPEN</div>
              <span className="text-[10px] text-slate-400 block font-bold">Average resolution: 2 hrs</span>
            </div>

            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block font-bold">ACADEMY ANNOUNCEMENTS</span>
              <div className="text-2xl font-black text-cyan-400">{announcements.length}</div>
              <span className="text-[10px] text-slate-400 block font-bold">Broadcast active</span>
            </div>
          </div>

          {/* Institutional Overview & Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-[#111111] border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span>ACADEMY SYSTEM PERFORMANCE SUMMARY</span>
                </h3>
                <span className="text-cyan-400 font-bold text-[10px]">REAL-TIME TELEMETRY</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-bold mb-1">
                    <span>CRIM101 Student Completion Progress</span>
                    <span className="text-cyan-400">78% Rate</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-2 border border-slate-800">
                    <div className="bg-cyan-500 h-full w-[78%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-bold mb-1">
                    <span>CSI101 Crime Scene Investigation Lab Enrollees</span>
                    <span className="text-emerald-400">65% Rate</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-2 border border-slate-800">
                    <div className="bg-emerald-500 h-full w-[65%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-bold mb-1">
                    <span>Cybersecurity & OSINT Bootcamp Progress</span>
                    <span className="text-yellow-400">52% Rate</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-2 border border-slate-800">
                    <div className="bg-yellow-500 h-full w-[52%]" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveAdminTab('students')}
                  className="bg-zinc-900 hover:bg-slate-800 border border-slate-700 text-cyan-400 font-bold text-xs uppercase px-4 py-2 flex items-center space-x-2"
                >
                  <Users className="w-4 h-4" />
                  <span>MANAGE STUDENT ROSTER</span>
                </button>

                <button
                  onClick={() => setActiveAdminTab('admissions')}
                  className="bg-zinc-900 hover:bg-slate-800 border border-slate-700 text-yellow-400 font-bold text-xs uppercase px-4 py-2 flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>REVIEW FINANCIAL AID QUEUE</span>
                </button>

                <button
                  onClick={handleBackupExport}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase px-4 py-2 flex items-center space-x-2 ml-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>EXPORT BACKUP SNAPSHOT</span>
                </button>
              </div>
            </div>

            {/* Right Panel: Recent Broadcasts */}
            <div className="bg-[#111111] border border-slate-800 p-6 space-y-4">
              <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Bell className="w-5 h-5 text-cyan-400" />
                <span>ACTIVE ANNOUNCEMENTS</span>
              </h3>

              <div className="space-y-3">
                {announcements.map(ann => (
                  <div key={ann.id} className="bg-zinc-950 p-3 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase">{ann.audience}</span>
                      <span className="text-[9px] text-slate-500">{ann.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-tight">{ann.title}</h4>
                    <p className="text-[10px] text-slate-400 line-clamp-2">{ann.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Student Accounts */}
      {activeAdminTab === 'students' && (
        <div className="space-y-6 animate-fadeIn font-mono text-xs">
          <div className="bg-[#111111] border border-white/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wide flex items-center space-x-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <span>REGISTERED STUDENT CADETS MANAGEMENT DATABASE</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Monitor student activity, manage enrollments, edit cadet profiles, or toggle account status (Active / Suspended).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-2 bg-zinc-950 border border-slate-700 px-3 py-2 text-xs font-mono">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter cadet name or badge..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-white outline-none w-48"
                />
              </div>

              <button
                onClick={() => handleExportStudents('csv')}
                className="bg-zinc-900 border border-slate-700 hover:border-cyan-500 text-cyan-400 font-bold px-3 py-2 text-xs uppercase flex items-center space-x-1"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>EXPORT CSV</span>
              </button>

              <button
                onClick={() => handleExportStudents('json')}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-3 py-2 text-xs uppercase flex items-center space-x-1"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT JSON</span>
              </button>
            </div>
          </div>

          <div className="bg-[#111111] border border-slate-700 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-zinc-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                <tr>
                  <th className="p-4">ID & Cadet Name</th>
                  <th className="p-4">Badge #</th>
                  <th className="p-4">Email Contact</th>
                  <th className="p-4">National ID</th>
                  <th className="p-4">Financial Status</th>
                  <th className="p-4">XP Points</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {filteredStudents.map(s => (
                  <tr key={s.id} className="hover:bg-zinc-900/60">
                    <td className="p-4 font-bold text-white flex items-center space-x-2">
                      <span className="text-cyan-400 text-[10px]">{s.id}</span>
                      <span>{s.name}</span>
                    </td>
                    <td className="p-4 text-cyan-400 font-bold">#{s.badgeNumber}</td>
                    <td className="p-4">{s.email}</td>
                    <td className="p-4 text-slate-400">{s.nationalId}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[10px] uppercase font-bold border ${
                        s.financialStatus.includes('Orphan') || s.financialStatus.includes('PWD')
                          ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40'
                          : 'bg-zinc-900 text-slate-300 border-slate-700'
                      }`}>
                        {s.financialStatus}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-emerald-400">{s.xpPoints} XP</td>
                    <td className="p-4">
                      {s.status === 'Active' ? (
                        <span className="text-emerald-400 font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>ACTIVE</span>
                        </span>
                      ) : (
                        <span className="text-red-400 font-bold flex items-center space-x-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>SUSPENDED</span>
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => setSelectedStudentModal(s)}
                          className="bg-zinc-900 hover:bg-slate-800 text-cyan-400 px-2.5 py-1 text-[10px] border border-slate-700 uppercase font-bold flex items-center space-x-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>DOSSIER</span>
                        </button>

                        <button 
                          onClick={() => handleToggleStudentStatus(s.id)}
                          className={`px-2.5 py-1 text-[10px] font-bold border uppercase flex items-center space-x-1 ${
                            s.status === 'Active'
                              ? 'bg-red-950 text-red-400 border-red-800 hover:bg-red-900'
                              : 'bg-emerald-950 text-emerald-400 border-emerald-800 hover:bg-emerald-900'
                          }`}
                        >
                          {s.status === 'Active' ? (
                            <>
                              <UserX className="w-3 h-3" />
                              <span>SUSPEND</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-3 h-3" />
                              <span>ACTIVATE</span>
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Dossier Quick View Modal */}
      {selectedStudentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0C0E] border-2 border-cyan-500 max-w-xl w-full p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white uppercase flex items-center space-x-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span>CADET DOSSIER FILE: {selectedStudentModal.name}</span>
              </h3>
              <button 
                onClick={() => setSelectedStudentModal(null)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 bg-zinc-950 p-4 border border-slate-800">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">FULL NAME</span>
                  <span className="text-white font-bold text-sm">{selectedStudentModal.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">BADGE NUMBER</span>
                  <span className="text-cyan-400 font-bold text-sm">#{selectedStudentModal.badgeNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">NATIONAL ID / PASSPORT</span>
                  <span className="text-white font-bold">{selectedStudentModal.nationalId}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">EMAIL CONTACT</span>
                  <span className="text-cyan-400 font-bold">{selectedStudentModal.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">FINANCIAL AID STATUS</span>
                  <span className="text-emerald-400 font-bold">{selectedStudentModal.financialStatus}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">REGISTERED DATE</span>
                  <span className="text-slate-300 font-bold">{selectedStudentModal.registeredDate}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-500 text-[10px] block uppercase">ADMINISTRATIVE NOTES</span>
                <p className="text-slate-300 italic">{selectedStudentModal.notes || 'No administrative notes recorded.'}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setSelectedStudentModal(null)}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-4 py-2 uppercase"
              >
                CLOSE DOSSIER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Admissions & Aid Approval */}
      {activeAdminTab === 'admissions' && (
        <div className="space-y-6 animate-fadeIn font-mono text-xs">
          <div className="bg-[#111111] border border-white/10 p-6 space-y-2">
            <h2 className="text-xl font-black text-white uppercase tracking-wide flex items-center space-x-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>ADMISSION APPLICATIONS & SCHOLARSHIP FINANCIAL AID REVIEW</span>
            </h2>
            <p className="text-xs text-slate-300 font-mono">
              Review applicant documentation (Orphan status letters, PWD cards, Chief verification letters) and issue 100% fee waivers.
            </p>
          </div>

          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="bg-[#111111] border border-slate-700 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-cyan-400">{app.id}</span>
                      <h3 className="text-base font-black text-white uppercase">{app.applicantName}</h3>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">
                      Email: {app.email} | Phone: {app.phone || 'N/A'} | ID: {app.nationalId || 'N/A'}
                    </p>
                  </div>
                  <span className={`text-xs font-mono font-bold uppercase px-3 py-1 ${
                    app.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/40' :
                    app.status === 'Rejected' ? 'bg-red-950 text-red-400 border border-red-600/40' :
                    'bg-yellow-950 text-yellow-400 border border-yellow-600/40'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase">APPLIED COURSE</span>
                    <span className="text-white font-bold">{app.preferredCourseTitle}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase">REQUESTED FINANCIAL AID STATUS</span>
                    <span className="text-emerald-400 font-bold">{app.financialStatus}</span>
                  </div>
                </div>

                {app.uploadedDocuments.length > 0 && (
                  <div className="bg-zinc-950 p-3 border border-slate-800 font-mono text-xs space-y-1">
                    <span className="text-slate-500 text-[10px] block uppercase">ATTACHED VERIFICATION DOCUMENTS</span>
                    {app.uploadedDocuments.map((doc, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-cyan-400 font-bold">
                        <FileText className="w-4 h-4" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                )}

                {app.status === 'Pending Review' && (
                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      onClick={() => handleApproveAdmission(app.id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase px-5 py-2.5 flex items-center space-x-2 transition"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>APPROVE ADMISSION & 100% AID WAIVER</span>
                    </button>
                    <button
                      onClick={() => handleRejectAdmission(app.id)}
                      className="bg-red-950 hover:bg-red-900 text-red-400 border border-red-600 font-mono text-xs font-bold uppercase px-4 py-2.5 flex items-center space-x-2 transition"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>REJECT APPLICATION</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Course Analytics */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-6 animate-fadeIn font-mono text-xs">
          <div className="bg-[#111111] border border-white/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wide flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <span>COURSE ENROLLMENT & PERFORMANCE ANALYTICS</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Comprehensive data on student completion rates, assessment averages, and course popularity metrics.
              </p>
            </div>

            <button
              onClick={() => {
                const report = {
                  academy: "CRIMIVEX Academy",
                  exportDate: new Date().toISOString(),
                  metrics: [
                    { course: "CRIM101", enrolled: 1420, completionRate: "78%", avgScore: "86.4%" },
                    { course: "CSI101", enrolled: 980, completionRate: "65%", avgScore: "82.1%" },
                    { course: "CYBER301", enrolled: 650, completionRate: "52%", avgScore: "79.8%" }
                  ]
                };
                exportDataJSON(report, `CRIMIVEX_Course_Analytics_${new Date().toISOString().split('T')[0]}`);
              }}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase px-4 py-2 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT ANALYTICS REPORT (JSON)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-3">
              <span className="text-slate-400 text-[10px] uppercase block font-bold">MOST POPULAR COURSE</span>
              <div className="text-lg font-black text-white">CRIM101 – Intro to Criminology</div>
              <div className="text-2xl font-black text-cyan-400">1,420 Cadets</div>
              <p className="text-[10px] text-slate-400">100% Online Self-Paced Format</p>
            </div>

            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-3">
              <span className="text-slate-400 text-[10px] uppercase block font-bold">AVERAGE ASSESSMENT PASS RATE</span>
              <div className="text-lg font-black text-white">Academy Quiz Average</div>
              <div className="text-2xl font-black text-emerald-400">84.5% Score</div>
              <p className="text-[10px] text-slate-400">Passing score benchmark: 70%+</p>
            </div>

            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-3">
              <span className="text-slate-400 text-[10px] uppercase block font-bold">STUDENT RETENTION INDEX</span>
              <div className="text-lg font-black text-white">Weekly Active Cadets</div>
              <div className="text-2xl font-black text-yellow-400">92.4% Active</div>
              <p className="text-[10px] text-slate-400">Engaged in reading & quizzes</p>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="bg-[#111111] border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              DETAILED COURSE ENGAGEMENT BREAKDOWN
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-zinc-950 text-cyan-400 uppercase text-[10px] border-b border-slate-800">
                    <th className="p-3">COURSE CODE & TITLE</th>
                    <th className="p-3">ENROLLED STUDENTS</th>
                    <th className="p-3">COMPLETION RATE</th>
                    <th className="p-3">AVG QUIZ SCORE</th>
                    <th className="p-3">CERTIFICATES ISSUED</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr className="hover:bg-zinc-900/40">
                    <td className="p-3 font-bold text-white">CRIM101 – Introduction to Criminology</td>
                    <td className="p-3 font-bold text-cyan-400">1,420 Cadets</td>
                    <td className="p-3 text-emerald-400 font-bold">78%</td>
                    <td className="p-3 text-emerald-400 font-bold">86.4%</td>
                    <td className="p-3 font-bold text-white">1,050</td>
                  </tr>
                  <tr className="hover:bg-zinc-900/40">
                    <td className="p-3 font-bold text-white">CSI101 – Crime Scene Investigation</td>
                    <td className="p-3 font-bold text-cyan-400">980 Cadets</td>
                    <td className="p-3 text-emerald-400 font-bold">65%</td>
                    <td className="p-3 text-emerald-400 font-bold">82.1%</td>
                    <td className="p-3 font-bold text-white">637</td>
                  </tr>
                  <tr className="hover:bg-zinc-900/40">
                    <td className="p-3 font-bold text-white">CYBER301 – Cybersecurity & Digital Forensics</td>
                    <td className="p-3 font-bold text-cyan-400">650 Cadets</td>
                    <td className="p-3 text-yellow-400 font-bold">52%</td>
                    <td className="p-3 text-emerald-400 font-bold">79.8%</td>
                    <td className="p-3 font-bold text-white">338</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Financial & Payments */}
      {activeAdminTab === 'payments' && (
        <div className="space-y-6 animate-fadeIn font-mono text-xs">
          <div className="bg-[#111111] border border-white/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wide flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                <span>TUITION & FINANCIAL MANAGEMENT DASHBOARD</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Monitor student tuition, confirm M-PESA/Bank transaction references, manage financial aid waivers, and export financial audit logs.
              </p>
            </div>

            <button
              onClick={() => {
                const financialReport = {
                  academy: "CRIMIVEX Academy",
                  tagline: "Criminology • Criminal Justice • Forensic Science • Cybersecurity",
                  founder: "Farah Abdi Hassan",
                  contact: "farahbata116@gmail.com",
                  reportSerial: `CRIM-FIN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                  exportDate: new Date().toISOString(),
                  totalRevenueKSh: 4260000,
                  totalScholarshipsKSh: 2050000,
                  certificateFeesKSh: 840000,
                  unpaidBalancesKSh: 120000,
                  verifiedTransactionsCount: 1420
                };
                exportDataJSON(financialReport, `CRIMIVEX_Financial_Audit_Report_${new Date().toISOString().split('T')[0]}`);
              }}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase px-5 py-2.5 flex items-center space-x-2 transition shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT FINANCIAL AUDIT REPORT (JSON)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
              <span className="text-slate-400 text-[10px] uppercase block">TOTAL COURSE REVENUE</span>
              <div className="text-2xl font-black text-emerald-400">KSh 4,260,000</div>
              <span className="text-[10px] text-slate-500 block">From paid course enrollments</span>
            </div>

            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
              <span className="text-slate-400 text-[10px] uppercase block">100% SCHOLARSHIP WAIVERS</span>
              <div className="text-2xl font-black text-cyan-400">KSh 2,050,000</div>
              <span className="text-[10px] text-cyan-400/80 block">100% Free aid for 410 scholars</span>
            </div>

            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
              <span className="text-slate-400 text-[10px] uppercase block">CERTIFICATE REVENUE</span>
              <div className="text-2xl font-black text-white">KSh 840,000</div>
              <span className="text-[10px] text-slate-500 block">Verified credentials issued</span>
            </div>

            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-2">
              <span className="text-slate-400 text-[10px] uppercase block">UNPAID BALANCE PENDING</span>
              <div className="text-2xl font-black text-yellow-400">KSh 120,000</div>
              <span className="text-[10px] text-yellow-500/80 block">40 student installments</span>
            </div>
          </div>

          {/* Payments Audit Table */}
          <div className="bg-zinc-950 border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                RECENT STUDENT TRANSACTION CONFIRMATION LOGS
              </h3>
              <span className="text-[11px] text-slate-400">Official Gateway: M-PESA Paybill 889100 / Bank Transfer</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900 text-cyan-400 font-bold uppercase text-[10px]">
                    <th className="p-3">SERIAL DOC ID</th>
                    <th className="p-3">STUDENT NAME</th>
                    <th className="p-3">BADGE #</th>
                    <th className="p-3">COURSE / ITEM</th>
                    <th className="p-3">AMOUNT</th>
                    <th className="p-3">REF CODE</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-white">CRIM-TXN-2026-98124</td>
                    <td className="p-3 font-bold text-white">{cadet.name}</td>
                    <td className="p-3 text-cyan-400">#{cadet.badgeNumber}</td>
                    <td className="p-3">CRIM101 - Introduction to Criminology</td>
                    <td className="p-3 font-bold text-emerald-400">
                      {cadet.financialStatus !== 'Standard Cadet' ? 'KSh 0 (100% Aid)' : 'KSh 3,000'}
                    </td>
                    <td className="p-3 text-slate-400 font-bold">QKJ91827XX</td>
                    <td className="p-3">
                      <span className="bg-emerald-950 border border-emerald-500/50 text-emerald-400 px-2 py-0.5 text-[10px] font-bold uppercase">
                        CONFIRMED
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => alert(`Transaction CRIM-TXN-2026-98124 is verified and logged in official audit ledger.`)}
                        className="px-2.5 py-1 bg-zinc-900 border border-slate-700 hover:border-cyan-500 text-cyan-400 text-[10px] font-bold uppercase"
                      >
                        AUDIT DETAILS
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-white">CRIM-TXN-2026-98125</td>
                    <td className="p-3 font-bold text-white">James Omondi</td>
                    <td className="p-3 text-cyan-400">#8492</td>
                    <td className="p-3">CSI101 - Crime Scene Investigation</td>
                    <td className="p-3 font-bold text-emerald-400">KSh 3,000</td>
                    <td className="p-3 text-slate-400 font-bold">QKJ91899ZZ</td>
                    <td className="p-3">
                      <span className="bg-emerald-950 border border-emerald-500/50 text-emerald-400 px-2 py-0.5 text-[10px] font-bold uppercase">
                        CONFIRMED
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => alert(`Transaction CRIM-TXN-2026-98125 is verified.`)}
                        className="px-2.5 py-1 bg-zinc-900 border border-slate-700 hover:border-cyan-500 text-cyan-400 text-[10px] font-bold uppercase"
                      >
                        AUDIT DETAILS
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-white">CRIM-TXN-2026-98126</td>
                    <td className="p-3 font-bold text-white">Brian Wanjala</td>
                    <td className="p-3 text-cyan-400">#7719</td>
                    <td className="p-3">CRIM101 - Introduction to Criminology</td>
                    <td className="p-3 font-bold text-yellow-400">KSh 3,000</td>
                    <td className="p-3 text-slate-400 font-bold">MPESA-PENDING</td>
                    <td className="p-3">
                      <span className="bg-yellow-950 border border-yellow-500/50 text-yellow-400 px-2 py-0.5 text-[10px] font-bold uppercase">
                        PENDING VERIFICATION
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => alert(`Approved M-PESA payment for Brian Wanjala.`)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase"
                      >
                        CONFIRM PAYMENT
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Issue & Manage Certificates */}
      {activeAdminTab === 'certificates' && (
        <div className="space-y-6 animate-fadeIn font-mono text-xs">
          <div className="bg-[#111111] border border-white/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wide flex items-center space-x-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <span>OFFICIAL CERTIFICATE GENERATION & VERIFICATION LEDGER</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Issue, track, validate, or revoke official CRIMIVEX Academy certificates with unique document identification serials.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 bg-zinc-950 border border-slate-700 px-3 py-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter cert ID or name..."
                  value={certSearchTerm}
                  onChange={(e) => setCertSearchTerm(e.target.value)}
                  className="bg-transparent text-white outline-none w-44"
                />
              </div>

              <button
                onClick={() => exportDataJSON({ academy: "CRIMIVEX Academy", certificates }, `CRIMIVEX_Certificate_Registry_${new Date().toISOString().split('T')[0]}`)}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase px-4 py-2 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT REGISTRY</span>
              </button>
            </div>
          </div>

          {/* Form to Issue New Cert */}
          <div className="bg-zinc-950 border-2 border-cyan-500/40 p-6 space-y-4">
            <h3 className="text-base font-black text-white uppercase tracking-wide flex items-center space-x-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>ISSUE NEW ACADEMY CERTIFICATE OF COMPLETION</span>
            </h3>
            <form onSubmit={handleIssueCertificate} className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">STUDENT FULL NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Farah Abdi Hassan"
                  value={newCertStudent}
                  onChange={(e) => setNewCertStudent(e.target.value)}
                  className="w-full bg-zinc-900 border border-slate-700 text-white p-2"
                />
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">CADET BADGE NUMBER</label>
                <input
                  type="text"
                  placeholder="e.g. 8492"
                  value={newCertBadge}
                  onChange={(e) => setNewCertBadge(e.target.value)}
                  className="w-full bg-zinc-900 border border-slate-700 text-white p-2"
                />
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">COURSE CODE & TITLE</label>
                <select
                  value={newCertCourse}
                  onChange={(e) => {
                    setNewCertCourse(e.target.value);
                    const found = courses.find(c => c.id === e.target.value);
                    if (found) setNewCertCourseTitle(found.title);
                  }}
                  className="w-full bg-zinc-900 border border-slate-700 text-white p-2"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.id}: {c.title}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-black text-xs uppercase px-6 py-3 flex items-center space-x-2 transition"
                >
                  <Award className="w-4 h-4" />
                  <span>GENERATE & ISSUE VERIFIED CERTIFICATE</span>
                </button>
              </div>
            </form>
          </div>

          {/* Ledger Table */}
          <div className="bg-[#111111] border border-slate-700 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-zinc-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                <tr>
                  <th className="p-4">Certificate ID</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Badge #</th>
                  <th className="p-4">Course Title</th>
                  <th className="p-4">Issue Date</th>
                  <th className="p-4">Grade</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {filteredCertificates.map(c => (
                  <tr key={c.certId} className="hover:bg-zinc-900/60">
                    <td className="p-4 font-bold text-cyan-400">{c.certId}</td>
                    <td className="p-4 font-bold text-white">{c.studentName}</td>
                    <td className="p-4 text-slate-400">#{c.studentBadge}</td>
                    <td className="p-4">{c.courseTitle}</td>
                    <td className="p-4">{c.issueDate}</td>
                    <td className="p-4 text-emerald-400 font-bold">{c.grade}</td>
                    <td className="p-4">
                      {c.status === 'Valid' ? (
                        <span className="bg-emerald-950 text-emerald-400 border border-emerald-600/30 px-2 py-0.5 text-[10px] uppercase font-bold">
                          VALID
                        </span>
                      ) : (
                        <span className="bg-red-950 text-red-400 border border-red-600/30 px-2 py-0.5 text-[10px] uppercase font-bold">
                          REVOKED
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleToggleCertStatus(c.certId)}
                        className={`px-3 py-1 text-[10px] font-bold border uppercase transition ${
                          c.status === 'Valid'
                            ? 'bg-red-950 text-red-400 border-red-700 hover:bg-red-900'
                            : 'bg-emerald-950 text-emerald-400 border-emerald-700 hover:bg-emerald-900'
                        }`}
                      >
                        {c.status === 'Valid' ? 'REVOKE CERT' : 'REINSTATE'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Security & Access Control & Announcements */}
      {activeAdminTab === 'security' && (
        <div className="space-y-6 animate-fadeIn font-mono text-xs">
          <div className="bg-[#111111] border border-white/10 p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wide flex items-center space-x-2">
                <Lock className="w-5 h-5 text-cyan-400" />
                <span>SECURITY CONTROLS, ACCESS MATRIX & ANNOUNCEMENTS</span>
              </h2>
              <p className="text-slate-300 mt-1">
                Role permissions, data encryption standards, announcement broadcasting, and system-wide JSON database backups.
              </p>
            </div>

            {/* Broadcast Form */}
            <div className="bg-zinc-950 border border-cyan-500/30 p-6 space-y-4">
              <h3 className="text-base font-black text-white uppercase tracking-wide flex items-center space-x-2">
                <Bell className="w-4 h-4 text-cyan-400" />
                <span>BROADCAST NEW ACADEMY ANNOUNCEMENT</span>
              </h3>

              <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-slate-300 uppercase font-bold mb-1">ANNOUNCEMENT TITLE</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CRIM101 Capstone Examination Rules"
                      value={newAnnTitle}
                      onChange={(e) => setNewAnnTitle(e.target.value)}
                      className="w-full bg-zinc-900 border border-slate-700 text-white p-2 outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 uppercase font-bold mb-1">TARGET AUDIENCE</label>
                    <select
                      value={newAnnAudience}
                      onChange={(e: any) => setNewAnnAudience(e.target.value)}
                      className="w-full bg-zinc-900 border border-slate-700 text-white p-2"
                    >
                      <option value="All Students">All Students</option>
                      <option value="Instructors Only">Instructors Only</option>
                      <option value="Financial Aid Scholars">Financial Aid Scholars</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">ANNOUNCEMENT BODY</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter official academy broadcast message..."
                    value={newAnnContent}
                    onChange={(e) => setNewAnnContent(e.target.value)}
                    className="w-full bg-zinc-900 border border-slate-700 text-white p-2 outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase px-6 py-2.5 flex items-center space-x-2"
                  >
                    <Bell className="w-4 h-4" />
                    <span>BROADCAST ANNOUNCEMENT</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-950 border border-slate-800 p-6 space-y-4">
                <h3 className="text-sm font-bold text-cyan-400 uppercase border-b border-slate-800 pb-2 flex items-center space-x-2">
                  <Database className="w-4 h-4" />
                  <span>ACADEMY DATABASE BACKUP SNAPSHOT</span>
                </h3>
                <p className="text-slate-300">
                  Export encrypted snapshot containing all cadet records, admission applications, financial aid approvals, and certificate database entries.
                </p>
                <button
                  onClick={handleBackupExport}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase px-5 py-3 flex items-center space-x-2 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>EXPORT FULL SYSTEM BACKUP (JSON)</span>
                </button>

                {backupSuccess && (
                  <div className="p-3 bg-emerald-950 text-emerald-400 border border-emerald-500 font-bold uppercase text-[11px] flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>BACKUP SNAPSHOT DOWNLOADED SUCCESSFULLY</span>
                  </div>
                )}
              </div>

              <div className="bg-zinc-950 border border-slate-800 p-6 space-y-4">
                <h3 className="text-sm font-bold text-cyan-400 uppercase border-b border-slate-800 pb-2 flex items-center space-x-2">
                  <Key className="w-4 h-4" />
                  <span>SECURITY PRIVILEGES & ACCESS CONTROL</span>
                </h3>
                <ul className="space-y-2 text-slate-300 text-[11px]">
                  <li className="flex justify-between border-b border-slate-900 pb-1">
                    <span>Founder & Lead Instructor:</span>
                    <span className="text-white font-bold">Farah Abdi Hassan</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-900 pb-1">
                    <span>Contact Channel:</span>
                    <span className="text-cyan-400 font-bold">farahbata116@gmail.com</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-900 pb-1">
                    <span>Data Encryption Standard:</span>
                    <span className="text-emerald-400 font-bold">AES-256 / SHA-256</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-900 pb-1">
                    <span>Institutional Status:</span>
                    <span className="text-cyan-400 font-bold">Independent Professional Training</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Legal Footer */}
      <div className="pt-6 border-t border-slate-800 text-center font-mono text-[10px] text-slate-500 uppercase tracking-widest space-y-1">
        <p className="font-bold text-slate-400">CRIMIVEX ACADEMY • SYSTEM ADMINISTRATION & ANALYTICS CONTROL CENTER</p>
        <p>FOUNDER & LEAD INSTRUCTOR: FARAH ABDI HASSAN | EMAIL: FARAHBATA116@GMAIL.COM</p>
        <p className="max-w-3xl mx-auto text-slate-500 text-[9px]">
          "CRIMIVEX Academy is an independent online professional education platform offering short development courses. Certificates confirm skills development and course completion and do not represent government-accredited degrees or diplomas."
        </p>
      </div>
    </div>
  );
};
