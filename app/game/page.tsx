"use client";
import { useEffect, useRef, useState } from "react";

/* ===== TYPES ===== */
type Level = "medium" | "hard";

/* ===== MAIN ===== */
export default function TugGame() {
  /* ⏱️ TIME */
  const [time, setTime] = useState(180);
  const [gameOver, setGameOver] = useState(false);

  /* 🎬 COUNTDOWN */
  const [count, setCount] = useState<3 | 2 | 1 | 0>(3);
  const [showCountdown, setShowCountdown] = useState(true);

  /* 🎵 MUSIC */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);

  /* 🧠 GAME */
  const [task1, setTask1] = useState(generateTask());
  const [ans1, setAns1] = useState("");
  const [score1, setScore1] = useState(0);

  const [task2, setTask2] = useState(generateTask());
  const [ans2, setAns2] = useState("");
  const [score2, setScore2] = useState(0);

  /* 🎬 COUNTDOWN EFFECT */
  useEffect(() => {
    if (!showCountdown) return;

    const t = setInterval(() => {
      setCount(c => {
        if (c === 0) {
          clearInterval(t);
          setShowCountdown(false);
          return 0;
        }
        return (c - 1) as any;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [showCountdown]);

  /* 🎵 START MUSIC */
  function startMusic() {
    if (!audioRef.current) {
      audioRef.current = new Audio("/music.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    audioRef.current.play();
    setMusicStarted(true);
  }

  /* ⏱️ TIMER */
  useEffect(() => {
    if (showCountdown) return;
    if (time === 0) {
      setGameOver(true);
      audioRef.current?.pause();
      return;
    }
    const t = setInterval(() => setTime(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [time, showCountdown]);

  function check1() {
    if (+ans1 === task1.answer) {
      setScore1(s => s + 1);
      setTask1(generateTask());
      setAns1("");
    }
  }

  function check2() {
    if (+ans2 === task2.answer) {
      setScore2(s => s + 1);
      setTask2(generateTask());
      setAns2("");
    }
  }

  const winner =
    score1 > score2 ? "Сол ойыншы жеңді!" :
    score2 > score1 ? "Оң ойыншы жеңді!" :
    "Тең ойын!";

  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  return (
    <>
      {/* 🎬 COUNTDOWN */}
      {showCountdown && (
        <div style={overlay}>
          <div style={countNum}>{count === 0 ? "БАСТА!" : count}</div>
          <div style={countText}>
            {count === 3 && "ДАЙЫНДАЛЫҢЫЗ"}
            {count === 2 && "НАЗАР АУДАРЫҢЫЗ"}
            {count === 1 && "ФОКУС"}
          </div>
        </div>
      )}

      {/* 🏁 GAME OVER */}
      {gameOver && (
        <div style={endOverlay}>
          <div style={endCard}>
            <h1>🎉 {winner}</h1>
            <p>Құттықтаймыз!</p>
            <p style={{ fontSize: 24, marginTop: 10 }}>
              Ұпай: {score1} : {score2}
            </p>
            <button style={againBtn} onClick={() => window.location.reload()}>
              Қайта ойнау
            </button>
          </div>
        </div>
      )}

      {/* 🎮 GAME */}
      <div style={page}>
        <Player
          color="#1e3a8a"
          task={task1.text}
          answer={ans1}
          setAnswer={setAns1}
          onGo={check1}
          score={score1}
        />

        <div style={center}>
          {!musicStarted && (
            <button style={musicBtn} onClick={startMusic}>
              ▶ Музыканы бастау
            </button>
          )}

          <h2>Уақыт</h2>
          <div style={timeBig}>{mm}:{ss}</div>

          <h2>Ұпай</h2>
          <div style={scoreBig}>{score1} : {score2}</div>
        </div>

        <Player
          color="#991b1b"
          task={task2.text}
          answer={ans2}
          setAnswer={setAns2}
          onGo={check2}
          score={score2}
        />
      </div>
    </>
  );
}

/* ===== TASK ===== */
function generateTask() {
  const levels: Level[] = ["medium", "hard"];
  const level = levels[Math.floor(Math.random() * levels.length)];

  const x = rand(1, 9);
  const a = rand(2, 4);
  const b = rand(1, 9);

  return level === "medium"
    ? { text: `${a}x + ${b} = ${a * x + b}`, answer: x }
    : { text: `${a}x - ${b} = ${a * x - b}`, answer: x };
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ===== PLAYER ===== */
function Player({ task, answer, setAnswer, onGo, score, color }: any) {
  return (
    <div style={player}>
      <div style={{ ...question, background: color }}>{task}</div>
      <div style={answerBox}>{answer}</div>

      <Keypad
        onPress={(n: string) => setAnswer((v: string) => v + n)}
        onClear={() => setAnswer("")}
        onGo={onGo}
      />

      <b>Ұпай: {score}</b>
    </div>
  );
}

function Keypad({ onPress, onClear, onGo }: any) {
  return (
    <div style={grid}>
      {[1,2,3,4,5,6,7,8,9].map(n => (
        <button key={n} style={key} onClick={() => onPress(String(n))}>{n}</button>
      ))}
      <button style={{ ...key, background:"#ef4444", color:"#fff" }} onClick={onClear}>C</button>
      <button style={key} onClick={() => onPress("0")}>0</button>
      <button style={{ ...key, background:"#3b82f6", color:"#fff" }} onClick={onGo}>Go</button>
    </div>
  );
}

/* ===== STYLES ===== */
const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 30,
  background: "linear-gradient(#c7e0ff,#eaf4ff)",
};

const center = { textAlign: "center" as const, width: 260 };
const musicBtn = { padding: "10px 20px", borderRadius: 14, background: "#16a34a", color: "#fff", fontWeight: "bold", marginBottom: 10 };
const timeBig = { fontSize: 42, fontWeight: "bold" };
const scoreBig = { fontSize: 34, fontWeight: "bold" };

const player = { width: 260, background: "#fff", padding: 20, borderRadius: 20 };
const question = { color: "#fff", padding: 15, borderRadius: 14 };
const answerBox = { height: 40, borderRadius: 10, marginBottom: 10, lineHeight: "40px", textAlign: "center" as const };
const grid = { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 };
const key = { padding: 12, borderRadius: 10 };

/* COUNTDOWN */
const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "linear-gradient(135deg,#6366f1,#a855f7)",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  color: "#fff",
};

const countNum = { fontSize: 120, fontWeight: "bold" };
const countText = { fontSize: 28, marginTop: 20 };

/* GAME OVER */
const endOverlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const endCard = {
  background: "linear-gradient(135deg,#6366f1,#a855f7)",
  color: "#fff",
  padding: 40,
  borderRadius: 24,
  textAlign: "center" as const,
  width: 360,
};

const againBtn = {
  marginTop: 20,
  padding: "12px 24px",
  borderRadius: 14,
  background: "#fff",
  color: "#4f46e5",
  fontWeight: "bold",
};