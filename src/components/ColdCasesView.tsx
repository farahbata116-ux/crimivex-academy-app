import React, { useState } from 'react';
import { CaseFile, Suspect } from '../types';
import { 
  FolderGit2, 
  Sparkles, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft, 
  MessageSquare, 
  ShieldAlert, 
  Clock, 
  MapPin,
  Lock,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface ColdCasesViewProps {
  cases: CaseFile[];
  searchQuery: string;
  onSolveCase: (caseId: string, isCorrect: boolean, selectedIndex: number) => void;
  onOpenInterrogation: (suspect: Suspect, caseFile: CaseFile) => void;
  onGenerateAiCase: (difficulty: string, track: string) => Promise<void>;
  isGeneratingAiCase: boolean;
}

export const ColdCasesView: React.FC<ColdCasesViewProps> = ({
  cases,
  searchQuery,
  onSolveCase,
  onOpenInterrogation,
  onGenerateAiCase,
  isGeneratingAiCase
}) => {
  const [selectedCase, setSelectedCase] = useState<CaseFile | null>(null);
  const [selectedPuzzleOption, setSelectedPuzzleOption] = useState<number | null>(null);
  const [genDifficulty, setGenDifficulty] = useState<string>('Intermediate');
  const [genTrack, setGenTrack] = useState<string>('Cyber Forensics & OSINT');

  const filteredCases = cases.filter((c) => {
    return searchQuery === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.codename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.track.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handlePuzzleSubmit = () => {
    if (selectedPuzzleOption === null || !selectedCase) return;
    const isCorrect = selectedPuzzleOption === selectedCase.forensicPuzzle.correctIndex;
    onSolveCase(selectedCase.id, isCorrect, selectedPuzzleOption);
  };

  return (
    <div className="space-y-6">

      {/* Case Reader Modal / Fullview */}
      {selectedCase ? (
        <div className="bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl space-y-6">
          {/* Header Bar */}
          <div className="bg-[#0A0A0A] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <button
              onClick={() => setSelectedCase(null)}
              className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-red-500 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO COLD CASES REPOSITORY</span>
            </button>

            <div className="flex items-center space-x-3">
              <span className={`text-xs font-mono font-black px-3 py-1 uppercase tracking-widest border ${
                selectedCase.status === 'Solved'
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                  : 'bg-red-600 border-red-600 text-white'
              }`}>
                {selectedCase.status.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Case Meta Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-black border border-white/10 p-6">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-mono text-red-500 font-black uppercase tracking-widest">
                  {selectedCase.codename} • {selectedCase.id}
                </span>
                <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                  {selectedCase.title}
                </h1>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  {selectedCase.summary}
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-3 border-t border-white/10 uppercase font-bold">
                  <span className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>LOCATION: {selectedCase.location}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span>TIMESTAMP: {selectedCase.timestamp}</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 overflow-hidden border border-white/10 h-44 relative">
                <img
                  src={selectedCase.coverImage}
                  alt={selectedCase.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </div>

            {/* Suspect Roster Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-red-500 uppercase tracking-widest flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4" />
                <span>SUSPECT ROSTER & PRELIMINARY INTERROGATIONS ({selectedCase.suspects.length})</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCase.suspects.map((suspect) => (
                  <div
                    key={suspect.id}
                    className="bg-black border border-white/10 p-5 space-y-3 hover:border-red-600 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={suspect.avatar}
                          alt={suspect.name}
                          className="w-12 h-12 border border-white/20 object-cover"
                        />
                        <div>
                          <h4 className="text-sm font-black uppercase text-white tracking-wider">{suspect.name}</h4>
                          <p className="text-xs text-red-500 font-mono font-bold uppercase">{suspect.role}</p>
                          <p className="text-[10px] text-zinc-400 font-mono uppercase">AGE {suspect.age} • {suspect.occupation}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono font-black px-2 py-0.5 uppercase tracking-wider border ${
                        suspect.suspicionLevel === 'Prime Suspect'
                          ? 'bg-red-600 border-red-600 text-white'
                          : 'bg-zinc-800 border-white/20 text-zinc-300'
                      }`}>
                        {suspect.suspicionLevel}
                      </span>
                    </div>

                    <div className="bg-zinc-900 border border-white/10 p-3 text-xs space-y-1 font-mono">
                      <p className="text-zinc-300 italic">"{suspect.keyQuote}"</p>
                      <p className="text-[11px] text-zinc-400 font-mono pt-1 border-t border-white/10 uppercase">
                        ALIBI: {suspect.alibi}
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenInterrogation(suspect, selectedCase)}
                      className="w-full py-2.5 bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>INTERROGATE WITH CRIMIVEX AI</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence Locker Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-red-500 uppercase tracking-widest flex items-center space-x-2">
                <FolderGit2 className="w-4 h-4" />
                <span>EVIDENCE LOCKER ({selectedCase.evidence.length} ITEMS)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCase.evidence.map((ev) => (
                  <div key={ev.id} className="bg-black border border-white/10 p-4 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-red-500 font-black">{ev.id}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-zinc-900 border border-white/10 text-zinc-300 font-mono font-bold uppercase">
                        {ev.type}
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">{ev.name}</h4>
                    <p className="text-xs text-zinc-400 font-light">{ev.description}</p>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase">FOUND AT: {ev.foundLocation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deduction Challenge Puzzle */}
            <div className="bg-zinc-900 border border-red-600/40 p-6 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 text-red-500 border-b border-white/10 pb-3">
                <AlertCircle className="w-5 h-5" />
                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                  CADET FORENSIC DEDUCTION CHALLENGE (+500 XP)
                </h3>
              </div>

              <p className="text-xs font-bold text-zinc-200 uppercase tracking-wide">
                {selectedCase.forensicPuzzle.question}
              </p>

              <div className="space-y-2">
                {selectedCase.forensicPuzzle.options.map((option, idx) => {
                  const isSelected = selectedPuzzleOption === idx;
                  let btnClass = 'bg-black border-white/10 text-zinc-300 hover:border-red-600';
                  
                  if (selectedCase.solutionSubmitted) {
                    if (idx === selectedCase.forensicPuzzle.correctIndex) {
                      btnClass = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                    } else if (selectedCase.userAnswerIndex === idx && idx !== selectedCase.forensicPuzzle.correctIndex) {
                      btnClass = 'bg-rose-950 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    btnClass = 'bg-red-600 border-red-600 text-white font-black';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedCase.solutionSubmitted}
                      onClick={() => setSelectedPuzzleOption(idx)}
                      className={`w-full p-3 text-left border text-xs uppercase tracking-wider transition ${btnClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {!selectedCase.solutionSubmitted ? (
                <button
                  onClick={handlePuzzleSubmit}
                  disabled={selectedPuzzleOption === null}
                  className="px-8 py-3 bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest transition disabled:opacity-50"
                >
                  SUBMIT OFFICIAL DEDUCTION
                </button>
              ) : (
                <div className={`p-4 text-xs space-y-1 ${
                  selectedCase.isCorrect
                    ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                    : 'bg-rose-950 border border-rose-500 text-rose-200'
                }`}>
                  <p className="font-black uppercase tracking-widest">
                    {selectedCase.isCorrect ? '✓ CASE SOLVED: 500 XP AWARDED!' : '✗ INCORRECT DEDUCTION'}
                  </p>
                  <p className="text-zinc-300 font-mono">{selectedCase.forensicPuzzle.explanation}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      ) : (
        /* Cold Cases Overview & AI Case Generator */
        <div className="space-y-6">
          {/* AI Dynamic Case Generator Banner */}
          <div className="bg-zinc-900 border border-white/10 p-8 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center font-black">
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tighter">
                  CRIMIVEX AI DYNAMIC COLD CASE GENERATOR
                </h2>
                <p className="text-xs text-zinc-400 font-mono uppercase">
                  GENERATE PROCEDURAL COLD CASE SCENARIOS POWERED BY GEMINI 3.6 FLASH.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <select
                value={genTrack}
                onChange={(e) => setGenTrack(e.target.value)}
                className="w-full sm:w-auto bg-black border border-white/10 px-4 py-2.5 text-xs text-zinc-100 font-mono font-bold uppercase focus:border-red-600"
              >
                <option value="Cyber Forensics & OSINT">Cyber Forensics & OSINT</option>
                <option value="Crime Scene Investigation (CSI)">Crime Scene Investigation (CSI)</option>
                <option value="Criminal Psychology & Profiling">Criminal Psychology & Profiling</option>
                <option value="Forensic Chemistry & DNA">Forensic Chemistry & DNA</option>
              </select>

              <select
                value={genDifficulty}
                onChange={(e) => setGenDifficulty(e.target.value)}
                className="w-full sm:w-auto bg-black border border-white/10 px-4 py-2.5 text-xs text-zinc-100 font-mono font-bold uppercase focus:border-red-600"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Master Investigator">Master Investigator</option>
              </select>

              <button
                onClick={() => onGenerateAiCase(genDifficulty, genTrack)}
                disabled={isGeneratingAiCase}
                className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest transition flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGeneratingAiCase ? 'GENERATING CASE FILE...' : 'GENERATE NEW CASE FILE'}</span>
              </button>
            </div>
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className="bg-zinc-900 border border-white/10 hover:border-red-600 transition duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden border-b border-white/10">
                    <img
                      src={c.coverImage}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-70 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-black px-2.5 py-1 bg-red-600 text-white uppercase tracking-widest">
                        {c.codename}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className={`text-[10px] font-mono font-black px-2.5 py-1 uppercase tracking-wider border ${
                        c.status === 'Solved'
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                          : 'bg-black border-white/20 text-red-500'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest">
                      {c.track} • {c.difficulty}
                    </span>
                    <h3 className="text-lg font-black text-white uppercase tracking-tighter group-hover:text-red-500 transition">
                      {c.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 font-light">
                      {c.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="w-full py-3 bg-red-600 hover:bg-white hover:text-black text-white text-xs font-black uppercase tracking-widest flex items-center justify-center space-x-2 transition">
                    <span>INSPECT CASE FILE</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
