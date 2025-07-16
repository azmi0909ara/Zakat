'use client'

import { useEffect, useState } from 'react'
import { db } from '@/../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { format } from 'date-fns'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useRouter } from 'next/navigation'

export default function GrafikPage() {
  const router = useRouter()
  const [data, setData] = useState<any[]>([])
  const [totalUang, setTotalUang] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'zakat_fitrah'))
      const rawData = snapshot.docs.map(doc => ({
        ...doc.data(),
        date: doc.data().timestamp?.toDate?.(),
        jumlah_jiwa: doc.data().jumlah_jiwa ?? 0,
        bentuk: doc.data().bentuk,
        total_display: doc.data().bentuk_display ?? '',
      }))

      let totalUangMasuk = 0

      const grouped = rawData.reduce((acc: Record<string, number>, curr) => {
        const key = curr.date ? format(curr.date, 'yyyy-MM-dd') : 'tidak diketahui'
        acc[key] = (acc[key] || 0) + curr.jumlah_jiwa

        // Hitung pemasukan uang
        if (curr.bentuk === 'uang') {
          const cleaned = curr.total_display.replace(/[^\d]/g, '')
          const nominal = parseInt(cleaned)
          if (!isNaN(nominal)) {
            totalUangMasuk += nominal
          }
        }

        return acc
      }, {})

      const chartData = Object.entries(grouped).map(([date, total]) => ({
        date,
        total,
      }))

      // Urutkan tanggal agar dari kiri ke kanan
      chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      setData(chartData)
      setTotalUang(totalUangMasuk)
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          ← Kembali
        </button>

        <h1 className="text-2xl font-bold mb-6 text-center text-green-700 dark:text-green-300">
          Grafik Statistik Zakat Fitrah (Jumlah Jiwa per Hari)
        </h1>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#16a34a"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 text-lg text-center font-medium text-green-900 dark:text-green-300">
          💰 Total Uang Masuk: <span className="font-bold">Rp {totalUang.toLocaleString('id-ID')}</span>
        </div>
      </div>
    </div>
  )
}
