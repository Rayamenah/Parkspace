import { ManageValets } from '@parkspace/ui/src/components/templates/ManageValets'
import { IsLoggedIn } from '@parkspace/ui/src/components/organisms/IsLoggedIn'

export default function Page() {
  return (
    <IsLoggedIn>
      <ManageValets />
    </IsLoggedIn>
  )
}
