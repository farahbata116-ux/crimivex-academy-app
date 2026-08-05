import React, { useState } from 'react';
import { 
  AcademyTab, 
  Course, 
  CaseFile, 
  CadetProfile, 
  Suspect,
  FinancialStatusCategory
} from './types';
import { 
  INITIAL_CADET_PROFILE, 
  ACADEMY_COURSES, 
  COLD_CASES, 
  CADET_BADGES, 
  UPCOMING_WORKSHOPS 
} from './data/academyData';
import { Header, ThemeMode } from './components/Header';
import { CoursesView } from './components/CoursesView';
import { ForensicLabView } from './components/ForensicLabView';
import { ColdCasesView } from './components/ColdCasesView';
import { CrimivexAIView } from './components/CrimivexAIView';
import { CadetDossierView } from './components/CadetDossierView';
import { WorkshopsView } from './components/WorkshopsView';
import { UserRole } from './types';
import { InstructorDashboardView } from './components/InstructorDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { AboutView } from './components/AboutView';
import { AdmissionAidView } from './components/AdmissionAidView';
import { VerifyCertificateView } from './components/VerifyCertificateView';
import { ContactView } from './components/ContactView';
import { PublicHomepageView } from './components/PublicHomepageView';
import { StudentSuccessNewsView } from './components/StudentSuccessNewsView';
import { SecurityPrivacyView } from './components/SecurityPrivacyView';
import { RegistrationModal } from './components/RegistrationModal';
import { EnrollmentCheckoutModal } from './components/EnrollmentCheckoutModal';
import { FinancialAidModal } from './components/FinancialAidModal';
import { MobileAppModal } from './components/MobileAppModal';
import { LawfulNoticeBanner } from './components/LawfulNoticeBanner';
import { Shield, Sparkles, Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AcademyTab>('home');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cadet, setCadet] = useState<CadetProfile>(INITIAL_CADET_PROFILE);
  const [courses, setCourses] = useState<Course[]>(ACADEMY_COURSES);
  const [cases, setCases] = useState<CaseFile[]>(COLD_CASES);
  const [interrogationTarget, setInterrogationTarget] = useState<{ suspect: Suspect; caseFile: CaseFile } | null>(null);
  const [isGeneratingAiCase, setIsGeneratingAiCase] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal States
  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(false);
  const [isMobileAppModalOpen, setIsMobileAppModalOpen] = useState<boolean>(false);
  const [isMobileSimulator, setIsMobileSimulator] = useState<boolean>(false);
  const [selectedCourseForEnrollment, setSelectedCourseForEnrollment] = useState<Course | null>(null);
  const [selectedCourseForFinancialAid, setSelectedCourseForFinancialAid] = useState<Course | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Handle Cadet Registration
  const handleRegister = (updatedProfile: Partial<CadetProfile>, doc?: { docName: string; docType: any }) => {
    setCadet((prev) => ({
      ...prev,
      ...updatedProfile,
      uploadedVerificationDocs: doc
        ? [
            {
              id: `doc-${Date.now()}`,
              docName: doc.docName,
              docType: doc.docType,
              uploadDate: new Date().toISOString().split('T')[0],
              status: 'Verified & Approved',
            },
            ...prev.uploadedVerificationDocs,
          ]
        : prev.uploadedVerificationDocs,
    }));
    showToast('🎓 Registration successful! Welcome to CRIMIVEX Academy.');
  };

  // Handle Course Enrollment Confirmation
  const handleConfirmEnrollment = (courseId: string, withCertificate: boolean, isFreeAid: boolean) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? {
              ...c,
              isEnrolled: true,
              certificatePaid: withCertificate || isFreeAid,
              enrollmentType: isFreeAid ? 'financial_aid' : 'paid',
            }
          : c
      )
    );
    showToast('🎓 Course enrollment confirmed! Access granted to full syllabus.');
  };

  // Handle Financial Aid Sponsorship Request
  const handleApplyAid = (
    courseId: string,
    status: FinancialStatusCategory,
    docName: string,
    docType: string,
    reason: string
  ) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? {
              ...c,
              isEnrolled: true,
              certificatePaid: true,
              enrollmentType: 'financial_aid',
              financialAidStatus: 'approved',
              financialAidReason: reason,
              uploadedDocName: docName,
            }
          : c
      )
    );

    setCadet((prev) => ({
      ...prev,
      financialStatus: status,
      uploadedVerificationDocs: [
        {
          id: `doc-${Date.now()}`,
          docName,
          docType: docType as any,
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'Verified & Approved',
        },
        ...prev.uploadedVerificationDocs,
      ],
      recentActivity: [
        {
          id: `act-${Date.now()}`,
          action: `Applied for 100% Free Financial Aid Sponsorship (${docName})`,
          timestamp: 'Just now',
          xpGained: 150,
        },
        ...prev.recentActivity,
      ],
    }));

    showToast('💚 100% Free Financial Aid Sponsorship approved! Course unlocked.');
  };

  // Handle lesson completion & XP award
  const handleCompleteLesson = (courseId: string, lessonId: string) => {
    const xpEarned = 150;
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const updatedModules = c.modules.map((m) => ({
            ...m,
            lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, isCompleted: true } : l)),
          }));
          return { ...c, modules: updatedModules, progressPercent: Math.min(100, (c.progressPercent || 0) + 25) };
        }
        return c;
      })
    );

    setCadet((prev) => {
      const newXp = prev.xp + xpEarned;
      const newLevel = newXp >= prev.nextRankXp ? prev.level + 1 : prev.level;
      const newNextRankXp = newXp >= prev.nextRankXp ? prev.nextRankXp + 2500 : prev.nextRankXp;
      
      showToast(`🎉 Lesson Completed! +${xpEarned} XP Earned.`);

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        nextRankXp: newNextRankXp,
        completedLessonsCount: prev.completedLessonsCount + 1,
        recentActivity: [
          {
            id: `act-${Date.now()}`,
            action: `Completed lesson in course`,
            timestamp: 'Just now',
            xpGained: xpEarned,
          },
          ...prev.recentActivity,
        ],
      };
    });
  };

  // Handle Cold Case solution deduction
  const handleSolveCase = (caseId: string, isCorrect: boolean, selectedIndex: number) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            status: isCorrect ? 'Solved' : 'Open Cold Case',
            solutionSubmitted: true,
            userAnswerIndex: selectedIndex,
            isCorrect,
          };
        }
        return c;
      })
    );

    if (isCorrect) {
      setCadet((prev) => ({
        ...prev,
        xp: prev.xp + 500,
        solvedCasesCount: prev.solvedCasesCount + 1,
        recentActivity: [
          {
            id: `act-${Date.now()}`,
            action: `Solved Case File #${caseId}`,
            timestamp: 'Just now',
            xpGained: 500,
          },
          ...prev.recentActivity,
        ],
      }));
      showToast('🏆 Case Solved! +500 XP & Investigator Merit Awarded.');
    } else {
      showToast('❌ Incorrect deduction. Re-evaluate evidence items & suspect statements.');
    }
  };

  // Open suspect interrogation in Crimivex AI tab
  const handleOpenInterrogation = (suspect: Suspect, caseFile: CaseFile) => {
    setInterrogationTarget({ suspect, caseFile });
    setActiveTab('crimivex-ai');
  };

  // Generate dynamic case using Gemini backend
  const handleGenerateAiCase = async (difficulty: string, track: string) => {
    setIsGeneratingAiCase(true);
    try {
      const res = await fetch('/api/ai/generate-case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty, track }),
      });

      const data = await res.json();
      if (res.ok && data.caseData && data.caseData.title) {
        const newCase: CaseFile = {
          ...data.caseData,
          status: 'Open Cold Case',
          coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        };
        setCases((prev) => [newCase, ...prev]);
        showToast(`✨ Gemini Generated New Training Case: ${newCase.title}`);
      } else {
        showToast(`Error generating case: ${data.error || 'Server error'}`);
      }
    } catch (e: any) {
      showToast(`Error: ${e.message}`);
    } finally {
      setIsGeneratingAiCase(false);
    }
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col justify-between transition-colors duration-200 ${
      themeMode === 'light'
        ? 'bg-slate-200 text-slate-900 selection:bg-cyan-500 selection:text-black'
        : 'bg-[#0A0A0A] text-zinc-100 selection:bg-cyan-500 selection:text-black'
    }`}>
      
      <div>
        {/* Toast Alert Banner */}
        {toastMessage && (
          <div className="fixed top-24 right-6 z-50 bg-cyan-500 text-black px-6 py-3 shadow-2xl font-black text-xs uppercase tracking-widest flex items-center space-x-3 border border-black/20 animate-bounce">
            <Sparkles className="w-4 h-4 fill-black" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cadet={cadet}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          userRole={userRole}
          setUserRole={setUserRole}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          onOpenMobileApp={() => setIsMobileAppModalOpen(true)}
          isMobileSimulatorActive={isMobileSimulator}
        />

        {/* Lawful Notice Banner */}
        <LawfulNoticeBanner />

        {/* Primary Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'home' && (
            <PublicHomepageView
              courses={courses}
              onNavigateTab={setActiveTab}
              onOpenRegister={() => setIsRegistrationOpen(true)}
              onSelectCourseEnroll={(course) => setSelectedCourseForEnrollment(course)}
              onSelectCourseAid={(course) => setSelectedCourseForFinancialAid(course)}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesView
              courses={courses}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              cadet={cadet}
              onCompleteLesson={handleCompleteLesson}
              onEnrollClick={(course) => setSelectedCourseForEnrollment(course)}
              onFinancialAidClick={(course) => setSelectedCourseForFinancialAid(course)}
              onOpenRegistration={() => setIsRegistrationOpen(true)}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'about' && <AboutView />}

          {activeTab === 'admission-aid' && (
            <AdmissionAidView
              cadet={cadet}
              courses={courses}
              onOpenFinancialAid={(course) => setSelectedCourseForFinancialAid(course)}
              onOpenEnrollment={(course) => setSelectedCourseForEnrollment(course)}
              onOpenRegistration={() => setIsRegistrationOpen(true)}
            />
          )}

          {activeTab === 'success-news' && <StudentSuccessNewsView />}

          {activeTab === 'verify-cert' && <VerifyCertificateView />}

          {activeTab === 'contact' && <ContactView />}

          {activeTab === 'security-privacy' && (
            <SecurityPrivacyView cadet={cadet} courses={courses} />
          )}

          {activeTab === 'forensic-lab' && <ForensicLabView />}

          {activeTab === 'cold-cases' && (
            <ColdCasesView
              cases={cases}
              searchQuery={searchQuery}
              onSolveCase={handleSolveCase}
              onOpenInterrogation={handleOpenInterrogation}
              onGenerateAiCase={handleGenerateAiCase}
              isGeneratingAiCase={isGeneratingAiCase}
            />
          )}

          {activeTab === 'crimivex-ai' && (
            <CrimivexAIView initialInterrogationTarget={interrogationTarget} />
          )}

          {activeTab === 'cadet-dossier' && (
            <CadetDossierView cadet={cadet} badges={CADET_BADGES} />
          )}

          {activeTab === 'instructor-dashboard' && (
            <InstructorDashboardView
              courses={courses}
              onAddCourse={(newC) => setCourses([newC, ...courses])}
            />
          )}

          {activeTab === 'admin-dashboard' && (
            <AdminDashboardView
              cadet={cadet}
              courses={courses}
              onUpdateCadet={setCadet}
            />
          )}

          {activeTab === 'workshops' && (
            <WorkshopsView workshops={UPCOMING_WORKSHOPS} />
          )}
        </main>
      </div>

      {/* Modals */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        cadet={cadet}
        onRegister={handleRegister}
      />

      <EnrollmentCheckoutModal
        isOpen={!!selectedCourseForEnrollment}
        onClose={() => setSelectedCourseForEnrollment(null)}
        course={selectedCourseForEnrollment}
        cadet={cadet}
        onConfirmEnrollment={handleConfirmEnrollment}
        onOpenFinancialAid={() => {
          setSelectedCourseForFinancialAid(selectedCourseForEnrollment);
          setSelectedCourseForEnrollment(null);
        }}
      />

      <FinancialAidModal
        isOpen={!!selectedCourseForFinancialAid}
        onClose={() => setSelectedCourseForFinancialAid(null)}
        course={selectedCourseForFinancialAid}
        cadet={cadet}
        onApplyAid={handleApplyAid}
      />

      <MobileAppModal
        isOpen={isMobileAppModalOpen}
        onClose={() => setIsMobileAppModalOpen(false)}
      />

      {/* Ticker & Disclaimer Footer */}
      <footer className="bg-red-600 py-3 overflow-hidden border-t border-white/10 select-none">
        <div className="flex whitespace-nowrap text-white font-black text-xs uppercase tracking-wider space-x-8 animate-pulse">
          <span className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>CRIMIVEX ACADEMY • FOUNDER & INSTRUCTOR: FARAH ABDI HASSAN</span>
          </span>
          <span>•</span>
          <span>MAIN COURSE: CRIM101 – INTRODUCTION TO CRIMINOLOGY AND CRIMINAL JUSTICE</span>
          <span>•</span>
          <span>REGISTRATION: FREE | COURSE TUITION: KSH 3,000 | CERTIFICATE: KSH 2,000</span>
          <span>•</span>
          <span>FREE SPONSORSHIP FOR ORPHANS, DISABILITIES & FINANCIAL HARDSHIP (DOCUMENT REVIEW REQUIRED)</span>
          <span>•</span>
          <span>VERITAS • SCIENTIA • JUSTITIA</span>
        </div>
      </footer>
    </div>
  );
}
