import {BlockPage} from "@/components/page1"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Geocussion - 砂場楽器 | 砂を押し固めて音を奏でる変身可能な楽器 | 4ZIGEN",
  description: "Geocussion（ジオカッション）は砂場楽器として、砂を押し固めて形を作り、形に応じた音を奏でる変身可能な楽器です。カメラが地形と人間の手を検出し、3次元データとして処理して音を生成します。東京大学制作展2024、EXPO 2025で展示。",
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
    "東京大学制作展2024",
    "EXPO 2025",
    "鳥取砂丘",
    "砂の音"
  ],
  openGraph: {
    title: "Geocussion - 砂場楽器 | 砂を押し固めて音を奏でる変身可能な楽器",
    description: "Geocussion（ジオカッション）は砂場楽器として、砂を押し固めて形を作り、形に応じた音を奏でる変身可能な楽器です。カメラが地形と人間の手を検出し、3次元データとして処理して音を生成します。",
    images: [
      {
        url: "/geophoto.jpeg",
        width: 600,
        height: 400,
        alt: "Geocussion 砂場楽器 - 砂を押し固めて形を作り、音を奏でる楽器"
      }
    ],
  },
};

export default function Home() {
  return (
    <BlockPage/>
  );
}