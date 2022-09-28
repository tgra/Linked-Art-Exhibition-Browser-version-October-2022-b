import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import type { Event } from '../../interfaces'
import useSwr from 'swr'
import { resolve } from 'path';

const fetcher = (url: string) => fetch(url).then((res) => res.json())


const Exhibition = () => {
  const router = useRouter();
  const id = router.query;
  const { data, error } = useSwr<Event[]>('/api/event/' + id.id, fetcher)

  if (error) return <div>Failed to load exhibitions</div>
  if (!data) return <div>Loading...</div>
  
  console.log(data)
  // get file contents using id and api 

  return (
    <div>
    
  
      <Head>
        <title> Alternative New York Exhibition</title>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
    integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
    crossorigin="anonymous" />
      

      </Head>


<main>
<div class="nav"><Link  href="/">Back to home</Link>/<Link href="/exhibition">Exhibitions</Link></div>
  
      <div>
        <h2>Title</h2>
        <h3>{data._label}</h3>
        <h2>Date</h2>
        <p>Start: {data.timespan.begin_of_the_begin}   End: {data.timespan.end_of_the_end}</p>
       
       <h2>Organisation</h2>
       {data.carried_out_by._label}
       <h2>Location/Address</h2>
      {data.took_place_at._label}
        <h2>Persons associated with this exhibition</h2>
       
        {
        data.part.involved.map((set) => (
          
          <span>
            
          <h3>{set._label}</h3>
          <ol>
         
           { 
           
           set.about.map((agent) => (
              <li key={'/person/' + agent.id.split("/").pop()}><a href={'/person/' + agent.id.split("/").pop()}>{agent._label}</a></li>
            ))
           }
          </ol> 
          </span>    
        ))
        }






        </div>
       
</main>
       
</div>

  )
}

export default Exhibition





