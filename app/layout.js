import "./globals.css";

export const metadata = {
  title: "Fixit Pro",
  description: "A clear, safety-first vehicle repair assistant.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
