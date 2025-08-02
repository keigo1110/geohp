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
  { name: '岡空来', portfolioUrl: 'https://sites.google.com/view/soraoka/' },
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

// 画像配列を追加
const IMAGES = [
  '/geophoto.jpeg',
  '/geophoto2.JPG'
]

type Handprint = {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  isRightHand: boolean;
};

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
  const [audio, setAudio] = useState<HTMLAudioElement[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [handprints, setHandprints] = useState<Handprint[]>([])
  const [handprintId, setHandprintId] = useState(0)
  const [isRightHand, setIsRightHand] = useState(true)

  useEffect(() => {
    const audioElements = SOUND_URLS.map(url => {
      const audio = new Audio(url)
      audio.preload = 'auto'
      return audio
    })
    setAudio(audioElements)
  }, [])

  // 画像の自動切り替え機能
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % IMAGES.length)
    }, 10000) // 10秒ごとに切り替え

    return () => clearInterval(interval)
  }, [])

  // 手形の自動削除
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setHandprints(prev => prev.filter(handprint => now - handprint.timestamp < 3000)) // 3秒で削除
    }, 100)

    return () => clearInterval(interval)
  }, [])



  const playRandomSound = (event: React.MouseEvent) => {
    if (audio.length > 0) {
      const randomIndex = Math.floor(Math.random() * audio.length)
      audio[randomIndex].currentTime = 0
      audio[randomIndex].play()
    }

    // 手形を追加
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

        const newHandprint: Handprint = {
      id: handprintId,
      x,
      y,
      timestamp: Date.now(),
      isRightHand: isRightHand
    }

    setHandprints(prev => [...prev, newHandprint])
    setHandprintId(prev => prev + 1)
    setIsRightHand(prev => !prev) // 次回は反対の手
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#f5e6d3] via-[#f0dcc0] to-[#e6d2b5] flex flex-col relative"
      onClick={playRandomSound}
      style={{ cursor: 'pointer' }}
    >
      {/* 砂テクスチャのオーバーレイ */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="w-full h-full opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.1) 1px, transparent 1px),
              radial-gradient(circle at 80% 40%, rgba(139, 69, 19, 0.15) 0.5px, transparent 0.5px),
              radial-gradient(circle at 40% 80%, rgba(139, 69, 19, 0.12) 0.8px, transparent 0.8px),
              radial-gradient(circle at 60% 60%, rgba(139, 69, 19, 0.08) 0.3px, transparent 0.3px),
              radial-gradient(circle at 10% 70%, rgba(139, 69, 19, 0.1) 0.6px, transparent 0.6px),
              radial-gradient(circle at 90% 10%, rgba(139, 69, 19, 0.13) 0.4px, transparent 0.4px)
            `,
            backgroundSize: '100px 100px, 80px 80px, 120px 120px, 60px 60px, 90px 90px, 70px 70px',
            animation: 'sandDrift 20s ease-in-out infinite'
          }}
        />
      </div>

      {/* 手形アニメーション */}
      {handprints.map((handprint) => {
        const age = Date.now() - handprint.timestamp
        const opacity = Math.max(0, 1 - age / 3000) // 3秒で完全に透明

        return (
          <div
            key={handprint.id}
            className="absolute pointer-events-none z-10"
                                      style={{
                left: handprint.x - 40,
                top: handprint.y - 40,
                opacity,
                transform: `scale(${0.8 + opacity * 0.2})`,
                transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
              }}
          >
                                                                             <img
                src={handprint.isRightHand ? "/hand-right.png" : "/hand-left.png"}
                alt={handprint.isRightHand ? "右手の手形" : "左手の手形"}
                width="80"
                height="80"
                className="drop-shadow-lg"
                style={{
                  filter: 'brightness(0) contrast(1.2)',
                  opacity: 0.7
                }}
              />
          </div>
        )
      })}

      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-[#e6d2b5] relative" role="banner">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-3xl font-bold bg-gradient-to-r from-[#8b4513] to-[#d35400] bg-clip-text text-transparent hover:from-[#d35400] hover:to-[#8b4513] transition-all duration-300"
            aria-label="Geocussionトップページへ"
          >
            Geocussion
          </Link>
          <Link
            href="https://4zigenhp.vercel.app/"
            className="text-sm text-[#8b4513] hover:text-[#6d3410] transition-colors border-2 border-[#c19a6b] px-4 py-2 rounded-full bg-white/50 hover:bg-[#e6d2b5] flex items-center group shadow-md hover:shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="4ZIGENサイトへ移動"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="mr-2 font-medium">4ZIGEN</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
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

      <main className="flex-grow" role="main">
        {/* ヒーローセクション */}
        <section className="relative py-20 px-6 overflow-hidden" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 id="hero-heading" className="text-5xl lg:text-6xl font-bold text-[#8b4513] leading-tight">
                    砂場は音を奏でる
                    <span className="block text-[#d35400]">オーケストラ</span>
                  </h1>
                  <p className="text-xl text-[#5e3a1a] leading-relaxed">
                    想像を形にして、創造を弾きだそう。<br />
                    砂を押し固めて形を作り、形に応じた音を奏でる変身可能な楽器。
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-gradient-to-r from-[#d35400] to-[#8b4513] text-white hover:from-[#8b4513] hover:to-[#d35400] transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    デモを見る
                  </Button>
                  <Button
                    className="bg-white/80 text-[#8b4513] hover:bg-white border-2 border-[#8b4513] transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById('concept')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    仕組みを知る
                  </Button>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-[#5e3a1a] mb-2">制作者</p>
                  <TeamMembers />
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img
                    src={`${IMAGES[currentImageIndex]}?height=400&width=600`}
                    alt={`Geocussion 砂場楽器 - ${currentImageIndex === 0 ? '東京大学制作展2024での展示風景' : 'EXPO 2025での展示風景'} - 砂を押し固めて形を作り、音を奏でる革新的な楽器`}
                    className="w-full h-auto transition-opacity duration-1000"
                  loading="eager"
                  width={600}
                  height={400}
                  fetchPriority="high"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                                 <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                   <p className="text-sm font-medium text-[#8b4513]">
                     {currentImageIndex === 0 ? '東京大学制作展2024' : 'EXPO 2025'}
                   </p>
                 </div>
              </div>
            </div>
          </div>
        </section>

                {/* デモ動画 */}
        <section id="demo" className="py-20 px-6 bg-white/50" aria-labelledby="demo-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="demo-heading" className="text-4xl font-bold text-[#8b4513] mb-4">デモ動画</h2>
              <p className="text-xl text-[#5e3a1a] max-w-3xl mx-auto">
                実際のGeocussionの動作をご覧ください。砂を触れることで音が奏でられる様子をお楽しみください。
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={YOUTUBE_EMBED_URL}
                  title="Geocussion デモ動画 - 砂を使った動的な楽器の実演"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* 作品コンセプト */}
        <section className="py-20 px-6" aria-labelledby="concept-heading">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-2 border-[#e6d2b5]">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 id="concept-heading" className="text-3xl font-bold text-[#8b4513] mb-6">作品コンセプト</h2>
                </div>

                <div className="p-6 bg-[#f9f2e7] rounded-xl border border-[#e6d2b5]">
                  <div className="space-y-6 text-[#5e3a1a] leading-relaxed">
                    <p className="text-lg leading-relaxed">
                      砂に触れ、感じ、押し固める。<br />
                      それだけで世界にひとつの楽器がその場に立ち現れる。
                    </p>
                    <p className="leading-relaxed">
                      かつて古代の都市設計者たちが、粘土や小石を手で感じ取り、壮大な都市の景観を構想したように、手の感覚を頼りに音を生み出す。
                    </p>
                    <p className="leading-relaxed">
                      デジタルが覆い尽くす現代で忘れていた身体の記憶や感覚を呼び覚まし、想いはイメージとして結ばれ、形として創りだす。
                    </p>
                    <p className="text-lg font-medium leading-relaxed">
                      ここに形が音となり具現化された「奏象」が弾け飛ぶ。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 作品の仕組み説明 */}
        <section id="concept" className="py-20 px-6 bg-white/50" aria-labelledby="mechanism-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="mechanism-heading" className="text-4xl font-bold text-[#8b4513] mb-4">仕組み</h2>
              <p className="text-xl text-[#5e3a1a] max-w-3xl mx-auto">
                カメラが地形と人間の手を検出し3次元データとして処理<br></br>
                地形と手が接触した位置や高さに基づいて音を生成
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                                      <img
                      src="/system.png"
                      alt="Geocussion 砂場楽器システム構成図 - カメラによる地形と手の検出から3次元データ処理、音生成までの技術的流れ"
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                    />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-[#8b4513]">システム構成</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-[#d35400] rounded-full"></div>
                      <span className="text-[#5e3a1a]">撮影　　 - 上部のカメラで地形と手を撮影</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-[#d35400] rounded-full"></div>
                      <span className="text-[#5e3a1a]">手検知　 - 人間の手の位置と動きの検知</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-[#d35400] rounded-full"></div>
                      <span className="text-[#5e3a1a]">地形保存 - 撮影された地形を保存</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-[#d35400] rounded-full"></div>
                      <span className="text-[#5e3a1a]">接触検出 - 砂と手の接触検出</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-[#d35400] rounded-full"></div>
                      <span className="text-[#5e3a1a]">音生成　 - 砂の形状に基づく音の生成</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f9f2e7] p-6 rounded-xl border border-[#e6d2b5]">
                  <h4 className="text-lg font-semibold text-[#8b4513] mb-3">3次元地形データ保存</h4>
                  <p className="text-[#5e3a1a] leading-relaxed">
                    撮影された3次元地形データは手を含まないように処理され、砂場の変形に応じて逐次更新することで仮想的な地形データは最新地形に追従します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* バージョン比較 */}
        <section className="py-20 px-6" aria-labelledby="exhibition-heading">
          <div className="max-w-7xl mx-auto">
                           <div className="text-center mb-16">
                 <h2 id="exhibition-heading" className="text-4xl font-bold text-[#8b4513] mb-4">展示</h2>
               </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#e6d2b5] hover:border-[#c19a6b]">
                                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#8b4513] mb-2">東京大学制作展2024</h3>
                  </div>
                  <div className="mb-6">
                    <img
                      src="/geophoto.jpeg?height=300&width=450"
                      alt="Geocussion 砂場楽器 - 東京大学制作展2024での初期プロトタイプ展示風景"
                      className="w-full h-auto rounded-lg shadow-md"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#d35400] rounded-full"></div>
                      <span className="text-[#5e3a1a] text-sm">Intel RealSense Depth Camera D435
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#d35400] rounded-full"></div>
                      <span className="text-[#5e3a1a] text-sm">砂場枠自作（600mm×600mm）</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#d35400] rounded-full"></div>
                      <span className="text-[#5e3a1a] text-sm">どこかの白砂</span>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <a
                      href="https://2024-main.pages.dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#8b4513] hover:text-[#d35400] transition-colors font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>展示詳細を見る</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2 transform transition-transform group-hover:translate-x-1"
                      >
                        <path d="M5 12h14"/>
                        <path d="m12 5 7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#e6d2b5] hover:border-[#c19a6b]">
                                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#8b4513] mb-2">EXPO 2025</h3>
                  </div>
                  <div className="mb-6">
                    <img
                      src="/geophoto2.JPG?height=300&width=450"
                      alt="Geocussion 砂場楽器 - EXPO 2025での改良版展示風景"
                      className="w-full h-auto rounded-lg shadow-md"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#d35400] rounded-full"></div>
                      <span className="text-[#5e3a1a] text-sm">Orbbec Gemini 335L</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#d35400] rounded-full"></div>
                      <span className="text-[#5e3a1a] text-sm">砂場枠自作（900mm×900mm）</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#d35400] rounded-full"></div>
                      <span className="text-[#5e3a1a] text-sm">鳥取砂丘の砂（提供：関西パビリオン鳥取県ゾーン）</span>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <a
                      href="https://www.spark-awards.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#8b4513] hover:text-[#d35400] transition-colors font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>展示詳細を見る</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2 transform transition-transform group-hover:translate-x-1"
                      >
                        <path d="M5 12h14"/>
                        <path d="m12 5 7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>



        {/* 関連リンク */}
        <section className="py-20 px-6 bg-white/50" aria-labelledby="links-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="links-heading" className="text-4xl font-bold text-[#8b4513] mb-4">関連リンク</h2>
              </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#e6d2b5] hover:border-[#c19a6b]">
                <CardContent className="p-8">
                  <a
                    href="https://protopedia.net/prototype/6407"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start space-x-6 group"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#d35400] to-[#8b4513] rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#8b4513] group-hover:text-[#d35400] transition-colors mb-3">
                        Protopedia - 技術詳細とプロジェクト解説
                      </h3>
                      <p className="text-lg text-[#5e3a1a] mb-4 leading-relaxed">
                        砂を使った楽器Geocussionのシステム構成、開発素材、技術仕様の詳細解説を掲載しています。
                        プロジェクトの背景から実装技術まで、包括的な情報をご覧いただけます。
                      </p>
                      <div className="flex items-center text-sm text-[#8b4513]">
                        <span className="bg-[#f9f2e7] px-3 py-1 rounded-full">2024年11月公開</span>
                        <span className="ml-3">最新情報はリンク先でご確認ください</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 self-center">
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
                        className="text-[#8b4513] group-hover:text-[#d35400] transform group-hover:translate-x-2 transition-all"
                      >
                        <path d="M5 12h14"/>
                        <path d="m12 5 7 7-7 7"/>
                      </svg>
                    </div>
                  </a>
                </CardContent>
              </Card>
                </div>
              </div>
        </section>

        {/* JSON-LDによる構造化データの追加 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Geocussion",
              "alternateName": "ジオカッション",
              "description": "Geocussion（ジオカッション）は砂場楽器として、砂を押し固めて形を作り、形に応じた音を奏でる変身可能な楽器です。カメラが地形と人間の手を検出し、3次元データとして処理して音を生成します。",
              "category": "楽器",
              "keywords": "砂場楽器,砂の楽器,砂楽器,インタラクティブ楽器,実験的音楽,サウンドアート,3D楽器,地形楽器,砂場オーケストラ",
              "brand": {
                "@type": "Brand",
                "name": "4ZIGEN"
              },
              "manufacturer": {
                "@type": "Organization",
                "name": "4ZIGEN",
                "url": "https://4zigenhp.vercel.app/"
              },
              "creator": [
                {
                  "@type": "Person",
                  "name": "岡空来",
                  "url": "https://sites.google.com/view/soraoka/"
                },
                {
                  "@type": "Person",
                  "name": "金澤政宜",
                  "url": "https://kanassi.info/"
                },
                {
                  "@type": "Person",
                  "name": "中田裕紀",
                  "url": "https://yuki-nakata.org/"
                },
                {
                  "@type": "Person",
                  "name": "南田桂吾",
                  "url": "https://keigominamida.com/"
                }
              ],
              "image": [
                {
                  "@type": "ImageObject",
                  "url": "/geophoto.jpeg",
                  "width": 600,
                  "height": 400,
                  "caption": "Geocussion 砂場楽器 - 東京大学制作展2024"
                },
                {
                  "@type": "ImageObject",
                  "url": "/geophoto2.JPG",
                  "width": 600,
                  "height": 400,
                  "caption": "Geocussion 砂場楽器 - EXPO 2025"
                }
              ],
              "video": {
                "@type": "VideoObject",
                "name": "Geocussion デモ動画",
                "description": "実際のGeocussionの動作をご覧ください。砂を触れることで音が奏でられる様子をお楽しみください。",
                "thumbnailUrl": "/geophoto.jpeg",
                "uploadDate": "2024-11-01",
                "url": "https://www.youtube.com/watch?v=zGwRp0AT-us"
              },
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "price": "0",
                "priceCurrency": "JPY"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "50"
              },
              "additionalProperty": [
                {
                  "@type": "PropertyValue",
                  "name": "展示場所",
                  "value": "東京大学制作展2024, EXPO 2025"
                },
                {
                  "@type": "PropertyValue",
                  "name": "技術仕様",
                  "value": "Intel RealSense Depth Camera D435, Orbbec Gemini 335L"
                },
                {
                  "@type": "PropertyValue",
                  "name": "砂場サイズ",
                  "value": "600mm×600mm, 900mm×900mm"
                }
              ]
            })
          }}
        />
      </main>

      {/* フッター */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-[#e6d2b5] py-8" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-[#8b4513] mb-4 font-medium">
            &copy; {new Date().getFullYear()} Geocussion - {TEAM_NAME}
          </p>
            <div className="flex justify-center space-x-8">
            <a
              href="https://4zigenhp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
                className="text-[#8b4513] hover:text-[#d35400] transition-colors font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              4ZIGEN
            </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}