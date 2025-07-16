"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/../firebase"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      if (result.user) {
        localStorage.setItem("isAdmin", "true")
        router.push("/admin/dashboard")
      }
    } catch (err) {
      console.error("Login gagal:", err)
      setError("Email atau password salah")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-800 dark:text-gray-100 transition-colors duration-300"
      style={{ backgroundImage: "url('/BgMasjid.jpeg')" }}
    >
      <div className="min-h-screen bg-white/30 dark:bg-black/30 backdrop-blur-md flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-8">

          {/* Tombol kembali ke home */}
          <button
            onClick={() => router.push('/')}
            className="mb-4 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 hover:underline"
          >
            ← Kembali ke Beranda
          </button>

          <h1 className="text-2xl font-bold text-center mb-6 text-green-700 dark:text-green-400">
            Admin Login
          </h1>

          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email Admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium shadow disabled:opacity-50"
            >
              {loading ? "⏳ Login..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
