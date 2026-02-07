"use client";
import { useRouter } from "next/navigation";

export default function Arkan() {
  const router = useRouter();

  return (
    <div className="page">
      <div className="card">
        <h1>жылдамдықпен есептеу</h1>
        <h2>Операция түрін таңдаңыз</h2>

        <button className="button purple" onClick={() => router.push("/arkan/level?op=add")}>
          Теңдеу
        </button>
         <button className="button back" onClick={() => router.back()}>
          ← Қайту
        </button>
      </div>
    </div>
  );
}
