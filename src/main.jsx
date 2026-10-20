import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const icon = (glyph) => ({ size, className }) => <span className={'icon '+(className || '')} style={size ? {fontSize:size} : undefined}>{glyph}</span>;
const ArrowDownRight=icon('↘'), ArrowUpRight=icon('↗'), Braces=icon('{}'), Code2=icon('</>'), ExternalLink=icon('↗'), Github=icon('◈'), Globe2=icon('◎'), Instagram=icon('◉'), Layers3=icon('▱'), Linkedin=icon('in'), Mail=icon('✉'), Menu=icon('☰'), Palette=icon('◌'), Server=icon('▣'), X=icon('×'), Zap=icon('ϟ');

const nav = ['Home', 'About', 'Skills', 'Projects', 'Services', 'Contact'];
const skills = [
  ['HTML5', 96], ['CSS3 / Tailwind', 93], ['JavaScript', 90], ['React', 90], ['Next.js', 86], ['Node.js', 84], ['TypeScript', 82], ['Git / GitHub', 91]
];
const projects = [
  { name: 'Aurelia Commerce', type: 'E-commerce platform', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85', text: 'A refined shopping experience with real-time inventory, intuitive checkout and a headless storefront.', tags: ['Next.js', 'Stripe', 'PostgreSQL'] },
  { name: 'Nexa Finance', type: 'Analytics dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85', text: 'A clean financial command center that turns complex numbers into meaningful daily decisions.', tags: ['React', 'Node.js', 'Charts'] },
  { name: 'Pulse Studio', type: 'Creative platform', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85', text: 'A vibrant digital home for a creative agency, built for speed, story and effortless discovery.', tags: ['Next.js', 'Framer', 'CMS'] }
];
const services = [
  [Globe2, 'Web Development', 'High-performance web experiences designed around your business goals.'],
  [Layers3, 'Frontend Development', 'Polished interfaces that feel intuitive on every screen and device.'],
  [Server, 'Backend Development', 'Reliable APIs, data models and systems that scale without friction.'],
  [Palette, 'UI / UX Development', 'Thoughtful digital products shaped by clarity, flow and visual character.'],
  [Braces, 'Responsive Websites', 'Fluid, accessible experiences that look exceptional wherever they are viewed.'],
  [Zap, 'Website Optimization', 'Faster load times, sharper SEO and technical foundations built to last.']
];

function App() {
  const [menu, setMenu] = useState(false); const [scrolled, setScrolled] = useState(false);
  const [stats, setStats] = useState([0, 0, 0]);
  const statsRef = useRef(null);
  const statsStarted = useRef(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 28); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  useEffect(() => {
    const section = statsRef.current;
    if (!section) return;
    let frame;
    const targets = [50, 1190, 95];
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || statsStarted.current) return;
      statsStarted.current = true;
      observer.disconnect();
      const start = performance.now();
      const duration = 2000;
      const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 2);
        setStats(targets.map((target) => Math.floor(target * eased)));
        if (progress < 1) frame = requestAnimationFrame(update);
        else setStats(targets);
      };
      frame = requestAnimationFrame(update);
    }, { threshold: 0.25 });
    observer.observe(section);
    return () => { observer.disconnect(); if (frame) cancelAnimationFrame(frame); };
  }, []);
  const jump = (item) => { setMenu(false); document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); };
  return <><div className="ambient orb-one"/><div className="ambient orb-two"/><div className="noise"/>
    <header className={scrolled ? 'nav scrolled' : 'nav'}><a href="#home" className="brand" aria-label="Muhammad Abdullah home" onClick={(e)=>{e.preventDefault();jump('Home')}}><img src="/ma-logo.png" alt=""/><span>MUHAMMAD ABDULLAH</span></a>
      <nav className={menu ? 'links open' : 'links'}>{nav.map(x=><button key={x} onClick={()=>jump(x)}>{x}</button>)}</nav>
      <button className="nav-cta" onClick={()=>jump('Contact')}>Let’s talk <ArrowUpRight size={15}/></button>
      <button className="menu" aria-label="Open navigation" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
    </header>
    <main>
      <section id="home" className="hero section"><div className="hero-copy reveal"><h1>Hi, I’m <em>Muhammad</em><br/>Abdulah<span className="period">.</span></h1><p>Full-Stack Web Developer crafting high-impact digital experiences where thoughtful design meets powerful technology.</p><div className="hero-actions"><button className="button primary" onClick={()=>jump('Projects')}>View My Projects <ArrowDownRight size={18}/></button><button className="button ghost" onClick={()=>jump('Contact')}>Contact Me <ArrowUpRight size={18}/></button></div><div className="hero-foot"><span className="dot"/> Based in Pakistan <i/> Building worldwide</div></div>
      </section>
      <section id="about" className="section about"><div className="section-head reveal"><div><p className="kicker">01 / ABOUT ME</p><h2>Building the web with<br/><em>purpose & precision.</em></h2></div><p className="intro">I turn ambitious ideas into memorable digital products — combining a sharp eye for detail with solid full-stack engineering.</p></div>
        <div className="about-grid"><article className="glass bio reveal"><span className="number">01</span><h3>A developer who cares about the <em>whole experience.</em></h3><p>I’m Muhammad Abdulah, a full-stack web developer focused on creating elegant, useful and resilient products. From the first interaction to the last database query, I believe every detail should earn its place.</p><a href="#contact" onClick={(e)=>{e.preventDefault();jump('Contact')}}>More about me <ArrowUpRight size={16}/></a></article><article className="glass journey reveal delay"><span className="number">02</span><h3>The journey so far</h3><div className="timeline"><div><b>2023 — Present</b><span>Independent Full-Stack Developer</span></div><div><b>2021 — 2023</b><span>Web Development & Design Studies</span></div><div><b>Always learning</b><span>Exploring modern web technologies</span></div></div></article></div>
        <div className="stats-panel reveal" ref={statsRef}><svg className="stats-map" viewBox="0 0 1000 400" aria-hidden="true"><defs><pattern id="map-dots" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="currentColor"/></pattern><clipPath id="world-shape"><path d="M74 92 113 55 169 48 202 69 238 65 265 92 252 121 218 130 203 156 176 168 163 199 137 190 126 158 99 145 83 120ZM214 202 246 212 263 244 253 278 239 312 222 351 205 329 201 296 185 269 194 239ZM371 96 399 80 437 83 451 98 480 92 499 110 488 127 459 130 445 148 428 151 415 175 399 169 391 143 371 132ZM417 174 451 166 470 190 473 224 459 258 446 291 424 317 411 287 404 251 390 224 397 194ZM481 100 527 74 585 70 621 82 670 72 704 91 740 89 767 111 802 113 823 139 800 158 770 155 750 179 718 171 696 195 663 184 641 203 610 190 588 166 557 165 537 146 511 145 495 124ZM815 249 847 238 880 251 892 272 877 289 849 288 830 276Z"/></clipPath></defs><rect width="1000" height="400" fill="url(#map-dots)" clipPath="url(#world-shape)"/></svg><div className="stats"><div><strong>{stats[0].toLocaleString()}</strong><p>Projects Completed</p></div><div><strong>{stats[1].toLocaleString()}</strong><p>Hours of Expertise</p></div><div><strong>{stats[2].toLocaleString()}<span>%</span></strong><p>Client Satisfaction</p></div></div></div>
      </section>
      <section id="skills" className="section skills"><div className="section-head reveal"><div><p className="kicker">02 / EXPERTISE</p><h2>The tools behind<br/><em>the craft.</em></h2></div><p className="intro">A modern, evolving toolkit built for creating dependable products and beautifully smooth user experiences.</p></div><div className="skills-wrap glass reveal">{skills.map(([name, level],i)=><div className="skill" key={name}><div><span>{String(i+1).padStart(2,'0')}</span><b>{name}</b><em>{level}%</em></div><i><i style={{width:`${level}%`}}/></i></div>)}</div></section>
      <section id="projects" className="section projects"><div className="section-head reveal"><div><p className="kicker">03 / SELECTED WORK</p><h2>Ideas brought to<br/><em>life in pixels.</em></h2></div><button className="text-button">All projects <ArrowUpRight size={17}/></button></div><div className="project-grid">{projects.map((p,i)=><article className={'project reveal '+(i===1?'delay':'')} key={p.name}><div className="project-image"><img src={p.image} alt={p.name}/><span>{p.type}</span><div className="project-hover"><button aria-label={'View '+p.name}><ArrowUpRight/></button></div></div><div className="project-content"><h3>{p.name}</h3><p>{p.text}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><div className="project-links"><a href="#contact" onClick={(e)=>e.preventDefault()}>Live Demo <ExternalLink size={14}/></a><a href="#contact" onClick={(e)=>e.preventDefault()}><Github size={15}/> GitHub</a></div></div></article>)}</div></section>
      <section id="services" className="section services"><div className="section-head reveal"><div><p className="kicker">04 / SERVICES</p><h2>From vision to<br/><em>working reality.</em></h2></div><p className="intro">Whether you need a complete product or a focused expert hand, I bring clarity and momentum to the work.</p></div><div className="service-grid">{services.map(([Icon,title,text],i)=><article className="glass service reveal" key={title}><span className="service-num">0{i+1}</span><div className="service-icon"><Icon size={23}/></div><h3>{title}</h3><p>{text}</p><ArrowUpRight className="service-arrow" size={19}/></article>)}</div></section>
      <section id="contact" className="section contact"><div className="contact-panel"><div className="contact-copy reveal"><p className="kicker">05 / GET IN TOUCH</p><h2>Have a project<br/>in <em>mind?</em></h2><p>Let’s turn your next idea into something exceptional. Send a message and I’ll get back to you soon.</p><div className="socials"><a href="#contact" aria-label="GitHub"><Github/></a><a href="#contact" aria-label="LinkedIn"><Linkedin/></a><a href="#contact" aria-label="Instagram"><Instagram/></a><a href="mailto:hello@example.com" aria-label="Email"><Mail/></a></div></div><form className="contact-form glass reveal delay" onSubmit={(e)=>e.preventDefault()}><div className="form-row"><label>YOUR NAME<input placeholder="John Doe" required/></label><label>EMAIL ADDRESS<input type="email" placeholder="john@example.com" required/></label></div><label>SUBJECT<input placeholder="Project inquiry" required/></label><label>YOUR MESSAGE<textarea placeholder="Tell me a little about your project..." rows="4" required/></label><button className="button primary" type="submit">Send Message <ArrowUpRight size={18}/></button></form></div></section>
    </main>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
