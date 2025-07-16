'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { db } from '../../../../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export default function JadwalKirimZakat() {
  const params = useSearchParams()
  const router = useRouter()
  const id = params.get('id')
  const [jumlahJiwa, setJumlahJiwa] = useState(1)
  const [hargaPerKg, setHargaPerKg] = useState(18000)
  const [nama, setNama] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      getDoc(doc(db, 'zakat_fitrah', id)).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data()
          setJumlahJiwa(data.jumlah_jiwa || 1)
          setNama(data.nama || '')
        }
        setLoading(false)
      })
    }
  }, [id])

  const handleKonfirmasi = async () => {
    if (!id) return
    await updateDoc(doc(db, 'zakat_fitrah', id), {
      status_pembayaran: 'belum',
      metode: 'beras',
    })
    alert('Jadwal dan informasi penyaluran telah dicatat.')
    router.push('/')
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400">
          Jadwal & Informasi Penyaluran Beras Zakat
        </h1>

        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">1. Lokasi Penyaluran Beras</h2>
              <p><strong>Alamat:</strong> Kantor Sekretariat Masjid Al-Ikhlas, Jl. Contoh No.123, Kota Zakat</p>
              <p><strong>Jam Operasional:</strong> 08.00 - 17.00 WIB (Senin - Sabtu)</p>
              <p><strong>Kontak Person:</strong> Ust. Ahmad - 0812-3456-7890</p>
              <p><strong>Panduan:</strong> Beras minimal 2,5 kg/jiwa, dikemas rapi. Bisa ditimbang di lokasi.</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">2. Estimasi Nilai Zakat (Untuk Pencatatan)</h2>
              <p><strong>Jumlah Jiwa:</strong> {jumlahJiwa}</p>
              <p><strong>Total Beras:</strong> {jumlahJiwa * 2.5} kg</p>
              <p><strong>Harga Per Kg:</strong> Rp{hargaPerKg.toLocaleString()}</p>
              <p><strong>Estimasi Nilai Zakat:</strong> Rp{(jumlahJiwa * 2.5 * hargaPerKg).toLocaleString()}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">3. Konfirmasi Penyaluran</h2>
              <p>
                Dengan ini saya, <strong>{nama}</strong>, berkomitmen menyerahkan zakat beras fisik secara langsung
                ke lokasi Masjid Al-Ikhlas pada jam operasional yang telah ditentukan.
              </p>
              <button
                onClick={handleKonfirmasi}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow"
              >
                Konfirmasi & Kembali ke Beranda
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
