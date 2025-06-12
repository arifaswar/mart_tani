import Link from "next/link";
export default function NavBar() {
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
        <button>Logout</button>
    </nav>
  );
}
