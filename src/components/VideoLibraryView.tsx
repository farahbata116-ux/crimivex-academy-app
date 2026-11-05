import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, BookOpen, Check, ChevronRight, Clock3, Clapperboard, Download, FileVideo2, Film, ListVideo, Pause, Play, Search, ShieldCheck, Subtitles, Upload, Volume2, X } from 'lucide-react';

type Topic = { id: string; category: string; title: string; course: string; lesson: string; description: string; objective: string; duration: string; presenter: string; status: 'Needs production' | 'Playable this session' };

const curriculum: [string, string[]][] = [
  ['Introduction to Forensic Science', ['Introduction to forensic science', 'History and development of forensic science', 'Forensic science disciplines', 'Role of forensic scientists', 'Scientific methods in criminal investigations']],
  ['Crime Scene Investigation', ['Crime scene security', 'Crime scene assessment', 'Crime scene photography', 'Crime scene sketching', 'Evidence identification', 'Evidence collection', 'Evidence packaging', 'Evidence preservation', 'Crime scene documentation', 'Crime scene reconstruction']],
  ['Fingerprint Examination', ['Fingerprint fundamentals', 'Fingerprint classification', 'Fingerprint pattern identification', 'Latent fingerprint development', 'Fingerprint lifting', 'Fingerprint comparison', 'Fingerprint documentation']],
  ['DNA and Biological Evidence', ['Introduction to forensic DNA', 'Biological evidence collection', 'DNA contamination prevention', 'DNA extraction demonstration', 'DNA profiling principles', 'DNA evidence interpretation']],
  ['Forensic Chemistry and Toxicology', ['Forensic chemistry introduction', 'Drug identification principles', 'Toxicology fundamentals', 'Chemical evidence handling', 'Laboratory safety']],
  ['Ballistics and Firearms Examination', ['Introduction to forensic ballistics', 'Cartridge case identification', 'Projectile examination', 'Firearms evidence documentation', 'Comparison microscopy', 'Firearms safety and evidence preservation']],
  ['Questioned Documents', ['Handwriting examination', 'Signature comparison', 'Document alteration detection', 'Ink and paper examination', 'Forgery investigation principles']],
  ['Digital Forensics and Cybercrime', ['Introduction to digital forensics', 'Digital evidence preservation', 'Computer forensic investigation', 'Mobile device forensics', 'File metadata examination', 'Deleted-file recovery concepts', 'Network forensic fundamentals', 'Cybercrime investigation', 'Digital evidence reporting']],
  ['Crime Scene Evidence and Trace Examination', ['Hair and fibre examination', 'Footwear impression examination', 'Toolmark examination', 'Soil evidence', 'Glass evidence', 'Bloodstain pattern analysis', 'Trace evidence collection']],
  ['Criminal Investigation', ['Investigative procedures', 'Interviewing and investigative questioning', 'Witness statements', 'Suspect identification principles', 'Intelligence-led investigations', 'Investigative report writing', 'Case file preparation']],
  ['Evidence Management', ['Chain of custody', 'Evidence registers', 'Evidence storage', 'Laboratory quality management', 'Expert witness preparation', 'Courtroom presentation of forensic evidence']],
  ['Practical University Simulations', ['Complete simulated crime scene investigation', 'Fingerprint investigation practical', 'DNA evidence practical', 'Digital evidence investigation practical', 'Mock forensic laboratory examination', 'Student group investigation', 'Final practical assessment']],
];

const promotions = ['CRIMIVEX Academy introduction', 'Founder presentation', 'Tutor introduction', 'Course advertisements', 'Student recruitment', 'Laboratory facilities presentation', 'Practical training highlights', 'Academy mission and vision', 'Institutional partnership presentation', 'Grant project presentation', 'CRIMIVEX VERITAS AI demonstration', 'Academy documentary'];
const trainingTopics: Topic[] = curriculum.flatMap(([category, titles]) => titles.map((title) => ({
  id: `lesson-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, category, title,
  course: category === 'Digital Forensics and Cybercrime' ? 'Digital Forensics & Incident Response (FOR-401)' : category === 'Crime Scene Investigation' || category === 'Fingerprint Examination' || category === 'Crime Scene Evidence and Trace Examination' || category === 'Practical University Simulations' ? 'Crime Scene Investigation Fundamentals (CSI-101)' : 'Forensic Science and Criminal Investigation curriculum',
  lesson: title, description: `${title}: a curriculum-aligned learning session using ethical practice, scientific reasoning, documentation, and fictional training scenarios where appropriate.`,
  objective: `Explain key principles of ${title.toLowerCase()} and identify safe, ethical, and properly documented practice.`,
  duration: category.includes('Practical') ? '10–25 min' : '5–15 min', presenter: 'Presenter not assigned', status: 'Needs production' as const,
})));
const promotionalTopics: Topic[] = promotions.map((title) => ({ id: `promo-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, category: 'Academy & Promotional', title, course: 'Academy communications (not a course lesson)', lesson: 'Promotional content', description: 'Promotional production brief. Do not imply unverified facilities, staff, learners, partners, or completed activities.', objective: 'Communicate verified Academy information transparently; label illustrative or AI-generated scenes as simulations.', duration: '5–20 min', presenter: 'Presenter not assigned', status: 'Needs production' }));
const ALL_TOPICS = [...trainingTopics, ...promotionalTopics];
const categories = ['All videos', ...curriculum.map(([category]) => category), 'Academy & Promotional'];
const progressKey = 'crimivex-video-progress-v1';
type LocalProgress = Record<string, number>;

export default function VideoLibraryView({ onBack }: { onBack?: () => void }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All videos');
  const [selectedId, setSelectedId] = useState(ALL_TOPICS[0].id);
  const [uploads, setUploads] = useState<Record<string, { url: string; name: string; captions?: string; captionName?: string }>>({});
  const [progress, setProgress] = useState<LocalProgress>(() => { try { return JSON.parse(localStorage.getItem(progressKey) || '{}'); } catch { return {}; } });
  const [message, setMessage] = useState('');
  const player = useRef<HTMLVideoElement>(null);
  const selected = ALL_TOPICS.find((item) => item.id === selectedId) || ALL_TOPICS[0];
  const visible = useMemo(() => ALL_TOPICS.filter((item) => (category === 'All videos' || item.category === category) && `${item.title} ${item.category} ${item.course}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const uploaded = uploads[selected.id];
  const playableCount = Object.keys(uploads).length;
  useEffect(() => { localStorage.setItem(progressKey, JSON.stringify(progress)); }, [progress]);
  useEffect(() => () => Object.values(uploads).forEach(({ url, captions }) => { URL.revokeObjectURL(url); if (captions) URL.revokeObjectURL(captions); }), [uploads]);

  const addMedia = (topic: Topic, file?: File, captionFile?: File) => {
    if (!file) return;
    if (!file.type.startsWith('video/')) { setMessage('Choose a video file (MP4 recommended).'); return; }
    if (file.size > 500 * 1024 * 1024) { setMessage('File exceeds the 500 MB per-file limit.'); return; }
    setUploads((old) => {
      const prior = old[topic.id]; if (prior) { URL.revokeObjectURL(prior.url); if (prior.captions) URL.revokeObjectURL(prior.captions); }
      return { ...old, [topic.id]: { url: URL.createObjectURL(file), name: file.name, captions: captionFile ? URL.createObjectURL(captionFile) : undefined, captionName: captionFile?.name } };
    });
    setMessage(`${file.name} is ready for playback in this browser session. This local upload is not published or saved to the Academy server.`);
  };
  const rememberProgress = () => { const video = player.current; if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return; setProgress((old) => ({ ...old, [selected.id]: Math.max(old[selected.id] || 0, Math.min(100, Math.round(video.currentTime / video.duration * 100))) })); };
  const pickTopic = (id: string) => { setSelectedId(id); setMessage(''); };
  const downloadMedia = () => { if (!uploaded) return; const a = document.createElement('a'); a.href = uploaded.url; a.download = uploaded.name; a.click(); };

  return <div className="video-library min-h-screen bg-[#0b0c0e] text-slate-100">
    <header className="vl-header"><div className="vl-brand"><div className="vl-mark"><Clapperboard size={22}/></div><div><div className="vl-brand-title">CRIMIVEX <span>ACADEMY</span></div><div className="vl-tagline">Learn. Investigate. Lead.</div></div></div><div className="vl-header-right"><span><Film size={16}/> VIDEO LIBRARY</span>{onBack && <button className="vl-button vl-back" onClick={onBack}><ArrowLeft size={16}/> Back to Academy</button>}</div></header>
    <main className="vl-main">
      <section className="vl-intro"><div><div className="vl-eyebrow">CURRICULUM MEDIA • LEARNING RESOURCE CENTRE</div><h1>Learn from every angle.</h1><p>Browse the complete lesson plan and play verified media when available. Production briefs are clearly identified; no thumbnail or title is represented as a finished video.</p></div><div className="vl-stats"><div><strong>{trainingTopics.length}</strong><span>training topics</span></div><div><strong>{promotionalTopics.length}</strong><span>promo briefs</span></div><div><strong>{playableCount}</strong><span>session playable</span></div></div></section>
      <div className="vl-toolbar"><label className="vl-search"><Search size={18}/><input aria-label="Search video lessons" placeholder="Search topics, courses…" value={query} onChange={(e) => setQuery(e.target.value)}/>{query && <button aria-label="Clear search" onClick={() => setQuery('')}><X size={15}/></button>}</label><label className="vl-filter-label">CATEGORY<select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label></div>
      <div className="vl-layout"><section className="vl-player-column">
        <div className="vl-player-frame">{uploaded ? <video key={uploaded.url} ref={player} src={uploaded.url} controls playsInline preload="metadata" onTimeUpdate={rememberProgress} onEnded={() => setProgress((old) => ({ ...old, [selected.id]: 100 }))} aria-label={`Video: ${selected.title}`}>
          {uploaded.captions && <track kind="captions" src={uploaded.captions} srcLang="en" label="English captions" default/>}</video> : <div className="vl-empty"><div className="vl-watermark"><Clapperboard size={40}/></div><div className="vl-empty-label">NO VIDEO MEDIA UPLOADED</div><h2>{selected.title}</h2><p>This is a production brief, not a video. Upload verified footage to preview it here.</p><div className="vl-sim-note"><ShieldCheck size={16}/> If footage is AI-generated, identify it as a simulation in the video and its description.</div></div>}<div className="vl-player-brand">CRIMIVEX ACADEMY <i>•</i> LEARN. INVESTIGATE. LEAD.</div></div>
        <div className="vl-player-actions"><label className="vl-button vl-upload"><Upload size={16}/> {uploaded ? 'Replace video' : 'Upload MP4'}<input type="file" accept="video/mp4,video/*" onChange={(e) => { const f=e.currentTarget.files?.[0]; addMedia(selected,f); e.currentTarget.value=''; }}/></label><label className="vl-button vl-caption-upload"><Subtitles size={16}/> Add English captions (.vtt)<input type="file" accept=".vtt,text/vtt" onChange={(e) => { const caption=e.currentTarget.files?.[0]; if (!caption || !uploaded) { setMessage('Upload video first, then add a WebVTT (.vtt) caption file.'); return; } if (!caption.name.toLowerCase().endsWith('.vtt')) { setMessage('Captions must use WebVTT (.vtt) format.'); return; } setUploads((old) => ({...old,[selected.id]:{...old[selected.id],captions:URL.createObjectURL(caption),captionName:caption.name}})); setMessage('English WebVTT captions attached for this session.'); e.currentTarget.value=''; }}/></label>{uploaded && <button className="vl-button" onClick={downloadMedia}><Download size={16}/> Download</button>}</div>
        {message && <div className="vl-message" role="status">{message}</div>}
        <article className="vl-details"><div className="vl-label-row"><span className={uploaded ? 'vl-status-ready' : 'vl-status-pending'}>{uploaded ? <><Check size={13}/> PLAYABLE THIS SESSION</> : <><Clock3 size={13}/> NEEDS PRODUCTION</>}</span><span className="vl-duration"><Clock3 size={14}/>{selected.duration}</span></div><h2>{selected.title}</h2><div className="vl-meta"><span>{selected.category}</span><span>•</span><span>{selected.course}</span></div><p>{selected.description}</p><div className="vl-objective"><BookOpen size={17}/><div><b>LEARNING OBJECTIVE</b><p>{selected.objective}</p></div></div><div className="vl-info-grid"><div><span>CURRICULUM LESSON</span><b>{selected.lesson}</b></div><div><span>PRESENTER</span><b>{selected.presenter}</b></div><div><span>CAPTIONS</span><b>{uploaded?.captionName || 'Not supplied'}</b></div><div><span>PLAYBACK PROGRESS</span><b>{progress[selected.id] || 0}% watched on this device</b></div></div><div className="vl-ethical"><ShieldCheck size={16}/><span>Training scenarios must be fictional. Do not portray generated scenes as actual CRIMIVEX staff, students, facilities, partnerships, or activities.</span></div></article>
      </section><aside className="vl-playlist"><div className="vl-playlist-head"><div><span className="vl-eyebrow">CURRICULUM INDEX</span><h2><ListVideo size={20}/> Lessons</h2></div><span className="vl-count">{visible.length}</span></div><div className="vl-list" role="list">{visible.map((item, index) => <button key={item.id} className={`vl-item ${selected.id === item.id ? 'is-selected' : ''}`} onClick={() => pickTopic(item.id)} role="listitem"><div className="vl-item-number">{String(index + 1).padStart(2,'0')}</div><div className="vl-item-copy"><strong>{item.title}</strong><span>{item.category} · {item.duration}</span><small className={uploads[item.id] ? 'vl-mini-ready' : ''}>{uploads[item.id] ? <><Play size={11}/> Playable this session</> : 'Production needed'}</small>{progress[item.id] > 0 && <div className="vl-progress"><i style={{width:`${progress[item.id]}%`}}/></div>}</div><ChevronRight size={16} className="vl-chevron"/></button>)}{visible.length===0 && <div className="vl-no-results">No matching lessons. Try another search or category.</div>}</div></aside></div>
      <footer className="vl-footer">CRIMIVEX Academy · Independent online education and professional training · Learn. Investigate. Lead.<br/><span>Media files selected here remain local to this browser session. Server-side upload, permanent storage, and publishing are not configured.</span></footer>
    </main>
  </div>;
}
