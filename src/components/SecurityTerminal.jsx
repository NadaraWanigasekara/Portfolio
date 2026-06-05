import { useState, useRef, useEffect } from "react";

const COMMAND_RESPONSES = {
  about: [
    "----------------------------------------------------------------",
    "PROFILE ASSESSMENT: NADARA WANIGASEKARA",
    "ROLE: Cyber Security Undergraduate & Secure Systems Developer",
    "ACADEMICS: Specializing in Network Defense and Cryptography",
    "CORE INTERSECTIONS: Ethical Hacking, Security Architecture, Threat Intelligence",
    "STATUS: Available for Internships & Joint Research Projects",
    "----------------------------------------------------------------",
  ],
  skills: [
    "----------------------------------------------------------------",
    "TECHNICAL CAPABILITIES REGISTRY:",
    "  • Languages : Java, C, Python, R, HTML5, CSS3, SQL, Bash",
    "  • Paradigms : OOP (Object-Oriented Programming), Clean Design",
    "  • Machine Learning & AI : Classification pipelines, scikit-learn",
    "  • Database Security     : SQL injection protection, sanitization",
    "  • Clinical Architectures: Management systems, priority scheduling",
    "----------------------------------------------------------------",
  ],
  projects: [
    "----------------------------------------------------------------",
    "REGISTRY PROJECTS MATRIX:",
    "  1. APPOINTMENT-SYS - Clinic Admin Web App (Java Servlets)",
    "  2. SMILECARE-SE    - Dental Management System (Java & Maven)",
    "  3. LOAN-PREDICTOR  - Classification ML Pipeline (Python)",
    "----------------------------------------------------------------",
  ],
};

export default function SecurityTerminal() {
  const [history, setHistory] = useState([
    { text: "Initializing secure terminal node connection...", type: "system" },
    { text: "Connection established with Nadara-Sec Host.", type: "system" },
    { text: "Welcome. Click tags below to query database.", type: "accent" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = [];

    if (trimmed === "") return;

    if (trimmed === "help") {
      response = [
        "Available system commands:",
        "  about    - Fetch comprehensive profile summary",
        "  skills   - List verified technical domains & toolsets",
        "  projects - Enumerate recent projects and prototypes",
        "  scan     - Run diagnostic system port/vulnerability scan",
        "  clear    - Clear terminal logs",
      ];
    } else if (trimmed === "clear") {
      setHistory([]);
      setInputValue("");
      return;
    } else if (trimmed === "scan") {
      response = [
        "Starting security diagnostics on localhost...",
        "  [+] Checking active ports...",
        "  [+] Port 22 (SSH)  - SECURE (Key authentication active)",
        "  [+] Port 80 (HTTP) - REDIRECTED to SSL 443",
        "  [+] Port 443 (HTTPS)- SECURE (TLS 1.3 Active)",
        "  [+] Vulnerability Index: 0.0 (Zero open exploits found)",
        "  [SUCCESS] System status is fully operational & secure.",
      ];
    } else if (COMMAND_RESPONSES[trimmed]) {
      response = COMMAND_RESPONSES[trimmed];
    } else {
      response = [`Command not found: '${cmd}'. Type 'help' for options.`];
    }

    setHistory((prev) => [
      ...prev,
      { text: `guest@nadara-sec:~$ ${cmd}`, type: "input" },
      ...response.map((line) => ({ text: line, type: "output" })),
    ]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(inputValue);
    }
  };

  const clickTag = (cmd) => {
    handleCommand(cmd);
  };

  return (
    <div
      className="cyber-card"
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(56, 189, 248, 0.3)",
        boxShadow: "0 0 25px rgba(56, 189, 248, 0.08)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Top Header Bar */}
      <div
        style={{
          background: "#050b1c",
          borderBottom: "1px solid rgba(56, 189, 248, 0.2)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
        </div>
        <span
          style={{
            fontFamily: "var(--heading)",
            fontSize: "0.75rem",
            color: "var(--primary)",
            letterSpacing: "1.5px",
          }}
        >
          SECURE_TERMINAL_NODE // ONLINE
        </span>
        <div style={{ width: "42px" }} />
      </div>

      {/* Terminal Content Area */}
      <div
        style={{
          background: "rgba(3, 7, 18, 0.95)",
          padding: "20px",
          height: "260px",
          overflowY: "auto",
          fontFamily: "var(--mono)",
          fontSize: "0.85rem",
          textAlign: "left",
          lineHeight: "1.6",
        }}
      >
        {history.map((line, idx) => {
          let color = "var(--text-main)";
          if (line.type === "system") color = "var(--text-muted)";
          else if (line.type === "accent") color = "var(--primary)";
          else if (line.type === "input") color = "#c084fc"; // Purple for inputs

          return (
            <div key={idx} style={{ color, whiteSpace: "pre-wrap" }}>
              {line.text}
            </div>
          );
        })}
        {/* Dynamic Typing/Input Row */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "#c084fc", marginRight: "8px" }}>guest@nadra-sec:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#ffffff",
              fontFamily: "var(--mono)",
              fontSize: "0.85rem",
              padding: 0,
            }}
            autoFocus
          />
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Action Suggestion Bar */}
      <div
        style={{
          background: "#050b1c",
          borderTop: "1px solid rgba(56, 189, 248, 0.15)",
          padding: "10px 16px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--text-muted)", marginRight: "4px" }}>
          Quick Queries:
        </span>
        { ["about", "skills", "projects", "clear"].map((tag) => (
          <button
            key={tag}
            onClick={(e) => {
              e.stopPropagation();
              clickTag(tag);
            }}
            style={{
              background: "rgba(56, 189, 248, 0.08)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              color: "var(--primary)",
              fontFamily: "var(--mono)",
              fontSize: "0.7rem",
              borderRadius: "4px",
              padding: "4px 10px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(56, 189, 248, 0.2)";
              e.target.style.borderColor = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(56, 189, 248, 0.08)";
              e.target.style.borderColor = "rgba(56, 189, 248, 0.3)";
            }}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
