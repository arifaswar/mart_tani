
import Link from "next/link";

export default function Home() {
  return (
    <Link href={"/dashboard"}>
      <div className="text-8xl items-center text-center min-h-screen flex flex-col justify-center bg-green-500">
        Selamat Datang <span className="text-4xl">di pusat pertanian</span>
        <div className="text-sm border p-2 m-2 w-30 items-center rounded-2xl bg-amber-50">klik dimana saja</div>
      </div>
    </Link>
  );
}
