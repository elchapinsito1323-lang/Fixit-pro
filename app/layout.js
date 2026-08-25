export const metadata = {
  title: "Fixit Pro",
  description: "Vehicle repair app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
