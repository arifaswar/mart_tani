'use client';
import { usePathname } from "next/navigation";
import React from "react";
import NavBar from "./NavBar";

export default function LayoutWrapper({children}: {children:React.ReactNode}){
    const pathName = usePathname();

    const hideNav = pathName === '/'
    return (
        <>
        {!hideNav && <NavBar/>}
        {children}
        </>
    )
}