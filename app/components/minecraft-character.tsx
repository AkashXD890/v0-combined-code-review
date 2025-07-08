"use client"

import Image from "next/image"
import { useState } from "react"

export default function MinecraftCharacter() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative z-10 cursor-pointer transition-transform duration-300 ${
          isHovered ? "scale-105 rotate-2" : "scale-100 rotate-0"
        }`}
      >
        <Image
          src="/images/mlgg.png"
          alt="Minecraft Character - Yaddu's Network Mascot"
          width={300}
          height={400}
          className="drop-shadow-2xl"
        />
      </div>
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-black/20 rounded-full blur-md -z-10"></div>
    </div>
  )
}
