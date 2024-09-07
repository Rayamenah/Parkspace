import {} from '@headlessui/react'
import React, { ReactNode } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { IconChevronDown, IconLogout2, IconUser } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'

type Props = {
  name: string | null | undefined
  icon: ReactNode
}

export function HeaderProfile({ name, icon }: Props) {
  return (
    <div className="flex text-xs p-2 items-center ">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-lg p-3 border border-primary-500">
          <IconUser />
          {name}
          <IconChevronDown className="size-4 fill-white/60" />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 mt-4 origin-top-right rounded-xl bg-white border p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              onClick={() => {
                signOut()
              }}
            >
              <IconLogout2 />
              Sign out
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                ⌘E
              </kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}
