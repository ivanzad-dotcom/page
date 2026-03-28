"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://bsdhxgkcjkjpqaxwelqp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzZGh4Z2tjamtqcHFheHdlbHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NjM1OTMsImV4cCI6MjA5MDAzOTU5M30.WRAK89d9YAA3B_sw4JpDU8Xk-G0bb-DpPZNSn2FB1Z8"
);

const CLOUD_NAME = "dxcsttg6u";

export default function Page() {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const { data } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false });

    setPhotos(data || []);
  };

  const upload = async (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
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
    (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.tags || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.location || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main style={{ padding: 20, maxWidth: 1200, margin: "auto" }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Adriavisions</h1>

      {/* SEARCH */}
      <input
        placeholder="Pretraži..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 10, width: "100%", marginBottom: 20 }}
      />

      {/* UPLOAD FORM */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Tagovi"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <input
          placeholder="Lokacija"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input type="file" multiple onChange={upload} />
      </div>

      {/* GALLERY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))",
          gap: 15,
        }}
      >
        {filtered.map((p) => (
          <img
            key={p.id}
            src={p.image_url}
            style={{
              width: "100%",
              borderRadius: 12,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </main>
  );
}
