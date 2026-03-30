export default function Locations({ photos }) {
  const locations = [...new Set(photos.map(p => p.location).filter(Boolean))]
    .sort();

  return (
    <div style={{ padding: 40 }}>
      <h3>Locations</h3>

      {locations.map(l => (
        <div key={l}>{l}</div>
      ))}
    </div>
  );
}
