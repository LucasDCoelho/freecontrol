import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'FreeControl',
  description: 'Dashboard financeiro para freelancers',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  )
}