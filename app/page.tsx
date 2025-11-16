"use client"

import { useEffect } from "react"
import Link from "next/link"
import Lenis from "@studio-freight/lenis"
import ElectionCountdown from "@/components/election-countdown"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main>
      {/* Dashboard Banner */}
      <div className="fixed top-4 right-4 z-40 md:top-6 md:right-6">
        <Link href="/dashboard">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard Electoral</span>
          </Button>
        </Link>
      </div>

      <ElectionCountdown />
    </main>
  )
}
