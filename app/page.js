
"use client";

import HeroCollage from "../components/HeroCollage";
import TagCloud from "../components/TagCloud";
import Locations from "../components/Locations";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Gallery from "../components/Gallery";
import UploadModal from "../components/UploadModal";
import { supabase } from "../lib/supabase";

export default function Page() {
  const [photos, setPhotos] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

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
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Header />
<HeroCollage photos={photos.slice(0, 20)} />

<TagCloud photos={photos} />

<Locations photos={photos} />
      <Gallery photos={photos} />

      <button
        onClick={() => setShowUpload(true)}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          width: 65,
          height: 65,
          borderRadius: "50%",
          fontSize: 28,
          background: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        +
      </button>

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          refresh={fetchPhotos}
        />
      )}
    </main>
  );
}
