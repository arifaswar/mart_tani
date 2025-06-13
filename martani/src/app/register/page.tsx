'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const[formData, setFormData] =useState({
        username: '',
        email: '',
        password: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]:value}))
    }
    
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const rawFormData = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(rawFormData)
            });

            const response = await res.json();
            if (!res.ok) {
                throw new Error('Failed to register')
            };
            alert("Success Register! Please login to continue.");
            router.push('/login')
        } catch (error: any) {
            console.log(error);
            alert(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className="bg-green-300 min-h-screen flex items-center justify-center flex-col">
      <h2 className="text-4xl text-bold my-4">Register</h2>
      <div className="container border rounded-2xl bg-amber-50 items-center p-6 w-sm mx-4">
        <div className="flex items-center justify-center">
          <form onSubmit={handleRegister}>
            <label htmlFor="username">Username</label>
            <br />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="border mb-4 rounded p-2"
            />
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="border mb-4 rounded p-2"
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="border mb-4 rounded p-2"
            />
            <br />
            <div className="flex justify-center">
              <button
                className="bg-emerald-950 text-amber-50 p-1 rounded hover:bg-amber-300 hover:text-black"
                type="submit"
              >
                Register
              </button>
            </div>
            <div>
              <h6 className="text-xs">
                Sudah punya akun? Silahkan{" "}
                <Link className="text-blue-700" href={"/login"}>
                  login
                </Link>
              </h6>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
