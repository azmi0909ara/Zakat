// app/form/konfirmasi/page.tsx
import { Suspense } from "react";
import KonfirmasiPembayaran from "./KonfirmasiPembayaran";

export default function Page() {
  return (
    <Suspense fallback={<p>Memuat halaman konfirmasi...</p>}>
      <KonfirmasiPembayaran />
    </Suspense>
  );
}
