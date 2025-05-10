'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const TEAM_NAME = "4ZIGEN"

type TeamMember = {
  name: string;
  portfolioUrl: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  { name: '岡空来', portfolioUrl: '#' },
  { name: '金澤政宜', portfolioUrl: 'https://kanassi.info/' },
  { name: '中田裕紀', portfolioUrl: 'https://yuki-nakata.org/' },
  { name: '南田桂吾', portfolioUrl: 'https://keigominamida.com/' }
]

const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/zGwRp0AT-us?si=xtdmAa48igihnpdG"

// 効果音のURLリスト
const SOUND_URLS = [
  '/sounds/A00.mp3',
  '/sounds/A01.mp3',
  '/sounds/A02.mp3',
  '/sounds/A03.mp3',
  '/sounds/A04.mp3',
  '/sounds/A05.mp3',
  '/sounds/A06.mp3',
  '/sounds/A07.mp3',
  '/sounds/A08.mp3'
]

const TeamMembers = () => {
  const [shuffledMembers, setShuffledMembers] = useState<typeof TEAM_MEMBERS[number][]>([])

  useEffect(() => {
    const shuffleArray = (array: typeof TEAM_MEMBERS) => {
      const newArray = [...array]
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
      }
      return newArray
    }

    setShuffledMembers(shuffleArray(TEAM_MEMBERS))
  }, [])

  if (shuffledMembers.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-4 text-sm">
      {shuffledMembers.map((member, index) => (
        <span key={`member-${index}`} className="after:content-['/'] last:after:content-none after:ml-4">
          <a
            href={member.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5e3a1a] hover:text-[#d35400] transition-colors duration-200 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            {member.name}
          </a>
        </span>
      ))}
    </div>
  )
}

export function BlockPage() {
  const [showConcept, setShowConcept] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement[]>([])

  useEffect(() => {
    const audioElements = SOUND_URLS.map(url => {
      const audio = new Audio(url)
      audio.preload = 'auto'
      return audio
    })
    setAudio(audioElements)
  }, [])

  const toggleConcept = () => {
    setShowConcept((prev) => !prev)
  }

  const playRandomSound = () => {
    if (audio.length > 0) {
      const randomIndex = Math.floor(Math.random() * audio.length)
      audio[randomIndex].currentTime = 0
      audio[randomIndex].play()
    }
  }

  return (
    <div className="min-h-screen bg-[#f5e6d3] flex flex-col" onClick={playRandomSound} style={{ cursor: 'pointer' }}>
      <header className="bg-[#e6d2b5] shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-[#8b4513] hover:text-[#6d3410] transition-colors"
            aria-label="Geocussionトップページへ"
          >
            Geocussion
          </Link>
          <Link
            href="https://4zigenhp.vercel.app/"
            className="text-sm text-[#8b4513] hover:text-[#6d3410] transition-colors border border-[#c19a6b] px-3 py-1.5 rounded-md bg-[#f5e6d3] hover:bg-[#e6d2b5] flex items-center group"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="4ZIGENサイトへ移動"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="mr-1">4ZIGEN</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transform transition-transform group-hover:translate-x-0.5"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 space-y-8">
        <section aria-labelledby="geocussion-overview">
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-6">
                <img
                  src="/geophoto.jpeg?height=400&width=600"
                  alt="Geocussion - 砂を押し固めて形を作り、様々な音を奏でる楽器の写真"
                  className="w-full h-auto rounded-md shadow-md"
                  loading="eager"
                  width={600}
                  height={400}
                />
              </div>
              <h1 id="geocussion-overview" className="text-2xl font-semibold text-[#8b4513] mb-2">Geocussion</h1>
              <div className="mb-4 text-[#5e3a1a]">
                <h2 className="text-sm font-medium mb-2">{TEAM_NAME}</h2>
                <TeamMembers />
              </div>
              <p className="text-[#5e3a1a] mb-4">
                砂を叩き押し固めてオブジェクトを作り出し、音を大きく鳴らしたいならば大きなオブジェクトを作り、形を変えれば異なる音を鳴らせる砂場上の楽器。
              </p>
              <Button
                className="bg-[#d2b48c] text-[#8b4513] hover:bg-[#c19a6b] transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleConcept();
                }}
                aria-expanded={showConcept}
                aria-controls="concept-details"
              >
                {showConcept ? '概要を閉じる' : '詳細を見る'}
              </Button>

              {showConcept && (
                <div id="concept-details" className="mt-4 p-4 bg-[#f9f2e7] text-[#5e3a1a] rounded-md">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    子どもの頃、砂場遊びをしたことはないだろうか。思い返すと、自分で押し固め、叩いて作った山は昨日、今日、明日で全て異なる形をしている。一方で、楽器を吹いたり、叩いたりと楽器遊びもしたことがあるだろう。しかし、トランペットからトロンボーンの音が鳴らないように、楽器は一度形を作ると、その音しか鳴らない。

                    そこで、私たちは砂場の形状の柔軟性、楽器の音の多様性を組み合わせた、Geocussionを作った。Geocussionでは、山を押し固めて形を作るように、欲しい音を作ることができる。この楽器は、必要な時に必要な音を作り出すことができる。
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="demo-video">
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <h2 id="demo-video" className="text-lg font-semibold text-[#8b4513] mb-4">デモ動画</h2>
              <div className="relative w-full pb-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                  src={YOUTUBE_EMBED_URL}
                  title="Geocussion デモ動画 - 砂を使った革新的な楽器の実演"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="related-links">
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <h2 id="related-links" className="text-lg font-semibold text-[#8b4513] mb-4">関連リンク</h2>
              <div className="space-y-4">
                <div className="p-4 bg-[#f9f2e7] rounded-lg border border-[#e6d2b5] hover:border-[#c19a6b] transition-all">
                  <a
                    href="https://protopedia.net/prototype/6407"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start space-x-4 group"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[#f5e6d3] rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#8b4513]"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#8b4513] font-medium group-hover:text-[#d35400] transition-colors">
                        Protopedia - 技術詳細とプロジェクト解説
                      </h3>
                      <p className="text-sm text-[#5e3a1a] mt-1">
                        砂を使った楽器Geocussionのシステム構成、開発素材、技術仕様の詳細解説を掲載しています。
                      </p>
                      <div className="mt-2 flex items-center text-xs text-[#8b4513]">
                        <span>2024年11月公開 - 最新情報はリンク先でご確認ください</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#8b4513] group-hover:text-[#d35400] transform group-hover:translate-x-1 transition-all"
                      >
                        <path d="M5 12h14"/>
                        <path d="m12 5 7 7-7 7"/>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* JSON-LDによる構造化データの追加 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Geocussion",
              "description": "砂を叩き押し固めてオブジェクトを作り出し、音を大きく鳴らしたいならば大きなオブジェクトを作り、形を変えれば異なる音を鳴らせる砂場上の楽器。",
              "brand": {
                "@type": "Brand",
                "name": "4ZIGEN"
              },
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "price": "0",
                "priceCurrency": "JPY"
              }
            })
          }}
        />
      </main>

      <footer className="bg-[#e6d2b5] text-[#8b4513] py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} Geocussion - {TEAM_NAME}
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://4zigenhp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8b4513] hover:text-[#d35400] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              4ZIGEN
            </a>
            <a
              href="https://protopedia.net/prototype/6407"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8b4513] hover:text-[#d35400] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Protopedia
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}