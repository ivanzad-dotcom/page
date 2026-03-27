"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://bsdhxgkcjkjpqaxwelqp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
);

export default function Page() {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const { data } = await supabase.from("photos").select("*");
    setPhotos(data || []);
  };

  const upload = async (e) => {
    const files = Array.from(e.target.files);
    const tag = prompt("Tag:");
    const location = prompt("Lokacija:");

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxcsttg6u/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();

      await supabase.from("photos").insert({
        name: file.name,
        tags: tag,
        location: location,
        image_url: data.secure_url,
      });
    }

    fetchPhotos();
  };

  const filtered = photos.filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main style={{ padding: 20 }}>
      <h1>Adriavisions</h1>

      <input
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <input type="file" multiple onChange={upload} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {filtered.map((p) => (
          <img key={p.id} src={p.image_url} style={{ width: "100%" }} />
        ))}
      </div>
    </main>
  );
}
