// app/layout.tsx
import './globals.css' // se você usar CSS global, senão pode remover

export const metadata = {
  title: 'The Monkey Paw',
  description: 'Projeto com Next.js e IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}
