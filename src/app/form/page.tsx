'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { db } from '../../../firebase'
import { collection, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore'

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number)
}

export default function FormZakatFitrah() {
  const router = useRouter()
  const [jumlahJiwa, setJumlahJiwa] = useState(1)
  const [bentuk, setBentuk] = useState<'beras' | 'uang'>('beras')
  const [nama, setNama] = useState('')
  const [telepon, setTelepon] = useState('')
  const [email, setEmail] = useState('')
  const [anonim, setAnonim] = useState(false)
  const [pesan, setPesan] = useState('')
  const [loading, setLoading] = useState(false)
  const hargaPerJiwa = 45000

  useEffect(() => {
    AOS.init({ duration: 800 })
  }, [])

  const handleSubmit = async () => {
    const phoneRegex = /^(08|\+628)[0-9]{8,12}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!nama.trim()) {
      alert('Nama wajib diisi.')
      return
    }

    if (!phoneRegex.test(telepon)) {
      alert('Nomor telepon tidak valid. Harus diawali 08 atau +62 dan panjang minimal 10 digit.')
      return
    }

    if (email && !emailRegex.test(email)) {
      alert('Format email tidak valid.')
      return
    }

    setLoading(true)
    try {
      const docRef = await addDoc(collection(db, 'zakat_fitrah'), {
        jenis_zakat: 'Zakat Fitrah',
        bentuk,
        jumlah_jiwa: jumlahJiwa,
        total: bentuk === 'uang' ? jumlahJiwa * hargaPerJiwa : null,
        bentuk_display:
          bentuk === 'uang'
            ? `${formatRupiah(jumlahJiwa * hargaPerJiwa)}`
            : `${jumlahJiwa} jiwa x 2.5 kg`,
        nama,
        telepon,
        email,
        anonim,
        pesan,
        status: bentuk === 'uang' ? 'belum' : 'dijadwalkan',
        timestamp: Timestamp.now(),
      })

      await updateDoc(doc(db, 'zakat_fitrah', docRef.id), { id_zakat: docRef.id })

      if (bentuk === 'beras') {
        router.push(`/form/jadwal?id=${docRef.id}`)
      } else {
        router.push(`/form/niat?id=${docRef.id}`)
      }
    } catch (error) {
      console.error('Gagal kirim ke Firebase:', error)
      alert('Terjadi kesalahan saat menyimpan data.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-800 dark:text-gray-100 transition-colors duration-300"
      style={{ backgroundImage: "url('/BgMasjid.jpeg')" }}
    >
      <div className="min-h-screen bg-white/30 dark:bg-black/30 backdrop-blur-md">
        <header className="sticky top-0 z-50 bg-green-700 text-white py-4 shadow-md">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Zakat Fitrah - Masjid Al-Ikhlas</h1>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/info" className="hover:underline">Apa Itu Zakat</Link>
            </nav>
          </div>
        </header>

        <section className="max-w-3xl mx-auto py-16 px-4" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-8">
            Hitung Zakat Fitrah Anda
          </h2>

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
                  Beras (±2,5–3,5 kg/jiwa)
                </label>
                <label className="block">
                  <input type="radio" value="uang" checked={bentuk === 'uang'} onChange={() => setBentuk('uang')} className="mr-2" />
                  Uang Tunai ({formatRupiah(hargaPerJiwa)} / jiwa)
                </label>
              </div>
            </label>

            <div className="mt-6 text-lg font-medium">
              Total Zakat: {bentuk === 'uang' ? formatRupiah(jumlahJiwa * hargaPerJiwa) : `${jumlahJiwa} jiwa x 2.5 kg`}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-aos="fade-up">
            <h3 className="text-2xl font-semibold mb-4">Data Muzakki</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Nama Lengkap" value={nama} onChange={e => setNama(e.target.value)} className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700" />
              <input type="tel" placeholder="Nomor Telepon" value={telepon} onChange={e => setTelepon(e.target.value)} className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700" />
              <input type="email" placeholder="Email (opsional)" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700" />
              <label className="block">
                <input type="checkbox" checked={anonim} onChange={e => setAnonim(e.target.checked)} className="mr-2" />
                Tampilkan Nama (Centang = Tampilkan, Kosong = Anonim)
              </label>
              <textarea placeholder="Pesan / Doa (Opsional)" value={pesan} onChange={e => setPesan(e.target.value)} rows={3} className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700" />
            </div>

            <div className="text-center mt-8">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow disabled:opacity-50"
              >
                {loading ? '⏳ Menyimpan...' : 'Lanjut ke Tahap Berikutnya'}
              </button>
            </div>
          </div>
        </section>

        <footer className="w-full bg-white/30 dark:bg-black/30 backdrop-blur-md border-t border-gray-300 dark:border-gray-700 py-6">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-800 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Masjid Al-Ikhlas RT01 RW06
          </div>
        </footer>
      </div>
    </div>
  )
}
