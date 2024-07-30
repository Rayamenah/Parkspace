'use client'
import { SearchPage } from '@parkspace/ui/src/components/templates/SearchPage'
import { FormProviderSearchGarage } from '@parkspace/forms/src/searchGarages'

export default function Page() {
  return (
    <FormProviderSearchGarage>
      <SearchPage />
    </FormProviderSearchGarage>
  )
}
