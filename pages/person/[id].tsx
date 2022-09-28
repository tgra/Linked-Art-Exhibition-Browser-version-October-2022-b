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
    <div>
    
        
      <Head>
        <title> Alternative New York Exhibition - Person</title>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
    integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
    crossorigin="anonymous" />
      
      </Head>


      <main>
      <div class="nav"><Link href="/">Back to home</Link> / <Link href="/person">Persons</Link></div>
        <h2>{data._label}</h2>

        
        <h2>Exhibitions</h2>

<ol>
{
  
        data.assigned_by[0].involved[0].about.map((exhibition) => (
         
         
          <li><a href={'/exhibition/' + exhibition.id.split("/").pop()}>{exhibition._label}</a></li>
         


        ))
        
        
        }
        
        </ol>
     
       </main>
        </div>
        

  )
}

export default Person

