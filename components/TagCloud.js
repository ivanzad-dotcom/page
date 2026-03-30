export default function TagCloud({ photos }) {
  const map = {};

  photos.forEach(p => {
    if (!p.tags) return;
    p.tags.split(",").forEach(t => {
      const tag = t.trim();
      map[tag] = (map[tag] || 0) + 1;
    });
  });

  return (
    <div style={{ padding: 40 }}>
      <h3>Tags</h3>

      {Object.entries(map).map(([tag, count]) => (
        <span key={tag}
          style={{
            marginRight: 10,
            fontSize: 12 + count * 2
          }}>
          {tag}
        </span>
      ))}
    </div>
  );
}
