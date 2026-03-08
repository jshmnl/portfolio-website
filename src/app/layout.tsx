import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { CommandPaletteProvider } from '@/components/CommandPalette'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Joshua Manuel | Full-Stack Developer',
  description:
    'Full-stack developer specializing in web and mobile systems, with experience leading development and delivering production-ready solutions. Based in the Philippines.',
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    siteName: 'Joshua Manuel — Portfolio',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-navy-950">
        <CommandPaletteProvider>
          {children}
        </CommandPaletteProvider>
      </body>
    </html>
  )
}
