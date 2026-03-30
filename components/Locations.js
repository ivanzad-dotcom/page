export default function Locations({ photos }) {
  const locations = Array.from(
    new Set(photos.map(p => p.location).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  return (
    <div style={{ padding: "40px" }}>
      <h3 style={{ marginBottom: 20 }}>Locations</h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: 10
      }}>
        {locations.map(loc => (
          <span key={loc} style={{ opacity: 0.7 }}>
            {loc}
          </span>
        ))}
      </div>
    </div>
  );
}
