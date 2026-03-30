"use client";

import { useEffect, useState } from "react";

export default function HeroCollage({ photos }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [photos]);

  const visible = photos.slice(current, current + 6);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr",
      gridTemplateRows: "200px 200px",
      gap: "10px",
      padding: "40px"
    }}>
      {visible.map((p, i) => (
        <img
          key={i}
          src={p.image_url}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "16px",
            transition: "0.5s"
          }}
        />
      ))}
    </div>
  );
}
