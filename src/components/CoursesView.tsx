import React, { useState } from 'react';
import { Course, CourseTrackCategory, Lesson, CadetProfile, SortOption } from '../types';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Award, 
  CheckCircle2, 
  PlayCircle, 
  ChevronRight, 
  ArrowLeft,
  HelpCircle,
  Sparkles,
  HeartHandshake,
  Search,
  ArrowUpDown,
  Filter,
  Printer,
  ShieldCheck,
  Check,
  FileText,
  Download
} from 'lucide-react';

interface CoursesViewProps {
  courses: Course[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cadet: CadetProfile;
  onCompleteLesson: (courseId: string, lessonId: string, xpEarned: number) => void;
  onEnrollClick: (course: Course) => void;
  onFinancialAidClick: (course: Course) => void;
  onOpenRegistration: () => void;
  setActiveTab: (tab: any) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  searchQuery,
  setSearchQuery,
  cadet,
  onCompleteLesson,
  onEnrollClick,
  onFinancialAidClick,
  onOpenRegistration,
  setActiveTab
}) => {
  const [viewMode, setViewMode] = useState<'all' | 'enrolled' | 'free_aid'>('all');
  const [selectedCategory, setSelectedCategory] = useState<CourseTrackCategory>('All Tracks');
  const [sortOption, setSortOption] = useState<SortOption>('rating-desc');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  const categories: CourseTrackCategory[] = [
    'All Tracks',
    'Criminology & Criminal Justice',
    'Crime Scene Investigation (CSI)',
    'Cyber Forensics & OSINT',
    'Criminal Psychology & Profiling',
    'Forensic Chemistry & DNA',
    'Criminal Law & Legal Ethics'
  ];

  // Filter courses based on viewMode, category, and searchQuery
  const filteredCourses = courses.filter((c) => {
    // View mode filter
    if (viewMode === 'enrolled' && !c.isEnrolled) return false;
    if (viewMode === 'free_aid' && cadet.financialStatus === 'Standard Cadet' && c.isEnrolled) return false;

    // Category filter
    const matchesCategory = selectedCategory === 'All Tracks' || c.category === selectedCategory;

    // Search query filter (matches title, description, instructor name, prerequisites, category)
    const q = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.instructor.name.toLowerCase().includes(q) ||
      (c.prerequisites && c.prerequisites.some((p) => p.toLowerCase().includes(q)));

    return matchesCategory && matchesSearch;
  });

  // Sort filtered courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortOption) {
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'duration-asc':
        return (a.durationHours || 0) - (b.durationHours || 0);
      case 'duration-desc':
        return (b.durationHours || 0) - (a.durationHours || 0);
      case 'enrolled-desc':
        return b.enrolledCount - a.enrolledCount;
      case 'fee-asc':
        return (a.courseFee || 0) - (b.courseFee || 0);
      case 'rating-desc':
      default:
        return b.rating - a.rating;
    }
  });

  const enrolledCoursesCount = courses.filter((c) => c.isEnrolled).length;

  const handleSelectCourse = (course: Course) => {
    setActiveCourse(course);
    if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      setActiveLesson(course.modules[0].lessons[0]);
    } else {
      setActiveLesson(null);
    }
    setSelectedAnswer(null);
    setQuizSubmitted(false);
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer === null || !activeLesson || !activeLesson.quiz || activeLesson.quiz.length === 0) return;
    setQuizSubmitted(true);
    const quiz = activeLesson.quiz[0];
    if (selectedAnswer === quiz.correctAnswer && activeCourse) {
      onCompleteLesson(activeCourse.id, activeLesson.id, 150);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* If Course Syllabus & Interactive Reader View is active */}
      {activeCourse ? (
        <div className="bg-zinc-900 border border-white/10 rounded-none overflow-hidden shadow-2xl">
          {/* Back Header */}
          <div className="bg-[#0A0A0A] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <button
              onClick={() => setActiveCourse(null)}
              className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-red-500 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO COURSE CATALOG</span>
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-zinc-400 font-mono uppercase">COURSE TRACK:</span>
              <span className="text-xs font-black px-3 py-1 bg-red-600 text-white uppercase tracking-widest">
                {activeCourse.category}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[650px]">
            {/* Sidebar: Course Syllabus & Navigation */}
            <div className="lg:col-span-4 bg-[#0A0A0A] border-r border-white/10 p-5 space-y-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-black">
                    {activeCourse.id}
                  </span>
                  {activeCourse.isEnrolled && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-emerald-600 text-white font-mono">
                      ENROLLED
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-black text-white mt-1 uppercase tracking-tighter leading-tight">
                  {activeCourse.title}
                </h2>
                <p className="text-xs text-zinc-400 mt-1 font-mono">{activeCourse.subtitle}</p>
              </div>

              {/* Course Prerequisites & Fee Summary */}
              <div className="bg-zinc-900 border border-white/10 p-4 space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">
                  COURSE PREREQUISITES
                </span>
                <ul className="text-xs text-zinc-300 font-mono space-y-1">
                  {activeCourse.prerequisites && activeCourse.prerequisites.length > 0 ? (
                    activeCourse.prerequisites.map((req, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-zinc-500">None required (Open course)</li>
                  )}
                </ul>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">DURATION:</span>
                  <span className="text-white font-bold">{activeCourse.duration}</span>
                </div>
              </div>

              {/* Progress Bar & Certificate Button */}
              {activeCourse.isEnrolled && (
                <div className="bg-zinc-900 border border-white/10 p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono font-bold uppercase tracking-widest">
                    <span className="text-zinc-400">PROGRESS</span>
                    <span className="text-red-500">{activeCourse.progressPercent || 0}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 overflow-hidden">
                    <div
                      className="bg-red-600 h-full transition-all duration-300"
                      style={{ width: `${activeCourse.progressPercent || 0}%` }}
                    />
                  </div>

                  <button
                    onClick={() => setShowCertificateModal(true)}
                    className="w-full py-2 bg-red-600 hover:bg-white hover:text-black text-white font-black text-[11px] uppercase tracking-widest transition flex items-center justify-center space-x-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>CLAIM / VIEW CERTIFICATE</span>
                  </button>
                </div>
              )}

              {/* Modules Accordion */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-red-500">
                  SYLLABUS MODULES ({activeCourse.modules.length})
                </h3>

                {activeCourse.modules.length === 0 ? (
                  <div className="p-4 bg-zinc-900 border border-white/10 text-center text-zinc-400 text-xs font-mono uppercase">
                    NO MODULES LOADED IN PREVIEW.
                  </div>
                ) : (
                  activeCourse.modules.map((mod) => (
                    <div key={mod.id} className="bg-zinc-900 border border-white/10 overflow-hidden">
                      <div className="p-3 bg-black border-b border-white/10 flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-white">
                          {mod.title}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono font-bold">{mod.lessons.length} LESSONS</span>
                      </div>
                      <div className="divide-y divide-white/5">
                        {mod.lessons.map((les) => {
                          const isSelected = activeLesson?.id === les.id;
                          return (
                            <button
                              key={les.id}
                              onClick={() => {
                                setActiveLesson(les);
                                setSelectedAnswer(null);
                                setQuizSubmitted(false);
                              }}
                              className={`w-full p-3 text-left flex items-start space-x-3 text-xs transition ${
                                isSelected
                                  ? 'bg-red-600 text-white font-bold'
                                  : 'text-zinc-300 hover:bg-zinc-800'
                              }`}
                            >
                              <div className="mt-0.5">
                                {les.isCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <PlayCircle className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-zinc-500'}`} />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-bold uppercase tracking-wider">{les.title}</p>
                                <span className="text-[10px] font-mono opacity-80 mt-0.5 inline-block">
                                  {les.duration} • {les.type.toUpperCase()}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Main Lesson Content Area */}
            <div className="lg:col-span-8 p-6 space-y-6 overflow-y-auto max-h-[750px] no-scrollbar">
              {activeLesson ? (
                <div className="space-y-6">
                  {/* Lesson Header */}
                  <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-mono font-black text-red-500 uppercase tracking-widest">
                        LESSON {activeLesson.id}
                      </span>
                      <h1 className="text-2xl font-black text-white mt-1 uppercase tracking-tighter">
                        {activeLesson.title}
                      </h1>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-3 py-1 bg-zinc-900 text-zinc-300 border border-white/10 font-mono flex items-center space-x-1.5 uppercase font-bold">
                        <Clock className="w-3.5 h-3.5 text-red-500" />
                        <span>{activeLesson.duration}</span>
                      </span>
                    </div>
                  </div>

                  {/* Text & PDF Learning System Container (No Video) */}
                  <div className="bg-[#111111] border border-white/10 p-6 space-y-6 shadow-2xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-600/20 border border-red-600 text-red-500 flex items-center justify-center font-bold">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest block">
                            TEXT-BASED DIGITAL COURSE READER & PDF MATERIALS
                          </span>
                          <h3 className="text-base font-black text-white uppercase tracking-wide">
                            DIGITAL LESSON NOTES & INTERACTIVE READING MODULE
                          </h3>
                        </div>
                      </div>

                      {/* PDF Download Handout Button */}
                      <button 
                        onClick={() => alert(`Downloading PDF Handout: ${activeLesson.title}.pdf`)}
                        className="bg-zinc-900 border border-white/20 hover:border-red-600 text-zinc-200 hover:text-white text-xs font-mono font-bold uppercase px-4 py-2 flex items-center space-x-2 transition"
                      >
                        <FileText className="w-4 h-4 text-red-500" />
                        <span>DOWNLOAD PDF MATERIAL</span>
                        <Download className="w-3.5 h-3.5 text-zinc-400" />
                      </button>
                    </div>

                    {/* PDF Document Preview Box */}
                    <div className="bg-zinc-950 border border-white/10 p-4 flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-950 border border-red-600 text-red-400 flex items-center justify-center font-black">
                          PDF
                        </div>
                        <div>
                          <span className="text-white font-bold block">{activeLesson.title} - Official Handout.pdf</span>
                          <span className="text-zinc-500 text-[10px] uppercase">Format: Vector PDF Notes • 2.4 MB • Text-Only Reading</span>
                        </div>
                      </div>
                      <span className="text-emerald-400 font-bold text-[10px] uppercase bg-emerald-950/60 border border-emerald-600/30 px-2 py-1">
                        VERIFIED ACADEMY HANDOUT
                      </span>
                    </div>
                  </div>

                  {/* Key Concepts Tags */}
                  {activeLesson.keyConcepts && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-zinc-400 uppercase tracking-widest font-mono">
                        KEY CONCEPTS:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeLesson.keyConcepts.map((kc, i) => (
                          <span key={i} className="text-xs px-3 py-0.5 bg-zinc-900 text-white border border-white/10 font-mono font-bold uppercase tracking-wider">
                            #{kc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lesson Markdown Reading Content */}
                  <div className="bg-zinc-900 border border-white/10 p-6 text-zinc-300 text-xs leading-relaxed space-y-4">
                    <h3 className="text-xs font-black text-red-500 uppercase tracking-widest border-b border-white/10 pb-2">
                      ACADEMY LECTURE NOTES & LEGAL STANDARDS
                    </h3>
                    <div className="whitespace-pre-line font-mono text-zinc-200 text-xs">
                      {activeLesson.contentMarkdown || activeLesson.description}
                    </div>
                  </div>

                  {/* Quiz Challenge Section */}
                  {activeLesson.quiz && activeLesson.quiz.length > 0 && (
                    <div className="bg-zinc-900 border border-red-600/40 p-6 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-red-500">
                          <HelpCircle className="w-5 h-5" />
                          <h3 className="text-sm font-black uppercase tracking-wider text-white">
                            KNOWLEDGE VERIFICATION QUIZ (+150 XP)
                          </h3>
                        </div>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-red-600 text-white font-black tracking-widest">
                          REQUIRED
                        </span>
                      </div>

                      {activeLesson.quiz.map((q) => (
                        <div key={q.id} className="space-y-3">
                          <p className="text-xs font-bold text-zinc-200 uppercase tracking-wide">{q.question}</p>
                          <div className="space-y-2">
                            {q.options.map((option, oIdx) => {
                              const isSelected = selectedAnswer === oIdx;
                              let btnClass = 'bg-black border-white/10 text-zinc-300 hover:border-red-600';
                              if (quizSubmitted) {
                                if (oIdx === q.correctAnswer) {
                                  btnClass = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                                } else if (isSelected && oIdx !== q.correctAnswer) {
                                  btnClass = 'bg-rose-950 border-rose-500 text-rose-200';
                                }
                              } else if (isSelected) {
                                btnClass = 'bg-red-600 border-red-600 text-white font-black';
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={quizSubmitted}
                                  onClick={() => setSelectedAnswer(oIdx)}
                                  className={`w-full p-3 text-left border text-xs flex items-center justify-between transition ${btnClass}`}
                                >
                                  <span className="uppercase tracking-wider font-semibold">{option}</span>
                                  <span className="w-5 h-5 border border-current flex items-center justify-center text-[10px] font-mono font-bold">
                                    {String.fromCharCode(65 + oIdx)}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          {!quizSubmitted ? (
                            <button
                              onClick={handleQuizSubmit}
                              disabled={selectedAnswer === null}
                              className="mt-3 px-8 py-3 bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest transition disabled:opacity-50"
                            >
                              SUBMIT ANSWER & VERIFY
                            </button>
                          ) : (
                            <div className={`p-4 text-xs space-y-1 ${
                              selectedAnswer === q.correctAnswer
                                ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border border-rose-500 text-rose-200'
                            }`}>
                              <p className="font-black uppercase tracking-widest">
                                {selectedAnswer === q.correctAnswer ? '✓ CORRECT ANSWER (+150 XP)' : '✗ INCORRECT ANSWER'}
                              </p>
                              <p className="text-zinc-300 text-[11px] font-mono">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Ask AI Professor Button */}
                  <div className="bg-black border border-white/10 p-5 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center font-black">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-wider">HAVE QUESTIONS ABOUT THIS LESSON?</h4>
                        <p className="text-[11px] text-zinc-400 font-mono uppercase">CONSULT CRIMIVEX AI FOUNDER & INSTRUCTOR FARAH ABDI HASSAN FOR ADVICE.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('crimivex-ai')}
                      className="px-4 py-2 bg-zinc-900 border border-white/20 hover:border-red-600 text-white text-xs font-black uppercase tracking-widest transition"
                    >
                      OPEN AI ASSISTANT
                    </button>
                  </div>

                </div>
              ) : (
                <div className="text-center py-20 text-zinc-500 text-xs font-mono uppercase">
                  SELECT A LESSON FROM THE LEFT SYLLABUS TO BEGIN STUDYING.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Course Catalog Grid View */
        <div className="space-y-8">

          {/* Catalog Mode Toggles (All Courses vs My Enrolled Courses vs Free Aid) */}
          <div className="bg-zinc-900 border border-white/10 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('all')}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest font-mono transition ${
                  viewMode === 'all'
                    ? 'bg-red-600 text-white'
                    : 'bg-black text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                ALL MINI-COURSES ({courses.length})
              </button>
              <button
                onClick={() => setViewMode('enrolled')}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest font-mono transition flex items-center space-x-2 ${
                  viewMode === 'enrolled'
                    ? 'bg-red-600 text-white'
                    : 'bg-black text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                <span>MY ENROLLED COURSES</span>
                <span className="px-2 py-0.5 bg-white text-black text-[10px] font-bold">
                  {enrolledCoursesCount}
                </span>
              </button>
              <button
                onClick={() => setViewMode('free_aid')}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest font-mono transition flex items-center space-x-1.5 ${
                  viewMode === 'free_aid'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-black text-emerald-400 hover:text-white border border-emerald-500/30'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>100% FREE AID ELIGIBLE</span>
              </button>
            </div>

            {/* Registration Status & Call to Action */}
            {!cadet.isRegistered ? (
              <button
                onClick={onOpenRegistration}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest font-mono transition flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>FREE STUDENT REGISTRATION</span>
              </button>
            ) : (
              <div className="text-xs font-mono text-zinc-300 flex items-center space-x-2">
                <span className="text-zinc-500">REGISTERED CADET:</span>
                <span className="text-emerald-400 font-bold">{cadet.name}</span>
                <span className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-300 border border-white/10">
                  {cadet.financialStatus}
                </span>
              </div>
            )}
          </div>

          {/* Search Bar & Sort Dropdown Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-black/60 border border-white/10 p-4">
            
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="SEARCH COURSES BY TITLE, DESCRIPTION, INSTRUCTOR, PREREQUISITES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-zinc-500 uppercase focus:outline-none focus:border-red-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs font-mono"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Sort Options Dropdown */}
            <div className="md:col-span-4 flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4 text-red-500 shrink-0" />
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase shrink-0">SORT BY:</span>
              <select
                value={sortOption}
                onChange={(e: any) => setSortOption(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 px-3 py-2.5 text-xs font-mono text-white uppercase focus:outline-none focus:border-red-600"
              >
                <option value="rating-desc">Highest Rated ⭐</option>
                <option value="title-asc">Title (A to Z)</option>
                <option value="title-desc">Title (Z to A)</option>
                <option value="duration-asc">Duration (Shortest first)</option>
                <option value="duration-desc">Duration (Longest first)</option>
                <option value="enrolled-desc">Popularity (Most Enrolled)</option>
                <option value="fee-asc">Tuition Fee</option>
              </select>
            </div>
          </div>

          {/* Track Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Catalog Results Grid */}
          {sortedCourses.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900 border border-white/10 p-8 space-y-3">
              <Search className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-lg font-black text-white uppercase">NO COURSES MATCH YOUR SEARCH CRITERIA</h3>
              <p className="text-xs text-zinc-400 font-mono">
                Try adjusting your search query, switching categories, or resetting filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Tracks');
                  setViewMode('all');
                }}
                className="px-6 py-2.5 bg-red-600 text-white font-black text-xs uppercase tracking-widest"
              >
                RESET CATALOG FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sortedCourses.map((course) => {
                const isFree = cadet.financialStatus !== 'Standard Cadet';

                return (
                  <div
                    key={course.id}
                    className="bg-zinc-900 border border-white/10 hover:border-red-600 transition-colors duration-300 flex flex-col justify-between group shadow-xl"
                  >
                    <div>
                      {/* Image & Badge Header */}
                      <div className="relative h-60 overflow-hidden border-b border-white/10">
                        <img
                          src={course.coverImage}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-60 group-hover:opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                        
                        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-red-600 text-white">
                            {course.id}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-black text-zinc-300 border border-white/20">
                            {course.level}
                          </span>
                          {course.isEnrolled && (
                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-600 text-white font-mono">
                              ENROLLED
                            </span>
                          )}
                        </div>

                        {/* Fee Badge Top Right */}
                        <div className="absolute top-4 right-4 text-right">
                          <div className="bg-black/90 border border-white/20 px-3 py-1.5 text-xs font-mono font-black uppercase">
                            {isFree ? (
                              <span className="text-emerald-400">100% FREE (SPONSORED)</span>
                            ) : (
                              <span className="text-white">COURSE: KSh {course.courseFee || 3000}</span>
                            )}
                          </div>
                          <span className="text-[9px] text-zinc-400 font-mono block mt-1">
                            CERTIFICATE: {isFree ? 'FREE' : `KSh ${course.certificateFee || 2000}`}
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-200 font-mono font-bold uppercase tracking-wider">
                          <span className="flex items-center space-x-1.5 bg-black/90 px-3 py-1 border border-white/10">
                            <Clock className="w-3.5 h-3.5 text-red-500" />
                            <span>{course.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1.5 bg-black/90 px-3 py-1 border border-white/10 text-red-500">
                            <Star className="w-3.5 h-3.5 fill-red-500" />
                            <span>{course.rating}</span>
                          </span>
                        </div>
                      </div>

                      {/* Course Body Information */}
                      <div className="p-6 space-y-4">
                        <span className="text-xs font-black text-red-500 uppercase tracking-widest font-mono">
                          {course.category}
                        </span>

                        <h3 className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-red-500 transition leading-tight">
                          {course.title}
                        </h3>

                        <p className="text-xs text-zinc-400 leading-relaxed font-light">
                          {course.description}
                        </p>

                        {/* PREREQUISITES FIELD DISPLAY (Mandatory requirement!) */}
                        <div className="bg-black/60 border border-white/10 p-3.5 space-y-1.5">
                          <div className="flex items-center space-x-1.5 text-xs font-mono font-black text-zinc-300 uppercase">
                            <BookOpen className="w-3.5 h-3.5 text-red-500" />
                            <span>COURSE PREREQUISITES:</span>
                          </div>
                          <ul className="text-xs text-zinc-400 font-mono space-y-1">
                            {course.prerequisites && course.prerequisites.length > 0 ? (
                              course.prerequisites.map((req, idx) => (
                                <li key={idx} className="flex items-start space-x-1.5">
                                  <span className="text-red-500 font-bold">•</span>
                                  <span>{req}</span>
                                </li>
                              ))
                            ) : (
                              <li className="text-zinc-500">Open (No prior prerequisites)</li>
                            )}
                          </ul>
                        </div>

                        {/* Instructor Profile Details */}
                        <div className="flex items-start space-x-3 pt-4 border-t border-white/10">
                          <img
                            src={course.instructor.avatar}
                            alt={course.instructor.name}
                            className="w-10 h-10 border border-white/20 object-cover shrink-0"
                          />
                          <div className="space-y-0.5">
                            <p className="text-xs font-black uppercase text-white tracking-wider">
                              INSTRUCTOR: {course.instructor.name}
                            </p>
                            <p className="text-[10px] text-zinc-400 font-mono uppercase leading-tight">
                              {course.instructor.title}
                            </p>
                            {course.instructor.bio && (
                              <p className="text-[10px] text-zinc-500 font-mono italic line-clamp-1">
                                {course.instructor.bio}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions (Enroll / Open Syllabus / Free Aid) */}
                    <div className="p-6 pt-0 space-y-2">
                      {course.isEnrolled ? (
                        <button
                          onClick={() => handleSelectCourse(course)}
                          className="w-full py-4 bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition duration-200"
                        >
                          <span>CONTINUE STUDYING SYLLABUS ({course.progressPercent || 0}%)</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            onClick={() => onEnrollClick(course)}
                            className="w-full py-3.5 bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition"
                          >
                            <span>ENROLL NOW ({isFree ? 'FREE' : '3,000 sh'})</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onFinancialAidClick(course)}
                            className="w-full py-3.5 bg-zinc-900 border border-emerald-500/40 hover:border-emerald-500 text-emerald-400 text-xs font-mono font-black uppercase tracking-widest flex items-center justify-center space-x-1.5 transition"
                          >
                            <HeartHandshake className="w-4 h-4" />
                            <span>FREE AID SPONSORSHIP</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Official Certificate Printable Preview Modal */}
      {showCertificateModal && activeCourse && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border-2 border-red-600 max-w-2xl w-full p-8 space-y-6 text-center shadow-2xl relative">
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xs font-mono font-black uppercase"
            >
              ✕ CLOSE
            </button>

            {/* Certificate Canvas */}
            <div className="border-4 border-double border-red-600 p-8 bg-black space-y-4">
              <span className="text-xs font-mono font-black uppercase tracking-widest text-red-500">
                OFFICIAL VERIFIED ACADEMIC CREDENTIAL
              </span>
              <h2 className="text-2xl font-black font-sans text-white uppercase tracking-tighter">
                CRIMIVEX ACADEMY OF FORENSIC SCIENCES
              </h2>
              <p className="text-xs text-zinc-400 italic">This official certificate is awarded to</p>
              <h3 className="text-2xl font-black text-red-500 border-b-2 border-red-600 pb-2 inline-block px-8 uppercase tracking-wider">
                {cadet.name}
              </h3>
              <p className="text-xs text-zinc-300 font-mono max-w-lg mx-auto leading-relaxed">
                For successfully completing all requirements, lectures, and examination modules for the mini-course:
                <br />
                <strong className="text-white text-sm block mt-1 uppercase">{activeCourse.title}</strong>
              </p>

              <div className="flex justify-between items-center pt-6 text-[10px] font-mono text-zinc-400 border-t border-white/10 uppercase">
                <span>ISSUED: AUGUST 2026</span>
                <span className="font-black text-red-500">CADET ID #{cadet.badgeNumber}</span>
                <span>FARAH ABDI HASSAN, FOUNDER & INSTRUCTOR</span>
              </div>
            </div>

            <div className="flex justify-center space-x-3">
              <button
                onClick={() => window.print()}
                className="px-8 py-3 bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest transition"
              >
                PRINT / DOWNLOAD CERTIFICATE (PDF)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
