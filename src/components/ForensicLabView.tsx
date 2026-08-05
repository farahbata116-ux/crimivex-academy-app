import React, { useState } from 'react';
import { 
  Fingerprint, 
  Dna, 
  Binary, 
  Target, 
  Activity, 
  Zap, 
  CheckCircle2, 
  RefreshCw, 
  Search,
  Sparkles,
  Info
} from 'lucide-react';

export const ForensicLabView: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'fingerprint' | 'dna' | 'ballistics' | 'hexdump' | 'bloodstain'>('fingerprint');

  // Tool 1: Fingerprint Minutiae State
  const [selectedSuspectPrint, setSelectedSuspectPrint] = useState<number>(1);
  const [markedMinutiae, setMarkedMinutiae] = useState<{ x: number; y: number; type: string }[]>([]);
  const [printMatchResult, setPrintMatchResult] = useState<string | null>(null);

  // Tool 2: DNA Electrophoresis State
  const [voltage, setVoltage] = useState<number>(100);
  const [gelRunning, setGelRunning] = useState<boolean>(false);
  const [gelProgress, setGelProgress] = useState<number>(0);

  // Tool 3: Ballistics State
  const [bulletRotation, setBulletRotation] = useState<number>(0);
  const [bulletZoom, setBulletZoom] = useState<number>(100);

  // Tool 4: Hex Dump State
  const [selectedHexPreset, setSelectedHexPreset] = useState<string>('preset1');
  const [customHexInput, setCustomHexInput] = useState<string>('');

  // Tool 5: Bloodstain State
  const [stainWidth, setStainWidth] = useState<number>(12); // mm
  const [stainLength, setStainLength] = useState<number>(24); // mm

  // Fingerprint Minutiae Handler
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    const types = ['Bifurcation', 'Ridge Ending', 'Dot / Island'];
    const randomType = types[markedMinutiae.length % types.length];
    
    if (markedMinutiae.length < 12) {
      setMarkedMinutiae([...markedMinutiae, { x, y, type: randomType }]);
    }
  };

  const handleVerifyPrint = () => {
    if (selectedSuspectPrint === 2) {
      setPrintMatchResult('POSITIVE MATCH: 12 Minutiae Points verified against Suspect B (Victor Kroll). Probability: 99.98%.');
    } else {
      setPrintMatchResult('NO MATCH: Ridge count and minutiae patterns do not correspond to this suspect record.');
    }
  };

  // DNA Gel Run Simulation
  const runGelElectrophoresis = () => {
    setGelRunning(true);
    setGelProgress(0);
    const interval = setInterval(() => {
      setGelProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setGelRunning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Bloodstain Angle Calculation: arcsin(Width / Length) in degrees
  const clampedW = Math.min(stainWidth, stainLength);
  const impactAngleRad = Math.asin(clampedW / stainLength);
  const impactAngleDeg = (impactAngleRad * (180 / Math.PI)).toFixed(1);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-white/10 p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-mono font-black uppercase tracking-widest text-red-500">
              CRIMIVEX VIRTUAL FORENSIC LABORATORY V2.4
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mt-1">
            EVIDENCE EXAMINATION & ANALYTICAL WORKSTATION
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl font-light">
            Analyze latent physical evidence, run genomic DNA electrophoresis, compare ballistic cartridge striations, and decode raw cyber hex payloads in real time.
          </p>
        </div>
      </div>

      {/* Lab Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {[
          { id: 'fingerprint', name: 'LATENT PRINT MINUTIAE', icon: <Fingerprint className="w-4 h-4" /> },
          { id: 'dna', name: 'DNA ELECTROPHORESIS', icon: <Dna className="w-4 h-4" /> },
          { id: 'ballistics', name: 'BALLISTICS STRIATION', icon: <Target className="w-4 h-4" /> },
          { id: 'hexdump', name: 'CYBER HEX HEADER', icon: <Binary className="w-4 h-4" /> },
          { id: 'bloodstain', name: 'BLOODSTAIN DYNAMICS', icon: <Activity className="w-4 h-4" /> },
        ].map((t) => {
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id as any)}
              className={`p-4 border text-xs font-black uppercase tracking-wider flex flex-col items-center space-y-2 transition duration-200 ${
                isActive
                  ? 'bg-red-600 border-red-600 text-white shadow-lg'
                  : 'bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <div>{t.icon}</div>
              <span className="text-center">{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* TOOL 1: FINGERPRINT MINUTIAE SCANNER */}
      {activeTool === 'fingerprint' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-100 font-serif flex items-center space-x-2">
                <Fingerprint className="w-5 h-5 text-amber-400" />
                <span>Latent Ridge Minutiae Extraction Station</span>
              </h3>
              <p className="text-xs text-slate-400">
                Click directly on the latent print image to pinpoint 12 Galton minutiae (bifurcations, ridge endings, dots).
              </p>
            </div>
            <button
              onClick={() => setMarkedMinutiae([])}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center space-x-1.5 self-start"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear Markers</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Interactive Canvas Area */}
            <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center">
              <span className="text-xs font-mono text-amber-400 mb-2">
                LATENT PRINT (EV-8821-LATENT-01)
              </span>

              <div
                onClick={handleCanvasClick}
                className="relative w-64 h-80 bg-slate-900 rounded-lg overflow-hidden border-2 border-amber-500/40 cursor-crosshair shadow-inner select-none"
              >
                {/* Simulated Fingerprint Texture */}
                <svg viewBox="0 0 200 250" className="w-full h-full opacity-80 stroke-amber-400/60 fill-none" strokeWidth="2">
                  <path d="M 50,200 C 50,100 150,100 150,200" />
                  <path d="M 60,190 C 60,110 140,110 140,190" />
                  <path d="M 70,180 C 70,120 130,120 130,180" />
                  <path d="M 80,170 C 80,130 120,130 120,170" />
                  <path d="M 90,160 C 90,140 110,140 110,160" />
                  <circle cx="100" cy="140" r="15" />
                  <path d="M 40,220 C 40,80 160,80 160,220" />
                  <path d="M 30,240 C 30,60 170,60 170,240" />
                </svg>

                {/* Marked Points overlay */}
                {markedMinutiae.map((pt, idx) => (
                  <div
                    key={idx}
                    style={{ left: pt.x - 8, top: pt.y - 8 }}
                    className="absolute w-4 h-4 rounded-full border-2 border-rose-500 bg-rose-500/30 flex items-center justify-center text-[9px] font-mono font-bold text-rose-200 animate-pulse pointer-events-none"
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>

              <span className="text-[11px] text-slate-400 mt-2">
                Click image to add minutiae marker ({markedMinutiae.length}/12 points pinned)
              </span>
            </div>

            {/* Suspect Database Comparison Area */}
            <div className="lg:col-span-6 space-y-4">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Select Suspect Reference Record for Automated AFIS Check:
              </h4>

              <div className="space-y-2">
                {[
                  { id: 1, name: 'Suspect A: Sora Chen', printType: 'Accidental Loop', quality: 'High' },
                  { id: 2, name: 'Suspect B: Victor Kroll', printType: 'Central Pocket Whorl', quality: 'Verified' },
                  { id: 3, name: 'Suspect C: Julian Vance-Cross', printType: 'Plain Arch', quality: 'Medium' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedSuspectPrint(s.id);
                      setPrintMatchResult(null);
                    }}
                    className={`w-full p-3 rounded-xl border text-xs text-left flex items-center justify-between transition ${
                      selectedSuspectPrint === s.id
                        ? 'bg-amber-500/15 border-amber-500 text-amber-200 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <p>{s.name}</p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Pattern: {s.printType} • AFIS Quality: {s.quality}
                      </span>
                    </div>
                    {selectedSuspectPrint === s.id && (
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={handleVerifyPrint}
                disabled={markedMinutiae.length < 3}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold text-xs transition disabled:opacity-50 shadow-md"
              >
                Run AFIS Minutiae Cross-Match Algorithm
              </button>

              {printMatchResult && (
                <div className={`p-4 rounded-xl text-xs space-y-1 font-mono border ${
                  printMatchResult.includes('POSITIVE')
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                }`}>
                  <p className="font-bold">AFIS ANALYSIS REPORT:</p>
                  <p>{printMatchResult}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: DNA STR ELECTROPHORESIS */}
      {activeTool === 'dna' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-100 font-serif flex items-center space-x-2">
              <Dna className="w-5 h-5 text-amber-400" />
              <span>DNA Agarose Gel Electrophoresis Chamber</span>
            </h3>
            <p className="text-xs text-slate-400">
              Negatively charged DNA fragments migrate toward the positive anode (+). Smaller fragments travel faster through the matrix.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Controls */}
            <div className="lg:col-span-4 bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
              <h4 className="text-xs font-bold text-amber-300 font-mono uppercase">
                Chamber Power & Gel Controls
              </h4>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 flex justify-between">
                  <span>Electric Field Potential (Voltage):</span>
                  <span className="font-mono text-amber-400 font-bold">{voltage} V</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="150"
                  step="10"
                  value={voltage}
                  onChange={(e) => setVoltage(Number(e.target.value))}
                  disabled={gelRunning}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="text-[11px] text-slate-400 space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
                <p>• Buffer: 1x TAE Solution (pH 8.3)</p>
                <p>• Agarose Matrix: 1.5% Concentration</p>
                <p>• Stain: Ethidium Bromide (UV Fluorescent)</p>
              </div>

              <button
                onClick={runGelElectrophoresis}
                disabled={gelRunning}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold text-xs transition disabled:opacity-50 flex items-center justify-center space-x-2 shadow-md"
              >
                <Zap className="w-4 h-4" />
                <span>{gelRunning ? `Running Gel... (${gelProgress}%)` : 'Apply Voltage & Run Gel'}</span>
              </button>
            </div>

            {/* Virtual Electrophoresis Gel Visualization */}
            <div className="lg:col-span-8 bg-slate-950 border border-slate-800 p-6 rounded-xl flex flex-col items-center">
              <div className="w-full max-w-lg bg-slate-900 border-2 border-emerald-500/30 rounded-xl p-4 relative overflow-hidden shadow-inner">
                
                {/* Gel Header & Anode Indicator */}
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-3 border-b border-slate-800 pb-1">
                  <span className="text-rose-400 font-bold">Negative Cathode (-) Wells</span>
                  <span className="text-emerald-400 font-bold">Positive Anode (+) Bottom</span>
                </div>

                {/* Lanes Grid */}
                <div className="grid grid-cols-4 gap-4 min-h-[260px] relative">
                  {[
                    { title: 'Lane 1: DNA Ladder', bands: [30, 70, 110, 160, 210] },
                    { title: 'Lane 2: Crime Evidence', bands: [70, 160, 210] },
                    { title: 'Lane 3: Suspect A', bands: [30, 110, 160] },
                    { title: 'Lane 4: Suspect B', bands: [70, 160, 210] },
                  ].map((lane, lIdx) => (
                    <div key={lIdx} className="flex flex-col items-center bg-slate-950/60 rounded-lg p-2 border border-slate-800/80">
                      {/* Well Slot */}
                      <div className="w-8 h-3 bg-slate-800 border border-slate-600 rounded-sm mb-4 text-[8px] font-mono text-center text-slate-400">
                        WELL
                      </div>

                      {/* Gel Strip */}
                      <div className="w-full h-48 relative border-x border-slate-800/40">
                        {lane.bands.map((bPos, bIdx) => {
                          const calculatedTop = (bPos * gelProgress) / 100;
                          return (
                            <div
                              key={bIdx}
                              style={{ top: `${calculatedTop}px` }}
                              className="absolute left-1 right-1 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all duration-300"
                            />
                          );
                        })}
                      </div>

                      <span className="text-[9px] font-mono text-slate-300 font-bold mt-2 text-center">
                        {lane.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {gelProgress === 100 && (
                <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-xs text-emerald-200 text-center font-mono">
                  ✓ GEL COMPLETED: Lane 2 (Crime Scene DNA) matches Lane 4 (Suspect B: Victor Kroll) at 3 STR Loci. Random Match Probability: 1 in 4.2 Billion.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: BALLISTICS STRIATION COMPARISON */}
      {activeTool === 'ballistics' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-100 font-serif flex items-center space-x-2">
              <Target className="w-5 h-5 text-amber-400" />
              <span>Comparison Microscope (Bullet & Shell Striation Alignment)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Align microscopic land and groove striation marks between crime scene bullet and suspect test-fired bullet.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Viewers */}
            <div className="lg:col-span-8 bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
              <div className="grid grid-cols-2 gap-2 h-64 rounded-lg overflow-hidden border border-amber-500/30 relative bg-slate-900">
                {/* Split line divider */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-amber-400 z-20 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />

                {/* Left side: Crime Scene Bullet */}
                <div className="relative overflow-hidden flex items-center justify-center bg-slate-950">
                  <span className="absolute top-2 left-2 z-10 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-amber-400 border border-amber-500/30">
                    EVIDENCE BULLET (9mm Luger)
                  </span>
                  <div
                    style={{ transform: `scale(${bulletZoom / 100})` }}
                    className="w-40 h-40 border-y-4 border-amber-500/60 bg-gradient-to-b from-yellow-900/40 via-amber-700/30 to-yellow-900/40 rounded-lg flex flex-col justify-around py-2 px-1 shadow-inner"
                  >
                    {[12, 28, 45, 62, 78, 92].map((y, i) => (
                      <div key={i} className="w-full h-1 bg-amber-300/60 shadow-[0_0_4px_rgba(252,211,77,0.5)]" />
                    ))}
                  </div>
                </div>

                {/* Right side: Suspect Test Fired Bullet */}
                <div className="relative overflow-hidden flex items-center justify-center bg-slate-950">
                  <span className="absolute top-2 right-2 z-10 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-700">
                    SUSPECT TEST BULLET (Glock 19)
                  </span>
                  <div
                    style={{ transform: `rotate(${bulletRotation}deg) scale(${bulletZoom / 100})` }}
                    className="w-40 h-40 border-y-4 border-amber-500/60 bg-gradient-to-b from-yellow-900/40 via-amber-700/30 to-yellow-900/40 rounded-lg flex flex-col justify-around py-2 px-1 shadow-inner transition-transform duration-200"
                  >
                    {[12, 28, 45, 62, 78, 92].map((y, i) => (
                      <div key={i} className="w-full h-1 bg-amber-300/60 shadow-[0_0_4px_rgba(252,211,77,0.5)]" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <span className="text-xs font-mono text-slate-400">
                  Striation Groove Alignment Error: {Math.abs(bulletRotation)}°
                </span>
              </div>
            </div>

            {/* Adjust Controls */}
            <div className="lg:col-span-4 bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
              <h4 className="text-xs font-bold text-amber-300 font-mono uppercase">
                Microscope Stage Controls
              </h4>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 flex justify-between">
                  <span>Rotate Suspect Bullet Stage:</span>
                  <span className="font-mono text-amber-400 font-bold">{bulletRotation}°</span>
                </label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={bulletRotation}
                  onChange={(e) => setBulletRotation(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 flex justify-between">
                  <span>Magnification Zoom:</span>
                  <span className="font-mono text-amber-400 font-bold">{bulletZoom}%</span>
                </label>
                <input
                  type="range"
                  min="80"
                  max="180"
                  value={bulletZoom}
                  onChange={(e) => setBulletZoom(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <button
                onClick={() => setBulletRotation(0)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold text-xs transition shadow-md"
              >
                Auto-Align Micro-Striations (0°)
              </button>

              {bulletRotation === 0 && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-xs text-emerald-200 font-mono">
                  ✓ STRIATION MATCH CONFIRMED: Microscopic scratches on land and grooves match test firing from seized Glock 19 (Serial #GK-9921).
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 4: CYBER HEX HEADER ANALYZER */}
      {activeTool === 'hexdump' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-100 font-serif flex items-center space-x-2">
              <Binary className="w-5 h-5 text-amber-400" />
              <span>Cyber Hex Dump & File Signature Inspector</span>
            </h3>
            <p className="text-xs text-slate-400">
              Detect spoofed file extensions, hidden malware payloads, and steganography at offset 0x00.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Select Recovered Forensic File Sample:
              </label>
              {[
                { id: 'preset1', name: 'company_logo.png', magic: '4D 5A 90 00', realType: 'Disguised Executable (.EXE)' },
                { id: 'preset2', name: 'financial_statement.pdf', magic: '25 50 44 46', realType: 'Valid PDF Document' },
                { id: 'preset3', name: 'invoice_stego.jpg', magic: 'FF D8 FF E0', realType: 'JPEG with Hidden AES Steganography Payload' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedHexPreset(p.id)}
                  className={`w-full p-3 rounded-xl border text-xs text-left transition ${
                    selectedHexPreset === p.id
                      ? 'bg-amber-500/15 border-amber-500 text-amber-200 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <p>{p.name}</p>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Magic: {p.magic} • {p.realType}
                  </span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
              <div className="flex justify-between items-center text-xs font-mono border-b border-slate-800 pb-2">
                <span className="text-amber-400 font-bold">Offset 0x00000000 - Hex Inspection</span>
                <span className="text-slate-400">Encoding: ASCII / UTF-8</span>
              </div>

              {selectedHexPreset === 'preset1' && (
                <div className="font-mono text-xs space-y-2">
                  <div className="p-3 bg-slate-900 border border-rose-500/40 rounded-lg text-rose-300">
                    <span className="text-amber-400">00000000:</span> 4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00 | MZ..............
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-300">
                    <span className="text-amber-400">00000010:</span> 54 68 69 73 20 70 72 6F 67 72 61 6D 20 63 61 6E | This program can
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-300">
                    <span className="text-amber-400">00000020:</span> 6E 6F 74 20 62 65 20 72 75 6E 20 69 6E 20 44 4F | not be run in DO
                  </div>
                  <div className="p-3 bg-rose-950/60 border border-rose-500/50 rounded-xl text-rose-200 text-xs">
                    ⚠ SECURITY ALERT: File extension is renamed to .PNG, but magic bytes 4D 5A (MZ) indicate a Windows PE Executable Payload!
                  </div>
                </div>
              )}

              {selectedHexPreset === 'preset2' && (
                <div className="font-mono text-xs space-y-2">
                  <div className="p-3 bg-slate-900 border border-emerald-500/40 rounded-lg text-emerald-300">
                    <span className="text-amber-400">00000000:</span> 25 50 44 46 2D 31 2E 37 0D 0A 25 D0 D4 C5 D8 0D | %PDF-1.7..%.....
                  </div>
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-emerald-200 text-xs">
                    ✓ VALID FORMAT: %PDF header signature verified. No anomaly detected.
                  </div>
                </div>
              )}

              {selectedHexPreset === 'preset3' && (
                <div className="font-mono text-xs space-y-2">
                  <div className="p-3 bg-slate-900 border border-amber-500/40 rounded-lg text-amber-300">
                    <span className="text-amber-400">00000000:</span> FF D8 FF E0 00 10 4A 46 49 46 00 01 01 01 00 60 | ......JFIF.....`
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-300">
                    <span className="text-amber-400">000003F0:</span> 41 45 53 5F 4B 45 59 3A 20 30 78 39 39 46 46 32 | AES_KEY: 0x99FF2
                  </div>
                  <div className="p-3 bg-amber-950/60 border border-amber-500/50 rounded-xl text-amber-200 text-xs">
                    🔍 STEGANOGRAPHY DETECTED: Embedded AES Encryption Key string hidden in trailing JPEG EXIF metadata segment.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 5: BLOODSTAIN PATTERN DYNAMICS */}
      {activeTool === 'bloodstain' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-100 font-serif flex items-center space-x-2">
              <Activity className="w-5 h-5 text-amber-400" />
              <span>Bloodstain Pattern Angle of Impact Calculator</span>
            </h3>
            <p className="text-xs text-slate-400">
              Calculate the angle of impact (α) using Balthazard's trigonometric ratio: sin(α) = Width / Length.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
              <h4 className="text-xs font-bold text-amber-300 font-mono uppercase">
                Stain Dimension Inputs (mm)
              </h4>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 flex justify-between">
                  <span>Stain Width (W):</span>
                  <span className="font-mono text-amber-400 font-bold">{stainWidth} mm</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="30"
                  value={stainWidth}
                  onChange={(e) => setStainWidth(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 flex justify-between">
                  <span>Stain Length (L):</span>
                  <span className="font-mono text-amber-400 font-bold">{stainLength} mm</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={stainLength}
                  onChange={(e) => setStainLength(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl font-mono text-xs space-y-2">
                <p className="text-amber-400 font-bold">TRIGONOMETRIC RESULT:</p>
                <p>Ratio (W/L) = {(clampedW / stainLength).toFixed(4)}</p>
                <p className="text-base font-bold text-slate-100">
                  Impact Angle ($\alpha$) = <span className="text-amber-400">{impactAngleDeg}°</span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 rounded-xl flex flex-col items-center justify-center">
              <span className="text-xs font-mono text-slate-400 mb-4">
                VISUAL SPATTER ELLIPSE TRAJECTORY AT {impactAngleDeg}°
              </span>

              {/* Ellipse Graphic */}
              <div className="w-full h-48 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div
                  style={{
                    width: `${stainLength * 4}px`,
                    height: `${clampedW * 4}px`,
                    borderRadius: '50%',
                  }}
                  className="bg-rose-600/80 border-2 border-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.6)] transition-all duration-300 flex items-center justify-center text-[10px] font-mono text-slate-100 font-bold"
                >
                  {impactAngleDeg}°
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-4 text-center">
                An impact angle of {impactAngleDeg}° indicates a {Number(impactAngleDeg) > 60 ? 'high-velocity perpendicular impact' : 'glancing low-angle spatter trajectory'}.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
