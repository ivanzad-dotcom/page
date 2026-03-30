export default function GalleryPreview({ photos }) {
  return (
    <div style={{ padding: 40 }}>
      <h2>Gallery</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 10
      }}>
        {photos.map(p => (
          <img key={p.id} src={p.image_url}
            style={{ width: "100%", borderRadius: 10 }}
          />
        ))}
      </div>
    </div>
  );
}
