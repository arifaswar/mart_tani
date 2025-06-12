export default function NavBar() {
  return (
    <nav className="flex justify-between p-2 bg-slate-300 px-4">
        <div className="border border-b-emerald-900">
            <h4 className="text-4xl text-bold text-emerald-900 border border-b-emerald-900">Martani</h4>
        </div>
        <ul className="flex justify-center gap-4">
            <li>Beranda</li>
            <li>Produk</li>
            <li>Informasi</li>
            <li>Diskusi</li>
        </ul>
        <button>Logout</button>
    </nav>
  );
}
