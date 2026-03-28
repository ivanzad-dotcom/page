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
  const [showUpload, setShowUpload] = useState(false);
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
    setShowUpload(false);
  };

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      {/* HEADER */}
      <div style={{ padding: 20, color: "white", fontSize: 24 }}>
        Adriavisions
      </div>

      {/* GALLERY */}
      <div
        style={{
          columnCount: 4,
          columnGap: "10px",
          padding: 10,
        }}
      >
        {photos.map((p) => (
          <img
            key={p.id}
            src={p.image_url}
            style={{
              width: "100%",
              marginBottom: 10,
              borderRadius: 10,
            }}
          />
        ))}
      </div>

      {/* FLOAT BUTTON */}
      <button
        onClick={() => setShowUpload(true)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          fontSize: 30,
          background: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        +
      </button>

      {/* UPLOAD MODAL */}
      {showUpload && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ background: "white", padding: 20, borderRadius: 10 }}>
            <h3>Upload</h3>
            <input
              placeholder="Tag"
              onChange={(e) => setTag(e.target.value)}
            />
            <input
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
            />
            <input type="file" multiple onChange={upload} />
            <button onClick={() => setShowUpload(false)}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
}
