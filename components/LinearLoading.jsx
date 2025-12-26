"use client";
import { useEffect, useState } from "react";

export default function LinearLoading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    let current = 0;

    // انیمیشن تدریجی پیشرفت
    const interval = setInterval(() => {
      current += Math.random() * 10; // سرعت پیشرفت تصادفی
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setProgress(current);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "4px",
        width: `${progress}%`,
        background: "linear-gradient(90deg, #7f5af0, #f67062)",
        zIndex: 9999,
        transition: "width 0.1s ease",
      }}
    />
  );
}
