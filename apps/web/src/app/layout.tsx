import { ApolloProvider } from '@parkspace/network/src/config/apollo'
import '@parkspace/ui/src/app/globals.css'
import { Container } from '@parkspace/ui/src/components/atoms/Container'
import { SessionProvider } from '@parkspace/ui/src/components/molecules/SessionProvider'
import { Header } from '@parkspace/ui/src/components/organisms/Header'
import { MenuItem } from '@parkspace/util/types'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const montserrat = Montserrat({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Parkspace',
  description: 'Next-gen parking application',
}
const MENUITEMS: MenuItem[] = [
  { label: 'Search', href: '/search' },
  { label: 'Bookings', href: '/bookings' },
  { label: 'About', href: '/about' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <ApolloProvider>
          <body className={montserrat.className}>
            <Header menuItems={MENUITEMS} />
            <Container> {children}</Container>
            <ToastContainer />
          </body>
        </ApolloProvider>
      </SessionProvider>
    </html>
  )
}

