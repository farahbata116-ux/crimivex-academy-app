import { Course, CaseFile, CadetProfile, LiveWorkshop, CadetBadge } from '../types';

export const FARAH_INSTRUCTOR = {
  name: 'Farah Abdi Hassan',
  title: 'Founder & Instructor, CRIMIVEX Academy',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
  bio: 'Founder and Lead Academic Instructor at CRIMIVEX Academy. Specializes in criminology theory, physical evidence preservation, and modern criminal justice frameworks for professional development.'
};

export const INITIAL_CADET_PROFILE: CadetProfile = {
  name: "Farah Abdi Hassan",
  badgeNumber: "CRIM-101-VX",
  email: "farahbata116@gmail.com",
  nationalId: "REG-2026-PENDING",
  rank: "Founding Scholar",
  level: 1,
  xp: 450,
  nextRankXp: 1000,
  streakDays: 3,
  solvedCasesCount: 1,
  completedLessonsCount: 3,
  accuracyRate: 100,
  certificatesCount: 0,
  isRegistered: true,
  registrationDate: "2026-08-01",
  financialStatus: 'Standard Student (KSh 3,000)',
  uploadedVerificationDocs: [],
  radarStats: {
    forensicScience: 75,
    cyberOsint: 70,
    legalKnowledge: 80,
    profiling: 85,
    evidenceHandling: 90,
  },
  recentActivity: [
    { id: 'act-1', action: 'Enrolled in CRIM101 – Introduction to Criminology and Criminal Justice', timestamp: 'Today', xpGained: 100 },
    { id: 'act-2', action: 'Watched Lecture: 1.1 Understanding Criminology & Lawful Systems', timestamp: 'Yesterday', xpGained: 150 },
    { id: 'act-3', action: 'Completed Quiz: Theories of Crime Causation', timestamp: 'Yesterday', xpGained: 200 },
  ],
};

export const ACADEMY_COURSES: Course[] = [
  {
    id: 'CRIM-101',
    title: 'CRIM101: Introduction to Criminology and Criminal Justice',
    subtitle: 'Foundational study of crime causation, criminal behavior, policing, legal procedure, and restorative justice.',
    category: 'Criminology & Criminal Justice',
    level: 'Cadet Fundamentals',
    instructor: FARAH_INSTRUCTOR,
    duration: '8–12 Weeks (10 Modules)',
    durationHours: 36,
    prerequisites: ['None – Open to all cadets, students & law enthusiasts'],
    courseFee: 3000,
    certificateFee: 2000,
    totalModules: 10,
    enrolledCount: 1420,
    rating: 5.0,
    badgeEarned: 'Certified Criminology Foundation Scholar',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    description: 'An authoritative introduction to criminology and criminal justice systems. Explore Classical and Positivist criminological theories, elements of crime, due process, physical evidence standards, text-based reading materials, assignments, and ethical law enforcement practices.',
    progressPercent: 25,
    isEnrolled: true,
    enrollmentType: 'paid',
    modules: [
      {
        id: 'mod-101-1',
        title: 'Module 1: Foundations of Criminology & Legal Frameworks',
        description: 'Define crime, deviance, and the structural pillars of modern criminal justice systems.',
        lessons: [
          {
            id: 'les-101-1',
            title: '1.1 What is Criminology & The Criminal Justice System',
            duration: '25 mins read',
            type: 'lecture',
            description: 'Understanding crime as a social and legal phenomenon, criminal law elements, and state prosecution.',
            keyConcepts: ['Actus Reus', 'Mens Rea', 'Deviance vs. Crime', 'Due Process'],
            contentMarkdown: `### 1. Defining Criminology & Lawful Systems
Criminology is the scientific study of the nature, extent, management, causes, control, consequences, and prevention of criminal behavior, both on the individual and social levels.

#### Core Elements of Crime in Criminal Law:
1. **Actus Reus**: The physical wrongful act or unlawful omission.
2. **Mens Rea**: The culpable mental state (intent, knowledge, recklessness, or criminal negligence).
3. **Concurrence**: The act and the intent must occur together.
4. **Harm & Causation**: The conduct must cause demonstrable harm prohibited by law.

> *Legal Notice: CRIMIVEX Academy provides strictly lawful educational training to assist academic understanding and ethical public service.*`,
            isCompleted: true,
            quiz: [
              {
                id: 'q101-1',
                question: 'Which legal term defines the physical wrongful act required to establish criminal liability?',
                options: [
                  'Mens Rea',
                  'Actus Reus',
                  'Habeas Corpus',
                  'Stare Decisis'
                ],
                correctAnswer: 1,
                explanation: 'Actus Reus is the physical unlawful act or omission required by law for a crime.'
              }
            ]
          },
          {
            id: 'les-101-2',
            title: '1.2 Classical vs. Positivist Theories of Crime Causation',
            duration: '30 mins read',
            type: 'lecture',
            description: 'Compare Cesare Beccaria\'s rational choice model with Cesare Lombroso\'s biological determinism.',
            keyConcepts: ['Rational Choice Theory', 'Deterrence', 'Biological Positivism', 'Hedonistic Calculus'],
            contentMarkdown: `### Classical Criminology & Rational Choice
Classical criminology, pioneered by Cesare Beccaria and Jeremy Bentham, asserts that human beings possess free will and make rational decisions based on hedonistic calculus (weighing pleasure vs. pain).

#### Pillars of Effective Deterrence:
- **Certainty**: The likelihood of being apprehended.
- **Swiftness (Celerity)**: The speed with which punishment follows the act.
- **Severity**: The proportionality of the penalty to fit the crime.`,
            isCompleted: true,
          }
        ]
      },
      {
        id: 'mod-101-2',
        title: 'Module 2: Police Operations, Evidence & Constitutional Protections',
        description: 'Lawful search protocols, chain of custody, and suspect rights during police interrogation.',
        lessons: [
          {
            id: 'les-101-3',
            title: '2.1 Lawful Search, Seizure & Chain of Custody',
            duration: '35 mins read',
            type: 'case_analysis',
            description: 'Preserving physical and digital evidence integrity for court admissibility.',
            keyConcepts: ['Chain of Custody', 'Plain View Doctrine', 'Exclusionary Rule'],
            contentMarkdown: `### Evidence Chain of Custody Protocol
Every transfer of physical evidence must be meticulously documented from the moment of collection at the crime scene until final judicial presentation.

#### Required Log Details:
1. Item Description & Unique Identification Tag
2. Time, Date, and Precise Location of Collection
3. Full Name and Rank of Evidence Specialist
4. Purpose of Transfer & Destination Laboratory`,
            isCompleted: true,
            quiz: [
              {
                id: 'q101-2',
                question: 'What is the primary consequence if an unbroken chain of custody cannot be proven in court?',
                options: [
                  'The judge doubles the fine',
                  'The evidence may be ruled inadmissible due to potential tampering or contamination',
                  'The suspect is automatically acquitted of all charges',
                  'The evidence is transferred to federal jurisdiction'
                ],
                correctAnswer: 1,
                explanation: 'A broken chain of custody creates reasonable doubt regarding tampering, rendering evidence inadmissible.'
              }
            ]
          }
        ]
      },
      {
        id: 'mod-101-3',
        title: 'Module 3: Criminological Theories of Crime Causation',
        description: 'Analyze Strain Theory, Social Learning Theory, and Social Control Theory.',
        lessons: [
          {
            id: 'les-101-4',
            title: '3.1 Strain Theory & Anomie (Robert Agnew)',
            duration: '30 mins read',
            type: 'lecture',
            description: 'Understanding how structural societal pressure and personal strain produce criminal adaptations.',
            keyConcepts: ['General Strain Theory', 'Anomie', 'Conformity vs. Innovation', 'Social Pressure'],
            contentMarkdown: `### General Strain Theory
Robert Agnew expanded Merton's classic Anomie theory to explain how individual emotional strains lead to crime.

#### Primary Types of Strain:
1. Failure to achieve positively valued goals.
2. Removal of positively valued stimuli (e.g., loss of job or relative).
3. Presentation of noxious or negative stimuli (e.g., abuse or discrimination).`,
            isCompleted: false,
            quiz: [
              {
                id: 'q101-3',
                question: 'According to Robert Agnew’s Strain Theory, which adaptation involves accepting cultural goals while using illegal means to achieve them?',
                options: ['Conformity', 'Innovation', 'Ritualism', 'Retreatism'],
                correctAnswer: 1,
                explanation: 'Innovators accept societal goals (e.g. wealth) but adopt illegal means when legitimate avenues are blocked.'
              }
            ]
          }
        ]
      },
      {
        id: 'mod-101-4',
        title: 'Module 4: Crime Measurement, Victimology & Violent Crime Analysis',
        description: 'Explore national crime reporting standards, UCR/NIBRS data, and victim assistance systems.',
        lessons: [
          {
            id: 'les-101-5',
            title: '4.1 Crime Data Measurement & Victim Dynamics',
            duration: '25 mins read',
            type: 'lecture',
            description: 'Statistical measurement of crime rates, dark figure of crime, and victim advocacy.',
            keyConcepts: ['Dark Figure of Crime', 'UCR', 'NIBRS', 'Victimology'],
            contentMarkdown: `### The Dark Figure of Crime & Measurement
The "Dark Figure of Crime" refers to unreported or undiscovered crimes that never appear in official police statistics.

#### Key Data Collection Tools:
- **Uniform Crime Reporting (UCR)**: Standardized police report data.
- **National Incident-Based Reporting System (NIBRS)**: Granular incident-level detail.
- **National Crime Victimization Survey (NCVS)**: Self-reported survey data from households.`,
            isCompleted: false
          }
        ]
      },
      {
        id: 'mod-101-5',
        title: 'Module 5: White-Collar, Cyber & Financial Crime Investigation',
        description: 'Examine corporate fraud, money laundering, ransomware vectors, and insider threats.',
        lessons: [
          {
            id: 'les-101-6',
            title: '5.1 Corporate Fraud & Money Laundering Principles',
            duration: '35 mins read',
            type: 'case_analysis',
            description: 'Understanding the fraud triangle, shell companies, and illicit financial tracking.',
            keyConcepts: ['Fraud Triangle', 'Placement, Layering, Integration', 'Embezzlement'],
            contentMarkdown: `### The Fraud Triangle & Financial Forensics
Sutherland coined "White-Collar Crime" to describe non-violent crimes committed by business professionals for financial gain.

#### The 3 Elements of the Fraud Triangle:
1. **Pressure / Incentive**: Financial hardship or greed.
2. **Opportunity**: Weak internal auditing controls.
3. **Rationalization**: Justifying the theft internally.`,
            isCompleted: false
          }
        ]
      },
      {
        id: 'mod-101-6',
        title: 'Module 6: Criminal Law, Evidence Rules & Judicial Proceedings',
        description: 'Courtroom proceedings, burden of proof beyond reasonable doubt, and trial procedure.',
        lessons: [
          {
            id: 'les-101-7',
            title: '6.1 Substantive Law & Trial Standards',
            duration: '30 mins read',
            type: 'lecture',
            description: 'Distinguishing criminal court standards from civil preponderance of evidence.',
            keyConcepts: ['Beyond Reasonable Doubt', 'Hearsay Exceptions', 'Expert Witness'],
            contentMarkdown: `### Burden of Proof: Beyond Reasonable Doubt
In criminal law, the prosecution bears the high burden of proving guilt *beyond a reasonable doubt*.

#### Evidentiary Rules:
- **Direct Evidence**: Proves a fact directly without inference (e.g., eyewitness testimony or video footage).
- **Circumstantial Evidence**: Requires logical inferences to connect evidence to a conclusion.`,
            isCompleted: false
          }
        ]
      },
      {
        id: 'mod-101-7',
        title: 'Module 7: Forensic Science Fundamentals & Physical Trace Analysis',
        description: 'Physical evidence recovery, fingerprint patterns, DNA electrophoresis, and Locard\'s principle.',
        lessons: [
          {
            id: 'les-101-8',
            title: '7.1 Physical Trace Evidence & Fingerprint Classifications',
            duration: '40 mins read',
            type: 'lab_sim',
            description: 'Analyzing loops, whorls, arches, latent powder development, and DNA STR profiles.',
            keyConcepts: ['Locard\'s Exchange Principle', 'Latent Prints', 'DNA STR Profiling'],
            contentMarkdown: `### Locard's Exchange Principle
"Every contact leaves a trace." Whenever two objects come into contact, there is an exchange of physical materials.

#### Primary Fingerprint Pattern Types:
1. **Loops** (60–65% of population): Ulnar and Radial.
2. **Whorls** (30–35% of population): Plain, Accidental, Central Pocket.
3. **Arches** (5% of population): Plain and Tented.`,
            isCompleted: false
          }
        ]
      },
      {
        id: 'mod-101-8',
        title: 'Module 8: Correctional Systems, Rehabilitation & Penology',
        description: 'Incarceration models, deterrence, probation, parole, and community restorative justice.',
        lessons: [
          {
            id: 'les-101-9',
            title: '8.1 Theories of Punishment & Community Supervision',
            duration: '25 mins read',
            type: 'lecture',
            description: 'Comparing retributive justice, deterrence, rehabilitation, and restorative justice models.',
            keyConcepts: ['Retribution', 'Rehabilitation', 'Restorative Justice', 'Recidivism Reduction'],
            contentMarkdown: `### Penology & Restorative Justice
Modern penology seeks to balance societal safety, punishment, and offender rehabilitation.

#### Pillars of Restorative Justice:
- Repairing harm done to victims and community.
- Offender accountability and community reintegration.
- Reducing long-term recidivism through vocational and psychological support.`,
            isCompleted: false
          }
        ]
      },
      {
        id: 'mod-101-9',
        title: 'Module 9: Juvenile Justice & Delinquency Prevention',
        description: 'Juvenile court jurisdiction, status offenses, and early childhood intervention programs.',
        lessons: [
          {
            id: 'les-101-10',
            title: '9.1 Juvenile Delinquency & Status Offenses',
            duration: '25 mins read',
            type: 'lecture',
            description: 'Understanding *parens patriae*, juvenile diversion programs, and rehabilitation emphasis.',
            keyConcepts: ['Parens Patriae', 'Status Offense', 'Juvenile Diversion'],
            contentMarkdown: `### The Doctrine of Parens Patriae
The state acts as a guardian or parent for juveniles who are neglected or delinquent, prioritizing guidance and rehabilitation over retributive punishment.

#### Key Concepts:
- **Status Offenses**: Actions prohibited only due to minor age status (e.g., truancy, curfew violation).
- **Diversion Programs**: Community service and counseling in lieu of formal juvenile detention.`,
            isCompleted: false
          }
        ]
      },
      {
        id: 'mod-101-10',
        title: 'Module 10: Comprehensive Capstone & Final Academy Evaluation',
        description: 'Master comprehensive examination and practical case synthesis for CRIM101 graduation.',
        lessons: [
          {
            id: 'les-101-11',
            title: '10.1 CRIM101 Final Capstone Assessment Exam',
            duration: '45 mins evaluation',
            type: 'quiz',
            description: 'Final academic evaluation covering all 10 modules. Required score of 70%+ for official CRIMIVEX Academy Certificate eligibility.',
            keyConcepts: ['Master Synthesis', 'Legal Principles', 'Forensic Analysis', 'Certificate Milestone'],
            contentMarkdown: `### CRIM101 Master Capstone Exam
Congratulations on reaching the final module of CRIM101 – Introduction to Criminology and Criminal Justice!

Upon completing this evaluation and achieving a passing grade, your official CRIMIVEX Academy Certificate of Completion will be generated and logged in the public registry.

> *Signed: Farah Abdi Hassan, Founder & Lead Instructor, CRIMIVEX Academy*`,
            isCompleted: false,
            quiz: [
              {
                id: 'q101-final',
                question: 'Which principle states that every physical contact at a crime scene leaves a trace exchange?',
                options: [
                  'Locard\'s Exchange Principle',
                  'Beccaria\'s Hedonistic Calculus',
                  'Agnew\'s Strain Principle',
                  'Merton\'s Anomie Rule'
                ],
                correctAnswer: 0,
                explanation: 'Locard\'s Exchange Principle forms the fundamental basis of physical trace forensic science.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'CSI-101',
    title: 'Crime Scene Investigation Fundamentals',
    subtitle: 'Master Locard\'s Exchange Principle, physical trace recovery, latent fingerprints, and evidence documentation.',
    category: 'Crime Scene Investigation (CSI)',
    level: 'Cadet Fundamentals',
    instructor: FARAH_INSTRUCTOR,
    duration: '6 Weeks (8 Modules)',
    durationHours: 24,
    prerequisites: ['CRIM101 or basic interest in forensic science'],
    courseFee: 3000,
    certificateFee: 2000,
    totalModules: 8,
    enrolledCount: 890,
    rating: 5.0,
    badgeEarned: 'Certified Crime Scene Documentation Specialist',
    coverImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    description: 'Learn physical crime scene cordon establishment, latent fingerprint powder development, shoe print casting, and meticulous evidence packaging.',
    progressPercent: 0,
    isEnrolled: false,
    modules: []
  },
  {
    id: 'CYBER-301',
    title: 'Cybersecurity Bootcamp',
    subtitle: 'Intensive hands-on training covering network security fundamentals, threat vectors, system hardening, and defense protocols.',
    category: 'Cybersecurity Education',
    level: 'Intermediate Field',
    instructor: FARAH_INSTRUCTOR,
    duration: '10 Weeks (10 Modules)',
    durationHours: 40,
    prerequisites: ['Basic IT literacy & CRIM101'],
    courseFee: 3000,
    certificateFee: 2000,
    totalModules: 10,
    enrolledCount: 650,
    rating: 4.9,
    badgeEarned: 'Certified Cybersecurity Practitioner',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive cybersecurity bootcamp focusing on defensive posture, vulnerability management, threat landscapes, and incident response fundamentals.',
    progressPercent: 0,
    isEnrolled: false,
    modules: []
  },
  {
    id: 'CYBER-302',
    title: 'Threat Intelligence & Cyber Reconnaissance',
    subtitle: 'Analyze adversary tactics, techniques, and procedures (TTPs), threat modeling, and open-source intelligence.',
    category: 'Cybersecurity Education',
    level: 'Senior Specialist',
    instructor: FARAH_INSTRUCTOR,
    duration: '8 Weeks (8 Modules)',
    durationHours: 32,
    prerequisites: ['Cybersecurity Bootcamp or equivalent'],
    courseFee: 3000,
    certificateFee: 2000,
    totalModules: 8,
    enrolledCount: 420,
    rating: 5.0,
    badgeEarned: 'Threat Intelligence Analyst',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    description: 'Master threat intelligence feeds, MITRE ATT&CK framework mapping, indicator of compromise (IOC) extraction, and threat actor profiling.',
    progressPercent: 0,
    isEnrolled: false,
    modules: []
  },
  {
    id: 'FOR-401',
    title: 'Digital Forensics & Incident Response',
    subtitle: 'Extract digital evidence from file systems, memory dumps, network packets, and mobile artifacts.',
    category: 'Cyber Forensics & OSINT',
    level: 'Senior Specialist',
    instructor: FARAH_INSTRUCTOR,
    duration: '8 Weeks (8 Modules)',
    durationHours: 30,
    prerequisites: ['Cybersecurity Bootcamp & CRIM101'],
    courseFee: 3000,
    certificateFee: 2000,
    totalModules: 8,
    enrolledCount: 510,
    rating: 4.9,
    badgeEarned: 'Digital Forensics Examiner',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    description: 'Deep dive into digital evidence extraction, disk imaging analysis, timeline creation, and courtroom admissible forensic reporting.',
    progressPercent: 0,
    isEnrolled: false,
    modules: []
  },
  {
    id: 'CRIM-202',
    title: 'Victimology & Support Systems',
    subtitle: 'Study psychological impact of crime, victim rights, trauma-informed interviewing, and advocacy mechanisms.',
    category: 'Criminology & Criminal Justice',
    level: 'Intermediate Field',
    instructor: FARAH_INSTRUCTOR,
    duration: '6 Weeks (6 Modules)',
    durationHours: 20,
    prerequisites: ['CRIM101'],
    courseFee: 3000,
    certificateFee: 2000,
    totalModules: 6,
    enrolledCount: 380,
    rating: 5.0,
    badgeEarned: 'Victim Advocacy Specialist',
    coverImage: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=800&q=80',
    description: 'Examine victim-offender dynamics, victim precipitation theory, legal protections, and victim assistance programs within legal systems.',
    progressPercent: 0,
    isEnrolled: false,
    modules: []
  }
];

export const COLD_CASES: CaseFile[] = [
  {
    id: 'CASE-8821',
    title: 'Educational Case File: The Disguised Binary Incident',
    codename: 'SIMULATION-01',
    track: 'Cyber Forensics & OSINT',
    difficulty: 'Intermediate',
    status: 'Open Cold Case',
    summary: 'A company server recorded an anomaly where an image file uploaded to the public directory contained hidden binary headers. Cadets analyze magic bytes to determine file manipulation.',
    location: 'Educational Training Server Lab',
    timestamp: 'August 2026',
    victim: 'Training Server Database',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    suspects: [
      {
        id: 's1',
        name: 'Victor Kroll',
        role: 'Former Systems Administrator',
        age: 42,
        occupation: 'IT Specialist',
        alibi: 'Claims he was off duty during the upload log timestamp.',
        suspicionLevel: 'Prime Suspect',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
        notes: 'Had access credentials to server directory.',
        keyQuote: '"I was not logged into the administrator portal at 02:00 AM."'
      }
    ],
    evidence: [
      {
        id: 'EV-8821-A',
        name: 'File Header Sample (uploaded_image.png)',
        type: 'Hex Dump',
        description: 'File extension displays .png, but header magic bytes offset 0x00 reads 4D 5A (Windows Executable header MZ).',
        foundLocation: '/var/www/uploads/assets/',
        collectedBy: 'Forensic Lab Student',
        chainOfCustodyVerified: true,
      }
    ],
    forensicPuzzle: {
      question: 'Based on the hex dump of uploaded_image.png (magic bytes 4D 5A), what anomaly is present?',
      options: [
        'The file is an unaltered JPEG photo',
        'The magic bytes 4D 5A indicate it is an executable binary file disguised with a .png extension',
        'The file is an audio recording',
        'The file was created on a Linux server'
      ],
      correctIndex: 1,
      explanation: 'The header offset 0x00 displays "4D 5A" which corresponds to DOS/Windows Executable (MZ) format header. Renaming an executable payload to .png is a common evasion technique.'
    }
  }
];

export const CADET_BADGES: CadetBadge[] = [
  {
    id: 'badge-1',
    title: 'Criminology Foundation',
    category: 'Criminal Justice Fundamentals',
    earnedDate: '2026-08-02',
    icon: 'BookOpen',
    description: 'Enrolled in CRIM101 and completed Module 1 Legal Frameworks.',
    unlocked: true,
  },
  {
    id: 'badge-2',
    title: 'Evidence Integrity Scholar',
    category: 'Forensic Procedures',
    earnedDate: undefined,
    icon: 'ShieldCheck',
    description: 'Score 100% on evidence chain of custody examination.',
    unlocked: false,
  },
  {
    id: 'badge-3',
    title: 'Lawful Investigator',
    category: 'Legal Studies',
    earnedDate: undefined,
    icon: 'Award',
    description: 'Complete CRIM101 with all module quizzes passed.',
    unlocked: false,
  }
];

export const UPCOMING_WORKSHOPS: LiveWorkshop[] = [
  {
    id: 'ws-101',
    title: 'CRIMIVEX Academic Orientation: Criminology Career Paths & Study Methods',
    speaker: 'Farah Abdi Hassan',
    speakerTitle: 'Founder & Instructor, CRIMIVEX Academy',
    date: 'Saturday, Aug 8',
    time: '14:00 EAT (60 mins)',
    status: 'LIVE NOW',
    attendees: 1,
    topic: 'An introduction to course expectations, financial aid fee waivers for disadvantaged students, and criminological research methods.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    zoomUrlPlaceholder: 'https://crimivex.academy/live/orientation'
  }
];
