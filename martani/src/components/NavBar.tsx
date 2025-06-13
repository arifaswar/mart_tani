// 'use server'
import { handleLogout } from "@/helpers/actions";
import Link from "next/link";
export default async function NavBar() {
  return (
    <nav className="flex justify-between p-2 bg-slate-300 px-4">
        <div className="border border-b-emerald-900">
            <h4 className="text-4xl text-bold text-emerald-900 border border-b-emerald-900">Martani</h4>
        </div>
        <ul className="flex items-center justify-center gap-4">
            <Link href={'/dashboard'}>
            Beranda
            </Link>
            <Link href={'/products'}>Produk</Link>
            <Link href={'/info'}>Informasi</Link>
            <Link href={'/discussion'}>Diskusi</Link>
        </ul>
        <button type="submit" onClick={handleLogout} className="bg-red-600 text-amber-50 border rounded h-6">
            Logout
          </button>
    </nav>
  );
}
