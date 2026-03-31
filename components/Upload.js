"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Upload() {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const fileName = Date.now() + "-" + file.name;

    // upload u storage
    const { error: uploadError } = await supabase.storage
      .from("photos")
      .upload(fileName, file);

    if (uploadError) {
      alert("Upload error");
      setLoading(false);
      return;
    }

    // dobij URL
    const { data } = supabase.storage
      .from("photos")
      .getPublicUrl(fileName);

    // spremi u bazu
    await supabase.from("photos").insert({
      image_url: data.publicUrl,
      created_at: new Date()
    });

    setLoading(false);
    alert("Upload uspješan");
  }

  return (
    <div style={{ padding: 40 }}>
      <input type="file" onChange={handleUpload} />

      {loading && <p>Uploading...</p>}
    </div>
  );
}
