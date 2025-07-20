'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { db } from '../../../../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

type ZakatData = {
  nama: string
  bentuk: string
  total: number | null
  jumlah_jiwa: number
  anonim: boolean
  pesan?: string
  bukti_transfer_url?: string
  status_pembayaran?: 'belum' | 'lunas'
}

const cloudName = 'dd2rkqcjf'
const uploadPreset = 'zakat_upload'

function formatRupiah(amount: number) {
  return amount.toLocaleString('id-ID')
}

export default function KonfirmasiPembayaran() {
  const params = useSearchParams()
  const router = useRouter()
  const id = params.get('id')
  const [data, setData] = useState<ZakatData | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      getDoc(doc(db, 'zakat_fitrah', id)).then((docSnap) => {
        if (docSnap.exists()) {
          setData(docSnap.data() as ZakatData)
        }
        setLoading(false)
      })
    }
  }, [id])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !id) return alert('File atau ID tidak ditemukan.')

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', uploadPreset)

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
      })

      const result = await res.json()

      if (!res.ok || !result.secure_url) {
        console.error('Cloudinary error:', result)
        throw new Error(result.error?.message || 'Upload gagal')
      }

      const imageUrl = result.secure_url

      await updateDoc(doc(db, 'zakat_fitrah', id), {
        bukti_transfer_url: imageUrl,
        status_pembayaran: 'lunas',
      })

      setUploadedUrl(imageUrl)
      alert('Bukti pembayaran berhasil diunggah!')
    } catch (err: any) {
      console.error('Upload error:', err)
      alert('Terjadi kesalahan saat upload: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
          Konfirmasi Pembayaran Zakat
        </h1>

        {loading ? (
          <p>Memuat data...</p>
        ) : data ? (
          <>
            <div className="mb-4 space-y-2">
              <p><strong>Nama:</strong> {data.anonim ? 'Hamba Allah' : data.nama}</p>
              <p><strong>Bentuk Zakat:</strong> {data.bentuk}</p>
              <p><strong>Jumlah Jiwa:</strong> {data.jumlah_jiwa}</p>
              {data.total && (
                <p>
                  <strong>Total Zakat:</strong>{' '}
                  {data.bentuk === 'beras'
                    ? `${data.total.toFixed(1)} Kg`
                    : `Rp${formatRupiah(data.total)}`}
                </p>
              )}
              <p><strong>Status:</strong> {uploadedUrl || data.bukti_transfer_url ? 'lunas' : 'belum'}</p>

              {(data.bukti_transfer_url || uploadedUrl) && (
                <div>
                  <p><strong>Bukti Transfer:</strong></p>
                  <img
                    src={uploadedUrl || data.bukti_transfer_url!}
                    alt="Bukti Transfer"
                    className="mt-2 rounded border max-w-full h-auto"
                  />
                </div>
              )}
            </div>

            <label className="block mt-6">
              <span className="font-medium">Unggah Bukti Transfer (jpg/png):</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="block mt-2"
              />
            </label>

            {uploading && (
              <p className="text-yellow-500 mt-4">Mengunggah bukti, mohon tunggu...</p>
            )}

            {(uploadedUrl || data.bukti_transfer_url) && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => router.push('/')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
                >
                  Konfirmasi & Selesai
                </button>
              </div>
            )}
          </>
        ) : (
          <p>Data tidak ditemukan.</p>
        )}
      </div>
    </div>
  )
}
