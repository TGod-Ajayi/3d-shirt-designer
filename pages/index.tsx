import Image from 'next/image'
import { Inter } from 'next/font/google'
import Home from "@/components/main/home";
import Canvas from "@/canvas";
import Customizer from "@/components/main/customizer";

const inter = Inter({ subsets: ['latin'] })

export default function Main() {
  return (
    <main className={'app transition-all ease-in'}>
      <Home />
        <Canvas />
        <Customizer/>

    </main>
  )
}
