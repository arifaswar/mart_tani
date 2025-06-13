'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const handleLogout =  async () => {
    (await cookies()).delete('authorization');
    redirect('/login')
}