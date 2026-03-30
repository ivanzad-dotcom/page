export default function TagCloud({ photos }) {
  const tagCount = {};

  photos.forEach(p => {
    if (!p.tags) return;

    p.tags.split(",").forEach(tag => {
      const t = tag.trim().toLowerCase();
      tagCount[t] = (tagCount[t] || 0) + 1;
    });
  });

  const sorted = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ padding: "40px" }}>
      <h3 style={{ marginBottom: 20 }}>Tags</h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {sorted.map(([tag, count]) => (
          <span
            key={tag}
            style={{
              fontSize: 12 + count * 2,
              opacity: 0.8,
              cursor: "pointer"
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
