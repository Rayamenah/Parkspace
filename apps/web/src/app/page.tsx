'use client'
import { CarScene } from '@parkspace/3d/src/scenes/CarScene'
import { IconSearch } from '@tabler/icons-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="h-full">
      <div className="absolute top-16 bottom-0 left-0 right-0">
        {/* <CarScene /> */}
      </div>
      <div className="text-4xl mt-16 flex flex-col items-start space-y-3 sm:text-8xl">
        <div className="z-10 inline-block px-3 text-primary mt-2">Need</div>{' '}
        <div className="z-10 inline-block w-full max-w-md px-3 text-primary ">
          parking?
        </div>
        <Link
          href="/search"
          className="z-10 flex items-center gap-2 px-3 py-2 text-xl font-medium text-primary underline underline-offset-4"
        >
          <IconSearch className='text-primary' /> Search now
        </Link>
      </div>
    </main>
  )
}