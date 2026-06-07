import { useState, useEffect, useRef } from "react";

const TEAM_LEFT  = "ALPHA";
const TEAM_RIGHT = "OMEGA";
const MATCH_TITLE = "GRAND FINALS";
const SEASON = "SEASON VII";

export default function Index() {
  const [scoreLeft,  setScoreLeft]  = useState(2);
  const [scoreRight, setScoreRight] = useState(1);
  const [seconds,    setSeconds]    = useState(0);
  const [running,    setRunning]    = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const total   = scoreLeft + scoreRight;
  const leftPct = total === 0 ? 50 : (scoreLeft / total) * 100;

  return (
    <div className="root">

      {/* ── TOP BAR ── */}
      <div className="top-bar">
        <span className="top-season">{SEASON}</span>
        <div className="top-center">
          <span className="top-match">{MATCH_TITLE}</span>
        </div>
        <div className="live-pill">
          <div className="live-badge-inner">
            <span className="live-dot" />
            LIVE
          </div>
        </div>
      </div>

      {/* ── SCOREBOARD ── */}
      <div className="scoreboard">

        {/* LEFT TEAM */}
        <div className="team left-team">
          <div className="team-info">
            <span className="team-tag">HOME</span>
            <h1 className="team-name">{TEAM_LEFT}</h1>
          </div>
          <div className="score-wrap">
            <button className="adj-btn" onClick={() => setScoreLeft(s => Math.max(0, s - 1))}>−</button>
            <div className="score-box left-score-box">
              <span className="score">{scoreLeft}</span>
            </div>
            <button className="adj-btn" onClick={() => setScoreLeft(s => s + 1)}>+</button>
          </div>
        </div>

        {/* CENTER */}
        <div className="center-col">
          <div className="timer-block" onClick={() => setRunning(r => !r)} title="Пауза / старт">
            <span className="timer">{mm}:{ss}</span>
            <span className="timer-status">{running ? "RUNNING" : "PAUSED"}</span>
          </div>
          <div className="vs-bar">
            <div className="vs-fill" style={{ width: `${leftPct}%` }} />
          </div>
        </div>

        {/* RIGHT TEAM */}
        <div className="team right-team">
          <div className="score-wrap">
            <button className="adj-btn" onClick={() => setScoreRight(s => Math.max(0, s - 1))}>−</button>
            <div className="score-box right-score-box">
              <span className="score">{scoreRight}</span>
            </div>
            <button className="adj-btn" onClick={() => setScoreRight(s => s + 1)}>+</button>
          </div>
          <div className="team-info right-info">
            <span className="team-tag">AWAY</span>
            <h1 className="team-name right-team-name">{TEAM_RIGHT}</h1>
          </div>
        </div>

      </div>

      {/* ── STREAMS ── */}
      <div className="streams-section">
        <div className="streams">

          {/* Stream LEFT */}
          <div className="stream-block">
            <div className="stream-header">
              <span className="stream-team-label">{TEAM_LEFT}</span>
              <span className="stream-pov">PLAYER POV</span>
            </div>
            <div className="stream-screen">
              <div className="screen-placeholder">
                <div className="placeholder-crosshair">
                  <div className="ch-h" /><div className="ch-v" />
                </div>
                <p className="ph-text">BROWSER SOURCE</p>
                <p className="ph-sub">Добавьте URL стрима в OBS</p>
              </div>
            </div>
          </div>

          {/* VS divider */}
          <div className="stream-divider">
            <div className="sd-line" />
            <div className="sd-vs">VS</div>
            <div className="sd-line" />
          </div>

          {/* Stream RIGHT */}
          <div className="stream-block">
            <div className="stream-header right-header">
              <span className="stream-pov">PLAYER POV</span>
              <span className="stream-team-label right-label">{TEAM_RIGHT}</span>
            </div>
            <div className="stream-screen">
              <div className="screen-placeholder">
                <div className="placeholder-crosshair">
                  <div className="ch-h" /><div className="ch-v" />
                </div>
                <p className="ph-text">BROWSER SOURCE</p>
                <p className="ph-sub">Добавьте URL стрима в OBS</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="footer">
        <div className="footer-rule" />
        <div className="footer-row">
          <span className="footer-left">OFFICIAL BROADCAST</span>
          <span className="footer-center">MAP 3 OF 5</span>
          <span className="footer-right">SEASON VII CHAMPIONSHIP</span>
        </div>
      </div>

    </div>
  );
}
