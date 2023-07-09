import './globals.css'
import { inter } from '../fonts'
import { Metadata } from 'next'
import Providers from './Provider'
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
      <body className={inter.className + " bg-standard-100 dark:bg-standard-900 text-standard-900 dark:text-standard-100"}>
        <Providers>
          <NavBar />
          <main className='mt-32 w-full'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
