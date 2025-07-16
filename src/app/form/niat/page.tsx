'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function NiatZakatFitrahPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    AOS.init({ duration: 800 })
  }, [])

  const handleLanjut = () => {
    router.push(`/form/pembayaran?id=${id}`)
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-800 dark:text-gray-100 transition-colors duration-300"
      style={{ backgroundImage: "url('/BgMasjid.jpeg')" }}
    >
      <div className="min-h-screen bg-white/30 dark:bg-black/30 backdrop-blur-md">
        <header className="sticky top-0 z-50 bg-green-700 text-white py-4 shadow-md">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Niat Zakat Fitrah</h1>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/form" className="hover:underline">Form Zakat</Link>
            </nav>
          </div>
        </header>

        <section className="max-w-4xl mx-auto py-16 px-4" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-8">
            Bacaan Niat Zakat Fitrah
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-1">1. Untuk Diri Sendiri</h3>
              <p className="italic mb-1">نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ نَفْسِيْ فَرْضًا ِللهِ تَعَالَى</p>
              <p>“Aku niat mengeluarkan zakat fitrah untuk diriku sendiri fardu karena Allah Ta'ala.”</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">2. Untuk Seluruh Keluarga</h3>
              <p className="italic mb-1">نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنِّي وَعَنْ جَمِيعِ مَنْ يَلْزَمُنِي نَفَقَاتُهُمْ شَرْعًا فَرْضًا ِللهِ تَعَالَى</p>
              <p>“Aku niat mengeluarkan zakat fitrah untuk diriku dan seluruh orang yang nafkahnya menjadi tanggunganku fardhu karena Allah Ta'ala.”</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">3. Untuk Istri</h3>
              <p className="italic mb-1">نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ زَوْجَتِيْ فَرْضًا ِللهِ تَعَالَى</p>
              <p>“Aku niat mengeluarkan zakat fitrah untuk istriku fardhu karena Allah Ta'ala.”</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">4. Untuk Anak Laki-laki</h3>
              <p className="italic mb-1">نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ وَلَدِيْ … فَرْضًا ِللهِ تَعَالَى</p>
              <p>“Aku niat mengeluarkan zakat fitrah untuk anak laki-lakiku …, fardu karena Allah Ta'ala.”</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">5. Untuk Anak Perempuan</h3>
              <p className="italic mb-1">نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ بِنْتِيْ … فَرْضًا ِللهِ تَعَالَى</p>
              <p>“Aku niat mengeluarkan zakat fitrah untuk anak perempuanku …, fardu karena Allah Ta'ala.”</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">6. Untuk Mewakili Orang Lain</h3>
              <p className="italic mb-1">نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ … فَرْضًا ِللهِ تَعَالَى</p>
              <p>“Aku niat mengeluarkan zakat fitrah untuk …, fardu karena Allah Ta'ala.”</p>
            </div>

            <div className="text-center pt-6">
              <button
                onClick={handleLanjut}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow"
              >
                Lanjut ke Pembayaran
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