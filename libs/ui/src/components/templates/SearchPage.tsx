'use client'
import { FormTypeSearchGarage } from '@parkspace/forms/src/searchGarages'
import { initialViewState } from '@parkspace/util/constants'
import { toLocalISOString } from '@parkspace/util/date'
import { IconArrowDown, IconRotateClockwise2 } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ViewStateChangeEvent } from 'react-map-gl'
import { HtmlInput } from '../atoms/HtmlInput'
import { IconType } from '../molecules/IconTypes'
import { Map } from '../organisms/map/Map'
import { Panel } from '../organisms/map/Panel'
import { SearchPlaceBox } from '../organisms/map/SearchPlacesBox'
import { DefaultZoomControls } from '../organisms/map/ZoomControls'
import { FilterSidebar } from '../organisms/search/FilterSidebar'
import { ShowGarages } from '../organisms/search/ShowGarages'
import { Loader } from '../molecules/Loader'

export const SearchPage = () => {
  const [loading, setLoading] = useState(true)
  const { register, setValue, watch, trigger } =
    useFormContext<FormTypeSearchGarage>()
  const formData = watch()
  const handleMapChange = useCallback(
    (targets: ViewStateChangeEvent['target']) => {
      const bounds = targets.getBounds()

      const locationFilter = {
        ne_lat: bounds?.getNorthEast().lat || 0,
        ne_lng: bounds?.getNorthEast().lng || 0,
        sw_lat: bounds?.getSouthWest().lat || 0,
        sw_lng: bounds?.getSouthWest().lng || 0,
      }
      console.log('location:', locationFilter)
      setValue('locationFilter', locationFilter)
    },
    [setValue],
  )

  return (
    <Map
      onLoad={(e) => {
        handleMapChange(e.target)
        setLoading(false)
      }}
      onDragEnd={(e) => handleMapChange(e.target)}
      onZoomEnd={(e) => handleMapChange(e.target)}
      initialViewState={initialViewState}
    >
      {loading && (
        <IconRotateClockwise2 className="animate-spin absolute top-1/2 left-1/2" />
      )}
      <ShowGarages />
      <Panel position="left-top" className="mt-20">
        <div className="flex flex-col items-stretch">
          <SearchPlaceBox />
          <div className="flex relative pl-1 flex-col mt-1 bg-white/40 items-center gap-1 backdrop-blur-sm">
            <div className=" absolute left-[1px] top-1/2 -translate-y-1/2 ">
              <IconArrowDown className="p-1" />
            </div>
            <div className="flex gap-1 items-center">
              <IconType time={formData.startTime} />
              <HtmlInput
                type="datetime-local"
                className="w-full p-2 text-lg font-light border-0"
                min={toLocalISOString(new Date()).slice(0, 16)}
                {...register('startTime', {
                  onChange() {
                    trigger('startTime')
                  },
                })}
              />
            </div>
            <div className="flex gap-1 items-center">
              <IconType time={formData.endTime} />
              <HtmlInput
                min={toLocalISOString(new Date()).slice(0, 16)}
                type="datetime-local"
                className="w-full p-2 text-lg font-light border-0"
                {...register('endTime', {
                  onChange() {
                    trigger('endTime')
                  },
                })}
              />
            </div>
          </div>
        </div>
      </Panel>
      <Panel position="right-center">
        <DefaultZoomControls />
      </Panel>
      <Panel position="right-top" className="mt-20">
        <FilterSidebar />
      </Panel>
    </Map>
  )
}
