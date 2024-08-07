import { LocationInfo, ViewState } from '@parkspace/util/types'
import { useMap } from 'react-map-gl'
import { Autocomplete } from '../../atoms/Autocomplete'
import { useSearchLocation } from '@parkspace/util/hooks/useSearchLocation'
import { majorCitiesLocationInfo } from '@parkspace/util/constants'

export const SearchPlaceBox = ({
  onLocationChange,
}: {
  onLocationChange?: (location: ViewState) => void
}) => {
  const { current: map } = useMap()
  const { loading, locationInfo, searchText, setLoading, setSearchText } =
    useSearchLocation()
  return (
    <Autocomplete<LocationInfo>
      options={locationInfo?.length ? locationInfo : majorCitiesLocationInfo}
      isOptionEqualToValue={(option, value) =>
        option.placeName === value.placeName
      }
      noOptionsText={searchText ? 'No options.' : 'Type something...'}
      getOptionLabel={(x) => x.placeName}
      onInputChange={(_, e) => {
        setLoading(true)
        setSearchText(e)
      }}
      loading={loading}
      onChange={async (_, v) => {
        if (v) {
          const { latLng, placeName } = v
          map?.flyTo({
            center: { lat: latLng[0], lng: latLng[1] },
            zoom: 12,
            // essential: true,
          })
          if (onLocationChange) {
            onLocationChange({ latitude: latLng[0], longitude: latLng[1] })
          }
        }
      }}
    />
  )
}
