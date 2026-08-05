export type UserRole = 'student' | 'instructor' | 'admin';

export interface AdmissionApplication {
  id: string;
  applicantName: string;
  email: string;
  nationalId?: string;
  phone?: string;
  preferredCourseId: string;
  preferredCourseTitle: string;
  financialStatus: FinancialStatusCategory;
  appliedDate: string;
  status: 'Pending Review' | 'Approved' | 'Rejected';
  uploadedDocuments: string[];
  notes?: string;
}

export interface StudentSubmission {
  id: string;
  studentName: string;
  badgeNumber: string;
  courseId: string;
  courseTitle: string;
  lessonTitle: string;
  submittedDate: string;
  submissionText: string;
  documentName?: string;
  score?: number;
  maxScore: number;
  status: 'Graded' | 'Pending Review';
  feedback?: string;
}

export interface CertificateRecord {
  certId: string;
  studentName: string;
  studentBadge: string;
  courseCode: string;
  courseTitle: string;
  issueDate: string;
  grade: string;
  modulesCompleted: number;
  verificationHash: string;
  instructorName: string;
  instructorTitle: string;
  status: 'Valid' | 'Revoked';
}

export type AcademyTab = 
  | 'home'
  | 'courses' 
  | 'about'
  | 'admission-aid'
  | 'success-news'
  | 'verify-cert'
  | 'contact'
  | 'forensic-lab' 
  | 'cold-cases' 
  | 'crimivex-ai' 
  | 'cadet-dossier' 
  | 'workshops'
  | 'instructor-dashboard'
  | 'admin-dashboard'
  | 'security-privacy';

export type CourseTrackCategory = 
  | 'All Tracks'
  | 'Criminology & Criminal Justice'
  | 'Crime Scene Investigation (CSI)' 
  | 'Cyber Forensics & OSINT' 
  | 'Criminal Psychology & Profiling' 
  | 'Forensic Chemistry & DNA' 
  | 'Criminal Law & Legal Ethics'
  | 'Moot Court & Legal Defense'
  | (string & {});

export type FinancialStatusCategory = 
  | 'Standard Cadet'
  | 'Standard Student (KSh 3,000)'
  | 'Orphan Student'
  | 'Person with Disability (PWD)'
  | 'Financially Disadvantaged'
  | (string & {});

export type SortOption = 
  | 'rating-desc' 
  | 'title-asc' 
  | 'title-desc' 
  | 'duration-asc' 
  | 'duration-desc' 
  | 'enrolled-desc' 
  | 'fee-asc';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'lecture' | 'case_analysis' | 'lab_sim' | 'quiz';
  description: string;
  videoUrlPlaceholder?: string;
  videoTitle?: string;
  readTime?: string;
  contentMarkdown?: string;
  keyConcepts: string[];
  quiz?: QuizQuestion[];
  isCompleted?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: CourseTrackCategory;
  level: 'Cadet Fundamentals' | 'Intermediate Field' | 'Senior Specialist' | 'Executive Master';
  instructor: {
    name: string;
    title: string;
    avatar: string;
    bio?: string;
  };
  duration: string;
  durationHours: number; // For sorting by duration
  prerequisites: string[]; // Required field for course prerequisites
  courseFee: number; // Standard: 3000 KES/sh
  certificateFee: number; // Standard: 2000 KES/sh
  totalModules: number;
  enrolledCount: number;
  rating: number;
  badgeEarned: string;
  coverImage: string;
  description: string;
  modules: Module[];
  progressPercent?: number;
  isEnrolled?: boolean;
  enrollmentType?: 'paid' | 'financial_aid';
  certificatePaid?: boolean;
  financialAidStatus?: 'none' | 'pending' | 'approved';
  financialAidReason?: string;
  uploadedDocName?: string;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  age: number;
  occupation: string;
  alibi: string;
  suspicionLevel: 'Low' | 'Medium' | 'High' | 'Prime Suspect';
  avatar: string;
  notes: string;
  keyQuote: string;
  interrogated?: boolean;
}

export interface EvidenceItem {
  id: string;
  name: string;
  type: 'Fingerprint' | 'Ballistics' | 'DNA Electrophoresis' | 'Hex Dump' | 'Digital Dump' | 'Bloodstain' | 'Chemical Trace' | 'Document';
  description: string;
  foundLocation: string;
  collectedBy: string;
  chainOfCustodyVerified: boolean;
  sampleData?: any;
  analysisReport?: string;
}

export interface CaseFile {
  id: string;
  title: string;
  codename: string;
  track: CourseTrackCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master Investigator';
  status: 'Open Cold Case' | 'Active Investigation' | 'Solved';
  summary: string;
  location: string;
  timestamp: string;
  victim: string;
  coverImage: string;
  suspects: Suspect[];
  evidence: EvidenceItem[];
  forensicPuzzle: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  solutionSubmitted?: boolean;
  userAnswerIndex?: number;
  isCorrect?: boolean;
}

export interface ForensicLabTool {
  id: 'fingerprint' | 'dna' | 'ballistics' | 'hexdump' | 'bloodspatter' | 'spectrum';
  name: string;
  iconName: string;
  tagline: string;
  description: string;
}

export interface CadetBadge {
  id: string;
  title: string;
  category: string;
  earnedDate?: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface CadetProfile {
  name: string;
  badgeNumber: string;
  email: string;
  phone?: string;
  nationalId?: string;
  rank: string;
  xp: number;
  nextRankXp: number;
  level: number;
  streakDays: number;
  solvedCasesCount: number;
  completedLessonsCount: number;
  accuracyRate: number;
  certificatesCount: number;
  isRegistered: boolean;
  registrationDate?: string;
  financialStatus: FinancialStatusCategory;
  uploadedVerificationDocs: {
    id: string;
    docName: string;
    docType: 'Disability Card' | 'Orphan Status Certificate' | 'Financial Hardship Letter' | 'Government Admin Recommendation';
    uploadDate: string;
    status: 'Verified & Approved' | 'Under Review';
  }[];
  radarStats: {
    forensicScience: number;
    cyberOsint: number;
    legalKnowledge: number;
    profiling: number;
    evidenceHandling: number;
  };
  recentActivity: {
    id: string;
    action: string;
    timestamp: string;
    xpGained: number;
  }[];
}

export interface LiveWorkshop {
  id: string;
  title: string;
  speaker: string;
  speakerTitle: string;
  date: string;
  time: string;
  status: 'LIVE NOW' | 'UPCOMING' | 'ARCHIVED';
  attendees: number;
  topic: string;
  thumbnailUrl: string;
  zoomUrlPlaceholder: string;
}
