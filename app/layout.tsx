// app/layout.tsx
import './globals.css' // se você usar CSS global, senão pode remover

export const metadata = {
  title: 'The Monkey Paw',
  description: 'A Next.js project with AI - Be careful what you wish for',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
      </body>
    </html>
  )
}
