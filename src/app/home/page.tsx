'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { db } from '@/../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { format } from 'date-fns'

export default function Home() {
  const [dark, setDark] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [dailyZakat, setDailyZakat] = useState<{ date: string, total: number }[]>([])
  const [dailyIncome, setDailyIncome] = useState<{ date: string, uang: number, beras: number }[]>([])
  
  
  const [totalAll, setTotalAll] = useState({ uang: 0, beras: 0 })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    AOS.init({ duration: 800 })
    fetchZakatData()
  }, [dark])

  const fetchZakatData = async () => {
    const snapshot = await getDocs(collection(db, 'zakat_fitrah'))
    const raw = snapshot.docs.map(doc => ({
      ...doc.data(),
      tanggal: doc.data().timestamp?.toDate?.(),
      jumlah_jiwa: doc.data().jumlah_jiwa ?? 0,
      bentuk: doc.data().bentuk,
      bentuk_display: doc.data().bentuk_display || '',
    }))

    const groupedJiwa: Record<string, number> = {}
    const groupedIncome: Record<string, { uang: number, beras: number }> = {}

    let totalUang = 0
    let totalBeras = 0

    raw.forEach(item => {
      const key = item.tanggal ? format(item.tanggal, 'yyyy-MM-dd') : 'tidak diketahui'
      groupedJiwa[key] = (groupedJiwa[key] || 0) + item.jumlah_jiwa

      let uang = 0
      let beras = 0
      const nominal = parseFloat(item.bentuk_display?.replace(/[^\d.,]/g, '')?.replace(',', '.') || '0')

      if (item.bentuk === 'uang') {
        uang = nominal
        totalUang += uang
      } else if (item.bentuk === 'beras') {
        beras = nominal
        totalBeras += beras
      }

      if (!groupedIncome[key]) groupedIncome[key] = { uang: 0, beras: 0 }
      groupedIncome[key].uang += uang
      groupedIncome[key].beras += beras
    })

    const zakatPerHari = Object.entries(groupedJiwa).map(([date, total]) => ({ date, total }))
    zakatPerHari.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const incomePerHari = Object.entries(groupedIncome).map(([date, { uang, beras }]) => ({
      date,
      uang,
      beras,
    }))
    incomePerHari.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    setDailyZakat(zakatPerHari)
    setDailyIncome(incomePerHari)
    setTotalAll({ uang: totalUang, beras: totalBeras })
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-800 dark:text-gray-100 transition-colors duration-300"
      style={{ backgroundImage: "url('/BgMasjid.jpeg')" }}
    >
      {/* NAVBAR */}
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

      {/* DATA ZAKAT HARIAN */}
      <section className="max-w-6xl mx-auto px-4 py-10 mt-10 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-lg" data-aos="fade-up">
        <h3 className="text-2xl font-bold mb-4 text-center">Data Zakat Harian</h3>
        {dailyZakat.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Belum ada data zakat.</p>
        ) : (
          <ul className="space-y-2">
            {dailyZakat.map((item, i) => (
              <li key={i} className="bg-white/60 dark:bg-gray-700 px-4 py-2 rounded shadow flex justify-between">
                <span>{format(new Date(item.date), 'dd MMM yyyy')}</span>
                <span className="font-semibold">{item.total} Jiwa</span>
              </li>
            ))}
          </ul>
        )}
      </section>

    {/* DETAIL PEMASUKAN */}
<section className="max-w-6xl mx-auto px-4 py-10 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-lg mt-6" data-aos="fade-up">
  <h3 className="text-2xl font-bold mb-4 text-center">Detail Pemasukan</h3>
  {dailyIncome.length === 0 ? (
    <p className="text-center text-gray-600 dark:text-gray-300">Belum ada data pemasukan.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-sm md:text-base bg-white/60 dark:bg-gray-700 rounded shadow">
        <thead>
          <tr className="bg-green-700 text-white text-left">
            <th className="px-4 py-2">Tanggal</th>
            <th className="px-4 py-2">Uang (Rp)</th>
            <th className="px-4 py-2">Beras (Kg)</th>
          </tr>
        </thead>
        <tbody>
          {dailyIncome.map((item, i) => (
            <tr key={i} className="border-b border-gray-300 dark:border-gray-600">
              <td className="px-4 py-2">{format(new Date(item.date), 'dd MMM yyyy')}</td>
              <td className="px-4 py-2">
                Rp {parseFloat(item.uang.toString()).toLocaleString('id-ID')}
              </td>
              <td className="px-4 py-2">
                {parseFloat(item.beras.toString()).toLocaleString('id-ID', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })} Kg
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="font-bold bg-green-100 dark:bg-gray-800">
          <tr>
            <td className="px-4 py-2">Total</td>
            <td className="px-4 py-2 text-green-700 dark:text-green-300">
              Rp {parseFloat(totalAll.uang.toString()).toLocaleString('id-ID')}
            </td>
            <td className="px-4 py-2 text-green-700 dark:text-green-300">
              {parseFloat(totalAll.beras.toString()).toLocaleString('id-ID', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })} Kg
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )}
</section>

      {/* FITUR UNGGULAN */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-lg mt-10" data-aos="fade-up">
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
          <Link href="/admin">
            <span className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg shadow transition">
              Masuk Admin
            </span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-100 dark:text-gray-300 py-6 mt-10 border-t border-white/30 dark:border-gray-700">
        &copy; {new Date().getFullYear()} Masjid Al-Ikhlas RT01 RW06
      </footer>
    </div>
  )
}