'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function ZakatFitrahForm() {
  const [jumlahJiwa, setJumlahJiwa] = useState(1)
  const [bentuk, setBentuk] = useState('beras')
  const [nama, setNama] = useState('')
  const [telepon, setTelepon] = useState('')
  const [email, setEmail] = useState('')
  const [anonim, setAnonim] = useState(false)
  const [pesan, setPesan] = useState('')

  const hargaPerJiwa = 45000 // jika uang
  const total = bentuk === 'uang' ? jumlahJiwa * hargaPerJiwa : jumlahJiwa + ' sha’ beras'

  useEffect(() => {
    AOS.init({ duration: 800 })
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-green-700 text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Zakat Fitrah - Masjid Al-Ikhlas</h1>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/info" className="hover:underline">Apa Itu Zakat</Link>
          </nav>
        </div>
      </header>

      {/* FORM */}
      <section className="max-w-3xl mx-auto py-16 px-4" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-8">
          Hitung Zakat Fitrah Anda
        </h2>

        {/* PERHITUNGAN ZAKAT */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-10">
          <label className="block mb-4">
            <span className="font-semibold">Jumlah Jiwa:</span>
            <div className="flex mt-2 items-center gap-2">
              <button onClick={() => setJumlahJiwa(j => Math.max(1, j - 1))} className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded">-</button>
              <span className="text-xl">{jumlahJiwa}</span>
              <button onClick={() => setJumlahJiwa(j => j + 1)} className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded">+</button>
            </div>
          </label>

          <label className="block mt-6">
            <span className="font-semibold">Bentuk Zakat:</span>
            <div className="mt-2 space-y-2">
              <label className="block">
                <input type="radio" value="beras" checked={bentuk === 'beras'} onChange={() => setBentuk('beras')} className="mr-2" />
                Beras (sekitar 2,5–3,5 kg per jiwa)
              </label>
              <label className="block">
                <input type="radio" value="uang" checked={bentuk === 'uang'} onChange={() => setBentuk('uang')} className="mr-2" />
                Uang Tunai (Rp {hargaPerJiwa.toLocaleString()} per jiwa)
              </label>
            </div>
          </label>

          <div className="mt-6 text-lg">
            <strong>Total Zakat: </strong>
            {bentuk === 'uang' ? `Rp ${(jumlahJiwa * hargaPerJiwa).toLocaleString()}` : `${jumlahJiwa} jiwa x 2.5 kg beras`}
          </div>
        </div>

        {/* FORM MUZAKKI */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-aos="fade-up">
          <h3 className="text-2xl font-semibold mb-4">Data Muzakki</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={nama}
              onChange={e => setNama(e.target.value)}
              className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700"
            />
            <input
              type="tel"
              placeholder="Nomor Telepon"
              value={telepon}
              onChange={e => setTelepon(e.target.value)}
              className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700"
            />
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={anonim}
                  onChange={e => setAnonim(e.target.checked)}
                  className="mr-2"
                />
                Tampilkan Nama Saya (jika tidak dicentang, akan anonim)
              </label>
            </div>
            <textarea
              placeholder="Pesan / Doa (Opsional)"
              value={pesan}
              onChange={e => setPesan(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700"
            />
          </div>

          <div className="text-center mt-8">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow"
              onClick={() => alert('Lanjut ke metode pembayaran (belum diimplementasi)')}
            >
              Lanjut ke Pembayaran
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-600 dark:text-gray-400 py-6 mt-10 border-t dark:border-gray-700">
        &copy; {new Date().getFullYear()} Masjid Al-Ikhlas RT01 RW06
      </footer>
    </div>
  )
}
