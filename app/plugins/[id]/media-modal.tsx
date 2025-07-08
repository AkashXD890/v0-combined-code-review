"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ScreenshotData {
  url: string
  title?: string
  description?: string
}

interface MediaModalProps {
  screenshots: (string | ScreenshotData)[]
  initialIndex: number
  onClose: () => void
}

export default function MediaModal({ screenshots, initialIndex, onClose }: MediaModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose()
    if (e.key === "ArrowLeft") handlePrevious()
    if (e.key === "ArrowRight") handleNext()
  }

  // Normalize screenshot data to handle both string URLs and screenshot objects
  const normalizeScreenshot = (screenshot: string | ScreenshotData): ScreenshotData => {
    if (typeof screenshot === "string") {
      return {
        url: screenshot,
        title: `Screenshot ${currentIndex + 1}`,
        description: "Plugin interface and features",
      }
    }
    return screenshot
  }

  const currentScreenshot = normalizeScreenshot(screenshots[currentIndex])

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="max-w-6xl w-full max-h-[95vh] relative flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header with title */}
        <div className="text-center mb-4 px-4">
          <h3 className="text-2xl font-bold text-white mb-2">{currentScreenshot.title}</h3>
          <p className="text-slate-300 text-lg">{currentScreenshot.description}</p>
        </div>

        {/* Image container */}
        <div className="relative flex-1 flex items-center justify-center">
          <img
            src={currentScreenshot.url || "/placeholder.svg"}
            alt={currentScreenshot.title || `Screenshot ${currentIndex + 1}`}
            className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl"
          />

          {screenshots.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full w-12 h-12"
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full w-12 h-12"
                onClick={handleNext}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}
        </div>

        {/* Footer with navigation and additional info */}
        <div className="mt-4 text-center">
          {screenshots.length > 1 && (
            <div className="flex justify-center gap-2 mb-3">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-purple-400" : "bg-slate-600 hover:bg-slate-500"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}

          <div className="text-slate-400 text-sm">
            {currentIndex + 1} of {screenshots.length} screenshots
          </div>
        </div>

        {/* Close button */}
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 text-white hover:bg-black/70 rounded-full w-10 h-10"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
