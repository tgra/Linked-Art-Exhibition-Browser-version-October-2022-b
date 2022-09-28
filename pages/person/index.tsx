import type { Event } from '../../interfaces'
import useSwr from 'swr'
import Link from 'next/link'
import Head from 'next/head'
import { Main } from 'next/document'


const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index() {
  const { data, error } = useSwr<Event[]>('/api/persons', fetcher)

  //console.log(data)
  if (error) return <div>Failed to load persons</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
 
       
      <Head>
        <title> Alternative New York Exhibitions - People</title>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
    integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
    crossorigin="anonymous" />
      
      </Head>

<main>
<Link href="/">Back to home</Link>


        <h1 className="title">People</h1>

        <p className="description">
          List of alternative New York exhibition - people
        </p>
        <ol>
      {
      data.result.map((person) => (
        <li key={person.id}>
        <Link href="/person/[id]" as={`/person/${person.id}`}>{person.label}</Link>
      </li>
      ))}
    </ol>
      
       
    
  </main>

  
    </div>


    
  )
}