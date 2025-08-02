import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Geocussion - 砂を使った革新的な楽器",
  description: "Geocussionは砂を叩き押し固めてオブジェクトを作り出し、形を変えることで異なる音色を奏でられる変身可能な楽器です。4ZIGENチームによる実験的サウンドプロジェクト。",
  keywords: ["Geocussion", "砂の楽器", "実験的音楽", "インタラクティブ楽器", "サウンドアート", "4ZIGEN"],
  authors: [
    { name: "岡空来" },
    { name: "金澤政宜" },
    { name: "中田裕紀" },
    { name: "南田桂吾" }
  ],
  creator: "4ZIGEN",
  openGraph: {
    title: "Geocussion - 砂を使った革新的な楽器",
    description: "砂を叩き押し固めてオブジェクトを作り出し、音を大きく鳴らしたいならば大きなオブジェクトを作り、形を変えれば異なる音を鳴らせる砂場上の楽器。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geocussion - 砂を使った革新的な楽器",
    description: "砂を叩き押し固めてオブジェクトを作り出し、形を変えることで異なる音色を奏でられる革新的な楽器です。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
