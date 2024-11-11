'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function BlockPage() {
  const [showConcept, setShowConcept] = useState(false)

  const handleButtonClick = () => {
    setShowConcept(!showConcept)
  }

  return (
    <div className="min-h-screen bg-[#f5e6d3] flex flex-col">
      <header className="bg-[#e6d2b5] shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#8b4513]">Geocussion</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-6">
              <img
                src="/geophoto.jpeg?height=400&width=600"
                alt="作品の画像"
                className="w-full h-auto rounded-md shadow-md"
              />
            </div>
            <h2 className="text-2xl font-semibold text-[#8b4513] mb-4">Geocussion</h2>
            <p className="text-[#5e3a1a] mb-4">
              砂を叩き押し固めてオブジェクトを作り出し、音を大きく鳴らしたいならば大きなオブジェクトを作り、形を変えれば異なるを鳴らせる砂場上の楽器。
            </p>
            <Button
              className="bg-[#d2b48c] text-[#8b4513] hover:bg-[#c19a6b]"
              onClick={handleButtonClick}
            >
              詳細を見る
            </Button>

            {showConcept && (
              <div className="mt-4 p-4 bg-[#f9f2e7] text-[#5e3a1a] rounded-md">
                <p>
                子どもの頃、砂場遊びをしたことはないだろうか。思い返すと、自分で押し固め、叩いて作った山は昨日、今日、明日で全て異なる形をしている。一方で、楽器を吹いたり、叩いたりと楽器遊びもしたことがあるだろう。しかし、トランペットからトロンボーンの音が鳴らないように、楽器は一度形を作ると、その音しか鳴らない。
                そこで、私たちは砂場の形状の柔軟性、楽器の音の多様性を組み合わせた、Geocussionを作った。Geocussionでは、山を押し固めて形を作るように、欲しい音を作ることができる。この楽器は、必要な時に必要な音を作り出すことができる。
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="bg-[#e6d2b5] text-[#8b4513] py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Geocussion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}