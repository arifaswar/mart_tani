"use client";
import { usePathname } from "next/navigation";
import React from "react";
import NavBar from "./NavBar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const hideNavPaths = ["/", "/login", "/register"];
  const hideNav = hideNavPaths.includes(pathName);
  return (
    <div className="min-h-screen bg-gray-200">
      {!hideNav && <NavBar />}
      <main>
      {children}
      </main>
    </div>
  );
}
