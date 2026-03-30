"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import GalleryPreview from "../components/GalleryPreview";
import { supabase } from "../lib/supabase";

export default function Page() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setPhotos(data);
  }

  return (
    <main>
      <Header />
      <Hero />
      <GalleryPreview photos={photos} />
    </main>
  );
}
