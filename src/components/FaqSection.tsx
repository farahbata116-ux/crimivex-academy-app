import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Shield, 
  BookOpen, 
  CreditCard, 
  Award, 
  UserCheck, 
  Wrench,
  Sparkles,
  Info
} from 'lucide-react';

export type FaqCategory = 
  | 'all'
  | 'General Academy Information'
  | 'Registration & Enrollment'
  | 'Training Programs'
  | 'Payment Information'
  | 'Assessments'
  | 'Certificates'
  | 'Technical Support';

interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  // General Academy Information
  {
    id: 'faq-gen-1',
    category: 'General Academy Information',
    question: 'What is CRIMIVEX Academy?',
    answer: 'CRIMIVEX Academy is an independent online professional training platform specializing in criminology, criminal justice, forensic science fundamentals, and cybersecurity education. Founded and led by instructor Farah Abdi Hassan, the platform offers flexible learning for aspiring legal scholars, forensic investigators, and security professionals worldwide.'
  },
  {
    id: 'faq-gen-2',
    category: 'General Academy Information',
    question: 'Is CRIMIVEX Academy a university or government institution?',
    answer: 'No. CRIMIVEX Academy is an independent online professional education and training platform. It is not a traditional university or government agency. Our certificates confirm short course completion and skill acquisition.'
  },
  {
    id: 'faq-gen-3',
    category: 'General Academy Information',
    question: 'Who is the Founder and Lead Instructor?',
    answer: 'CRIMIVEX Academy was founded by Farah Abdi Hassan, who serves as the Lead Instructor and Subject Matter Expert across criminology, criminal justice, forensic investigation, and cybersecurity disciplines.'
  },

  // Registration & Enrollment
  {
    id: 'faq-reg-1',
    category: 'Registration & Enrollment',
    question: 'How do I create a Learner Account and enroll?',
    answer: 'Registration is completely free. Simply click the "Create Account / Enroll" button, enter your full name, email address, national ID/passport number, and set your account password. Once created, you can access your Learning Dashboard immediately.'
  },
  {
    id: 'faq-reg-2',
    category: 'Registration & Enrollment',
    question: 'Who qualifies for the 100% Free Learning Support Program?',
    answer: 'Orphans, Persons with Disabilities (PWD), and financially disadvantaged learners qualify for 100% free training fee waivers. Applicants must upload supporting verification documents (e.g., local Chief status letter, NCPWD disability card) during registration or course enrollment.'
  },

  // Training Programs
  {
    id: 'faq-prog-1',
    category: 'Training Programs',
    question: 'What training programs are offered at CRIMIVEX Academy?',
    answer: 'Our core curriculum includes CRIM101 (Introduction to Criminology and Criminal Justice), CSI101 (Crime Scene Investigation & Evidence Handling), CYBER301 (Cybersecurity & Digital Forensics Fundamentals), FORENSIC-MED (Forensic Pathology & Ballistics), and OSINT-401 (Open Source Intelligence Gathering).'
  },
  {
    id: 'faq-prog-2',
    category: 'Training Programs',
    question: 'How are lessons delivered?',
    answer: 'Lessons consist of comprehensive structured reading units, downloadable PDF handbooks, interactive forensic lab simulators, practical crime scene deduction cases, and knowledge assessments.'
  },

  // Payment Information
  {
    id: 'faq-pay-1',
    category: 'Payment Information',
    question: 'What are the training program fees?',
    answer: 'Registration is free. Standard course training fees start at KSh 3,000, with optional verified paper/digital certificate processing fees at KSh 2,000. Learners approved under the Learning Support Program pay KSh 0.'
  },
  {
    id: 'faq-pay-2',
    category: 'Payment Information',
    question: 'What payment methods are supported?',
    answer: 'We support M-PESA Mobile Money (Paybill / Till Number) and Direct Bank Transfers. Once payment is completed, enter your M-PESA transaction code in the payment portal for instant access confirmation.'
  },

  // Assessments
  {
    id: 'faq-ass-1',
    category: 'Assessments',
    question: 'How are Knowledge Assessments evaluated?',
    answer: 'Each module concludes with an interactive Knowledge Assessment containing multiple-choice questions, forensic evidence matching, and legal scenario deductions. Passing score is 70% or higher.'
  },
  {
    id: 'faq-ass-2',
    category: 'Assessments',
    question: 'Can I retake an assessment if I do not achieve a passing score?',
    answer: 'Yes. Course participants can retake knowledge assessments multiple times to master the curriculum materials without incurring additional charges.'
  },

  // Certificates
  {
    id: 'faq-cert-1',
    category: 'Certificates',
    question: 'How do I verify a CRIMIVEX Professional Certificate?',
    answer: 'All certificates feature a unique Certificate Identification Code (e.g., CRIM-CERT-2026-XXXX), cryptographic SHA-256 verification hash, and a QR code. Employers and verification officers can verify authenticity anytime using the "Verify Certificate" tool.'
  },
  {
    id: 'faq-cert-2',
    category: 'Certificates',
    question: 'Are physical hardcopy certificates available?',
    answer: 'Yes. Upon completing your program, you can download a high-resolution PDF certificate immediately or request an official embossed paper hardcopy dispatched via courier.'
  },

  // Technical Support
  {
    id: 'faq-tech-1',
    category: 'Technical Support',
    question: 'What should I do if I experience login or loading issues?',
    answer: 'Check your internet connection, clear your browser cache, or click "Password Reset" on the login screen. You can also contact our Technical Support team directly at farahbata116@gmail.com.'
  },
  {
    id: 'faq-tech-2',
    category: 'Technical Support',
    question: 'Can I access CRIMIVEX Academy on my smartphone?',
    answer: 'Yes! CRIMIVEX Academy is fully optimized for mobile devices. You can install our official Android APK package or Apple iOS PWA WebApp directly on your smartphone for mobile learning.'
  }
];

export const FaqSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-gen-1');

  const categories: { id: FaqCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Categories', icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: 'General Academy Information', label: 'General Info', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'Registration & Enrollment', label: 'Registration & Account', icon: <UserCheck className="w-3.5 h-3.5" /> },
    { id: 'Training Programs', label: 'Training Programs', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'Payment Information', label: 'Fees & Payments', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'Assessments', label: 'Assessments', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'Certificates', label: 'Certificates', icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'Technical Support', label: 'Tech Support', icon: <Wrench className="w-3.5 h-3.5" /> },
  ];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 font-mono text-xs text-left">
      
      {/* Header Banner */}
      <div className="bg-[#111111] border border-cyan-500/40 p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>CRIMIVEX ACADEMY KNOWLEDGE BASE</span>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              FREQUENTLY ASKED QUESTIONS (FAQ)
            </h2>
            <p className="text-slate-400 text-[11px] mt-1">
              Find instant answers regarding admissions, training programs, fees, 100% support, assessments, certificates, and technical support.
            </p>
          </div>

          <div className="bg-zinc-950 p-3 border border-slate-800 text-right">
            <span className="text-slate-500 text-[10px] block uppercase">OFFICIAL EMAIL SUPPORT</span>
            <span className="text-cyan-400 font-bold text-xs block">farahbata116@gmail.com</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search FAQ questions, fees, certificates, or technical topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-slate-700 text-white pl-10 pr-4 py-3 text-xs outline-none focus:border-cyan-500 transition"
          />
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 font-bold uppercase text-[11px] transition flex items-center space-x-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'bg-zinc-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-[#111111] p-8 border border-slate-800 text-center text-slate-400">
            <Info className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <p className="font-bold text-white uppercase">NO MATCHING FAQ RESULTS FOUND</p>
            <p className="text-[11px] mt-1">Try adjusting your search keywords or switching category filters.</p>
          </div>
        ) : (
          filteredFaqs.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div 
                key={item.id} 
                className={`border transition ${
                  isExpanded ? 'bg-[#111111] border-cyan-500/50' : 'bg-zinc-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 font-bold text-white"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-cyan-400 font-black text-xs shrink-0">Q:</span>
                    <span className="text-xs uppercase leading-snug">{item.question}</span>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="hidden sm:inline-block text-[10px] text-slate-500 uppercase px-2 py-0.5 bg-zinc-900 border border-slate-800">
                      {item.category}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-800 text-slate-300 text-[11px] leading-relaxed">
                    <p className="bg-zinc-950 p-3 border border-slate-800/80 text-slate-200">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
