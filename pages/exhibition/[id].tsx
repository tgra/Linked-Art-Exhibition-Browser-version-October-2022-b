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
  


  let carried_out_by = (("carried_out_by" in data) && (("_label" in data.carried_out_by[0]) || ("id" in data.carried_out_by[0])) )  ? true : false;
   
 
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
      <Breadcrumb.Item href="/">{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
      <Breadcrumb.Item href="/exhibition">{process.env.NEXT_PUBLIC_ACTIVITY_BREADCRUMB_PLURAL}</Breadcrumb.Item>
      <Breadcrumb.Item active href="#">{process.env.NEXT_PUBLIC_ACTIVITY_BREADCRUMB_SINGULAR}</Breadcrumb.Item>
</Breadcrumb> 

 
       
<h1>Exhibition</h1>
<Table>

  { carried_out_by == true  ? <tr><th>Carried out by</th><td><ul>{data.carried_out_by.map((obj) => (<li key={obj.id.replace(process.env.NEXT_PUBLIC_BASE_URI, "")}><a href={obj.id.replace(process.env.NEXT_PUBLIC_BASE_URI, "")}>{"_label" in obj ? obj._label : obj.id}</a></li>))}</ul></td></tr> : ""}
  


       
  

</Table>






        
       
</main>
</div>

  )
}

export default Exhibition





