"use client";
import { useRouter, useSearchParams } from "next/navigation";
import "./level.css";

export default function LevelClient() {
  const router = useRouter();
  const params = useSearchParams();
  const op = params.get("op");

  return (
    <div className="page">
      <div className="card">
        <h1>Күрделілік деңгейі</h1>
        <p className="mode">Режим: Теңдеу</p>

        <button
          className="button purple"
          onClick={() => router.push(`/game?mode=mix&op=${op}`)}
        >
          🔀 Аралас деңгей
          <span>Оңай · Орташа · Қиын</span>
        </button>

        <button className="back" onClick={() => router.back()}>
          ← Қайту
        </button>
      </div>
    </div>
  );
}