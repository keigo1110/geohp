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
  metadataBase: new URL('https://geohp.vercel.app'),
  title: "Geocussion - 砂場楽器 | 砂を押し固めて音を奏でる変身可能な楽器",
  description: "Geocussion（ジオカッション）は砂場楽器として、砂を押し固めて形を作り、形に応じた音を奏でる変身可能な楽器です。カメラが地形と人間の手を検出し、3次元データとして処理して音を生成します。4ZIGENチームによる実験的サウンドプロジェクト。",
  keywords: [
    "Geocussion",
    "ジオカッション",
    "砂場楽器",
    "砂の楽器",
    "砂楽器",
    "砂を使った楽器",
    "インタラクティブ楽器",
    "実験的音楽",
    "サウンドアート",
    "3D楽器",
    "地形楽器",
    "砂場オーケストラ",
    "4ZIGEN",
    "東京大学制作展",
    "EXPO 2025"
  ],
  authors: [
    { name: "岡空来" },
    { name: "金澤政宜" },
    { name: "中田裕紀" },
    { name: "南田桂吾" }
  ],
  creator: "4ZIGEN",
  publisher: "4ZIGEN",
  robots: "index, follow",
  alternates: {
    canonical: "https://geohp.vercel.app"
  },
  openGraph: {
    title: "Geocussion - 砂場楽器 | 砂を押し固めて音を奏でる変身可能な楽器",
    description: "Geocussion（ジオカッション）は砂場楽器として、砂を押し固めて形を作り、形に応じた音を奏でる変身可能な楽器です。カメラが地形と人間の手を検出し、3次元データとして処理して音を生成します。",
    type: "website",
    locale: "ja_JP",
    siteName: "Geocussion",
    images: [
      {
        url: "/geophoto.jpeg",
        width: 600,
        height: 400,
        alt: "Geocussion 砂場楽器 - 砂を押し固めて形を作り、音を奏でる楽器"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geocussion - 砂場楽器 | 砂を押し固めて音を奏でる変身可能な楽器",
    description: "Geocussion（ジオカッション）は砂場楽器として、砂を押し固めて形を作り、形に応じた音を奏でる変身可能な楽器です。",
    images: ["/geophoto.jpeg"],
  },
  other: {
    "geo.region": "JP",
    "geo.placename": "Tokyo",
    "geo.position": "35.6762;139.6503",
    "ICBM": "35.6762, 139.6503"
  }
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
