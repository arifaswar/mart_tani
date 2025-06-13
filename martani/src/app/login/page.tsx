"use client";
// import { cookies } from "next/headers";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // const rawFormData = {
    //   email: formData.get('email'),
    //   password: formData.get('password')
    // };
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res, '>>>response');

      const response = await res.json();
      
      if (!res.ok) {
        alert(response.message || "Login gagal");
         return;
      }
      // (await cookies()).set('authorization', `Bearer ${response.access_token}`);
      alert("Login Berhasil");
      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <div className="bg-green-300 min-h-screen flex items-center justify-center flex-col">
      <h2 className="text-4xl text-bold my-4">Login</h2>
      <div className="container border rounded-2xl bg-amber-50 items-center p-6 w-sm mx-4">
        <div className="flex items-center justify-center">
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border mb-4 rounded p-2"
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="border mb-4 rounded p-2"
            />
            <br />
            <div className="flex justify-center">
              <button
                className="bg-emerald-950 text-amber-50 p-1 rounded hover:bg-amber-300 hover:text-black"
                type="submit"
              >
                Login
              </button>
            </div>
            <div>
              <h6 className="text-xs">
                Belum punya akun? Silahkan{" "}
                <Link className="text-blue-700" href={"/register"}>
                  register
                </Link>
              </h6>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
