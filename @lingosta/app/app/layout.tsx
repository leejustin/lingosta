import Layout from '../components/Layout/Layout'
import Navbar from '../components/Layout/Navbar'
import {UserProvider} from '../providers/UserProvider'
import './globals.css'
import {Inter} from 'next/font/google'
import GroupProvider from "../providers/GroupProvider";
import Head from "next/head";
import BottomNav from '../components/Layout/BottomNav'
import { TranslationsProvider } from '../providers/SelectedTranslationsProvider'

const inter = Inter({subsets: ['latin']})

export const metadata = {
  tile: "Lingosta",
  description: "Discover a personalized language-learning journey with Lingosta by using AI to generate curated exercises, making it more engaging for learners of all levels! 🇪🇸 🇧🇷 🇺🇸 🇰🇷 🇫🇷 🇩🇪 🇮🇹 🇳🇱 🇷🇺 🇨🇳 🇯🇵",
  openGraph: {
    title: 'Lingosta',
    description: "Discover a personalized language-learning journey with Lingosta by using AI to generate curated exercises, making it more engaging for learners of all levels! 🇪🇸 🇧🇷 🇺🇸 🇰🇷 🇫🇷 🇩🇪 🇮🇹 🇳🇱 🇷🇺 🇨🇳 🇯🇵"
  },
  twitter: {
    title: "Lingosta",
    description: "Discover a personalized language-learning journey with Lingosta by using AI to generate curated exercises, making it more engaging for learners of all levels! 🇪🇸 🇧🇷 🇺🇸 🇰🇷 🇫🇷 🇩🇪 🇮🇹 🇳🇱 🇷🇺 🇨🇳 🇯🇵"
  }
};

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
                <BottomNav />
              </Layout>
            </body>
          </TranslationsProvider>
        </GroupProvider>
      </UserProvider>
    </html>
  )
}
