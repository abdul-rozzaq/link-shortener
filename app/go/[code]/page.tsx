"use client"
import { LinkIcon, Loader2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BASE_URL } from "@/config/config"


export default function RedirectPage({ params }: { params: { code: string } }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const redirectToUrl = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/${params.code}`)

        if (response.status === 404) {
          setError("not-found")
          return
        }

        if (response.status === 400) {
          setError("expired")
          return
        }

        const { originalLink } = await response.json()

        window.location.href = originalLink
      } catch (err) {
        // setError("Failed to redirect")
      }
    }

    redirectToUrl()
  }, [params.code, router])



  if (error == "not-found") {
    return <NotFoundPage />
  } else if (error == "expired") {
    return <ExpiredPage />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      {error === "not-found" ? (
        <div className="text-center">
          <p className="text-xl font-bold mb-2">Redirect Error</p>
          <p className="text-gray-400">{error}</p>
        </div>
      ) : (
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Redirecting...</p>
        </div>
      )}
    </div>
  )
}



function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="pt-12 pb-6 text-center">
        <Link href="/" className="text-2xl font-bold flex items-center justify-center gap-2">
          <LinkIcon className="h-6 w-6" />
          ShortLink
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-4">
          <h2 className="text-3xl font-bold">404</h2>
          <p className="text-gray-400">The link you're looking for doesn't exist.</p>
          <Button asChild className="mt-4 bg-white text-black hover:bg-gray-200 transition-colors">
            <Link href="/">Create a new link</Link>
          </Button>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">Built with FastAPI + Tortoise ORM</footer>
    </div>
  )
}

function ExpiredPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="pt-12 pb-6 text-center">
        <Link href="/" className="text-2xl font-bold flex items-center justify-center gap-2">
          <LinkIcon className="h-6 w-6" />
          ShortLink
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-4">
          <Clock className="h-16 w-16 mx-auto text-gray-400" />
          <h2 className="text-2xl font-bold">Link Expired</h2>
          <p className="text-gray-400">This shortened link has expired and is no longer available.</p>
          <Button asChild className="mt-4 bg-white text-black hover:bg-gray-200 transition-colors">
            <Link href="/">Create a new link</Link>
          </Button>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">Built with FastAPI + Tortoise ORM</footer>
    </div>
  )
}
