import React, { useState } from 'react';
import { LiveWorkshop } from '../types';
import { 
  Calendar, 
  Video, 
  Users, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface WorkshopsViewProps {
  workshops: LiveWorkshop[];
}

export const WorkshopsView: React.FC<WorkshopsViewProps> = ({ workshops }) => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<LiveWorkshop>(workshops[0]);
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [submittedQuestions, setSubmittedQuestions] = useState<string[]>([
    'How do we handle chain of custody when dealing with cloud-hosted encrypted containers?',
    'What is the legal precedent for AI-generated facial reconstruction in court?'
  ]);
  const [isJoined, setIsJoined] = useState<boolean>(false);

  const handleAskQuestion = () => {
    if (!userQuestion.trim()) return;
    setSubmittedQuestions([...submittedQuestions, userQuestion.trim()]);
    setUserQuestion('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-white/10 p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-black">
              CRIMIVEX LIVE MASTERCLASSES & WEBINARS
            </span>
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter mt-1">
            REAL-TIME FACULTY MASTERCLASSES & EXPERT Q&A
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-light">
            Join interactive sessions led by leading forensic directors, FBI behaviorists, and cyber intelligence experts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Live Stream Player Area */}
        <div className="lg:col-span-8 bg-zinc-900 border border-white/10 p-6 space-y-4 shadow-2xl">
          {/* Simulated Video Player */}
          <div className="relative aspect-video bg-black overflow-hidden border border-white/10 group">
            <img
              src={selectedWorkshop.thumbnailUrl}
              alt={selectedWorkshop.title}
              className="w-full h-full object-cover opacity-50"
            />
            
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
              <span className="px-3 py-1 bg-red-600 text-white font-mono text-[10px] font-black uppercase tracking-widest shadow-md">
                ● LIVE BROADCAST
              </span>
              <span className="px-3 py-1 bg-black text-white font-mono text-[10px] font-bold border border-white/10 uppercase tracking-widest">
                {selectedWorkshop.attendees} CADETS ONLINE
              </span>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/60 backdrop-blur-[2px]">
              {!isJoined ? (
                <div className="space-y-3 max-w-md">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                    {selectedWorkshop.title}
                  </h3>
                  <p className="text-xs text-zinc-300 font-mono">
                    SPEAKER: {selectedWorkshop.speaker} ({selectedWorkshop.speakerTitle})
                  </p>
                  <button
                    onClick={() => setIsJoined(true)}
                    className="px-8 py-3 bg-red-600 hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 mx-auto transition shadow-lg"
                  >
                    <Video className="w-4 h-4" />
                    <span>ENTER LIVE MASTERCLASS AUDITORIUM</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="w-12 h-12 bg-emerald-600 text-white flex items-center justify-center mx-auto text-xl font-black">
                    ✓
                  </span>
                  <p className="text-base font-black text-white uppercase tracking-wider">
                    CONNECTED TO CRIMIVEX ENCRYPTED MASTERCLASS STREAM
                  </p>
                  <p className="text-xs text-zinc-400 font-mono">Audio & Video feed synchronized.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-black text-white uppercase tracking-tighter">
              {selectedWorkshop.title}
            </h2>
            <p className="text-xs text-zinc-400 font-light">
              {selectedWorkshop.topic}
            </p>
          </div>
        </div>

        {/* Right: Live Q&A Box */}
        <div className="lg:col-span-4 bg-zinc-900 border border-white/10 p-5 space-y-4 shadow-xl flex flex-col justify-between h-[520px]">
          <h3 className="text-xs font-black text-red-500 font-mono uppercase tracking-widest flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>LIVE Q&A QUEUE</span>
          </h3>

          <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar bg-black p-3 border border-white/10 text-xs">
            {submittedQuestions.map((q, idx) => (
              <div key={idx} className="p-3 bg-zinc-900 border border-white/10 text-zinc-300">
                <span className="text-[10px] font-mono text-red-500 font-black block uppercase tracking-widest">
                  CADET Q#{idx + 1}
                </span>
                <p className="font-light mt-1">{q}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <input
              type="text"
              placeholder="Submit a question to Farah Abdi Hassan..."
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
              className="w-full bg-black border border-white/10 px-4 py-3 text-xs text-white placeholder-zinc-500 font-mono uppercase focus:outline-none focus:border-red-600"
            />
            <button
              onClick={handleAskQuestion}
              className="w-full py-3 bg-red-600 hover:bg-white hover:text-black text-white text-xs font-black uppercase tracking-widest transition flex items-center justify-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5 text-white" />
              <span>SUBMIT QUESTION</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
