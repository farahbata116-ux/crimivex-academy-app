import React, { useState } from 'react';
import { 
  Shield, 
  BookOpen, 
  Plus, 
  FileText, 
  CheckCircle2, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Search, 
  GraduationCap, 
  Award,
  Upload,
  Download,
  AlertCircle,
  Clock,
  Send,
  Sparkles
} from 'lucide-react';
import { Course, StudentSubmission } from '../types';

interface InstructorDashboardProps {
  courses: Course[];
  onAddCourse?: (newCourse: Course) => void;
}

export const InstructorDashboardView: React.FC<InstructorDashboardProps> = ({
  courses,
  onAddCourse
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'manage-courses' | 'submissions' | 'communications' | 'reports'>('overview');

  // Dummy Initial Submissions to review
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([
    {
      id: 'sub-001',
      studentName: 'Cadet James Omondi',
      badgeNumber: '8492',
      courseId: 'CRIM-101',
      courseTitle: 'CRIM101: Introduction to Criminology and Criminal Justice',
      lessonTitle: '1.2 Classical vs. Positivist Theories Case Response',
      submittedDate: '2026-08-04',
      submissionText: 'Comparing Beccaria and Lombroso: Biological determinism falls short in explaining modern cyber financial crimes, whereas rational choice theory accurately predicts calculated fraud risks.',
      score: 95,
      maxScore: 100,
      status: 'Graded',
      feedback: 'Exceptional synthesis of classical criminological framework applied to cyber scenarios.'
    },
    {
      id: 'sub-002',
      studentName: 'Cadet Amina Said',
      badgeNumber: '9103',
      courseId: 'CSI-101',
      courseTitle: 'Crime Scene Investigation Fundamentals',
      lessonTitle: '2.1 Chain of Custody Preservation Plan',
      submittedDate: '2026-08-03',
      submissionText: 'Detailed inventory of bloodstain pattern evidence collection using sterile swabs, tamper-evident evidence bags, and tamper-proof security seals.',
      maxScore: 100,
      status: 'Pending Review'
    },
    {
      id: 'sub-003',
      studentName: 'Cadet David Kiprop',
      badgeNumber: '7320',
      courseId: 'CYBER-301',
      courseTitle: 'Cybersecurity Bootcamp',
      lessonTitle: '3.1 Threat Vector Mitigation Strategy',
      submittedDate: '2026-08-02',
      submissionText: 'Implemented multi-layer defense-in-depth model combining network segmentation, intrusion detection systems (IDS), and strict identity access management (IAM).',
      maxScore: 100,
      status: 'Pending Review'
    }
  ]);

  // Grading Modal state
  const [selectedSub, setSelectedSub] = useState<StudentSubmission | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(90);
  const [feedbackInput, setFeedbackInput] = useState<string>('');

  // Course Creation Modal state
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Criminology & Criminal Justice');
  const [newDuration, setNewDuration] = useState('6 Weeks (8 Modules)');
  const [newDesc, setNewDesc] = useState('');

  // Communications state
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;
    setSubmissions(prev => prev.map(s => s.id === selectedSub.id ? {
      ...s,
      score: gradeInput,
      feedback: feedbackInput || 'Great effort. Syllabus criteria satisfied.',
      status: 'Graded'
    } : s));
    setSelectedSub(null);
  };

  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const created: Course = {
      id: `CRIM-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      subtitle: newDesc.slice(0, 100) || 'Official CRIMIVEX Academy Course',
      category: newCategory as any,
      level: 'Intermediate Field',
      instructor: {
        name: 'Farah Abdi Hassan',
        title: 'Founder & Lead Instructor',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      },
      duration: newDuration,
      durationHours: 24,
      prerequisites: ['CRIM101 or Equivalent Fundamentals'],
      courseFee: 3000,
      certificateFee: 2000,
      totalModules: 6,
      enrolledCount: 1,
      rating: 5.0,
      badgeEarned: 'Certified Field Specialist',
      coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      description: newDesc || 'Comprehensive academy course covering theoretical foundations, text-based case studies, assignments, and practical field methodologies.',
      modules: []
    };
    if (onAddCourse) onAddCourse(created);
    setIsCreatingCourse(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Official Header Block */}
      <div className="bg-[#0B0C0E] border-2 border-cyan-500/40 p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
              <Shield className="w-4 h-4" />
              <span>FACULTY LEAD INSTRUCTOR DASHBOARD</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              INSTRUCTOR CONTROL CENTER
            </h1>
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold">
              Criminology • Criminal Justice • Forensic Science • Cybersecurity
            </p>
            <p className="text-slate-300 text-xs font-mono max-w-2xl">
              Lead Instructor: <strong>Farah Abdi Hassan</strong> | Contact: <span className="text-cyan-400">farahbata116@gmail.com</span>
            </p>
          </div>

          <div className="bg-zinc-950 border border-cyan-500/30 p-4 font-mono text-xs space-y-1.5 text-right shadow-lg shrink-0">
            <span className="text-slate-400 text-[10px] block uppercase">ACADEMY STATUS</span>
            <span className="text-emerald-400 font-black block text-sm">ACTIVE FACULTY PORTAL</span>
            <span className="text-slate-400 text-[10px] block uppercase">SERIES ID: CRIM-FAC-2026-001</span>
          </div>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-t border-cyan-500/30 pt-6 mt-6">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeSubTab === 'overview'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'bg-zinc-900 text-slate-300 border border-slate-700 hover:border-cyan-500'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Faculty Overview</span>
          </button>

          <button
            onClick={() => setActiveSubTab('manage-courses')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeSubTab === 'manage-courses'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'bg-zinc-900 text-slate-300 border border-slate-700 hover:border-cyan-500'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Manage Curriculum ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('submissions')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeSubTab === 'submissions'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'bg-zinc-900 text-slate-300 border border-slate-700 hover:border-cyan-500'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Grade Assignments ({submissions.filter(s => s.status === 'Pending Review').length} Pending)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('communications')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeSubTab === 'communications'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'bg-zinc-900 text-slate-300 border border-slate-700 hover:border-cyan-500'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Student Announcements</span>
          </button>

          <button
            onClick={() => setActiveSubTab('reports')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeSubTab === 'reports'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'bg-zinc-900 text-slate-300 border border-slate-700 hover:border-cyan-500'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Course Reports</span>
          </button>
        </div>
      </div>

      {/* Overview Stats SubTab */}
      {activeSubTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#111111] border border-cyan-500/30 p-5 space-y-1">
              <div className="flex items-center justify-between text-slate-400 font-mono text-xs uppercase font-bold">
                <span>TOTAL ENROLLED CADETS</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-black text-white">4,270</div>
              <span className="text-[10px] font-mono text-emerald-400 block">+14% Growth this month</span>
            </div>

            <div className="bg-[#111111] border border-cyan-500/30 p-5 space-y-1">
              <div className="flex items-center justify-between text-slate-400 font-mono text-xs uppercase font-bold">
                <span>ACTIVE CURRICULUM</span>
                <BookOpen className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-black text-white">{courses.length}</div>
              <span className="text-[10px] font-mono text-slate-400 block">Text Readers & Assignments</span>
            </div>

            <div className="bg-[#111111] border border-cyan-500/30 p-5 space-y-1">
              <div className="flex items-center justify-between text-slate-400 font-mono text-xs uppercase font-bold">
                <span>PENDING GRADING</span>
                <Clock className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="text-3xl font-black text-yellow-400">
                {submissions.filter(s => s.status === 'Pending Review').length}
              </div>
              <span className="text-[10px] font-mono text-yellow-400/80 block">Requires instructor score</span>
            </div>

            <div className="bg-[#111111] border border-cyan-500/30 p-5 space-y-1">
              <div className="flex items-center justify-between text-slate-400 font-mono text-xs uppercase font-bold">
                <span>ISSUED CERTIFICATES</span>
                <Award className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-emerald-400">1,890</div>
              <span className="text-[10px] font-mono text-emerald-400 block">Verified Serial Codes</span>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="bg-[#111111] border border-white/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-wide">
                FACULTY ACTION CENTER
              </h3>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Create new course modules, upload digital reading materials, or grade cadet submissions.
              </p>
            </div>
            <button
              onClick={() => setIsCreatingCourse(true)}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-black text-xs uppercase px-5 py-3 flex items-center space-x-2 transition shadow-lg shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>CREATE NEW COURSE MODULE</span>
            </button>
          </div>

          {/* Recent Submissions Quick Preview */}
          <div className="bg-[#111111] border border-white/10 p-6 space-y-4">
            <h3 className="text-base font-black text-white uppercase tracking-wide flex items-center justify-between">
              <span>RECENT CADET SUBMISSIONS</span>
              <span className="text-xs text-cyan-400 font-mono font-normal uppercase">
                Showing {submissions.length} Submissions
              </span>
            </h3>

            <div className="space-y-3">
              {submissions.map(sub => (
                <div key={sub.id} className="bg-zinc-950 border border-slate-800 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white uppercase">{sub.studentName}</span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 border border-cyan-600/30 px-2 py-0.5">
                        BADGE #{sub.badgeNumber}
                      </span>
                      <span className={`text-[9px] font-mono uppercase px-2 py-0.5 font-bold ${
                        sub.status === 'Graded' ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/40' : 'bg-yellow-950 text-yellow-400 border border-yellow-600/40'
                      }`}>
                        {sub.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-mono">
                      <strong>Course:</strong> {sub.courseTitle} • <strong>Lesson:</strong> {sub.lessonTitle}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-1 italic">
                      "{sub.submissionText}"
                    </p>
                  </div>

                  {sub.status === 'Pending Review' ? (
                    <button
                      onClick={() => {
                        setSelectedSub(sub);
                        setGradeInput(90);
                        setFeedbackInput('');
                      }}
                      className="bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold uppercase px-4 py-2 shrink-0 transition"
                    >
                      REVIEW & GRADE
                    </button>
                  ) : (
                    <div className="text-right shrink-0 font-mono text-xs">
                      <span className="text-emerald-400 font-bold block">{sub.score} / {sub.maxScore} PTS</span>
                      <span className="text-slate-500 text-[10px] block">GRADED BY FARAH ABDI HASSAN</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Manage Courses SubTab */}
      {activeSubTab === 'manage-courses' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#111111] border border-white/10 p-6">
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wide">
                ACADEMY CURRICULUM MANAGEMENT
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Instructor: Farah Abdi Hassan | Manage course outlines, reading modules, text lectures, and assignments.
              </p>
            </div>
            <button
              onClick={() => setIsCreatingCourse(true)}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-black text-xs uppercase px-5 py-3 flex items-center space-x-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>ADD NEW COURSE</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-[#111111] border border-slate-700/80 p-6 space-y-4 relative flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyan-400 font-bold">{course.id}</span>
                    <span className="text-slate-400 uppercase bg-zinc-900 px-2 py-0.5 border border-slate-800">
                      {course.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white uppercase tracking-wide">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {course.description}
                  </p>
                  <div className="pt-2 font-mono text-xs text-slate-400 space-y-1">
                    <div>Duration: <span className="text-slate-200">{course.duration}</span></div>
                    <div>Modules Count: <span className="text-slate-200">{course.totalModules}</span></div>
                    <div>Enrolled Cadets: <span className="text-cyan-400 font-bold">{course.enrolledCount}</span></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 font-mono text-xs">
                  <span className="text-emerald-400 font-bold">TUITION: KSh {course.courseFee}</span>
                  <button 
                    onClick={() => alert(`Editing Course Syllabus: ${course.title}`)}
                    className="bg-zinc-900 border border-slate-700 hover:border-cyan-500 text-slate-200 hover:text-white px-3 py-1.5 uppercase font-bold transition"
                  >
                    EDIT SYLLABUS
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submissions & Grading SubTab */}
      {activeSubTab === 'submissions' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#111111] border border-white/10 p-6 space-y-2">
            <h2 className="text-xl font-black text-white uppercase tracking-wide">
              CADET ASSIGNMENT & QUIZ GRADING PORTAL
            </h2>
            <p className="text-xs text-slate-300 font-mono">
              Review submitted field assignments, essay responses, and lab practical reports.
            </p>
          </div>

          <div className="space-y-4">
            {submissions.map(sub => (
              <div key={sub.id} className="bg-[#111111] border border-slate-700 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-black text-white uppercase tracking-wide">
                      {sub.studentName} <span className="text-cyan-400 font-mono text-xs font-normal">(BADGE #{sub.badgeNumber})</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {sub.courseTitle} — {sub.lessonTitle}
                    </p>
                  </div>
                  <span className={`text-xs font-mono font-bold uppercase px-3 py-1 ${
                    sub.status === 'Graded' ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/40' : 'bg-yellow-950 text-yellow-400 border border-yellow-600/40'
                  }`}>
                    STATUS: {sub.status}
                  </span>
                </div>

                <div className="bg-zinc-950 p-4 border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed">
                  <span className="text-slate-500 text-[10px] block uppercase mb-1">CADET SUBMISSION TEXT</span>
                  "{sub.submissionText}"
                </div>

                {sub.status === 'Graded' ? (
                  <div className="bg-emerald-950/40 border border-emerald-600/40 p-4 font-mono text-xs space-y-1">
                    <div className="text-emerald-400 font-bold uppercase">
                      ASSIGNED GRADE: {sub.score} / {sub.maxScore} POINTS
                    </div>
                    <div className="text-slate-300">
                      <strong>Instructor Feedback:</strong> {sub.feedback}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedSub(sub);
                      setGradeInput(90);
                      setFeedbackInput('');
                    }}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold uppercase px-5 py-2.5 transition"
                  >
                    GRADE SUBMISSION NOW
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Communications SubTab */}
      {activeSubTab === 'communications' && (
        <div className="bg-[#111111] border border-white/10 p-6 md:p-8 space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-wide flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>DIRECT STUDENT ANNOUNCEMENTS & QUERY BROADCAST</span>
            </h2>
            <p className="text-xs text-slate-300 font-mono mt-1">
              Broadcast official academic notices, assignment updates, or lecture materials to all enrolled cadets.
            </p>
          </div>

          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="text-xs font-mono font-bold text-slate-300 uppercase block mb-2">
                ANNOUNCEMENT SUBJECT & CONTENT (FARAH ABDI HASSAN)
              </label>
              <textarea
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                rows={4}
                placeholder="Type official academy broadcast notice for students..."
                className="w-full bg-zinc-950 border border-slate-700 text-white p-3 font-mono text-xs focus:border-cyan-500 outline-none"
              />
            </div>

            <button
              onClick={() => {
                if (broadcastMsg.trim()) {
                  setBroadcastSent(true);
                  setTimeout(() => setBroadcastSent(false), 4000);
                  setBroadcastMsg('');
                }
              }}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs uppercase px-6 py-3 flex items-center space-x-2 transition"
            >
              <Send className="w-4 h-4" />
              <span>BROADCAST TO ENROLLED CADETS</span>
            </button>

            {broadcastSent && (
              <div className="p-3 bg-emerald-950 border border-emerald-500 text-emerald-400 font-mono text-xs font-bold uppercase flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>OFFICIAL ACADEMY BROADCAST SENT SUCCESSFULLY TO ALL STUDENTS</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reports SubTab */}
      {activeSubTab === 'reports' && (
        <div className="bg-[#111111] border border-white/10 p-6 md:p-8 space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wide">
                ACADEMY PERFORMANCE & ENROLLMENT REPORTS
              </h2>
              <p className="text-xs text-slate-300 font-mono">
                Generate official student performance metrics and course completion summaries.
              </p>
            </div>
            <button
              onClick={() => alert("Downloading Official Faculty Summary Report (PDF)...")}
              className="bg-zinc-900 border border-slate-700 hover:border-cyan-500 text-slate-100 font-mono text-xs font-bold uppercase px-4 py-2 flex items-center space-x-2 transition"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>EXPORT FACULTY REPORT</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-3">
              <span className="text-cyan-400 font-bold uppercase block border-b border-slate-800 pb-2">
                TOP ENROLLED COURSES
              </span>
              <ul className="space-y-2 text-slate-300">
                <li className="flex justify-between">
                  <span>CRIM101: Introduction to Criminology</span>
                  <span className="font-bold text-white">1,420 Cadets</span>
                </li>
                <li className="flex justify-between">
                  <span>CSI-101: Crime Scene Investigation</span>
                  <span className="font-bold text-white">890 Cadets</span>
                </li>
                <li className="flex justify-between">
                  <span>CYBER-301: Cybersecurity Bootcamp</span>
                  <span className="font-bold text-white">650 Cadets</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-950 border border-slate-800 p-5 space-y-3">
              <span className="text-cyan-400 font-bold uppercase block border-b border-slate-800 pb-2">
                COMPLETION & GRADUATION RATE
              </span>
              <ul className="space-y-2 text-slate-300">
                <li className="flex justify-between">
                  <span>Average Pass Rate</span>
                  <span className="font-bold text-emerald-400">94.2%</span>
                </li>
                <li className="flex justify-between">
                  <span>Certificates Issued</span>
                  <span className="font-bold text-white">1,890 Validated</span>
                </li>
                <li className="flex justify-between">
                  <span>Financial Aid Recipients</span>
                  <span className="font-bold text-cyan-400">410 Students (100% Waiver)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Grade Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0C0E] border-2 border-cyan-500/50 p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white uppercase tracking-wide">
              GRADE SUBMISSION: {selectedSub.studentName}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Lesson: {selectedSub.lessonTitle}
            </p>

            <form onSubmit={handleGradeSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  SCORE (OUT OF {selectedSub.maxScore})
                </label>
                <input
                  type="number"
                  min={0}
                  max={selectedSub.maxScore}
                  value={gradeInput}
                  onChange={(e) => setGradeInput(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-slate-700 text-white p-2 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  INSTRUCTOR FEEDBACK (FARAH ABDI HASSAN)
                </label>
                <textarea
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  rows={3}
                  placeholder="Provide constructive feedback for student..."
                  className="w-full bg-zinc-950 border border-slate-700 text-white p-2"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSub(null)}
                  className="bg-zinc-900 text-slate-400 hover:text-white px-4 py-2 border border-slate-700 uppercase"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-5 py-2 uppercase"
                >
                  SAVE GRADE & NOTIFY STUDENT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Course Modal */}
      {isCreatingCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0C0E] border-2 border-cyan-500/50 p-6 max-w-xl w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white uppercase tracking-wide">
              CREATE NEW COURSE MODULE
            </h3>
            <form onSubmit={handleCreateCourseSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">COURSE TITLE</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CRIM102: Advanced Forensic Ballistics & Crime Analysis"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-slate-700 text-white p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">CATEGORY</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-zinc-950 border border-slate-700 text-white p-2"
                  >
                    <option value="Criminology & Criminal Justice">Criminology & Criminal Justice</option>
                    <option value="Crime Scene Investigation (CSI)">Crime Scene Investigation (CSI)</option>
                    <option value="Cyber Forensics & OSINT">Cyber Forensics & OSINT</option>
                    <option value="Cybersecurity Education">Cybersecurity Education</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">DURATION</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full bg-zinc-950 border border-slate-700 text-white p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">DESCRIPTION & SYLLABUS OVERVIEW</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Detailed course description..."
                  className="w-full bg-zinc-950 border border-slate-700 text-white p-2"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingCourse(false)}
                  className="bg-zinc-900 text-slate-400 hover:text-white px-4 py-2 border border-slate-700 uppercase"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-5 py-2 uppercase"
                >
                  PUBLISH COURSE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Legal Footer Disclaimer */}
      <div className="pt-6 border-t border-slate-800 text-center font-mono text-[10px] text-slate-500 uppercase tracking-widest space-y-1">
        <p>CRIMIVEX ACADEMY • INDEPENDENT ONLINE EDUCATION & PROFESSIONAL TRAINING PLATFORM</p>
        <p>FOUNDER & LEAD INSTRUCTOR: FARAH ABDI HASSAN | CONTACT: FARAHBATA116@GMAIL.COM</p>
      </div>
    </div>
  );
};
