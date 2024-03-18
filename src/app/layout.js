import './globals.css'
import { Glass_Antiqua } from 'next/font/google'

const antiqua = Glass_Antiqua({ subsets: ['latin'], display: 'swap', weight: '400', variable: '--font-antiqua', })

export const metadata = {
  title: 'Storytime AI',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" rel="preload" as="style">
      <body  className={`${antiqua.variable} fade-in`} >{children}</body>
    </html>
  )
}
