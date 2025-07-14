'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function KonfirmasiPembayaran() {
  const searchParams = useSearchParams()
  const [metode, setMetode] = useState('')

  useEffect(() => {
    // Simulasi ambil metode dari state global / session / localStorage
    const metodeTerpilih = localStorage.getItem('metodePembayaran') || 'transfer'
    setMetode(metodeTerpilih)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        {metode === 'qris' || metode === 'va' ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300">
              Pembayaran Berhasil!
            </h2>
            <p className="mb-4">Terima kasih, pembayaran zakat Anda telah berhasil kami terima.</p>
            <p><strong>Nomor Transaksi:</strong> #ZK20250713</p>
            <p><strong>Jenis Zakat:</strong> Zakat Fitrah</p>
            <p><strong>Jumlah:</strong> Rp 135.000,-</p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Bukti pembayaran dan laporan akan dikirim ke email Anda.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">
              Instruksi Pembayaran
            </h2>
            <p className="mb-2">
              Pembayaran zakat Anda telah tercatat. Silakan lakukan transfer ke rekening berikut:
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded mb-4">
              <p><strong>Bank:</strong> Bank Syariah Indonesia (BSI)</p>
              <p><strong>No. Rekening:</strong> 7123456789</p>
              <p><strong>Atas Nama:</strong> Masjid Al-Ikhlas RT01 RW06</p>
              <p><strong>Jumlah:</strong> Rp 135.000,-</p>
            </div>
            <p>
              Harap selesaikan pembayaran dalam waktu <strong>12 jam</strong>.
              Setelah transfer, Anda dapat mengkonfirmasi pembayaran melalui WhatsApp atau admin masjid.
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow transition"
          >
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  )
}
