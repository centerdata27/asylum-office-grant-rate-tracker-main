import Header from "./Header"
import Footer from "./Footer"
import { ReactNode } from "react"

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="font-sans w-full min-h-screen m-0 flex flex-col justify-between items-center text-center secondary-c">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  )
}
