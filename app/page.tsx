"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import ElectionCountdown from "@/components/election-countdown"

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
      <ElectionCountdown />
    </main>
  )
}
