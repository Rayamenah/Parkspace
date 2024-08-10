'use client'
import { IsLoggedIn } from '@parkspace/ui/src/components/organisms/IsLoggedIn'
import { IsManager } from '@parkspace/ui/src/components/organisms/IsManager'
import { ListGarages } from '@parkspace/ui/src/components/organisms/ListGarages'

export default function Home() {
  return (
    <IsLoggedIn>
      <IsManager>
        {(companyId) => <ListGarages companyId={companyId} />}
      </IsManager>
    </IsLoggedIn>
  )
}
