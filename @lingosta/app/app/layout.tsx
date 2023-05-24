import Layout from '../components/Layout/Layout'
import Navbar from '../components/Layout/Navbar'
import { UserProvider } from '../providers/UserProvider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lingosta',
  description: 'language learning app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
            <Layout>
                <Navbar />
              {children}
            </Layout>
        </body>
      </UserProvider>

    </html>
  )
}
