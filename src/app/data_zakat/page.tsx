'use client'

import { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/../firebase'
import Link from 'next/link'

interface ZakatData {
  id: string
  timestamp: any
  jumlah_jiwa: number
  bentuk: 'uang' | 'beras'
  total: number
}

export default function ZakatLunasSummary() {
  const [zakatData, setZakatData] = useState<ZakatData[]>([])
  const [totalUang, setTotalUang] = useState(0)
  const [totalBeras, setTotalBeras] = useState(0)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const fetchLunasData = async () => {
      const q = query(collection(db, 'zakat_fitrah'), where('status', '==', 'lunas'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as ZakatData[]
      setZakatData(data)

      let totalUangTemp = 0
      let totalBerasTemp = 0
      data.forEach((item) => {
        if (item.bentuk === 'uang') {
          totalUangTemp += Number(item.total || 0)
        } else if (item.bentuk === 'beras') {
          totalBerasTemp += Number(item.total || 0)
        }
      })

      setTotalUang(totalUangTemp)
      setTotalBeras(totalBerasTemp)
    }

    fetchLunasData()
  }, [])

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-800 dark:text-gray-100 transition-colors duration-300"
      style={{ backgroundImage: "url('/BgMasjid.jpeg')" }}
    >
      {/* HEADER */}
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
              <Link href="/home" className="hover:underline">Home</Link>
              <Link href="/info" className="hover:underline">Apa itu Zakat?</Link>
              <Link href="/syarat" className="hover:underline">Syarat Zakat</Link>
            </nav>
          </div>
        </div>
        {showMenu && (
          <div className="md:hidden bg-green-600 text-white px-4 py-2">
            <Link href="/home" className="block py-2 hover:underline" onClick={() => setShowMenu(false)}>
              Home
            </Link>
            <Link href="/info" className="block py-2 hover:underline" onClick={() => setShowMenu(false)}>
              Apa itu Zakat?
            </Link>
            <Link href="/syarat" className="block py-2 hover:underline" onClick={() => setShowMenu(false)}>
              Syarat Zakat
            </Link>
          </div>
        )}
      </header>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-80 backdrop-blur-md rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center text-green-700 dark:text-green-300">
            Summary Data Zakat
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 dark:border-gray-600 text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                <tr>
                  <th className="p-2 border">Tanggal</th>
                  <th className="p-2 border">Jiwa</th>
                  <th className="p-2 border">Bentuk</th>
                  <th className="p-2 border">Total</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-800 dark:text-gray-100">
                {zakatData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="p-2 border">
                      {item.timestamp?.toDate().toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-2 border">{item.jumlah_jiwa}</td>
                    <td className="p-2 border capitalize">{item.bentuk}</td>
                    <td className="p-2 border">
                      {item.bentuk === 'uang'
                        ? `Rp ${Number(item.total || 0).toLocaleString('id-ID')}`
                        : `${Number(item.total || 0).toFixed(2)} Kg`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center text-lg font-semibold">
            <p className="mb-2">Total Uang: <span className="text-green-700 dark:text-green-400">Rp {totalUang.toLocaleString('id-ID')}</span></p>
            <p>Total Beras: <span className="text-green-700 dark:text-green-400">{totalBeras.toFixed(2)} Kg</span></p>
          </div>
        </div>
      </main>
    </div>
  )
}
