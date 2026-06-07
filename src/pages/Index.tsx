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

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      setTimeout(() => setGlitch(false), 180);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="obs-root">
      <div className="bg-grid" />
      <div className="bg-scanlines" />
      <div className="corner corner-tl" />
      <div className="corner corner-tr" />
      <div className="corner corner-bl" />
      <div className="corner corner-br" />

      <header className="hud-header">
        <div className="team-block">
          <div className="team-name-wrap left">
            <div className="team-accent-line" />
            <span className="team-name">{TEAM_LEFT}</span>
          </div>
          <div className="score-controls">
            <button className="score-btn" onClick={() => setScoreLeft((s) => Math.max(0, s - 1))}>−</button>
            <div className="score-display">
              <span className={`score-num ${glitch ? "glitch-text" : ""}`}>{scoreLeft}</span>
            </div>
            <button className="score-btn" onClick={() => setScoreLeft((s) => s + 1)}>+</button>
          </div>
        </div>

        <div className="center-block">
          <div className="match-title">{MATCH_TITLE}</div>
          <div className="timer-wrap" onClick={() => setRunning((r) => !r)} title="Нажми для паузы">
            <div className="timer-ring" />
            <div className="timer-ring timer-ring-2" />
            <span className={`timer-text ${glitch ? "glitch-text" : ""}`}>{mm}:{ss}</span>
            <span className="timer-hint">{running ? "▶ ИДЁТ" : "⏸ ПАУЗА"}</span>
          </div>
          <div className="live-badge">
            <span className="live-dot" />
            <span className="live-text">LIVE</span>
          </div>
        </div>

        <div className="team-block right-team">
          <div className="score-controls">
            <button className="score-btn" onClick={() => setScoreRight((s) => Math.max(0, s - 1))}>−</button>
            <div className="score-display">
              <span className={`score-num ${glitch ? "glitch-text" : ""}`}>{scoreRight}</span>
            </div>
            <button className="score-btn" onClick={() => setScoreRight((s) => s + 1)}>+</button>
          </div>
          <div className="team-name-wrap right">
            <span className="team-name">{TEAM_RIGHT}</span>
            <div className="team-accent-line right" />
          </div>
        </div>
      </header>

      <div className="hud-divider">
        <div className="divider-line" />
        <div className="divider-diamond">◆</div>
        <div className="divider-line" />
      </div>

      <main className="streams-area">
        <div className="stream-container">
          <div className="stream-corner sc-tl" />
          <div className="stream-corner sc-tr" />
          <div className="stream-corner sc-bl" />
          <div className="stream-corner sc-br" />
          <div className="stream-label">
            <span className="stream-label-dot" />
            POV · {TEAM_LEFT}
          </div>
          <div className="stream-inner">
            <div className="stream-placeholder">
              <div className="stream-icon">◈</div>
              <p className="stream-hint">Browser Source</p>
              <p className="stream-hint-sub">Вставьте URL стрима в OBS</p>
            </div>
          </div>
          <div className="stream-scanline" />
        </div>

        <div className="streams-separator">
          <div className="sep-line" />
          <div className="sep-vs">VS</div>
          <div className="sep-line" />
        </div>

        <div className="stream-container">
          <div className="stream-corner sc-tl" />
          <div className="stream-corner sc-tr" />
          <div className="stream-corner sc-bl" />
          <div className="stream-corner sc-br" />
          <div className="stream-label">
            <span className="stream-label-dot" />
            POV · {TEAM_RIGHT}
          </div>
          <div className="stream-inner">
            <div className="stream-placeholder">
              <div className="stream-icon">◈</div>
              <p className="stream-hint">Browser Source</p>
              <p className="stream-hint-sub">Вставьте URL стрима в OBS</p>
            </div>
          </div>
          <div className="stream-scanline" />
        </div>
      </main>

      <footer className="hud-footer">
        <div className="footer-line" />
        <div className="footer-content">
          <span className="footer-tag">◆ OFFICIAL BROADCAST</span>
          <span className="footer-sep">·</span>
          <span className="footer-match">MAP 3 OF 5</span>
          <span className="footer-sep">·</span>
          <span className="footer-tag">SEASON 7 CHAMPIONSHIP ◆</span>
        </div>
      </footer>
    </div>
  );
}
