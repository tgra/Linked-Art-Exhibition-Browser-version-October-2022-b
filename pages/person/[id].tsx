import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import type { Event } from '../../interfaces'
import useSwr from 'swr'
import { resolve } from 'path';

const fetcher = (url: string) => fetch(url).then((res) => res.json())


const Person = () => {
  const router = useRouter();
  const id = router.query;
  const { data, error } = useSwr<Event[]>('/api/person/' + id.id, fetcher)

  if (error) return <div>Failed to load person data</div>
  if (!data) return <div>Loading...</div>
  
  console.log(data)
  // get file contents using id and api 

  return (
    <div className="container">
    <div></div>
        <div><Link href="/">Back to home</Link> / <Link href="/person">Persons</Link></div>
      <Head>
        <title> Alternative New York Exhibition - Person</title>
        
      
      </Head>

      <div>
        <h2>{data._label}</h2>

        
        <h2>Exhibitions</h2>

{
  
        data.assigned_by[0].involved[0].about.map((exhibition) => (
         
         
          <p><a href={'/exhibition/' + exhibition.id.split("/").pop()}>{exhibition._label}</a></p>
         


        ))
        
        
        }
        
       
     
       
        </div>
        </div>


  )
}

export default Person

