import { SearchGaragesQuery } from '@parkspace/network/src/gql/generated'
import { useKeypress } from '@parkspace/util/hooks/useKeyPress'
import { useState } from 'react'
import { Marker } from '../map/MapMarker'
import { Dialog } from '../../atoms/Dialog'
import { ParkingIcon } from '../../atoms/ParkingIcon'
import { FormProviderBookSlot } from '@parkspace/forms/src/bookSlot'
import { useWatch } from 'react-hook-form'
import { FormTypeSearchGarage } from '@parkspace/forms/src/searchGarages'
import { BookSlotPopup } from '../BookSlotPopup'

export const GarageMarker = ({
  marker,
}: {
  marker: SearchGaragesQuery['searchGarages'][number]
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  useKeypress(['Escape'], () => setShowPopup(false))

  const { endTime, startTime } = useWatch<FormTypeSearchGarage>()

  if (!marker.address?.lat || !marker.address.lng) {
    return null
  }

  return (
    <>
      <Dialog
        title="Booking"
        widthClassName="max-w-3xl"
        open={showPopup}
        setOpen={setShowPopup}
      >
        <FormProviderBookSlot defaultValues={{ endTime, startTime }}>
          <BookSlotPopup garage={marker} />
        </FormProviderBookSlot>
      </Dialog>

      <Marker
        latitude={marker.address.lat}
        longitude={marker.address.lng}
        onClick={(e: { originalEvent: { stopPropagation: () => void } }) => {
          e.originalEvent.stopPropagation()
          setShowPopup((state) => !state)
        }}
      >
        <ParkingIcon />
      </Marker>
    </>
  )
}
