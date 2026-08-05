import React, { useState } from 'react';
import { Suspect, CaseFile } from '../types';
import { 
  Bot, 
  MessageSquare, 
  Send, 
  FileSearch, 
  HelpCircle, 
  AlertTriangle, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  User,
  ShieldAlert
} from 'lucide-react';

interface CrimivexAIViewProps {
  initialInterrogationTarget?: { suspect: Suspect; caseFile: CaseFile } | null;
}

export const CrimivexAIView: React.FC<CrimivexAIViewProps> = ({
  initialInterrogationTarget
}) => {
  const [activeMode, setActiveMode] = useState<'interrogation' | 'case_analysis' | 'tutor'>('interrogation');

  // Interrogation Mode State
  const [suspectName, setSuspectName] = useState<string>(
    initialInterrogationTarget?.suspect.name || 'Victor Kroll'
  );
  const [suspectRole, setSuspectRole] = useState<string>(
    initialInterrogationTarget?.suspect.role || 'Disgruntled Senior SysAdmin'
  );
  const [caseContext, setCaseContext] = useState<string>(
    initialInterrogationTarget?.caseFile.summary || 'Ransomware outbreak at Apex Logistics server room.'
  );

  const [chatMessages, setChatMessages] = useState<{ sender: 'cadet' | 'suspect'; text: string; eval?: any }[]>([
    {
      sender: 'suspect',
      text: "I told the officers already. I was at home sleeping. I don't know anything about any ransomware script.",
      eval: { deceptionScore: 42, stressLevel: 'Medium', microExpression: 'Glanced downward away from camera' }
    }
  ]);
  const [cadetQuestion, setCadetQuestion] = useState<string>('');
  const [isInterrogating, setIsInterrogating] = useState<boolean>(false);

  // Case Analysis Mode State
  const [analysisCaseTitle, setAnalysisCaseTitle] = useState<string>('Disguised Binary Upload Incident');
  const [analysisEvidence, setAnalysisEvidence] = useState<string>('File extension: .png; Offset 0x00 magic bytes: 4D 5A (Windows Executable MZ); USB Rubber Ducky key injection device recovered.');
  const [analysisSuspectQuote, setAnalysisSuspectQuote] = useState<string>('I was running routine diagnostics on the cluster.');
  const [analysisQuestion, setAnalysisQuestion] = useState<string>('Evaluate evidence validity and recommend next 3 investigative steps.');
  const [analysisReport, setAnalysisReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Tutor Mode State
  const [tutorTopic, setTutorTopic] = useState<string>('Legal Precedent & Evidence Standards');
  const [tutorQuestion, setTutorQuestion] = useState<string>('What is the difference between Daubert and Frye standards for forensic expert testimony in court?');
  const [tutorAnswer, setTutorAnswer] = useState<string | null>(null);
  const [isAskingTutor, setIsAskingTutor] = useState<boolean>(false);

  // Send Interrogation Question
  const handleSendInterrogation = async () => {
    if (!cadetQuestion.trim() || isInterrogating) return;

    const userText = cadetQuestion.trim();
    setCadetQuestion('');
    setChatMessages((prev) => [...prev, { sender: 'cadet', text: userText }]);
    setIsInterrogating(true);

    try {
      const res = await fetch('/api/ai/interrogate-suspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suspectName,
          suspectRole,
          caseContext,
          chatHistory: chatMessages.map((m) => ({ role: m.sender, content: m.text })),
          cadetQuestion: userText,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setChatMessages((prev) => [
          ...prev,
          { sender: 'suspect', text: data.reply, eval: data.evaluation }
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { sender: 'suspect', text: `[System Warning]: ${data.error || 'Interrogation failed.'}` }
        ]);
      }
    } catch (e: any) {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'suspect', text: `[System Error]: ${e.message}` }
      ]);
    } finally {
      setIsInterrogating(false);
    }
  };

  // Run AI Case Analysis
  const handleRunCaseAnalysis = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisReport(null);

    try {
      const res = await fetch('/api/ai/analyze-case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseTitle: analysisCaseTitle,
          evidenceList: [analysisEvidence],
          suspectStatement: analysisSuspectQuote,
          question: analysisQuestion,
        }),
      });

      const data = await res.json();
      if (res.ok && data.analysis) {
        setAnalysisReport(data.analysis);
      } else {
        setAnalysisReport(`Error: ${data.error || 'Failed to generate report.'}`);
      }
    } catch (e: any) {
      setAnalysisReport(`Error: ${e.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Ask AI Tutor
  const handleAskTutor = async () => {
    if (!tutorQuestion.trim() || isAskingTutor) return;
    setIsAskingTutor(true);
    setTutorAnswer(null);

    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: tutorTopic,
          question: tutorQuestion,
        }),
      });

      const data = await res.json();
      if (res.ok && data.answer) {
        setTutorAnswer(data.answer);
      } else {
        setTutorAnswer(`Error: ${data.error || 'Failed to get answer.'}`);
      }
    } catch (e: any) {
      setTutorAnswer(`Error: ${e.message}`);
    } finally {
      setIsAskingTutor(false);
    }
  };

  const lastEval = chatMessages[chatMessages.length - 1]?.eval || { deceptionScore: 40, stressLevel: 'Medium', microExpression: 'None' };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-white/10 p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-mono font-black uppercase tracking-widest text-red-500">
              CRIMIVEX GEMINI 3.6 FORENSIC INTELLIGENCE SYSTEM
            </span>
            <span className="px-2 py-0.5 bg-black text-zinc-300 font-mono text-[9px] uppercase border border-white/10 font-bold">
              EDUCATIONAL TRAINING TOOL
            </span>
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter mt-1">
            AI SUSPECT INTERROGATOR & FORENSIC TUTOR
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-light">
            Conduct cognitive interviewing simulations with AI suspects, perform automated evidence evaluation, and consult Lead Instructor Farah Abdi Hassan.
          </p>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center gap-2 bg-zinc-900 border border-white/10 p-2">
        {[
          { id: 'interrogation', label: 'INTERACTIVE SUSPECT INTERROGATOR', icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'case_analysis', label: 'AI CASE REPORT GENERATOR', icon: <FileSearch className="w-4 h-4" /> },
          { id: 'tutor', label: 'INSTRUCTOR FARAH ABDI HASSAN Q&A', icon: <HelpCircle className="w-4 h-4" /> },
        ].map((m) => {
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id as any)}
              className={`flex-1 w-full py-3 text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition ${
                isActive
                  ? 'bg-red-600 border-red-600 text-white shadow-lg'
                  : 'bg-black text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10'
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* MODE 1: INTERACTIVE INTERROGATION */}
      {activeMode === 'interrogation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Chat Window */}
          <div className="lg:col-span-8 bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[650px]">
            {/* Header */}
            <div className="bg-black p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 border border-red-500 flex items-center justify-center font-black text-white text-xs uppercase tracking-wider">
                  SUSPECT
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase text-white tracking-wider">{suspectName}</h3>
                  <p className="text-xs text-red-500 font-mono font-bold uppercase">{suspectRole}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-black px-2.5 py-1 bg-zinc-800 border border-white/10 text-zinc-300 uppercase tracking-widest">
                PEACE INTERVIEW MODEL
              </span>
            </div>

            {/* Messages History */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 no-scrollbar bg-black/60">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start space-x-3 ${
                    msg.sender === 'cadet' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center text-xs font-black ${
                    msg.sender === 'cadet'
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-800 text-zinc-200 border border-white/10'
                  }`}>
                    {msg.sender === 'cadet' ? <User className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4 text-red-500" />}
                  </div>

                  <div className={`max-w-md p-4 text-xs space-y-1 ${
                    msg.sender === 'cadet'
                      ? 'bg-red-600/20 text-white border border-red-600/40'
                      : 'bg-zinc-900 text-zinc-200 border border-white/10'
                  }`}>
                    <p className="font-black text-[10px] uppercase font-mono text-red-500 tracking-widest">
                      {msg.sender === 'cadet' ? 'INVESTIGATOR' : suspectName}
                    </p>
                    <p className="leading-relaxed font-light">{msg.text}</p>
                  </div>
                </div>
              ))}

              {isInterrogating && (
                <div className="flex items-center space-x-2 text-xs text-red-500 font-mono font-bold uppercase tracking-widest animate-pulse">
                  <Bot className="w-4 h-4" />
                  <span>Suspect is formulating response...</span>
                </div>
              )}
            </div>

            {/* Question Input Box */}
            <div className="p-4 bg-black border-t border-white/10 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Formulate interrogation question..."
                value={cadetQuestion}
                onChange={(e) => setCadetQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendInterrogation()}
                className="flex-1 bg-zinc-900 border border-white/10 px-4 py-3 text-xs text-white placeholder-zinc-500 font-mono uppercase focus:outline-none focus:border-red-600"
              />
              <button
                onClick={handleSendInterrogation}
                disabled={isInterrogating || !cadetQuestion.trim()}
                className="px-6 py-3 bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest transition flex items-center space-x-1.5 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">ASK</span>
              </button>
            </div>
          </div>

          {/* Right: Realtime Psychological & Deception Meter Panel */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-zinc-900 border border-white/10 p-6 space-y-4 shadow-xl">
              <h4 className="text-xs font-black text-red-500 font-mono uppercase tracking-widest flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>AI DECEPTION & TELEMETRY</span>
              </h4>

              <div className="space-y-3 bg-black p-4 border border-white/10 font-mono">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400 uppercase">Deception Prob:</span>
                    <span className="font-black text-red-500">{lastEval.deceptionScore || 45}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 overflow-hidden">
                    <div
                      className="bg-red-600 h-full transition-all duration-500"
                      style={{ width: `${lastEval.deceptionScore || 45}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-xs font-mono pt-2 border-t border-white/10">
                  <span className="text-zinc-400 uppercase">Voice Stress:</span>
                  <span className="font-black text-white uppercase">{lastEval.stressLevel || 'Medium'}</span>
                </div>

                <div className="pt-2 border-t border-white/10 text-xs font-mono">
                  <span className="text-zinc-400 block mb-1 uppercase">Micro-expression:</span>
                  <span className="text-zinc-200 italic">"{lastEval.microExpression || 'Rapid eye flutter'}"</span>
                </div>
              </div>

              {/* Suspect Target Settings */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-black text-zinc-400 font-mono uppercase tracking-wider">Target Suspect Name:</label>
                <input
                  type="text"
                  value={suspectName}
                  onChange={(e) => setSuspectName(e.target.value)}
                  className="w-full bg-black border border-white/10 p-3 text-xs text-white font-mono uppercase focus:border-red-600"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: AI CASE REPORT GENERATOR */}
      {activeMode === 'case_analysis' && (
        <div className="bg-zinc-900 border border-white/10 p-6 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-black text-white uppercase tracking-tighter flex items-center space-x-2">
              <FileSearch className="w-5 h-5 text-red-500" />
              <span>FORENSIC DIRECTOR CASE EVALUATION ENGINE</span>
            </h3>
            <p className="text-xs text-zinc-400 font-mono uppercase">
              Submit raw crime scene facts to Gemini for authoritative forensic review.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-black border border-white/10 p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-zinc-300 font-black uppercase tracking-wider">Case Title:</label>
                <input
                  type="text"
                  value={analysisCaseTitle}
                  onChange={(e) => setAnalysisCaseTitle(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 p-3 text-xs text-white font-mono uppercase"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-300 font-black uppercase tracking-wider">Collected Evidence:</label>
                <textarea
                  rows={3}
                  value={analysisEvidence}
                  onChange={(e) => setAnalysisEvidence(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 p-3 text-xs text-white font-mono uppercase"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-300 font-black uppercase tracking-wider">Cadet Core Question:</label>
                <input
                  type="text"
                  value={analysisQuestion}
                  onChange={(e) => setAnalysisQuestion(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 p-3 text-xs text-white font-mono uppercase"
                />
              </div>

              <button
                onClick={handleRunCaseAnalysis}
                disabled={isAnalyzing}
                className="w-full py-3 bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest transition disabled:opacity-50 flex items-center justify-center space-x-2 shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAnalyzing ? 'GENERATING EVALUATION...' : 'GENERATE EVALUATION REPORT'}</span>
              </button>
            </div>

            <div className="lg:col-span-7 bg-black border border-white/10 p-6 overflow-y-auto max-h-[500px]">
              {analysisReport ? (
                <div className="space-y-3 font-mono text-xs leading-relaxed text-zinc-200">
                  <h4 className="text-xs font-black text-red-500 uppercase tracking-widest border-b border-white/10 pb-2">
                    OFFICIAL FORENSIC EVALUATION REPORT - FARAH ABDI HASSAN, FOUNDER & INSTRUCTOR
                  </h4>
                  <div className="whitespace-pre-line text-zinc-300">
                    {analysisReport}
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-zinc-500 text-xs font-mono uppercase tracking-widest">
                  Fill in case facts on the left and click Generate to view the AI Forensic Report.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: TUTOR PROFESSOR VANCE */}
      {activeMode === 'tutor' && (
        <div className="bg-zinc-900 border border-white/10 p-6 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-black text-white uppercase tracking-tighter flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-red-500" />
              <span>INSTRUCTOR FARAH ABDI HASSAN CONSULTATION</span>
            </h3>
            <p className="text-xs text-zinc-400 font-mono uppercase">
              Ask any question on criminology theory, legal admissibility, physical evidence standards, or criminal law.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-300 font-black uppercase tracking-wider mb-1 block">Topic / Domain:</label>
                <input
                  type="text"
                  value={tutorTopic}
                  onChange={(e) => setTutorTopic(e.target.value)}
                  className="w-full bg-black border border-white/10 p-3 text-xs text-white font-mono uppercase"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-300 font-black uppercase tracking-wider mb-1 block">Question:</label>
                <input
                  type="text"
                  value={tutorQuestion}
                  onChange={(e) => setTutorQuestion(e.target.value)}
                  className="w-full bg-black border border-white/10 p-3 text-xs text-white font-mono uppercase"
                />
              </div>
            </div>

            <button
              onClick={handleAskTutor}
              disabled={isAskingTutor}
              className="px-8 py-3 bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest transition disabled:opacity-50 flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAskingTutor ? 'CONSULTING INSTRUCTOR FARAH...' : 'ASK INSTRUCTOR FARAH ABDI HASSAN'}</span>
            </button>

            {tutorAnswer && (
              <div className="p-6 bg-black border border-white/10 text-xs space-y-3 leading-relaxed text-zinc-200 font-mono">
                <h4 className="font-black text-red-500 uppercase tracking-widest border-b border-white/10 pb-2">
                  INSTRUCTOR FARAH ABDI HASSAN'S LECTURE EXPLANATION:
                </h4>
                <div className="whitespace-pre-line text-zinc-300">
                  {tutorAnswer}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
