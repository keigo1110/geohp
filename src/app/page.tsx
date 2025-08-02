import {BlockPage} from "@/components/page1"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Geocussion - 砂を使った革新的な楽器 | 4ZIGEN",
  description: "Geocussionは砂を叩き押し固めてオブジェクトを作り出し、形状を変えることで異なる音色を奏でられる変身可能な楽器です。4ZIGENチームによる実験的サウンドプロジェクト。",
};

export default function Home() {
  return (
    <BlockPage/>
  );
}