import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const avatar = 'https://avatars.githubusercontent.com/u/76271634?v=4';

const projects = [
  { name: 'curfew', type: 'Chrome extension', description: 'A small, stubborn tool for blocking distractions and staying locked in.', tone: 'orange', href: 'https://github.com/fastdemo/curfew' },
  { name: 'pseudo-f1', type: 'Retro racing game', description: 'A 16-bit pseudo-3D racing game with a little more chaos than a real track.', tone: 'blue', href: 'https://github.com/fastdemo/pseudo-f1' },
  { name: 'p5-maker', type: 'Creative tool', description: 'A Persona-inspired text generator for when a blank page needs a personality.', tone: 'pink', href: 'https://github.com/fastdemo/p5-maker' },
  { name: 'autobing', type: 'Browser automation', description: 'A lightweight experiment in making repetitive browser tasks less repetitive.', tone: 'green', href: 'https://github.com/fastdemo/autobing' },
];

function Label({ children }) { return <span className="label">{children}</span>; }
function Panel({ children, className = '' }) { return <article className={`panel ${className}`}>{children}</article>; }

function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState('open in spotify');
  function handlePlay() {
    const source = audioRef.current?.querySelector('source')?.src;
    if (source) {
      if (playing) audioRef.current.pause(); else audioRef.current.play();
      setPlaying(!playing);
      return;
    }
    window.open('https://open.spotify.com/search/Salad%20Days%20Mac%20DeMarco', '_blank', 'noopener,noreferrer');
    setMessage('spotify opened');
  }
  return <div className="music-player">
    <button className="play-button" onClick={handlePlay} aria-label="Open Salad Days on Spotify"><span className="play-triangle" /></button>
    <div className="track-copy"><span className="track-title">Salad Days</span><span className="track-artist">Mac DeMarco</span></div>
    <div className="waveform" aria-hidden="true">{[18, 30, 12, 42, 24, 33, 17, 47, 26, 37, 20, 31, 14, 40, 22, 29, 16, 35, 21, 28, 13, 39, 23, 32].map((height, index) => <i style={{ height }} key={index} />)}</div>
    <span className="track-time">02:41</span><span className="track-link">{message}</span><audio ref={audioRef} preload="none" />
  </div>;
}

function ProjectCard({ project }) {
  return <a className={`project-card project-${project.tone}`} href={project.href} target="_blank" rel="noreferrer">
    <div className="project-art" aria-hidden="true"><span>{project.name.slice(0, 1)}</span><span className="art-orbit" /></div>
    <div className="project-content"><div className="project-meta"><span>{project.type}</span><span className="arrow">↗</span></div><h3>{project.name}</h3><p>{project.description}</p></div>
  </a>;
}

function App() {
  const [available, setAvailable] = useState(true);
  return <main>
    <nav className="nav shell"><a className="wordmark" href="#top">fast<span>demo</span></a><div className="nav-links"><a href="#work">work</a><a href="#about">about</a><a href="https://github.com/fastdemo" target="_blank" rel="noreferrer">github ↗</a></div><a className="nav-contact" href="mailto:hello@fastdemo.dev">say hi <span>↗</span></a></nav>

    <section className="hero shell" id="top"><div className="hero-copy"><img className="avatar" src={avatar} alt="fastdemo's GitHub avatar" /><h1>hey there, i'm fastdemo.<br /><em>i make fun things.</em></h1><p className="hero-intro">Your average coder that makes fun things, from apps to websites. Usually with too much coffee and not enough sleep.</p><div className="hero-actions"><MusicPlayer /><button className={`availability ${available ? 'available' : ''}`} onClick={() => setAvailable(!available)}><span className="status-dot" /> {available ? 'available for fun' : 'currently tinkering'}</button></div></div><div className="hero-instrument" aria-label="Current status panel"><div className="instrument-head"><Label>today's instruments</Label><span>01—04</span></div><div className="instrument-main"><span className="instrument-kicker">temperature</span><strong>24°</strong><div className="temperature-bar"><i /></div><span className="instrument-value">warm enough</span></div><div className="instrument-row"><span>mood</span><strong>curious</strong><div className="meter"><i style={{ width: '78%' }} /></div></div><div className="instrument-row"><span>focus</span><strong>ON</strong><div className="meter orange-meter"><i style={{ width: '61%' }} /></div></div><div className="instrument-foot"><span>building curfew &amp; autobing</span><span>— 2026</span></div></div></section>

    <section className="ticker" aria-label="Interests"><div className="ticker-track"><span>apps</span><b>+</b><span>websites</span><b>+</b><span>games</span><b>+</b><span>weird little experiments</span><b>+</b><span>apps</span><b>+</b><span>websites</span><b>+</b></div></section>

    <section className="work shell" id="work"><div className="section-heading"><div><Label>selected experiments</Label><h2>things i've made<br /><em>for the fun of it.</em></h2></div><p>Small projects, useful tools, and experiments that were too interesting to leave as a thought.</p></div><div className="project-grid">{projects.map((project) => <ProjectCard project={project} key={project.name} />)}</div></section>

    <section className="about shell" id="about"><Panel className="timeline-panel"><div className="panel-top"><Label>the short version</Label><span>about.txt</span></div><div className="timeline-body"><div className="timeline-line" /><div><span className="timeline-year">now</span><h2>coder by day,<br /><em>vibecoder by night.</em></h2><p>I like turning half-formed ideas into things you can click, use, and send to a friend. This space is where I keep the good ones.</p></div></div></Panel><Panel className="location-panel"><Label>based somewhere online</Label><div className="map-grid"><span>37.7749° N</span><span>122.4194° W</span><b>the internet</b></div><div className="location-footer"><span>currently roaming</span><span>↗ github</span></div></Panel></section>

    <footer className="footer shell"><div><span className="footer-mark">fd</span><p>made with curiosity<br />and a little bit of css.</p></div><a className="footer-cta" href="mailto:hello@fastdemo.dev"><span>have a fun idea?</span><strong>let's make it ↗</strong></a><div className="footer-bottom"><span>© 2026 fastdemo</span><span>built for the curious</span></div></footer>
  </main>;
}

export default App;

createRoot(document.getElementById('root')).render(<App />);
