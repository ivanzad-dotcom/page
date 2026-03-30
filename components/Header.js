import Link from "next/link";

export default function Header() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backdropFilter: "blur(10px)",
        background: "rgba(0,0,0,0.6)",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <strong>ADRIAVISIONS</strong>

      <div style={{ display: "flex", gap: 20 }}>
        <Link href="/">Home</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/admin" style={{ color: "#4da3ff" }}>
          Upload
        </Link>
      </div>
    </div>
  );
}
