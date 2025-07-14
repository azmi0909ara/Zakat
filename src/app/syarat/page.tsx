'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function InformasiDasarZakat() {
  const [dark, setDark] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    AOS.init({ duration: 800 })
  }, [dark])

  return (
    <div
      className="min-h-screen bg-cover bg-center text-gray-800 dark:text-gray-100 transition-colors duration-300"
      style={{ backgroundImage: 'url("/BgMasjid.jpeg")' }}
    >
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-green-700 text-white py-4 shadow-md bg-opacity-90">
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
              <Link href="/info" className="hover:underline">Apa Itu Zakat</Link>
            </nav>
          </div>
        </div>

        {showMenu && (
          <div className="md:hidden bg-green-600 text-white px-4 py-2">
            <Link href="/" onClick={() => setShowMenu(false)} className="block py-2 hover:underline">Home</Link>
            <Link href="/info" onClick={() => setShowMenu(false)} className="block py-2 hover:underline">Apa Itu Zakat</Link>
          </div>
        )}
      </header>

      {/* SECTION: INFORMASI DASAR */}
      <section className="max-w-4xl mx-auto bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-xl px-6 py-16 my-12" data-aos="fade-up">
        <h1 className="text-4xl font-bold mb-6 text-center text-green-700 dark:text-green-400">
          Informasi Dasar Zakat
        </h1>

        {/* Syarat */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">Syarat Wajib Zakat</h2>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-800 dark:text-gray-200">
          <li><strong>Muslim:</strong> Hanya umat Islam yang diwajibkan berzakat.</li>
          <li><strong>Merdeka:</strong> Orang yang tidak dalam perbudakan.</li>
          <li><strong>Baligh dan Berakal:</strong> Tidak diwajibkan bagi anak kecil atau orang gila.</li>
          <li><strong>Harta Milik Penuh:</strong> Harus milik pribadi, bukan pinjaman atau titipan.</li>
          <li><strong>Mencapai Nisab:</strong> Batas minimal tertentu, misal 85 gram emas untuk zakat emas.</li>
          <li><strong>Mencapai Haul:</strong> Dimiliki selama satu tahun Hijriah. Tidak berlaku untuk pertanian dan profesi.</li>
        </ul>

        {/* Asnaf */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">Penerima Zakat (Asnaf)</h2>
        <p className="mb-4 text-gray-800 dark:text-gray-200">
          Allah SWT telah menetapkan delapan golongan (asnaf) yang berhak menerima zakat (QS. At-Taubah: 60):
        </p>
        <ul className="list-decimal list-inside ml-4 space-y-2 text-gray-800 dark:text-gray-200">
          <li><strong>Fakir:</strong> Tidak punya harta atau penghasilan sama sekali.</li>
          <li><strong>Miskin:</strong> Punya penghasilan, tapi tidak mencukupi kebutuhan.</li>
          <li><strong>Amil:</strong> Pengelola zakat resmi.</li>
          <li><strong>Muallaf:</strong> Orang yang baru masuk Islam atau diharapkan keislamannya kuat.</li>
          <li><strong>Riqab:</strong> Budak yang ingin merdeka. Bisa diartikan membebaskan diri dari utang.</li>
          <li><strong>Gharim:</strong> Orang yang punya utang dan tidak mampu membayar.</li>
          <li><strong>Fisabilillah:</strong> Pejuang di jalan Allah (dakwah, pendidikan, sosial).</li>
          <li><strong>Ibnu Sabil:</strong> Musafir yang kehabisan bekal.</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center py-12 bg-green-100/90 dark:bg-green-900/80 backdrop-blur" data-aos="zoom-in">
        <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">Siap Menunaikan Zakat?</h3>
        <Link
          href="/zakat/form"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow transition"
        >
          Bayar Zakat Sekarang
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-600 dark:text-gray-400 py-6 mt-10 border-t dark:border-gray-700 bg-white/70 dark:bg-black/40">
        &copy; {new Date().getFullYear()} Masjid Al-Ikhlas RT01 RW06
      </footer>
    </div>
  )
}
