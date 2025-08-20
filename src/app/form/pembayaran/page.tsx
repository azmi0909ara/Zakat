'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { db } from '../../../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'

type ZakatData = {
  nama: string
  bentuk: string
  total: number | null
  jumlah_jiwa: number
  anonim: boolean
  pesan?: string
}

type MetodePembayaran = 'bni' | 'dana'

function RingkasanPembayaranContent() {
  const params = useSearchParams()
  const id = params.get('id')
  const [data, setData] = useState<ZakatData | null>(null)
  const [loading, setLoading] = useState(true)
  const [metode, setMetode] = useState<MetodePembayaran>('bni')

  useEffect(() => {
    AOS.init({ duration: 800 })
    if (id) {
      getDoc(doc(db, 'zakat_fitrah', id)).then((docSnap) => {
        if (docSnap.exists()) {
          setData(docSnap.data() as ZakatData)
        } else {
          alert('Data tidak ditemukan.')
        }
        setLoading(false)
      })
    }
  }, [id])

  const rekening: Record<MetodePembayaran, { nama: string; norek: string; bank: string }> = {
    bni: {
      nama: 'Masjid Al-Ikhlas',
      norek: '1234567890',
      bank: 'BNI Syariah',
    },
    dana: {
      nama: 'Masjid Al-Ikhlas',
      norek: '081234567890',
      bank: 'DANA',
    },
  }

  const formatRupiah = (number: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-16 px-4">
      <div
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8"
        data-aos="fade-up"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700 dark:text-green-400">
          Ringkasan Pembayaran Zakat
        </h1>

        {loading ? (
          <p className="text-center">Memuat data...</p>
        ) : data ? (
          <>
            <div className="mb-4 space-y-2">
              <p>
                <strong>Nama:</strong> {data.anonim ? 'Hamba Allah' : data.nama}
              </p>
              <p>
                <strong>ID Zakat:</strong>{' '}
                {id && (
                  <>
                    <span className="font-bold text-green-600">{id.slice(0, 4)}</span>
                    {id.slice(4)}
                  </>
                )}
              </p>
              <p>
                <strong>Bentuk Zakat:</strong> {data.bentuk}
              </p>
              <p>
                <strong>Jumlah Jiwa:</strong> {data.jumlah_jiwa}
              </p>
              {data.total && (
                <p>
                  <strong>Total Zakat:</strong> {formatRupiah(data.total)}
                </p>
              )}
              {data.pesan && (
                <p>
                  <strong>Pesan/Doa:</strong> {data.pesan}
                </p>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Pilih Metode Pembayaran:</h2>
              <select
                value={metode}
                onChange={(e) => setMetode(e.target.value as MetodePembayaran)}
                className="w-full px-4 py-2 border rounded dark:bg-gray-700"
              >
                <option value="bni">Transfer Bank (BNI Syariah)</option>
                <option value="dana">E-Wallet (DANA)</option>
              </select>
            </div>

            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded">
              <p>
                <strong>Nama:</strong> {rekening[metode].nama}
              </p>
              <p>
                <strong>Bank / E-Wallet:</strong> {rekening[metode].bank}
              </p>
              <p>
                <strong>No. Rek / No. HP:</strong> {rekening[metode].norek}
              </p>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                Mohon kirim bukti transfer ke pengurus atau unggah melalui form selanjutnya.
              </p>
            </div>

            <div className="text-center mt-8">
              <Link
                href={`/form/konfirmasi?id=${id}`}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow"
              >
                Konfirmasi Pembayaran Zakat
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-red-500">Data tidak ditemukan.</p>
        )}
      </div>
    </div>
  )
}

export default function RingkasanPembayaran() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Memuat halaman...</p>}>
      <RingkasanPembayaranContent />
    </Suspense>
  )
}
