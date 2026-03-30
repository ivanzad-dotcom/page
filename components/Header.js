export default function Header() {
  return (
    <div style={{
      position: "sticky",
      top: 0,
      padding: "20px 40px",
      display: "flex",
      justifyContent: "space-between",
      backdropFilter: "blur(10px)",
      background: "rgba(0,0,0,0.6)",
      borderBottom: "1px solid rgba(255,255,255,0.1)"
    }}>
      <strong>ADRIAVISIONS</strong>

      <div style={{ display: "flex", gap: 20 }}>
        <span>Home</span>
        <span>Gallery</span>
        <span>Portfolio</span>
        <span style={{ color: "#4da3ff" }}>Upload</span>
      </div>
    </div>
  );
}
