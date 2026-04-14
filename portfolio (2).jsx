import { useState, useEffect, useRef } from "react";

const PROFILE_DATA = {
  name: "Manikala Bhanu Teja",
  title: "Projects Engineer — Mechatronics",
  tagline: "Building the factories of tomorrow through automation, IoT & digital transformation",
  phone: "+91-9866073240",
  email: "bhanutejamanikala@gmail.com",
  location: "Coimbatore, Tamil Nadu, India",
  dob: "19 Apr 1999",
  languages: ["Telugu", "English", "Tamil"],
  summary:
    "Innovative and results-driven Projects Engineer with a background in Mechatronics Engineering. Proven expertise in designing, implementing, and optimizing complex systems integrating mechanical, electrical, and computer technologies. Skilled in managing projects from conception through completion, ensuring on-time delivery and adherence to quality standards.",
  experience: [
    {
      role: "Junior Engineer — Projects",
      company: "ELGi Equipments Limited",
      location: "Coimbatore, TN",
      period: "Oct 2023 — Present",
      current: true,
      highlights: [
        "Oversee full project lifecycle — scope, design, development, testing & deployment",
        "Integration of PLCs, HMIs & SCADA systems for factory automation",
        "Deployed IIoT devices & real-time data collection across production lines",
        "Collaborated with IT/OT teams on cybersecurity for cloud analytics",
        "Hands-on mechanical assembly & electrical wiring for SPMs",
        "Contributing to KAIZENs & maintaining 5S standards",
      ],
    },
    {
      role: "Diploma Engineer Trainee — Projects (SPMs)",
      company: "ELGi Equipments Limited",
      location: "Coimbatore, TN",
      period: "Oct 2021 — Sep 2023",
      current: false,
      highlights: [
        "Assisted in design, implementation & commissioning of automation projects",
        "Developed detailed project plans with timelines & resource allocation",
        "Worked with mechanical, electrical & software teams for subsystem integration",
        "Key: Manufactured & commissioned CBN grinding machine — 50% cost reduction",
      ],
    },
  ],
  projects: [
    { name: "315kW Test Rig", desc: "Automated test rig for large screw air compressors with cloud reporting", outcome: "Cycle time ↓ · Manpower ↓ · Process optimized", icon: "⚡" },
    { name: "100HP Test Rig", desc: "Automated test rig for small screw air compressors with cloud data access", outcome: "Cycle time ↓ · Manpower ↓ · Process optimized", icon: "🔧" },
    { name: "SEPSAC Digitalization", desc: "100% digitalized assembly line & testing — order release to PO closing", outcome: "Paperless process · Full optimization", icon: "📡" },
    { name: "DEC POC Automation", desc: "Automated key assembly process with auto data capture & reporting", outcome: "Productivity ↑ · Cycle time ↓", icon: "🤖" },
    { name: "CBN Grinding Machine", desc: "In-house screw grinding machine — manufacturing, commissioning & prove-out", outcome: "50% cost reduction vs imports", icon: "⚙️" },
  ],
  ongoingProjects: ["Rotor Bay Line Digitalization", "RCD Unit Assembly Test Booth Automation", "Roto-G Screw Grinding Machine"],
  skills: [
    { name: "Mechanical Systems Integration", level: 90 },
    { name: "Industrial Automation (PLC/HMI/SCADA)", level: 85 },
    { name: "IoT & Sensor Integration", level: 85 },
    { name: "Process Optimization", level: 88 },
    { name: "Electrical Systems Design", level: 80 },
    { name: "CNC & Manufacturing", level: 82 },
    { name: "Technical Documentation", level: 90 },
    { name: "Project Management", level: 87 },
  ],
  softSkills: ["Problem-Solving", "Communication", "Team Collaboration", "Adaptability", "Leadership", "Time Management"],
  education: [
    { degree: "Diploma in Mechatronics", score: "88%", institution: "NTTF, Coimbatore" },
    { degree: "Intermediate (Bi.P.C)", score: "93.8%", institution: "VSN Junior College, AP" },
    { degree: "SSC", score: "93%", institution: "Sai Rakesh High School, AP" },
  ],
  certifications: [
    { level: "NSDC Level 4", title: "Automation Technician" },
    { level: "NSDC Level 3", title: "Mining Electrician" },
    { level: "NSDC Level 2", title: "Wire Man" },
    { level: "NSDC Level 1", title: "Soldering Technician" },
  ],
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimatedSection({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

function SkillBar({ name, level, delay }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
        <span style={{ color: "#e0e0e0", fontWeight: 500 }}>{name}</span>
        <span style={{ color: "#64ffda" }}>{level}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)" }}>
        <div style={{ height: "100%", borderRadius: 3, width: visible ? `${level}%` : "0%", background: "linear-gradient(90deg, #64ffda 0%, #00b8d4 100%)", transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s`, boxShadow: "0 0 12px rgba(100,255,218,0.3)" }} />
      </div>
    </div>
  );
}

function CountUp({ target, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function ParticleBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
    }));
    let raf;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100,255,218,0.25)";
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x, dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100,255,218,${0.08 * (1 - dist / 140)})`;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}

export default function Portfolio() {
  const [photo, setPhoto] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const fileRef = useRef(null);
  const d = PROFILE_DATA;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["hero", "about", "experience", "projects", "skills", "education", "contact"];
    const onScroll = () => {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const navItems = [
    { id: "hero", label: "Home" }, { id: "about", label: "About" }, { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" }, { id: "skills", label: "Skills" }, { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { background:#0a0f1a; color:#e0e0e0; font-family:'DM Sans',sans-serif; overflow-x:hidden; }
    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:rgba(100,255,218,0.3); border-radius:3px; }
    ::selection { background:rgba(100,255,218,0.3); color:#fff; }

    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(100,255,218,0.4)} 50%{box-shadow:0 0 0 20px rgba(100,255,218,0)} }
    @keyframes rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes typing { from{width:0} to{width:100%} }
    @keyframes blink { 0%,100%{border-color:transparent} 50%{border-color:#64ffda} }
    @keyframes glow { 0%,100%{filter:drop-shadow(0 0 8px rgba(100,255,218,0.4))} 50%{filter:drop-shadow(0 0 20px rgba(100,255,218,0.7))} }

    .nav { position:fixed; top:0; left:0; right:0; z-index:100; padding:16px 40px; display:flex; align-items:center; justify-content:space-between; backdrop-filter:blur(20px); background:rgba(10,15,26,0.8); border-bottom:1px solid rgba(100,255,218,0.08); transition:all 0.3s; }
    .nav.scrolled { padding:10px 40px; background:rgba(10,15,26,0.95); }
    .nav-logo { font-family:'Space Mono',monospace; font-size:20px; font-weight:700; color:#64ffda; cursor:pointer; letter-spacing:-1px; }
    .nav-logo span { color:#e0e0e0; }
    .nav-links { display:flex; gap:8px; }
    .nav-link { padding:6px 14px; font-size:13px; color:#8892b0; cursor:pointer; border-radius:4px; transition:all 0.2s; border:none; background:none; font-family:'DM Sans',sans-serif; }
    .nav-link:hover, .nav-link.active { color:#64ffda; background:rgba(100,255,218,0.06); }
    .hamburger { display:none; background:none; border:none; cursor:pointer; padding:8px; }
    .hamburger span { display:block; width:24px; height:2px; background:#64ffda; margin:5px 0; transition:all 0.3s; }

    .mobile-menu { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(10,15,26,0.97); z-index:99; flex-direction:column; align-items:center; justify-content:center; gap:20px; }
    .mobile-menu.open { display:flex; }
    .mobile-link { font-size:24px; color:#8892b0; cursor:pointer; background:none; border:none; font-family:'DM Sans',sans-serif; transition:color 0.2s; }
    .mobile-link:hover { color:#64ffda; }

    .section { min-height:100vh; padding:120px 40px 80px; max-width:1200px; margin:0 auto; position:relative; z-index:1; }

    .hero { display:flex; align-items:center; justify-content:center; flex-direction:column; text-align:center; min-height:100vh; gap:30px; }
    .avatar-wrap { position:relative; width:180px; height:180px; animation:float 4s ease-in-out infinite; }
    .avatar-ring { position:absolute; inset:-8px; border-radius:50%; border:2px solid transparent; border-top-color:#64ffda; border-right-color:rgba(100,255,218,0.3); animation:rotate 4s linear infinite; }
    .avatar-ring2 { position:absolute; inset:-16px; border-radius:50%; border:2px solid transparent; border-bottom-color:#00b8d4; border-left-color:rgba(0,184,212,0.3); animation:rotate 6s linear infinite reverse; }
    .avatar { width:180px; height:180px; border-radius:50%; background:linear-gradient(135deg,#1a2332,#0d1b2a); display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden; border:3px solid rgba(100,255,218,0.2); transition:all 0.4s; position:relative; }
    .avatar:hover { border-color:#64ffda; transform:scale(1.05); }
    .avatar img { width:100%; height:100%; object-fit:cover; }
    .avatar-placeholder { display:flex; flex-direction:column; align-items:center; gap:8px; color:#64ffda; font-size:12px; }
    .avatar-placeholder svg { width:40px; height:40px; }

    .hero-greeting { font-family:'Space Mono',monospace; color:#64ffda; font-size:15px; letter-spacing:3px; text-transform:uppercase; }
    .hero-name { font-size:clamp(36px,6vw,64px); font-weight:700; color:#ccd6f6; line-height:1.1; letter-spacing:-2px; }
    .hero-title { font-size:clamp(18px,3vw,28px); color:#8892b0; font-weight:300; }
    .hero-tagline { max-width:600px; color:#6a7490; font-size:15px; line-height:1.7; }

    .stat-grid { display:flex; gap:40px; flex-wrap:wrap; justify-content:center; margin-top:20px; }
    .stat-item { text-align:center; }
    .stat-num { font-family:'Space Mono',monospace; font-size:36px; font-weight:700; color:#64ffda; display:block; }
    .stat-label { font-size:12px; color:#6a7490; text-transform:uppercase; letter-spacing:2px; margin-top:4px; }

    .scroll-indicator { position:absolute; bottom:40px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:8px; color:#64ffda; font-size:11px; letter-spacing:2px; text-transform:uppercase; animation:float 2s ease-in-out infinite; }
    .scroll-line { width:1px; height:40px; background:linear-gradient(to bottom,#64ffda,transparent); }

    .section-title { font-family:'Space Mono',monospace; font-size:13px; color:#64ffda; letter-spacing:4px; text-transform:uppercase; margin-bottom:8px; }
    .section-heading { font-size:clamp(28px,4vw,42px); font-weight:700; color:#ccd6f6; margin-bottom:50px; letter-spacing:-1px; }
    .section-heading span { color:#64ffda; }

    .about-content { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; }
    .about-text { font-size:15px; line-height:1.8; color:#8892b0; }
    .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .info-card { background:rgba(255,255,255,0.03); border:1px solid rgba(100,255,218,0.08); border-radius:12px; padding:20px; transition:all 0.3s; }
    .info-card:hover { border-color:rgba(100,255,218,0.2); background:rgba(100,255,218,0.03); transform:translateY(-2px); }
    .info-label { font-size:11px; color:#64ffda; text-transform:uppercase; letter-spacing:2px; margin-bottom:6px; font-family:'Space Mono',monospace; }
    .info-value { font-size:14px; color:#ccd6f6; }

    .timeline { position:relative; padding-left:40px; }
    .timeline::before { content:''; position:absolute; left:0; top:0; bottom:0; width:2px; background:linear-gradient(to bottom,#64ffda,rgba(100,255,218,0.1)); }
    .timeline-item { position:relative; margin-bottom:50px; }
    .timeline-dot { position:absolute; left:-46px; top:6px; width:12px; height:12px; border-radius:50%; border:2px solid #64ffda; background:#0a0f1a; }
    .timeline-dot.active { background:#64ffda; animation:pulse 2s infinite; }
    .timeline-role { font-size:22px; font-weight:600; color:#ccd6f6; margin-bottom:4px; }
    .timeline-meta { font-family:'Space Mono',monospace; font-size:13px; color:#64ffda; margin-bottom:16px; }
    .timeline-highlights { list-style:none; }
    .timeline-highlights li { padding:6px 0; font-size:14px; color:#8892b0; line-height:1.6; position:relative; padding-left:20px; }
    .timeline-highlights li::before { content:'▹'; position:absolute; left:0; color:#64ffda; }

    .projects-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:24px; }
    .project-card { background:rgba(255,255,255,0.02); border:1px solid rgba(100,255,218,0.06); border-radius:16px; padding:32px; transition:all 0.4s cubic-bezier(0.16,1,0.3,1); position:relative; overflow:hidden; }
    .project-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#64ffda,#00b8d4); transform:scaleX(0); transition:transform 0.4s; transform-origin:left; }
    .project-card:hover { transform:translateY(-8px); border-color:rgba(100,255,218,0.15); box-shadow:0 20px 60px rgba(0,0,0,0.3); }
    .project-card:hover::before { transform:scaleX(1); }
    .project-icon { font-size:32px; margin-bottom:16px; display:block; }
    .project-name { font-size:18px; font-weight:600; color:#ccd6f6; margin-bottom:10px; }
    .project-desc { font-size:14px; color:#8892b0; line-height:1.6; margin-bottom:16px; }
    .project-outcome { font-family:'Space Mono',monospace; font-size:12px; color:#64ffda; padding:8px 14px; background:rgba(100,255,218,0.06); border-radius:8px; display:inline-block; }

    .ongoing-tag { display:inline-block; padding:4px 12px; font-size:11px; background:rgba(100,255,218,0.08); color:#64ffda; border-radius:20px; margin:4px; font-family:'Space Mono',monospace; letter-spacing:1px; }

    .skills-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; }
    .soft-skills-wrap { display:flex; flex-wrap:wrap; gap:10px; margin-top:20px; }
    .soft-tag { padding:8px 20px; border:1px solid rgba(100,255,218,0.15); border-radius:30px; font-size:13px; color:#8892b0; transition:all 0.3s; cursor:default; }
    .soft-tag:hover { border-color:#64ffda; color:#64ffda; background:rgba(100,255,218,0.05); transform:scale(1.05); }

    .edu-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:24px; margin-bottom:50px; }
    .edu-card { background:rgba(255,255,255,0.02); border:1px solid rgba(100,255,218,0.06); border-radius:16px; padding:28px; text-align:center; transition:all 0.3s; }
    .edu-card:hover { border-color:rgba(100,255,218,0.2); transform:translateY(-4px); }
    .edu-score { font-family:'Space Mono',monospace; font-size:36px; font-weight:700; color:#64ffda; }
    .edu-degree { font-size:16px; font-weight:600; color:#ccd6f6; margin:10px 0 6px; }
    .edu-inst { font-size:13px; color:#6a7490; }

    .cert-list { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:16px; }
    .cert-item { display:flex; align-items:center; gap:16px; background:rgba(255,255,255,0.02); border:1px solid rgba(100,255,218,0.06); border-radius:12px; padding:20px; transition:all 0.3s; }
    .cert-item:hover { border-color:rgba(100,255,218,0.2); }
    .cert-badge { width:44px; height:44px; border-radius:10px; background:linear-gradient(135deg,rgba(100,255,218,0.15),rgba(0,184,212,0.1)); display:flex; align-items:center; justify-content:center; font-family:'Space Mono',monospace; font-size:13px; color:#64ffda; font-weight:700; flex-shrink:0; }
    .cert-title { font-size:14px; color:#ccd6f6; }
    .cert-level { font-size:11px; color:#6a7490; margin-top:2px; }

    .contact-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:24px; }
    .contact-card { background:rgba(255,255,255,0.02); border:1px solid rgba(100,255,218,0.06); border-radius:16px; padding:32px; text-align:center; transition:all 0.3s; cursor:pointer; }
    .contact-card:hover { border-color:#64ffda; background:rgba(100,255,218,0.03); transform:translateY(-4px); }
    .contact-icon { font-size:28px; margin-bottom:12px; }
    .contact-label { font-size:12px; color:#64ffda; text-transform:uppercase; letter-spacing:2px; margin-bottom:6px; font-family:'Space Mono',monospace; }
    .contact-value { font-size:15px; color:#ccd6f6; word-break:break-all; }

    .footer { text-align:center; padding:40px; color:#4a5568; font-size:13px; position:relative; z-index:1; border-top:1px solid rgba(100,255,218,0.06); }
    .footer span { color:#64ffda; }

    @media(max-width:768px) {
      .section { padding:80px 20px 60px; }
      .nav { padding:12px 20px; }
      .nav-links { display:none; }
      .hamburger { display:block; }
      .about-content { grid-template-columns:1fr; gap:30px; }
      .skills-grid { grid-template-columns:1fr; gap:30px; }
      .info-grid { grid-template-columns:1fr; }
      .stat-grid { gap:20px; }
      .projects-grid { grid-template-columns:1fr; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <ParticleBackground />
      <input type="file" ref={fileRef} accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />

      {/* NAV */}
      <nav className={`nav ${scrollY > 50 ? "scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => scrollTo("hero")}>BT<span>.</span></div>
        <div className="nav-links">
          {navItems.map((n) => (
            <button key={n.id} className={`nav-link ${activeSection === n.id ? "active" : ""}`} onClick={() => scrollTo(n.id)}>{n.label}</button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map((n) => (
          <button key={n.id} className="mobile-link" onClick={() => scrollTo(n.id)}>{n.label}</button>
        ))}
      </div>

      {/* HERO */}
      <section id="hero" className="section hero">
        <AnimatedSection>
          <div className="avatar-wrap">
            <div className="avatar-ring" />
            <div className="avatar-ring2" />
            <div className="avatar" onClick={() => fileRef.current?.click()}>
              {photo ? <img src={photo} alt="Profile" /> : (
                <div className="avatar-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 16a4 4 0 100-8 4 4 0 000 8z"/><path d="M3 16.5V18a3 3 0 003 3h12a3 3 0 003-3v-1.5"/><path d="M16 3.13a4 4 0 010 7.75"/><path d="M21 21v-2a4 4 0 00-3-3.87"/><path d="M12 12v0"/><path strokeLinecap="round" d="M12 16v2m0-14v2"/></svg>
                  Tap to upload
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="hero-greeting">Hello, I'm</div>
        </AnimatedSection>
        <AnimatedSection delay={0.25}>
          <h1 className="hero-name">{d.name}</h1>
        </AnimatedSection>
        <AnimatedSection delay={0.35}>
          <p className="hero-title">{d.title}</p>
        </AnimatedSection>
        <AnimatedSection delay={0.45}>
          <p className="hero-tagline">{d.tagline}</p>
        </AnimatedSection>

        <AnimatedSection delay={0.55}>
          <div className="stat-grid">
            <div className="stat-item"><span className="stat-num"><CountUp target={4} suffix="+" /></span><span className="stat-label">Years Exp</span></div>
            <div className="stat-item"><span className="stat-num"><CountUp target={5} /></span><span className="stat-label">Projects Done</span></div>
            <div className="stat-item"><span className="stat-num"><CountUp target={3} /></span><span className="stat-label">Ongoing</span></div>
            <div className="stat-item"><span className="stat-num"><CountUp target={4} /></span><span className="stat-label">Certifications</span></div>
          </div>
        </AnimatedSection>

        <div className="scroll-indicator">
          scroll
          <div className="scroll-line" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <AnimatedSection>
          <div className="section-title">About Me</div>
          <h2 className="section-heading">Who <span>I Am</span></h2>
        </AnimatedSection>
        <div className="about-content">
          <AnimatedSection delay={0.1}>
            <p className="about-text">{d.summary}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="info-grid">
              <div className="info-card"><div className="info-label">Location</div><div className="info-value">{d.location}</div></div>
              <div className="info-card"><div className="info-label">Date of Birth</div><div className="info-value">{d.dob}</div></div>
              <div className="info-card"><div className="info-label">Languages</div><div className="info-value">{d.languages.join(", ")}</div></div>
              <div className="info-card"><div className="info-label">Company</div><div className="info-value">ELGi Equipments Ltd</div></div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <AnimatedSection>
          <div className="section-title">Career Path</div>
          <h2 className="section-heading">Work <span>Experience</span></h2>
        </AnimatedSection>
        <div className="timeline">
          {d.experience.map((exp, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="timeline-item">
                <div className={`timeline-dot ${exp.current ? "active" : ""}`} />
                <div className="timeline-role">{exp.role}</div>
                <div className="timeline-meta">{exp.company} · {exp.period}</div>
                <ul className="timeline-highlights">
                  {exp.highlights.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <AnimatedSection>
          <div className="section-title">Portfolio</div>
          <h2 className="section-heading">Key <span>Projects</span></h2>
        </AnimatedSection>
        <div className="projects-grid">
          {d.projects.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="project-card">
                <span className="project-icon">{p.icon}</span>
                <div className="project-name">{p.name}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-outcome">{p.outcome}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={0.3}>
          <div style={{ marginTop: 40 }}>
            <div style={{ fontSize: 14, color: "#8892b0", marginBottom: 12 }}>Currently working on:</div>
            <div>{d.ongoingProjects.map((p, i) => <span key={i} className="ongoing-tag">{p}</span>)}</div>
          </div>
        </AnimatedSection>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <AnimatedSection>
          <div className="section-title">Capabilities</div>
          <h2 className="section-heading">Skills & <span>Expertise</span></h2>
        </AnimatedSection>
        <div className="skills-grid">
          <AnimatedSection delay={0.1}>
            <div>
              <h3 style={{ fontSize: 18, color: "#ccd6f6", marginBottom: 24 }}>Technical Skills</h3>
              {d.skills.map((s, i) => <SkillBar key={i} name={s.name} level={s.level} delay={0.1 + i * 0.08} />)}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div>
              <h3 style={{ fontSize: 18, color: "#ccd6f6", marginBottom: 24 }}>Soft Skills</h3>
              <div className="soft-skills-wrap">
                {d.softSkills.map((s, i) => <span key={i} className="soft-tag">{s}</span>)}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section">
        <AnimatedSection>
          <div className="section-title">Education</div>
          <h2 className="section-heading">Academic <span>Background</span></h2>
        </AnimatedSection>
        <div className="edu-grid">
          {d.education.map((e, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="edu-card">
                <div className="edu-score">{e.score}</div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-inst">{e.institution}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <h3 style={{ fontSize: 18, color: "#ccd6f6", marginBottom: 24 }}>Certifications</h3>
          <div className="cert-list">
            {d.certifications.map((c, i) => (
              <AnimatedSection key={i} delay={0.3 + i * 0.08}>
                <div className="cert-item">
                  <div className="cert-badge">L{4 - i}</div>
                  <div><div className="cert-title">{c.title}</div><div className="cert-level">{c.level}</div></div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <AnimatedSection>
          <div className="section-title">Get in Touch</div>
          <h2 className="section-heading">Contact <span>Me</span></h2>
        </AnimatedSection>
        <div className="contact-grid">
          <AnimatedSection delay={0.1}>
            <div className="contact-card" onClick={() => window.open(`tel:${d.phone}`)}>
              <div className="contact-icon">📱</div>
              <div className="contact-label">Phone</div>
              <div className="contact-value">{d.phone}</div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="contact-card" onClick={() => window.open(`mailto:${d.email}`)}>
              <div className="contact-icon">✉️</div>
              <div className="contact-label">Email</div>
              <div className="contact-value">{d.email}</div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <div className="contact-label">Location</div>
              <div className="contact-value">{d.location}</div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="footer">
        <p>Designed with <span>♥</span> · Bhanu Teja M · {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
