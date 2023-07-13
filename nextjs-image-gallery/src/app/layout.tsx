import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import type { Metadata } from 'next'

// the order of these imports is important
// we want to import bootstrap first so that we can override it with our own styles

// fonts directly from google
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// define the metadata for the page
export const metadata: Metadata = {
  title: 'NextJS 13.4 Image Gallery',
  description: 'Tutorial Project by Coding in Flow',
}

// this is the root layout for the app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>this div is shared across layouts</div>
        {children}
      </body>
    </html>
  )
}
