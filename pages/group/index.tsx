import type { Event } from '../../interfaces'
import useSwr from 'swr'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router';
import Pagination from 'react-bootstrap/Pagination';

import Table from 'react-bootstrap/Table';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index(req: NextApiRequest) {
  const { isReady, query }: string | any = useRouter();
  let page = 1;
  let pp = process.env.NEXT_PUBLIC_RECORDS_PER_PAGE;;
  
  if (query.page){ page = query.page;}
  

  let pagination = Paging(page,pp)

  const { data, error } = useSwr<Event[]>('/api/groups?page=' + page + '&pp=' + pp , fetcher)

  //console.log(data)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  
  return (
    <div>
    
        
      <Head>
        <title> Alternative New York Exhibitions - Groups</title>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
    integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
    crossorigin="anonymous" />
      
      </Head>

  
<main>
<Breadcrumb>
      <Breadcrumb.Item href="/">{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
      <Breadcrumb.Item active href="/exhibition">{process.env.NEXT_PUBLIC_GROUP_BREADCRUMB_PLURAL}</Breadcrumb.Item>
    
</Breadcrumb> 
     
        <h1>{process.env.NEXT_PUBLIC_GROUP_TITLE}</h1>
        <p>{process.env.NEXT_PUBLIC_GROUP_DESCRIPTION}</p>
        {pagination}
       

        <Table  striped borderless hover size="sm">
      <thead>
        <tr>    
          <th>Title</th>
</tr>  
      </thead>
      <tbody>
      {
      data.result.map((obj) => (
        <tr key={obj.id}>
          <td><Link href={obj.id.replace(process.env.NEXT_PUBLIC_BASE_URI,'')} >{obj.label}</Link></td>
        </tr>
      ))}
      </tbody>
      </Table>
        

      </main>
    </div>


    
  )
}




function Paging(page,pp) {
 
  page = parseInt(page);
  pp = parseInt(pp);
  let first_url = "?page=1&pp="+ pp;

  let prev_url = "?page=" + (page - 1) + "&pp="+ pp;
  let next_url = "?page=" + (page + 1) + "&pp="+ pp;
  let last_url = "?page=last&pp="+ pp;
  let items = [<Pagination.First href={first_url}/>,<Pagination.Prev href={prev_url}/>];

  const s = page;
  const e = parseInt(s) + 9;
  for (let number = s; number <= e; number++) {

    let url = "?page=" + (number) + "&pp="+ pp;

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
