import { useQuery } from '@apollo/client'
import { CompaniesDocument } from '@parkspace/network/src/gql/generated'
import { add } from '@parkspace/sample-lib'
export default function Home() {
  const { data, error, loading } = useQuery(CompaniesDocument)

  return (
    <main>
      Hello {add(33, 44)}
      <div>
        {error && <div>error here</div>}
        {data?.companies.map((company) => <div key={company.id}></div>)}
      </div>
    </main>
  )
}
