'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const TEAM_NAME = "4ZIGEN"
const TEAM_MEMBERS = [
  '岡空来',
  '金澤政宜',
  '中田裕紀',
  '南田桂吾'
] as const

const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/zGwRp0AT-us?si=xtdmAa48igihnpdG"

// メンバー表示用の別コンポーネント
const TeamMembers = () => {
  const [shuffledMembers, setShuffledMembers] = useState<string[]>([])

  useEffect(() => {
    const shuffleArray = (array: readonly string[]) => {
      const newArray = [...array]
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
      }
      return newArray
    }

    setShuffledMembers(shuffleArray(TEAM_MEMBERS))
  }, [])

  // 初期レンダリング時は空を返す
  if (shuffledMembers.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-4 text-sm">
      {shuffledMembers.map((member, index) => (
        <span key={`member-${index}`} className="after:content-['/'] last:after:content-none after:ml-4">
          {member}
        </span>
      ))}
    </div>
  )
}

export function BlockPage() {
  const [showConcept, setShowConcept] = useState(false)

  const toggleConcept = () => {
    setShowConcept((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-[#f5e6d3] flex flex-col">
      <header className="bg-[#e6d2b5] shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-[#8b4513] hover:text-[#6d3410] transition-colors"
          >
            Geocussion
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 space-y-8">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-6">
              <img
                src="/geophoto.jpeg?height=400&width=600"
                alt="砂を使った楽器 Geocussion の写真"
                className="w-full h-auto rounded-md shadow-md"
                loading="eager"
                width={600}
                height={400}
              />
            </div>
            <h2 className="text-2xl font-semibold text-[#8b4513] mb-2">Geocussion</h2>
            <div className="mb-4 text-[#5e3a1a]">
              <h3 className="text-sm font-medium mb-2">{TEAM_NAME}</h3>
              <TeamMembers />
            </div>
            <p className="text-[#5e3a1a] mb-4">
              砂を叩き押し固めてオブジェクトを作り出し、音を大きく鳴らしたいならば大きなオブジェクトを作り、形を変えれば異なる音を鳴らせる砂場上の楽器。
            </p>
            <Button
              className="bg-[#d2b48c] text-[#8b4513] hover:bg-[#c19a6b] transition-colors duration-200"
              onClick={toggleConcept}
              aria-expanded={showConcept}
            >
              {showConcept ? '概要を閉じる' : '詳細を見る'}
            </Button>

            {showConcept && (
              <div className="mt-4 p-4 bg-[#f9f2e7] text-[#5e3a1a] rounded-md">
                <p className="whitespace-pre-wrap leading-relaxed">
                  子どもの頃、砂場遊びをしたことはないだろうか。思い返すと、自分で押し固め、叩いて作った山は昨日、今日、明日で全て異なる形をしている。一方で、楽器を吹いたり、叩いたりと楽器遊びもしたことがあるだろう。しかし、トランペットからトロンボーンの音が鳴らないように、楽器は一度形を作ると、その音しか鳴らない。

                  そこで、私たちは砂場の形状の柔軟性、楽器の音の多様性を組み合わせた、Geocussionを作った。Geocussionでは、山を押し固めて形を作るように、欲しい音を作ることができる。この楽器は、必要な時に必要な音を作り出すことができる。
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#8b4513] mb-4">デモ動画</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[480px] rounded-lg shadow-md"
                src={YOUTUBE_EMBED_URL}
                title="Geocussion デモ動画"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-[#e6d2b5] text-[#8b4513] py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Geocussion
          </p>
        </div>
      </footer>
    </div>
  )
}