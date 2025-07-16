"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/../firebase'
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore'
import { format } from 'date-fns'
import * as XLSX from 'xlsx'

export default function AdminDashboard() {
  const router = useRouter()
  const [zakatData, setZakatData] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDate, setFilteredDate] = useState('')
  const [activeMessage, setActiveMessage] = useState<string | null>(null)

  useEffect(() => {
    const admin = localStorage.getItem('isAdmin')
    if (admin !== 'true') {
      router.replace('/admin')
    } else {
      fetchZakatData()
    }
  }, [router])

  const fetchZakatData = async () => {
    const q = query(collection(db, 'zakat_fitrah'), orderBy('timestamp', 'desc'))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      tanggal: doc.data().timestamp?.toDate?.() || null,
    }))
    setZakatData(data)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    router.replace('/admin')
  }

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      await deleteDoc(doc(db, 'zakat_fitrah', id))
      fetchZakatData()
    }
  }

  const handleLunas = async (id: string) => {
    if (confirm('Tandai data ini sebagai LUNAS?')) {
      await updateDoc(doc(db, 'zakat_fitrah', id), { status: 'lunas' })
      fetchZakatData()
    }
  }

  const handleExportExcel = () => {
    const exportData = zakatData.map(item => ({
      Nama: item.nama,
      Tanggal: item.tanggal ? format(item.tanggal, 'yyyy-MM-dd HH:mm') : '',
      Jiwa: item.jumlah_jiwa,
      Bentuk: item.bentuk,
      Total: item.bentuk_display,
      Telepon: item.telepon,
      Pesan: item.pesan,
      Status: item.status,
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Zakat')
    XLSX.writeFile(workbook, 'Data_Zakat.xlsx')
  }

  const filteredData = zakatData.filter(item => {
    const nameMatch = item.nama?.toLowerCase().includes(searchTerm.toLowerCase())
    const dateMatch = filteredDate
      ? item.tanggal && format(item.tanggal, 'yyyy-MM-dd') === filteredDate
      : true
    return nameMatch && dateMatch
  })

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-800 dark:text-gray-100 transition-colors duration-300"
      style={{ backgroundImage: "url('/BgMasjid.jpeg')" }}
    >
      <div className="min-h-screen bg-white/30 dark:bg-black/30 backdrop-blur-md">
        <header className="sticky top-0 z-50 bg-green-700 text-white py-4 shadow-md">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Admin - Dashboard Zakat Fitrah</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold mb-6 text-green-800 dark:text-green-300">Data Zakat Fitrah</h2>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Cari nama muzakki..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 rounded border bg-white dark:bg-gray-700"
            />
            <input
              type="date"
              value={filteredDate}
              onChange={(e) => setFilteredDate(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 rounded border bg-white dark:bg-gray-700"
            />
            <button
              onClick={handleExportExcel}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
            >
              📥 Export Excel
            </button>
            <button
  onClick={() => router.push('/admin/grafik')}
  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-medium"
>
  📊 Lihat Grafik
</button>
          </div>

          <div className="overflow-x-auto max-h-[70vh] overflow-y-auto rounded-md shadow-md">
            <table className="min-w-full text-sm md:text-base border-collapse">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="p-2 border">Nama</th>
                  <th className="p-2 border">Tanggal</th>
                  <th className="p-2 border">Jiwa</th>
                  <th className="p-2 border">Bentuk</th>
                  <th className="p-2 border">Total</th>
                  <th className="p-2 border">Telepon</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Bukti</th>
                  <th className="p-2 border">Aksi</th>
                  <th className="p-2 border">Pesan</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={10} className="text-center p-4 text-gray-600 dark:text-gray-400">
                      Tidak ada data ditemukan.
                    </td>
                  </tr>
                )}
                {filteredData.map((item, i) => (
                  <tr key={i} className="bg-white/80 dark:bg-gray-800">
                    <td className="p-2 border">{item.nama || 'Anonim'}</td>
                    <td className="p-2 border text-center">
                      {item.tanggal ? format(item.tanggal, 'dd/MM/yyyy HH:mm') : '-'}
                    </td>
                    <td className="p-2 border text-center">{item.jumlah_jiwa}</td>
                    <td className="p-2 border text-center">{item.bentuk}</td>
                    <td className="p-2 border text-center">{item.bentuk_display}</td>
                    <td className="p-2 border text-center">{item.telepon || '-'}</td>
                    <td className="p-2 border text-center font-semibold">
                      {item.status === 'lunas' ? '✅ Lunas' : item.status || 'belum'}
                    </td>
                    <td className="p-2 border text-center font-semibold">
                      {item.bukti_transfer_url && (
                        <a
                          href={item.bukti_transfer_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                        >
                          Preview
                        </a>
                      )}
                    </td>
                    <td className="p-2 border space-y-1 md:space-y-0 md:space-x-2 text-center">
                      {item.status !== 'lunas' && (
                        <button
                          onClick={() => handleLunas(item.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-sm"
                        >
                          Tandai Lunas
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                      >
                        Hapus
                      </button>
                    </td>
                    <td className="p-2 border text-center">
                      {item.pesan ? (
                        <button
                          onClick={() => setActiveMessage(activeMessage === item.id ? null : item.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          💬
                        </button>
                      ) : '-'}
                      {activeMessage === item.id && (
                        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded shadow text-sm">
                          {item.pesan}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        <footer className="text-center text-sm text-gray-600 dark:text-gray-400 py-6 border-t dark:border-gray-700">
          &copy; {new Date().getFullYear()} Masjid Al-Ikhlas RT01 RW06
        </footer>
      </div>
    </div>
  )
}
