import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CyberBackground from "./components/CyberBackground";
import SecurityTerminal from "./components/SecurityTerminal";

const TYPING_WORDS = [
  "Cyber Security Undergraduate",
  "Ethical Hacker",
  "Threat Hunter",
  "Secure Software Developer"
];

const SKILLS_DATA = [
  { category: "Java", icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3c3 0 3 2 0 3" />
        <path d="M12 3c3 0 3 2 0 3" />
        <path d="M8.5 10c-2 0-3 1-3 3 0 3 4 4 6.5 4s6.5-1 6.5-4c0-2-1-3-3-3h-7z" />
      </svg>
    ), details: ["JVM, Spring basics"] },
  { category: "C", icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <path d="M15 9s-3 0-3 3 3 3 3 3" />
      </svg>
    ), details: ["Systems programming, pointers"] },
  { category: "Python", icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-3 0-4 1-4 4v1h8V7c0-3-1-4-4-4z" />
        <path d="M12 21c3 0 4-1 4-4v-1h-8v1c0 3 1 4 4 4z" />
      </svg>
    ), details: ["Scripting, ML, automation"] },
  { category: "OOP", icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="6" rx="1" />
        <rect x="3" y="14" width="18" height="6" rx="1" />
        <path d="M8 4v16" />
      </svg>
    ), details: ["Classes, inheritance, polymorphism"] },
  { category: "R", icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 7c2-2 6-2 8 0 2 2 1 6-2 7v4" />
        <path d="M9 7v10" />
      </svg>
    ), details: ["Statistics, data analysis"] },
  { category: "AI", icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" />
      </svg>
    ), details: ["ML models, neural nets"] },
  { category: "SQL", icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v8c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      </svg>
    ), details: ["DB design, queries, joins"] },
  { category: "HTML", icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4l2 16 7 2 7-2 2-16" />
        <path d="M16 12h-8" />
      </svg>
    ), details: ["Semantic markup, accessibility"] },
  { category: "JavaScript", icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3v6h8V3" />
        <path d="M7 21v-6h10v6" />
      </svg>
    ), details: ["ES6+, DOM, tooling"] },
  { category: "CSS", icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4l2 16 7 2 7-2 2-16" />
        <path d="M7 8h10" />
      </svg>
    ), details: ["Layouts, responsive, animations"] }
];

const PROJECTS_DATA = [
  {
    title: "Online Appointment Scheduling System",
    tech: "Java Servlets / HTML & CSS",
    desc: "A clinic administration web app designed to manage patient histories, prioritize queues, and persist data securely using local flat files.",
    status: "STABLE // DATA LOCALIZED",
    github: "https://github.com/NadaraWanigasekara/Online-Appointment-Scheduling-System-",
    highlights: [
      "Custom Priority Queue scheduling logic",
      "Robust file-based data persistence layer",
      "Patient profile and history tracking registry",
      "Administrative workflow management panels"
    ]
  },
  {
    title: "Smilecare Dental Management",
    tech: "Java / Maven / IntelliJ",
    desc: "A comprehensive clinical operations management system developed to streamline patient workflows, secure records, and process digital assets.",
    status: "ACTIVE // RECORD ENCRYPTED",
    github: "https://github.com/NadaraWanigasekara/SE-Project-2Y-1S-Dental-Management-System-",
    highlights: [
      "Diagnostic imaging X-ray & emergency uploads",
      "Patient profiles & treatment record logs",
      "Clinician and admin custom workspace panels",
      "Secure handling of files and patient identifiers"
    ]
  },
  {
    title: "ML Loan Approval Predictor",
    tech: "Python / Scikit-Learn / Pandas",
    desc: "An end-to-end classification pipeline that evaluates and compares multiple machine learning algorithms to predict loan approval status.",
    status: "TESTED // MODEL COMPLIANT",
    github: "https://github.com/NadaraWanigasekara/AL-ML-2Y-1S",
    highlights: [
      "Logistic Reg, SVM, KNN, Random Forest, MLP comparison",
      "Data preprocessing, encoding, and scale normalization",
      "Hyperparameter tuning & automated model evaluation",
      "Optimal classification selection engine"
    ]
  }
];

function App() {
  // Typewriter Hook
  const [wordIdx, setWordIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);

  // Secure channel form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [txStatus, setTxStatus] = useState("idle"); // idle | encrypting | sending | success
  const [txLogs, setTxLogs] = useState([]);

  // Typewriter Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink((b) => !b);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typewriter text logic
  useEffect(() => {
    if (subIdx === TYPING_WORDS[wordIdx].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2200);
      return () => clearTimeout(timeout);
    }

    if (subIdx === 0 && reverse) {
      const timeout = setTimeout(() => {
        setReverse(false);
        setWordIdx((prev) => (prev + 1) % TYPING_WORDS.length);
      }, 500); // 500ms pause before typing next word
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setSubIdx((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 100);

    return () => clearTimeout(timeout);
  }, [subIdx, reverse, wordIdx]);

  // Form submit simulation
  const handleSecureTransmit = (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;

    setTxStatus("encrypting");
    setTxLogs(["[+] Initiating handshake protocol...", "[+] Connected to uplink node."]);

    const logSteps = [
      { delay: 800, log: "[+] Generating ephemeral 256-bit AES key..." },
      { delay: 1500, log: "[+] Encrypting payload with AES-CBC mode..." },
      { delay: 2200, log: "[+] Appending signature (HMAC-SHA256)..." },
      { delay: 2800, log: "[+] Transmitting packets to nadara-sec server..." },
      { delay: 3500, log: "[SUCCESS] Uplink acknowledged: 200 OK. Packets written to disk." }
    ];

    logSteps.forEach((step) => {
      setTimeout(() => {
        setTxLogs((prev) => [...prev, step.log]);
        if (step.log.includes("SUCCESS")) {
          setTxStatus("success");
          setFormName("");
          setFormEmail("");
          setFormMsg("");
        }
      }, step.delay);
    });
  };

  const handleResetTx = () => {
    setTxStatus("idle");
    setTxLogs([]);
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Background Matrix canvas */}
      <CyberBackground />
      {/* Fullscreen Spline background (fixed, subtle) */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, opacity: 0.12, pointerEvents: "none", overflow: "hidden" }}>
        <iframe src="https://my.spline.design/btgrid-n2PkelcrcP8Lm1Wb7VbvVeVA/" frameBorder="0" title="3D Grid Spline" style={{ width: "100%", height: "100%", border: 0 }} allowFullScreen />
      </div>

      {/* Decorative scanline overlay */}
      <div className="scanlines" />

      {/* Transparent Sticky Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(3, 7, 18, 0.75)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(56, 189, 248, 0.15)",
          padding: "16px 40px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo - Name divided into 2 parts, Nadara on Wanigasekara */}
          <a
            href="#home"
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              lineHeight: "1.1",
            }}
          >
            <span
              style={{
                fontFamily: "var(--heading)",
                fontWeight: "900",
                fontSize: "1.4rem",
                color: "var(--primary)",
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                textShadow: "0 0 10px var(--primary-glow)",
              }}
            >
              Nadara
            </span>
            <span
              style={{
                fontFamily: "var(--heading)",
                fontWeight: "500",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
              }}
            >
              Wanigasekara
            </span>
          </a>

          {/* Nav Links */}
          <nav style={{ display: "flex", gap: "24px" }}>
            <a href="#terminal" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--heading)", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--primary)"} onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}>Console</a>
            <a href="#skills" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--heading)", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--primary)"} onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}>Skills</a>
            <a href="#projects" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--heading)", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--primary)"} onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}>Projects</a>
            <a href="#contact" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--heading)", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--primary)"} onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}>Secure Uplink</a>
          </nav>

        </div>
      </header>

      {/* Main Hero & Console Section */}
      <section id="home" className="section-container" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
          className="hero-grid"
        >
          {/* Left Hero Text Panel */}
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                display: "inline-block",
                border: "1px solid var(--border)",
                background: "rgba(56, 189, 248, 0.05)",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "0.75rem",
                color: "var(--primary)",
                fontFamily: "var(--mono)",
                marginBottom: "20px",
                letterSpacing: "1px",
              }}
            >
              [NODE ADDRESS: NADARA.WANIGASEKARA.LOCAL]
            </div>

            {/* Split Massive Name (Nadara top, Wanigasekara bottom) */}
            <h1
              style={{
                fontSize: "4.5rem",
                lineHeight: "0.95",
                margin: "0 0 24px",
                fontWeight: "900",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span style={{ color: "#ffffff", letterSpacing: "6px", textTransform: "uppercase", textShadow: "0 0 15px rgba(255, 255, 255, 0.15)" }}>
                NADARA
              </span>
              <span style={{ fontSize: "2.2rem", fontWeight: "400", color: "var(--text-muted)", letterSpacing: "4px", textTransform: "uppercase" }}>
                WANIGASEKARA
              </span>
            </h1>

            {/* Typing cursor subtitle */}
            <div
              style={{
                fontSize: "1.4rem",
                height: "36px",
                color: "var(--secondary)",
                fontFamily: "var(--mono)",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span>{TYPING_WORDS[wordIdx].substring(0, subIdx)}</span>
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "22px",
                  backgroundColor: "var(--secondary)",
                  marginLeft: "6px",
                  opacity: cursorBlink ? 1 : 0,
                  transition: "opacity 0.1s",
                }}
              />
            </div>

            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.6", marginBottom: "32px", maxWidth: "520px" }}>
              Undergraduate specializing in network architecture defense, pen-testing systems, cryptographic applications, and coding clean, secure tools to safeguard host infrastructures.
            </p>

            <div style={{ display: "flex", gap: "16px" }}>
              <a href="#terminal" style={{ textDecoration: "none" }}>
                <button className="btn-cyber">Access Node Console</button>
              </a>
              <a href="#contact" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "rgba(129, 140, 248, 0.1)",
                    color: "var(--secondary)",
                    border: "1px solid var(--secondary)",
                    padding: "12px 28px",
                    fontFamily: "var(--heading)",
                    fontSize: "0.9rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    borderRadius: "4px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "var(--secondary)";
                    e.target.style.color = "#030712";
                    e.target.style.boxShadow = "0 0 15px var(--secondary)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(129, 140, 248, 0.1)";
                    e.target.style.color = "var(--secondary)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  Encrypt Message
                </button>
              </a>
              <a href="/Professional%20Resume.pdf" download="Professional Resume.pdf" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "transparent",
                    color: "var(--primary)",
                    border: "1px solid var(--primary)",
                    padding: "12px 20px",
                    fontFamily: "var(--heading)",
                    fontSize: "0.9rem",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    borderRadius: "6px",
                  }}
                  onMouseEnter={(e) => { e.target.style.background = "rgba(56, 189, 248, 0.06)" }}
                  onMouseLeave={(e) => { e.target.style.background = "transparent" }}
                >
                  Download CV
                </button>
              </a>
            </div>
          </div>

          {/* Interactive Shell Terminal */}
          <div id="terminal" style={{ padding: "10px 0", position: "relative", zIndex: 1 }}>
            <SecurityTerminal />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{ background: "rgba(5, 11, 28, 0.6)", borderTop: "1px solid rgba(56, 189, 248, 0.1)", borderBottom: "1px solid rgba(56, 189, 248, 0.1)" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "12px" }} className="glow-text">
            SKILLS
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "48px", maxWidth: "600px", marginInline: "auto" }}>
            System capabilities built through structured research, lab drills, and software vulnerability testing.
          </p>

          

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
            }}
          >
            {SKILLS_DATA.map((skill, index) => (
              <div
                key={index}
                className="cyber-card"
                style={{
                  padding: "28px",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ color: "var(--primary)", marginBottom: "16px" }}>
                    {skill.icon}
                  </div>
                  <h3 style={{ fontSize: "1.15rem", marginBottom: "16px", color: "#ffffff", fontFamily: "var(--heading)" }}>
                    {skill.category}
                  </h3>
                  <ul style={{ paddingLeft: "16px", margin: 0, color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: "1.6" }}>
                    {skill.details.map((detail, dIdx) => (
                      <li key={dIdx} style={{ marginBottom: "8px" }}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects" className="section-container">
        <h2 style={{ fontSize: "2rem", marginBottom: "12px", textAlign: "center" }} className="glow-text-purple">
          PROJECTS // ARTIFACTS
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "48px", maxWidth: "600px", marginInline: "auto", textAlign: "center" }}>
          Source code registries and defense setups developed to address security deficiencies.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          {PROJECTS_DATA.map((proj, idx) => (
            <div
              key={idx}
              className="cyber-card"
              style={{
                padding: "30px",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid rgba(129, 140, 248, 0.15)",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--mono)", color: "var(--secondary)" }}>
                    {proj.tech}
                  </span>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontFamily: "var(--mono)",
                      background: "rgba(34, 197, 94, 0.08)",
                      border: "1px solid rgba(34, 197, 94, 0.3)",
                      color: "var(--accent)",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {proj.status}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.25rem", marginBottom: "12px", color: "#ffffff", fontFamily: "var(--heading)" }}>
                  {proj.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: "1.5", marginBottom: "16px" }}>
                  {proj.desc}
                </p>
                {proj.highlights && (
                  <ul style={{ paddingLeft: "16px", margin: "0 0 16px", color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: "1.6" }}>
                    {proj.highlights.map((h, hIdx) => (
                      <li key={hIdx} style={{ marginBottom: "6px" }}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div style={{ marginTop: "24px" }}>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--primary)",
                    textDecoration: "none",
                    fontFamily: "var(--mono)",
                    fontSize: "0.8rem",
                    letterSpacing: "1px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.color = "#38bdf8";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.color = "var(--primary)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  FETCH SECURE REPO
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Secure Contact Channel Section */}
      <section id="contact" style={{ background: "rgba(5, 11, 28, 0.6)", borderTop: "1px solid rgba(56, 189, 248, 0.1)", borderBottom: "1px solid rgba(56, 189, 248, 0.1)" }}>
        <div className="section-container" style={{ maxWidth: "680px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "12px", textAlign: "center" }} className="glow-text">
            SECURE_DATA_UPLINK
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "36px", textAlign: "center", fontSize: "0.9rem" }}>
            Submit an encrypted communication pack directly to Nadara's gateway nodes.
          </p>

          <div className="cyber-card" style={{ padding: "32px", border: "1px solid rgba(56, 189, 248, 0.25)" }}>
            <AnimatePresence mode="wait">
              {txStatus === "idle" && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSecureTransmit}
                  style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--primary)", letterSpacing: "1px" }}>
                      CLIENT NAME / NODE IDENTIFIER
                    </label>
                    <input
                      type="text"
                      className="cyber-input"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Guest-Agent"
                      required
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--primary)", letterSpacing: "1px" }}>
                      RETURN COMMUNICATION CHANNEL (EMAIL)
                    </label>
                    <input
                      type="email"
                      className="cyber-input"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. client@domain.xyz"
                      required
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--primary)", letterSpacing: "1px" }}>
                      COMMUNICATION PAYLOAD (MESSAGE)
                    </label>
                    <textarea
                      rows="4"
                      className="cyber-input"
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder="Enter details of request or research query..."
                      style={{ resize: "vertical" }}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-cyber" style={{ width: "100%", marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    TRANSMIT SECURE PACKET
                  </button>
                </motion.form>
              )}

              {/* Encryption & Send Logs Animation */}
              {(txStatus === "encrypting" || txStatus === "sending" || txStatus === "success") && (
                <motion.div
                  key="status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.85rem",
                    textAlign: "left",
                    background: "rgba(3, 7, 18, 0.95)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    padding: "24px",
                    lineHeight: "1.8",
                  }}
                >
                  <div style={{ color: "var(--primary)", borderBottom: "1px solid rgba(56, 189, 248, 0.2)", paddingBottom: "10px", marginBottom: "15px", fontFamily: "var(--heading)", fontSize: "0.78rem" }}>
                    TRANSMISSION LOGS: UPLINK
                  </div>
                  {txLogs.map((log, lIdx) => {
                    let color = "var(--text-main)";
                    if (log.includes("SUCCESS")) color = "var(--accent)";
                    else if (log.includes("AES") || log.includes("HMAC")) color = "var(--secondary)";
                    return (
                      <div key={lIdx} style={{ color }}>
                        {log}
                      </div>
                    );
                  })}
                  {txStatus === "encrypting" && (
                    <div style={{ color: "var(--primary)", display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                      <span>Encrypting stream data packets</span>
                      <span className="terminal-cursor" style={{ height: "12px", width: "8px" }} />
                    </div>
                  )}
                  {txStatus === "success" && (
                    <button
                      onClick={handleResetTx}
                      style={{
                        marginTop: "24px",
                        background: "rgba(56, 189, 248, 0.08)",
                        border: "1px solid var(--primary)",
                        color: "var(--primary)",
                        fontFamily: "var(--heading)",
                        fontSize: "0.75rem",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        letterSpacing: "1px",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => e.target.style.background = "rgba(56, 189, 248, 0.2)"}
                      onMouseLeave={(e) => e.target.style.background = "rgba(56, 189, 248, 0.08)"}
                    >
                      ESTABLISH NEW LINK
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(56, 189, 248, 0.15)",
          padding: "30px 40px",
          background: "rgba(3, 7, 18, 0.9)",
          textAlign: "center",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            © {new Date().getFullYear()} NADARA WANIGASEKARA // ALL RIGHTS RESERVED
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--mono)", color: "var(--accent)" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)", display: "inline-block", boxShadow: "0 0 8px var(--accent-glow)" }} />
              SYSTEM SECURE // ENCRYPTION ACTIVE
            </div>
            <div style={{ display: "flex", gap: "16px", alignItems: "center", justifyContent: "center" }}>
              <a href="https://github.com/NadaraWanigasekara" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub Profile" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", background: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #0d0d0d 100%)", borderRadius: "12px", border: "2px solid rgba(255,255,255,0.15)", textDecoration: "none", transition: "all 0.3s ease", boxShadow: "0 10px 30px rgba(0,0,0,0.4), inset 1px 1px 0 rgba(255,255,255,0.08)", color: "white" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/sandevni-wanigasekera-07043a321/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn Profile" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", background: "linear-gradient(135deg, #0d7fbe 0%, #0a66c2 50%, #073d8b 100%)", borderRadius: "12px", border: "2px solid rgba(255,255,255,0.15)", textDecoration: "none", transition: "all 0.3s ease", boxShadow: "0 10px 30px rgba(10,102,194,0.4), inset 1px 1px 0 rgba(255,255,255,0.08)", color: "white" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.249-.129.597-.129.946v5.421h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.662 1.196-1.608 2.902-1.608 2.121 0 3.71 1.328 3.71 4.187v5.703zM5.337 5.33c-1.144 0-1.915-.754-1.915-1.698 0-.943.77-1.699 1.915-1.699 1.146 0 1.917.756 1.917 1.699 0 .944-.771 1.698-1.917 1.698zm1.605 14.122H3.73V9.806h3.212v9.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/heyitsnadara/?__pwa=1" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram Profile" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", background: "linear-gradient(135deg, #f09433 0%, #e6683c 50%, #dc2743 100%)", borderRadius: "12px", border: "2px solid rgba(255,255,255,0.15)", textDecoration: "none", transition: "all 0.3s ease", boxShadow: "0 10px 30px rgba(220,39,67,0.35), inset 1px 1px 0 rgba(255,255,255,0.08)", color: "white" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="5" />
                  <circle cx="12" cy="12" r="3.8" />
                  <circle cx="16.5" cy="7.5" r="1.1" fill="white" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;