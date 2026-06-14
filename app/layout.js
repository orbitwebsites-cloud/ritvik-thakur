import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Ritvik Thakur — Developer & Founder",
  description:
    "Student developer and founder. I build full-stack products, ship client websites through my agency OrbitBoyzz, and make games. Selected work and experiments.",
  openGraph: {
    title: "Ritvik Thakur — Developer & Founder",
    description:
      "Student developer and founder. Full-stack products, client websites, and games.",
    type: "website",
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
