"use client"

import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="flex w-full primary-c justify-between px-14 items-center">
      <div className="flex justify-between">
        <Link href="https://www.humanrightsfirst.org/" target="_blank">
          <Image
            src="/images/logo.png"
            alt="HRF logo white"
            width={100}
            height={50}
            className="w-[100px]"
          />
        </Link>
      </div>
      <nav className="flex items-center py-4 gap-16">
        <Link href="/" className="nav-btn">
          Home
        </Link>
        <Link href="/graphs" className="nav-btn">
          Graphs
        </Link>
      </nav>
    </header>
  )
}
