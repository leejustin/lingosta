import Layout from '../components/Layout/Layout'
import Navbar from '../components/Layout/Navbar'
import {UserProvider} from '../providers/UserProvider'
import './globals.css'
import {Inter} from 'next/font/google'
import GroupProvider from "../providers/GroupProvider";
import Head from "next/head";
import MobileNav from '../components/Layout/MobileNav'
import { TranslationsProvider } from '../providers/SelectedTranslationsProvider'
import Footer from '../components/Layout/Footer'

const inter = Inter({subsets: ['latin']})

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
        <GroupProvider>
          <TranslationsProvider>
            <body className={inter.className}>
              <Layout>
                <Navbar />
                {children}
                <Footer />
                <MobileNav />
              </Layout>
            </body>
          </TranslationsProvider>
        </GroupProvider>
      </UserProvider>
    </html>
  )
}
