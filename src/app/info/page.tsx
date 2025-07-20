'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function ApaItuZakat() {
  const [dark, setDark] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    AOS.init({ duration: 800 })
  }, [dark])

  return (
    <div className="min-h-screen bg-[url('/BgMasjid.jpeg')] bg-cover bg-center bg-fixed text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-green-700 text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Zakat Fitrah - Masjid Al-Ikhlas</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="block md:hidden bg-white text-green-700 p-2 rounded shadow hover:bg-gray-100"
              aria-label="Menu"
            >
              ☰
            </button>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/syarat" className="hover:underline">Syarat Zakat</Link>
              <Link href="/data_zakat" className="hover:underline">Data Zakat</Link>
            </nav>
          </div>
        </div>

        {showMenu && (
          <div className="md:hidden bg-green-600 text-white px-4 py-2">
            <Link href="/" onClick={() => setShowMenu(false)} className="block py-2 hover:underline">Home</Link>
            <Link href="/syarat" onClick={() => setShowMenu(false)} className="block py-2 hover:underline">Syarat Zakat</Link>
            <Link href="/data_zakat" onClick={() => setShowMenu(false)} className="block py-2 hover:underline">Data Zakat</Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-lg my-6" data-aos="fade-up">
        <div className="md:w-1/2" data-aos="fade-right">
          <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-400">
            Apa Itu Zakat Fitrah?
          </h1>
          <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
            Zakat Fitrah adalah kewajiban setiap muslim yang harus ditunaikan menjelang Hari Raya Idul Fitri. Zakat ini berfungsi untuk mensucikan jiwa dan membantu sesama yang membutuhkan.
          </p>
          <p className="mt-4 text-gray-800 dark:text-gray-200">
            Besaran zakat yang dikeluarkan adalah setara dengan <strong>2,5 kg atau 3,5 liter</strong> bahan makanan pokok seperti beras.
          </p>
        </div>
        <div className="md:w-1/2" data-aos="fade-left">
          <img src="/zakat.jpeg" alt="Ilustrasi Zakat" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </section>

      {/* DEFINISI DAN JENIS */}
      <section className="bg-white/20 dark:bg-black/30 backdrop-blur-md py-16 px-4 my-6 rounded-lg" data-aos="fade-up">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Definisi dan Jenis Zakat</h2>
          <p className="mb-4">
            Secara bahasa, <strong>zakat</strong> berarti "tumbuh", "berkembang", "suci", atau "baik". Dalam konteks syariat Islam, zakat adalah sejumlah harta tertentu yang wajib dikeluarkan oleh seorang Muslim kepada golongan yang berhak menerimanya.
          </p>
          <p className="mb-4">
            Zakat memiliki peran penting sebagai ibadah sosial yang membangun solidaritas, mengurangi kesenjangan, dan merupakan bagian dari pilar ekonomi Islam.
          </p>
          <h3 className="text-xl font-bold mt-8 mb-4">Jenis-jenis Zakat:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Zakat Fitrah:</strong> Dikeluarkan menjelang Idulfitri, berupa makanan pokok (±2,5–3,5 kg/jiwa).</li>
            <li><strong>Zakat Mal (Harta):</strong> Dikenakan atas harta yang telah mencapai nisab dan haul:</li>
            <ul className="list-disc list-inside ml-6">
              <li>Zakat Emas dan Perak</li>
              <li>Zakat Uang dan Investasi</li>
              <li>Zakat Perdagangan</li>
              <li>Zakat Pertanian</li>
              <li>Zakat Peternakan</li>
              <li>Zakat Profesi/Penghasilan</li>
            </ul>
          </ul>
        </div>
      </section>

      {/* DASAR HUKUM */}
      <section className="bg-white/20 dark:bg-black/30 backdrop-blur-md py-16 px-4 my-6 rounded-lg" data-aos="fade-up">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Dasar Hukum Zakat</h2>
          <p className="mb-6">
            Kewajiban zakat disebutkan secara eksplisit dalam Al-Quran dan hadis, menandakan pentingnya zakat sebagai pilar agama.
          </p>
          <h3 className="text-xl font-bold mb-2">Dari Al-Qur'an:</h3>
          <blockquote className="italic text-green-700 dark:text-green-400 border-l-4 pl-4 border-green-500 mb-4">
            “Ambillah zakat dari sebagian harta mereka...” <br />
            <span className="text-sm">(QS. At-Taubah: 103)</span>
          </blockquote>
          <blockquote className="italic text-green-700 dark:text-green-400 border-l-4 pl-4 border-green-500 mb-4">
            “Dan dirikanlah shalat, tunaikanlah zakat...” <br />
            <span className="text-sm">(QS. Al-Baqarah: 43)</span>
          </blockquote>
          <h3 className="text-xl font-bold mt-6 mb-2">Dari Hadis:</h3>
          <blockquote className="italic text-green-700 dark:text-green-400 border-l-4 pl-4 border-green-500 mb-4">
            “Islam dibangun di atas lima perkara...” <br />
            <span className="text-sm">(HR. Bukhari dan Muslim)</span>
          </blockquote>
          <blockquote className="italic text-green-700 dark:text-green-400 border-l-4 pl-4 border-green-500">
            “Beritahukan kepada mereka bahwa Allah telah mewajibkan zakat atas harta mereka...” <br />
            <span className="text-sm">(HR. Bukhari dan Muslim)</span>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 bg-green-100/90 dark:bg-green-900/80 backdrop-blur-md my-6 mx-4 rounded-lg" data-aos="zoom-in">
        <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">Siap Menunaikan Zakat?</h3>
        <Link
          href="/form"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow transition"
        >
          Bayar Zakat Sekarang
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-100 dark:text-gray-300 py-6 mt-10 border-t border-white/30 dark:border-gray-700">
        &copy; {new Date().getFullYear()} Masjid Al-Ikhlas RT01 RW06
      </footer>
    </div>
  )
}