export default function Gallery({ photos }) {
  return (
    <div
      style={{
        columnCount: 4,
        columnGap: "12px",
        padding: "20px 40px",
      }}
    >
      {photos.map((p) => (
        <img
          key={p.id}
          src={p.image_url}
          style={{
            width: "100%",
            marginBottom: "12px",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        />
      ))}
    </div>
  );
}
