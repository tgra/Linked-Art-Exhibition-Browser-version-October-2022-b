import type { Event } from '../../interfaces'
import useSwr from 'swr'
import Link from 'next/link'
import Head from 'next/head'


const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index() {
  const { data, error } = useSwr<Event[]>('/api/persons', fetcher)

  //console.log(data)
  if (error) return <div>Failed to load persons</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="container">
    <div></div>
        <div><Link href="/">Back to home</Link></div>
      <Head>
        <title> Alternative New York Exhibitions - People</title>
        
      
      </Head>


      <div>
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
      
        <div className="grid"/>
         
       
      </div>

  
    </div>


    
  )
}