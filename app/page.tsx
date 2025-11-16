"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import ElectionDashboard from "@/components/election-dashboard"

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
      <ElectionDashboard />
    </main>
  )
}
