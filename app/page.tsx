"use client"

import type React from "react"

import { useState } from "react"
import { Copy, LinkIcon, Loader2, MousePointerClick, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { BASE_URL } from "@/config/config"

type ErrorType = "not-found" | "expired" | "general" | null


export default function LinkShortener() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [clicks, setClicks] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [errorType, setErrorType] = useState<ErrorType>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [copied, setCopied] = useState(false)
  const [showError, setShowError] = useState(false)
  const [clickLimit, setClickLimit] = useState<string>("-1")
  const [customClickLimit, setCustomClickLimit] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) {
      setErrorType("general")
      setErrorMessage("Please enter a URL")
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    setErrorType(null)
    setErrorMessage("")
    setShortUrl("")
    setClicks(0)
    setIsLoading(true)

    try {
      let maxClicks = null
      if (clickLimit === "custom" && customClickLimit) {
        maxClicks = Number.parseInt(customClickLimit, 10)
      } else if (clickLimit !== "-1") {
        maxClicks = Number.parseInt(clickLimit, 10)
      }
      console.log("Request");

      const response = await fetch(`${BASE_URL}/api/link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: url, clickCount: maxClicks, }),
      })
      console.log("Response");

      if (response.status === 404) {
        setErrorType("not-found")
        setIsLoading(false)
        return
      }

      const data = await response.json()

      console.log(data);

      setShortUrl(`${window.location.origin}/go/${data.link.code}`);
      setClicks(data.clicks || 0)
    } catch (err) {
      setErrorType("general")
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred")
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setErrorType("general")
      setErrorMessage("Failed to copy to clipboard")
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="pt-12 pb-6 text-center">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <LinkIcon className="h-6 w-6" />
          ShortLink
        </h1>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="url"
                placeholder="Paste your long URL here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-white focus:ring-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="click-limit" className="text-sm text-gray-400">
                Click limit (how many times the link can be used)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={clickLimit === "1" ? "default" : "outline"}
                  className={clickLimit === "1" ? "bg-white text-black" : "bg-gray-900 border-gray-700 text-white"}
                  onClick={() => setClickLimit("1")}
                >
                  1 click
                </Button>
                <Button
                  type="button"
                  variant={clickLimit === "10" ? "default" : "outline"}
                  className={clickLimit === "10" ? "bg-white text-black" : "bg-gray-900 border-gray-700 text-white"}
                  onClick={() => setClickLimit("10")}
                >
                  10 clicks
                </Button>
                <Button
                  type="button"
                  variant={clickLimit === "30" ? "default" : "outline"}
                  className={clickLimit === "30" ? "bg-white text-black" : "bg-gray-900 border-gray-700 text-white"}
                  onClick={() => setClickLimit("30")}
                >
                  30 clicks
                </Button>
                <Button
                  type="button"
                  variant={clickLimit === "50" ? "default" : "outline"}
                  className={clickLimit === "50" ? "bg-white text-black" : "bg-gray-900 border-gray-700 text-white"}
                  onClick={() => setClickLimit("50")}
                >
                  50 clicks
                </Button>
                <Button
                  type="button"
                  variant={clickLimit === "100" ? "default" : "outline"}
                  className={clickLimit === "100" ? "bg-white text-black" : "bg-gray-900 border-gray-700 text-white"}
                  onClick={() => setClickLimit("100")}
                >
                  100 clicks
                </Button>
                <Button
                  type="button"
                  variant={clickLimit === "-1" ? "default" : "outline"}
                  className={
                    clickLimit === "-1" ? "bg-white text-black" : "bg-gray-900 border-gray-700 text-white"
                  }
                  onClick={() => setClickLimit("-1")}
                >
                  Unlimited
                </Button>
              </div>
              <Button
                type="button"
                variant={clickLimit === "custom" ? "default" : "outline"}
                className={`w-full mt-2 ${clickLimit === "custom" ? "bg-white text-black" : "bg-gray-900 border-gray-700 text-white"}`}
                onClick={() => setClickLimit("custom")}
              >
                Custom
              </Button>
              {clickLimit === "custom" && (
                <Input
                  type="number"
                  min="1"
                  placeholder="Enter number of clicks"
                  value={customClickLimit}
                  onChange={(e) => setCustomClickLimit(e.target.value)}
                  className="h-12 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-white focus:ring-white transition-all"
                />
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-white text-black hover:bg-gray-200 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Shortening...
                </>
              ) : (
                "Shorten"
              )}
            </Button>
          </form>

          {/* Error Alert */}
          {showError && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-800 rounded-md text-white text-sm animate-fade-in">
              {errorMessage}
            </div>
          )}

          {/* Result Box with Animation */}
          {shortUrl && (
            <div className="mt-8 p-4 bg-gray-900 rounded-md border border-gray-800 animate-fade-in">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-400">Your shortened URL:</p>
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  readOnly
                  value={shortUrl}
                  className="flex-1 bg-transparent border-0 text-white focus:ring-0 p-0 truncate"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-xs transition-colors",
                    copied ? "text-green-500" : "text-white hover:text-gray-300",
                  )}
                >
                  {copied ? (
                    "Copied!"
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">Built with Express + MongoDB</footer>
    </div>
  )
}
