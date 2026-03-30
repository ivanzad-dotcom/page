export default function GalleryPreview({ photos }) {
  if (!photos || photos.length === 0) {
    return <p style={{ padding: 40 }}>No photos yet</p>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h2 style={{ marginBottom: 20 }}>Latest Photos</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 15
      }}>
        {photos.map((p) => (
          <img
            key={p.id}
            src={p.image_url}
            style={{
              width: "100%",
              borderRadius: 10,
              objectFit: "cover"
            }}
          />
        ))}
      </div>
    </div>
  );
}
