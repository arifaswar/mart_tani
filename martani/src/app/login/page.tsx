import Link from "next/link";
export default function Login() {
  return (
    <div className="bg-green-300 min-h-screen flex items-center justify-center flex-col">
      <h2 className="text-4xl text-bold my-4">Login</h2>
      <div className="container border rounded-2xl bg-amber-50 items-center p-6 w-sm mx-4">
        <div className="flex items-center justify-center">
          <form action="" >
            <label htmlFor="email">Email</label><br />
            <input type="text" placeholder="Email" className="border mb-4 rounded p-2"/>
            <br />
            <label htmlFor="password">Password</label><br />
            <input type="text" placeholder="Password" className="border mb-4 rounded p-2"/>
            <br />
            <div className="flex justify-center">

            <button className="bg-emerald-950 text-amber-50 p-1 rounded hover:bg-amber-300 hover:text-black" type="submit">Login</button>
            </div>
            <div>
                <h6 className="text-xs">Belum punya akun? Silahkan <Link className="text-blue-700" href={'/register'}>register</Link></h6>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
