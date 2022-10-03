import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import type { Event } from '../../interfaces'
import useSwr from 'swr'

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';
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
<Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/exhibition">Exhibitions</Breadcrumb.Item>
      <Breadcrumb.Item active href="#">Exhibition</Breadcrumb.Item>
</Breadcrumb> 

 
       
<h1>Exhibition:{data._label}</h1>
<Table>
      
        <tr><th>Organisation</th> <td>{data.carried_out_by._label}</td></tr>
        <tr><th>Location</th><td>{data.took_place_at._label}</td></tr>
        <tr><th>Start</th><td>{data.timespan.begin_of_the_begin}</td></tr>
        <tr><th>End</th><td>{data.timespan.end_of_the_end}</td></tr>
          <tr><th>People Associated With Exhibition</th><td></td></tr>

       
        {
        data.part.involved.map((set) => (
          
          <tr>
            
          <td><b>Role</b> {set._label}</td>
          <td>
          <ol>
         
           { 
           
           set.about.map((agent) => (
              <li  key={'/person/' + agent.id.split("/").pop()}><a href={'/person/' + agent.id.split("/").pop()}>{agent._label}</a></li>
            ))
           }
          </ol> 
          </td>
          </tr>    
        ))
        }

</Table>






        
       
</main>
</div>

  )
}

export default Exhibition





