'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function BlockPage() {
  return (
    <div className="min-h-screen bg-[#f5e6d3] flex flex-col">
      <header className="bg-[#e6d2b5] shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#8b4513]">私の作品集</h1>
          <nav>
            <Button variant="ghost" className="text-[#8b4513]">ホーム</Button>
            <Button variant="ghost" className="text-[#8b4513]">about</Button>
            <Button variant="ghost" className="text-[#8b4513]">お問い合わせ</Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-6">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="作品の画像"
                className="w-full h-auto rounded-md shadow-md"
              />
            </div>
            <h2 className="text-2xl font-semibold text-[#8b4513] mb-4">作品タイトル</h2>
            <p className="text-[#5e3a1a] mb-4">
              ここに作品の説明文を入れます。この作品がどのような思いで作られたのか、
              どのような技法を使用したのか、などを記述します。観る人の心に響くような
              言葉で表現することが大切です。
            </p>
            <Button className="bg-[#d2b48c] text-[#8b4513] hover:bg-[#c19a6b]">
              詳細を見る
            </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-[#e6d2b5] text-[#8b4513] py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 私の作品集. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}