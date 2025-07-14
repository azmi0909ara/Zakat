'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Home() {
  const [dark, setDark] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    AOS.init({ duration: 800 })
  }, [dark])

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-800 dark:text-gray-100 transition-colors duration-300"
      style={{ backgroundImage: "url('/BgMasjid.jpeg')" }}
    >
      {/* STICKY NAVBAR */}
      <header className="sticky top-0 z-50 bg-green-700 text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Zakat Fitrah - Masjid Al-Ikhlas RT01 RW06</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="block md:hidden bg-white text-green-700 p-2 rounded shadow hover:bg-gray-100"
              aria-label="Menu"
            >
              ☰
            </button>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/info" className="hover:underline">Apa itu Zakat?</Link>
              <Link href="/syarat" className="hover:underline">Syarat Zakat</Link>
            </nav>
          </div>
        </div>
        {showMenu && (
          <div className="md:hidden bg-green-600 text-white px-4 py-2">
            <Link href="/info" className="block py-2 hover:underline" onClick={() => setShowMenu(false)}>
              Apa itu Zakat?
            </Link>
            <Link href="/syarat" className="block py-2 hover:underline" onClick={() => setShowMenu(false)}>
              Syarat Zakat
            </Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-lg mt-6"
        data-aos="fade-up"
      >
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">Tunaikan Zakat Fitrah Anda dengan Mudah dan Aman</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Sistem ini memudahkan masyarakat RT01 RW06 dalam membayar zakat fitrah secara online, aman, dan transparan.
          </p>
          <Link href="/form">
            <span className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition">
              Bayar Zakat Sekarang
            </span>
          </Link>
        </div>
        <div className="md:w-1/2">
          <img src="/zakat.jpeg" alt="Ilustrasi Zakat" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </section>

      {/* FITUR */}
      <section
        className="max-w-6xl mx-auto px-4 py-16 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-lg mt-10"
        data-aos="fade-up"
      >
        <h3 className="text-2xl font-semibold text-center mb-10">Fitur Unggulan</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-green-50/80 dark:bg-gray-700 border rounded-lg p-6 shadow" data-aos="fade-up">
            <h4 className="text-xl font-bold mb-2">Input Zakat Online</h4>
            <p className="text-gray-600 dark:text-gray-300">Isi data zakat secara mudah tanpa harus datang ke masjid.</p>
          </div>
          <div className="bg-green-50/80 dark:bg-gray-700 border rounded-lg p-6 shadow" data-aos="fade-up" data-aos-delay="150">
            <h4 className="text-xl font-bold mb-2">Rekap Real-Time</h4>
            <p className="text-gray-600 dark:text-gray-300">Lihat jumlah zakat yang masuk dan distribusinya langsung.</p>
          </div>
          <div className="bg-green-50/80 dark:bg-gray-700 border rounded-lg p-6 shadow" data-aos="fade-up" data-aos-delay="300">
            <h4 className="text-xl font-bold mb-2">Login Admin</h4>
            <p className="text-gray-600 dark:text-gray-300">Petugas dapat login dan kelola data zakat dengan aman.</p>
          </div>
        </div>
        <div className="text-center mt-12" data-aos="zoom-in">
          <Link href="/admin/login">
            <span className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg shadow transition">
              Masuk Admin
            </span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="text-center text-sm text-gray-800 dark:text-gray-400 py-6 mt-10 border-t border-gray-200 dark:border-gray-700"
        data-aos="fade-up"
      >
        &copy; {new Date().getFullYear()} Masjid Al-Ikhlas RT01 RW06
      </footer>
    </div>
  )
}
