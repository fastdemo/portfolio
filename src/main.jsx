import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const avatar = 'https://avatars.githubusercontent.com/u/76271634?v=4';

function TinyLabel({ icon = '▣', children }) {
  return <span className="tiny-label"><span>{icon}</span>{children}</span>;
}

function PlayButton() {
  const [opened, setOpened] = useState(false);
  return (
    <button
      className="audio-button"
      aria-label="Open Salad Days by Mac DeMarco on Spotify"
      title="Open Salad Days on Spotify"
      onClick={() => {
        window.open('https://open.spotify.com/search/Salad%20Days%20Mac%20DeMarco', '_blank', 'noopener,noreferrer');
        setOpened(true);
      }}
    >
      <span className="triangle" />
      {opened && <span className="sr-only">Spotify opened</span>}
    </button>
  );
}

function Waveform() {
  const bars = [3, 4, 5, 12, 7, 16, 9, 22, 11, 8, 12, 29, 16, 38, 22, 13, 10, 5, 4, 8, 14, 18, 10, 6, 4, 7, 13, 20, 10, 6, 4, 3, 4, 5, 6, 7, 9, 8, 6, 4, 5, 9, 14, 24, 17, 9, 7, 4, 3, 4, 6, 9, 13, 11, 6, 4, 3, 4, 7, 10, 13, 12, 7, 4, 3, 4, 5, 8, 10, 12, 8, 5, 3, 4, 5, 6, 4, 3, 4, 5, 7, 5, 3, 4, 6, 9, 13, 10, 6, 3, 4, 5, 7, 4, 3, 4, 5, 8, 11, 8, 5, 3, 3, 4, 5, 6, 4, 3, 4, 6, 9, 7, 4, 3, 4, 5, 7, 5, 3, 4, 3, 4, 5, 4, 3, 4, 5, 6, 4, 3, 4, 5, 4, 3, 4, 5, 3, 4, 5, 3, 4, 3, 4, 3];
  return <div className="waveform" aria-hidden="true">{bars.map((height, index) => <i style={{ height }} key={index} />)}</div>;
}

function AudioCard() {
  return <div className="audio-card"><PlayButton /><div className="audio-line"><Waveform /></div><span className="audio-time">2:41</span></div>;
}

function ExperienceCard() {
  return <article className="card experience-card"><TinyLabel icon="▣">Experience</TinyLabel><div className="experience-list"><div><b>now</b><span>building curfew &amp; autobing</span></div><div><b>2024</b><span>making things on the internet</span></div><div><b>2023</b><span>learning by shipping</span></div><div><b>2022</b><span>starting small experiments</span></div></div></article>;
}

function ListeningCard() {
  return <article className="card listening-card"><TinyLabel icon="◉">What i'm listening</TinyLabel><div className="record"><img className="record-art" src="https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/e0/04/eb/e004eb2b-754f-4a76-9ecc-87d4eea2a327/cover.jpg/600x600bb.jpg" alt="Salad Days album cover by Mac DeMarco" /><div className="record-info"><h3>Salad Days</h3><p>Mac DeMarco</p><div className="record-progress"><i /></div><div className="record-controls"><span>◀◀</span><b>Ⅱ</b><span>▶▶</span><span>⌁</span></div></div></div></article>;
}

function ReadingCard() {
  return <article className="card reading-card"><TinyLabel icon="□">What i'm reading</TinyLabel><div className="reading-copy"><h3>Atomic<br />Habits</h3><p>James Clear</p></div><img className="book-cover" src="https://covers.openlibrary.org/b/id/12539702-L.jpg" alt="Atomic Habits by James Clear book cover" /></article>;
}

function MapCard() {
  return <article className="card map-card"><TinyLabel icon="⌖">Map</TinyLabel><div className="map-lines"><span className="map-pin">●</span><strong>Ho Chi Minh<br />City</strong><small>Vietnam · 10.7769° N, 106.7009° E</small></div></article>;
}

function PlayingCard() {
  return <article className="card playing-card"><div className="photo-placeholder"><span>PAST<br />PROJECTS</span><strong>curfew<br />pseudo-f1<br />p5-maker</strong><i /></div><div className="photo-caption">✺ things i've shipped</div></article>;
}

function WorkCard() {
  const steps = ['Step 01', 'Step 02', 'Step 03', 'Step 04'];
  const copy = [
    ['01 Discovery call', 'A short conversation to understand what you want to make and what a useful first version looks like.'],
    ['02 Small plan', 'We trim the idea down to the clearest next step, then choose the simplest tools for it.'],
    ['03 Make a thing', 'I turn the plan into a working prototype you can click, test, and react to.'],
    ['04 Ship it', 'We tidy up the rough edges and get the useful version out into the world.'],
  ];
  const [activeStep, setActiveStep] = useState(0);
  return <article className="card work-card"><TinyLabel icon="▤">How i work</TinyLabel><div className="work-copy"><h3>{copy[activeStep][0]}</h3><p>{copy[activeStep][1]}</p></div><div className="steps" role="tablist" aria-label="How the process works">{steps.map((step, index) => <button type="button" role="tab" aria-selected={activeStep === index} className={activeStep === index ? 'active' : ''} onClick={() => setActiveStep(index)} key={step}>{step}</button>)}</div></article>;
}

function App() {
  const [available, setAvailable] = useState(true);
  return <div className="outside"><div className="page"><header className="site-header"><a className="site-url" href="#top" aria-current="page">fastdemo.dev</a><nav aria-label="Primary navigation"><a href="#work">work</a><a href="#about">about</a><a href="https://github.com/fastdemo" target="_blank" rel="noreferrer">github ↗</a></nav></header>
    <main id="top" className="content"><section className="intro" aria-labelledby="intro-heading"><img className="avatar" src={avatar} alt="fastdemo's GitHub avatar" /><h1 id="intro-heading">hey there, i'm fastdemo — i'm your average coder that makes <strong>fun things.</strong></h1><p className="bio">From apps to websites, I like making useful little things and seeing what happens when an idea gets to leave my head.</p><div className="intro-tools"><AudioCard /><button className={`status ${available ? 'is-available' : ''}`} aria-pressed={available} onClick={() => setAvailable(!available)}><span />{available ? 'Available for fun' : 'Currently tinkering'}</button></div></section>
      <section className="dashboard" id="work"><ExperienceCard /><ListeningCard /><ReadingCard /><MapCard /><PlayingCard /><WorkCard /></section>
      <section className="below" id="about"><h2>more things, less fuss.</h2><p>Explore the projects on <a href="https://github.com/fastdemo" target="_blank" rel="noreferrer">GitHub ↗</a> or say hello if you want to make something weird and useful.</p></section>
    </main><footer className="footer"><span>© 2026 fastdemo</span><span>built with curiosity</span></footer></div></div>;
}

export default App;

createRoot(document.getElementById('root')).render(<App />);
