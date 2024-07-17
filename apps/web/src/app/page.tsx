'use client'
import { useQuery } from '@apollo/client'
import { CompaniesDocument } from '@parkspace/network/src/gql/generated'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function Home() {
  const { data, loading } = useQuery(CompaniesDocument)
  const [open, setOpen] = useState(false)
  return (
    <main className="p-8">
      <div>
        {data?.companies.map((company) => (
          <div className="text-black" key={company.id}>
            <div>{company.displayName}</div>
            <div>{company.description}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
