import { ListCustomerBookings } from '@parkspace/ui/src/components/templates/ListCustomerBookings'
import { IsLoggedIn } from '@parkspace/ui/src/components/organisms/IsLoggedIn'

export default function Page() {
  return (
    <IsLoggedIn>
      <ListCustomerBookings />
    </IsLoggedIn>
  )
}
