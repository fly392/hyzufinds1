import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HyzuFinds - Find Your Perfect Items',
  description: 'Curated items with best prices and QC photos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark text-white`}>
        {children}
      </body>
    </html>
  )
}
