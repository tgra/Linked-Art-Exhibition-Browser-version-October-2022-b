import type { Event } from '../../interfaces'
import useSwr from 'swr'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router';
import Pagination from 'react-bootstrap/Pagination';

import Table from 'react-bootstrap/Table';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
  faSearch,
  faAmbulance,
  faAnchor,
  faSortAlphaUp ,
  faSortAlphaDown
} from "@fortawesome/free-solid-svg-icons";





const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index(req: NextApiRequest) {


  
  const { isReady, query }: string | any = useRouter();
  let page = 1;
  let pp = 10;
  let sort = "asc";
  let orderby = "label";
  
  if (query.page){ page = query.page;}
  if (query.pp){ pp = query.pp;}

  if (query.sort){ sort = query.sort;}
  if (query.orderby){ orderby = query.orderby;}
  let pagination = Paging(page,pp, sort, orderby)

  const { data, error } = useSwr<Event[]>('/api/events?page=' + page + '&pp=' + pp + '&sort=' + sort + '&orderby=' + orderby , fetcher)

  //console.log(data)
  if (error) return <div>Failed to load exhibitions</div>
  if (!data) return <div>Loading...</div>

  Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false,
    configurable: true
  });

  return (
    <div>
    
        
      <Head>
        <title> Alternative New York Exhibitions</title>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
    integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
    crossorigin="anonymous" />
      
      </Head>

  
<main>
<Breadcrumb>
      <Breadcrumb.Item href="/">{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
      <Breadcrumb.Item active href="/exhibition">{process.env.NEXT_PUBLIC_ACTIVITY_BREADCRUMB_PLURAL}</Breadcrumb.Item>
    
</Breadcrumb> 
     
       
       
<div class="container">
<div class="row">
<div class="col col-lg-3 facet-menu">
<h2>{process.env.NEXT_PUBLIC_ACTIVITY_TITLE}</h2>
        <p>{process.env.NEXT_PUBLIC_ACTIVITY_DESCRIPTION}</p>
        

      <span class="fs-5 fw-semibold">Facets</span>
   
    
 
  
</div>
<div class="col">

{pagination}
        <Table  striped borderless hover size="sm">
      <thead>
        <tr>
        {JSON.parse(process.env.NEXT_PUBLIC_ACTIVITY_LIST_COLUMNS).columns.map((obj) => <th>{obj.label.capitalize()}</th>)}
 
        </tr>
        <tr>
        {JSON.parse(process.env.NEXT_PUBLIC_ACTIVITY_LIST_COLUMNS).columns.map((obj) => <td><a href={"?orderby=" + obj.label + "&sort=asc"}><FontAwesomeIcon icon={faSortAlphaDown} /></a>&nbsp;&nbsp;<a href={"?orderby=" + obj.label + "&sort=desc"}><FontAwesomeIcon icon={faSortAlphaUp} /></a></td>)}
 
        </tr>
       
      </thead>
      <tbody>
      
       
      {
       

      data.result.map((event) => (

        
        
        

        <tr key={event.id}>
  
          <td><Link href="/exhibition/[id]" as={`/exhibition/${event.id}`}>{event.label}</Link></td>


          <td>{event.org}</td>
          <td>{event.location}</td>
          <td>{event.start == "" ?   "" : new Date(event.start).toISOString().split('T')[0]}</td>
          <td>{ String(event.end).split("T")[0] == "undefined" ? event.end : String(event.end).split("T")[0]}</td>
         
        </tr>
       
      ))}
    
      
      </tbody>
      </Table>
        
      </div>
</div></div>
      </main>
    </div>


    
  )
}




function Paging(page,pp, sort, orderby) {
 
  page = parseInt(page);
  pp = parseInt(pp);
  let first_url = "?page=1&pp="+ pp + "&sort=" + sort + "&orderby=" + orderby;

  let prev_url = "?page=" + (page - 1) + "&pp="+ pp+ "&sort=" + sort + "&orderby=" + orderby;
  let next_url = "?page=" + (page + 1) + "&pp="+ pp+ "&sort=" + sort + "&orderby=" + orderby;
  let last_url = "?page=last&pp="+ pp + "&sort=" + sort + "&orderby=" + orderby;
  let items = [<Pagination.First href={first_url}/>,<Pagination.Prev href={prev_url}/>];

  const s = page;
  const e = parseInt(s) + 4;
  for (let number = s; number <= e; number++) {

    let url = "?page=" + (number) + "&pp="+ pp + "&sort=" + sort + "&orderby=" + orderby;

    items.push(
      <Pagination.Item key={number} href={url} active={number == page}>
        {number}
      </Pagination.Item>,
    );
    
  }
  items.push(<Pagination.Next href={next_url}/>,<Pagination.Last href={last_url}/>)
  
  const pagination = (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
  
  return pagination;

}
