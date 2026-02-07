"use client";

type Props = {
  score1: number;
  score2: number;
  onRestart: () => void;
};

export default function EndGameModal({ score1, score2, onRestart }: Props) {
  let resultText = "🤝 Тең ойын!";
  if (score1 > score2) resultText = "🏆 Сол ойыншы жеңді!";
  if (score2 > score1) resultText = "🏆 Оң ойыншы жеңді!";

  return (
    <div style={bg}>
      <div style={box}>
        <h2 style={{ fontSize: 28, marginBottom: 10 }}>
          🎉 Құттықтаймыз!
        </h2>

        <p style={{ fontSize: 20, fontWeight: 600 }}>
          {resultText}
        </p>

        <p style={{ marginTop: 12 }}>
          Сол ойыншы: <b>{score1}</b>
        </p>
        <p>
          Оң ойыншы: <b>{score2}</b>
        </p>

        <button style={btn} onClick={onRestart}>
          🔁 Қайта ойнау
        </button>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */
const bg = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const box = {
  background: "linear-gradient(135deg,#6366f1,#a855f7)",
  color: "#fff",
  padding: 30,
  borderRadius: 24,
  width: 320,
  textAlign: "center" as const,
};

const btn = {
  marginTop: 20,
  padding: "10px 20px",
  borderRadius: 14,
  border: "none",
  background: "#fff",
  color: "#4f46e5",
  fontSize: 16,
  fontWeight: "bold",
  cursor: "pointer",
};