import type React from 'react'
import localFont from 'next/font/local'
import './globals.css'

const consolas = localFont({ src: './assets/fonts/consolas.ttf' })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={consolas.className}>
      <body>{children}</body>
    </html>
  )
}
