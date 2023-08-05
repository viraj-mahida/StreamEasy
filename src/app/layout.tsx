'use client'

import './globals.css'
import Navbar from '@/components/Navbar'
import { Provider } from "react-redux";
import store from "@/store/store";
import Script from 'next/script';

const metadata = {
  title: 'Easy Stream',
  description: 'Happy Streaming.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body>
        <Provider store={store}>
          <Navbar />
          {children}
        </Provider>
        <Script
          src="https://kit.fontawesome.com/347518e4e5.js"
        />
      </body>
    </html>
  )
}
