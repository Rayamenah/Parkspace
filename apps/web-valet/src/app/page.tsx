'use client'
import { IsLoggedIn } from '@parkspace/ui/src/components/organisms/IsLoggedIn'
import { IsValet } from '@parkspace/ui/src/components/organisms/IsValet'
import { ValetHome } from '@parkspace/ui/src/components/templates/ValetHome'

export default function Home() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => (
          <IsValet uid={uid}>
            <ValetHome />
          </IsValet>
        )}
      </IsLoggedIn>
    </main>
  )
}
