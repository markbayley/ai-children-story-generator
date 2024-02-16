import './globals.css'
import { Inter, Glass_Antiqua, Sedgwick_Ave, Open_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'],  display: 'swap', variable: '--font-inter', })
const antiqua = Glass_Antiqua({ subsets: ['latin'], display: 'swap', weight: '400', variable: '--font-antiqua', })
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
})
const sedgwick = Sedgwick_Ave({ subsets: ['latin'],  display: 'swap', weight: '400', variable: '--font-sedgwick', })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" rel="preload" as="style">
      <body  className={`${openSans.variable} ${inter.variable} ${antiqua.variable} ${sedgwick.variable} font-sans`} >{children}</body>
    </html>
  )
}
