"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

const CLOUD_NAME = "dxcsttg6u";

export default function UploadModal({ onClose, refresh }) {
  const [tag, setTag] = useState("");
  const [location, setLocation] = useState("");

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

    refresh();
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "white",
        padding: 30,
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }}>
        <h3>Upload photos</h3>

        <input placeholder="Tagovi" onChange={(e) => setTag(e.target.value)} />
        <input placeholder="Lokacija" onChange={(e) => setLocation(e.target.value)} />

        <input type="file" multiple onChange={upload} />

        <button onClick={onClose}>Zatvori</button>
      </div>
    </div>
  );
}
