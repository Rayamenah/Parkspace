'use client'
import { useDialogState } from '@parkspace/util/hooks/useDialogue'
import { BaseComponent, MenuItem, Role } from '@parkspace/util/types'
import { IconUser } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Brand } from '../atoms/Brand'
import { Button } from '../atoms/Button'
import { Container } from '../atoms/Container'
import { HeaderProfile } from '../molecules/HeaderProfile'
import { Menus } from './Menus'
import { NavSidebar } from './NavSidebar'

export type IHeaderProps = {
  type?: Role
  menuItems: MenuItem[]
} & BaseComponent

export const Header = ({ type, menuItems }: IHeaderProps) => {
  const { data, status, } = useSession()
  const uid = data?.user?.uid
  const name = data?.user?.name
  return (
    <header>
      <nav className="fixed z-40 top-0 w-full shadow-md bg-white/50 backdrop-blur-md">
        <Container className="relative flex justify-between items-center h-16 py-2">
          <Link href="/" aria-label="Home" className="w-auto z-50 ">
            <Brand type={type} className="hidden h-10 sm:block" />
            <Brand type={type} shortForm className="block sm:hidden" />
          </Link>
          <div className="flex items-center gap-2">
            {uid ? (
              <>
                <div className="gap-6 items-center hidden sm:text-sm sm:flex">
                  <Menus menuItems={menuItems} />
                  <HeaderProfile name={name} icon={<IconUser />} />
                </div>

                <NavSidebar menuItems={menuItems} />
              </>
            ) : (
              <>
                <Link href="/register">
                  <Button variant="outlined" className="hidden md:block">
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="hidden md:block">Log in</Button>
                </Link>
              </>
            )}
          </div>
        </Container>
      </nav>
      <div className="h-16" />
    </header>
  )
}
