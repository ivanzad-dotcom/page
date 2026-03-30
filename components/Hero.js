"use client";
import { useEffect, useState } from "react";

export default function Hero({ photos }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(i);
  }, [photos]);

  const visible = photos.slice(index, index + 5);

  return (
    <div style={{
      padding: 40,
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr",
      gridTemplateRows: "200px 200px",
      gap: 10
    }}>
      {visible.map((p, i) => (
        <img key={i} src={p.image_url}
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }}
        />
      ))}
    </div>
  );
}
<div style={{
  position: "relative"
}}>
  <img ... />

  <div style={{
    position: "absolute",
    bottom: 20,
    left: 20
  }}>
    <h1>Adriavisions</h1>
    <p>Photography archive & portfolio</p>
  </div>
</div>
