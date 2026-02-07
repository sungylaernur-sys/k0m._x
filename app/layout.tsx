import "./globals.css";

export const metadata = {
  title: "Математика ойындары",
  description: "Балаларға арналған ойындар",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kk">
      <body>{children}</body>
    </html>
  );
}