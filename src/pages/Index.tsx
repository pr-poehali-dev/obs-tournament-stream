import { useState, useEffect, useRef } from "react";

const TEAM_LEFT = "ALPHA";
const TEAM_RIGHT = "OMEGA";
const MATCH_TITLE = "GRAND FINALS · SEASON 7";

export default function Index() {
  const [scoreLeft, setScoreLeft] = useState(2);
  const [scoreRight, setScoreRight] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [glitch, setGlitch] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; speed: number; opacity: number }[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const pts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(pts);
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 160);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="obs-root">
      {/* Ambient background layers */}
      <div className="bg-deep" />
      <div className="bg-grid" />
      <div className="bg-vignette" />
      <div className="bg-scanlines" />

      {/* Floating particles */}
      <svg className="particles-svg" width="1920" height="1080">
        {particles.map((p) => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill="var(--neon-cyan)"
            opacity={p.opacity}
            style={{ animation: `particleFloat ${6 + p.speed * 10}s ease-in-out ${p.id * 0.3}s infinite alternate` }}
          />
        ))}
      </svg>

      {/* Outer frame */}
      <div className="frame-outer" />
      <div className="corner corner-tl"><div className="corner-inner" /></div>
      <div className="corner corner-tr"><div className="corner-inner" /></div>
      <div className="corner corner-bl"><div className="corner-inner" /></div>
      <div className="corner corner-br"><div className="corner-inner" /></div>

      {/* HEADER */}
      <header className="hud-header">
        {/* LEFT TEAM */}
        <div className="team-block left">
          <div className="team-bg-stripe left-stripe" />
          <div className="team-name-col">
            <div className="team-label">TEAM</div>
            <div className={`team-name left-name ${glitch ? "glitch-text" : ""}`}>{TEAM_LEFT}</div>
            <div className="team-underline left-ul" />
          </div>
          <div className="score-section">
            <button className="score-btn minus" onClick={() => setScoreLeft((s) => Math.max(0, s - 1))}>−</button>
            <div className="score-hex">
              <div className="hex-bg" />
              <div className="hex-ring" />
              <span className={`score-num ${glitch ? "glitch-text" : ""}`}>{scoreLeft}</span>
            </div>
            <button className="score-btn plus" onClick={() => setScoreLeft((s) => s + 1)}>+</button>
          </div>
        </div>

        {/* CENTER */}
        <div className="center-block">
          <div className="match-title-wrap">
            <div className="title-line" />
            <span className="match-title">{MATCH_TITLE}</span>
            <div className="title-line" />
          </div>

          <div className="timer-outer" onClick={() => setRunning((r) => !r)} title="Нажми для паузы/старта">
            <div className="timer-orbit orbit-1" />
            <div className="timer-orbit orbit-2" />
            <div className="timer-orbit orbit-3" />
            <div className="timer-core">
              <span className={`timer-text ${glitch ? "glitch-text" : ""}`}>{mm}:{ss}</span>
              <span className="timer-state">{running ? "● RUN" : "⏸ PAUSED"}</span>
            </div>
          </div>

          <div className="live-badge">
            <span className="live-dot" />
            <span className="live-text">LIVE</span>
            <span className="live-pulse-ring" />
          </div>
        </div>

        {/* RIGHT TEAM */}
        <div className="team-block right">
          <div className="score-section">
            <button className="score-btn minus" onClick={() => setScoreRight((s) => Math.max(0, s - 1))}>−</button>
            <div className="score-hex">
              <div className="hex-bg right-hex" />
              <div className="hex-ring right-ring" />
              <span className={`score-num right-score ${glitch ? "glitch-text" : ""}`}>{scoreRight}</span>
            </div>
            <button className="score-btn plus right-plus" onClick={() => setScoreRight((s) => s + 1)}>+</button>
          </div>
          <div className="team-name-col right-col">
            <div className="team-label">TEAM</div>
            <div className={`team-name right-name ${glitch ? "glitch-text" : ""}`}>{TEAM_RIGHT}</div>
            <div className="team-underline right-ul" />
          </div>
          <div className="team-bg-stripe right-stripe" />
        </div>
      </header>

      {/* DIVIDER */}
      <div className="hud-divider">
        <div className="divider-beam left-beam" />
        <div className="divider-center-icon">◆</div>
        <div className="divider-beam right-beam" />
      </div>

      {/* STREAMS */}
      <main className="streams-area">
        <div className="stream-wrap">
          <div className="stream-frame" />
          <div className="stream-glow left-glow" />
          <div className="stream-label left-lbl">
            <span className="lbl-bar" />
            <span className="lbl-text">POV · {TEAM_LEFT}</span>
            <span className="lbl-rec">● REC</span>
          </div>
          <div className="stream-content">
            <div className="stream-placeholder">
              <div className="ph-ring" />
              <div className="ph-icon">◈</div>
              <p className="ph-hint">Browser Source</p>
              <p className="ph-sub">Вставьте URL стрима в OBS</p>
            </div>
          </div>
        </div>

        <div className="vs-divider">
          <div className="vs-line" />
          <div className="vs-badge">VS</div>
          <div className="vs-line" />
        </div>

        <div className="stream-wrap">
          <div className="stream-frame right-frame" />
          <div className="stream-glow right-glow" />
          <div className="stream-label right-lbl">
            <span className="lbl-bar right-bar" />
            <span className="lbl-text">POV · {TEAM_RIGHT}</span>
            <span className="lbl-rec">● REC</span>
          </div>
          <div className="stream-content">
            <div className="stream-placeholder">
              <div className="ph-ring right-ph-ring" />
              <div className="ph-icon right-ph-icon">◈</div>
              <p className="ph-hint">Browser Source</p>
              <p className="ph-sub">Вставьте URL стрима в OBS</p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="hud-footer">
        <div className="footer-track" />
        <div className="footer-content">
          <span className="footer-item">◆ OFFICIAL BROADCAST</span>
          <span className="footer-dot">·</span>
          <span className="footer-item highlight">MAP 3 OF 5</span>
          <span className="footer-dot">·</span>
          <span className="footer-item">SEASON 7 CHAMPIONSHIP ◆</span>
        </div>
      </footer>
    </div>
  );
}
