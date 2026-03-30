export const metadata = {
  title: "Adriavisions",
  description: "Photography by Ivan Čorić",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        fontFamily: "-apple-system, sans-serif",
        background: "#0b0b0b",
        color: "white"
      }}>
        {children}
      </body>
    </html>
  );
}
