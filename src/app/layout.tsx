import './globals.css'
import { inter } from '../fonts'
import { Metadata } from 'next'
import Providers from './Provider'
import Header from './components/Header'
import Footer from './components/Footer'
import NavBar from './components/navbar'

export const metadata: Metadata = {
  title: {
    default: 'Danyal Ahmed',
    template: '%s | Danyal Ahmed'
  },
  description: 'Web dev and software engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full scroll-smooth'>
      <body className={inter.className + " bg-tiffany-blue dark:bg-russian-violet"}>
        <Providers>
          <NavBar />
          <main className='mt-20'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
