"use client";

import Header from "../components/Header";
import Hero from "../components/Hero";
import TagCloud from "../components/TagCloud";
import Locations from "../components/Locations";
import GalleryPreview from "../components/GalleryPreview";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Page() {
  const [photos, setPhotos] = useState([]);

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

  return (
    <main>
      <Header />

      <Hero photos={photos.slice(0, 20)} />

      <TagCloud photos={photos} />

      <Locations photos={photos} />

      <GalleryPreview photos={photos.slice(0, 12)} />
    </main>
  );
}
