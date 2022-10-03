import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import type { Event } from '../../interfaces'
import useSwr from 'swr'

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';
const fetcher = (url: string) => fetch(url).then((res) => res.json())


const Person = () => {

  const router = useRouter();
  const id = router.query;
  const { data, error } = useSwr<Event[]>('/api/person/' + id.id, fetcher)

  if (error) return <div>Failed to load person data</div>
  if (!data) return <div>Loading...</div>
  
 
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
      <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/person">People</Breadcrumb.Item>
      <Breadcrumb.Item active href="#">Person:{data._label}</Breadcrumb.Item>
</Breadcrumb> 

      <h1>Person:{data._label}</h1>

      <Table striped borderless hover>
        <tbody>
            <tr><th>Name</th><td>{data._label}</td></tr>
            <tr><th>Description</th><td>{"referred_to_by" in data ? data.referred_to_by[0].content : ''}</td></tr>
            <tr><th>Born</th><td>{data.born.timespan.begin_of_the_begin}</td></tr>
            <tr><th>Died</th><td>{data.died.timespan.begin_of_the_begin}</td></tr>
            <tr><th>Identifiers</th><td><ol>{data.identified_by.map((id) => (
              <li key={id.id}><a target="_new" href={id.id}>{id._label} ({id.id})</a></li>


            ))}</ol></td></tr>
            <tr><th>Exhibitions</th><td><ol>
{
        data.assigned_by[0].involved[0].about.map((exhibition) => (
          <li key={exhibition.id}><a href={'/exhibition/' + exhibition.id.split("/").pop()}>{exhibition._label}</a></li>
        )) }
 </ol></td></tr></tbody></Table>
      

        
       


     
       </main>
        </div>
        

  )
}

export default Person

