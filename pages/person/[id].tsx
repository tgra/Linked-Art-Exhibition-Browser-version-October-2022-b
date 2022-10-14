import Link from 'next/link';
import Head from 'next/head';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';

export default function Person({ data }) {
  if (!data) return <div>No data...</div>
  
  let ids = data.identified_by
  let names = [];
  let identifiers = [];
  for (var idx in ids) {

    switch (ids[idx].type) {

      case "Name":
        names.push(ids[idx])
        break

        case "Identifier":
          identifiers.push(ids[idx])
          break
    }


  }

  


  return (
    <div>


      <Head>
        <title> Alternative New York Exhibition - Person</title>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossOrigin="anonymous" />

      </Head>


      <main>


        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/person">People</Breadcrumb.Item>
          <Breadcrumb.Item active href="#">Person</Breadcrumb.Item>
        </Breadcrumb>



         
<div className="container">
<div className="row">
<div className="col col-lg-3 facet-menu">
<h2>{process.env.NEXT_PUBLIC_PERSON_BREADCRUMB_SINGULAR}</h2>
      
        

     
    
 
  
</div>
<div className="col">


 
        <Table striped borderless hover>
          <tbody>{names.map((ident) => (<tr><th>Name</th><td>{ident.content}</td></tr>))}
            {"born" in data ? <tr><th>Born</th><td>{data.born.timespan.identified_by[0].content}</td></tr> : ""}
            {"died" in data ? <tr><th>Died</th><td>{data.died.timespan.identified_by[0].content}</td></tr> : ""}
            
            {"referred_to_by" in data ? <tr><th>Description</th><td></td></tr> : ""}
          {"referred_to_by" in data ? data.referred_to_by.map((statement) => (<tr><td>{statement.classified_as[0]._label}</td><td>{statement.content}</td></tr>)): ""}

            <tr><th>Identifiers</th><td></td></tr>
            {identifiers.map((ident) => (<tr><td></td><td>{ident.content} <sup>attributed by:<Link href={ident.attributed_by[0].carried_out_by[0].id.replace(process.env.NEXT_PUBLIC_BASE_URI,"").toLowerCase()}>{ident.attributed_by[0].carried_out_by[0]._label}</Link></sup></td></tr>))}
         
          {"equivalent" in data ? <tr><th>Equivalent Entities</th><td></td></tr> : ""}
          {"equivalent" in data ? data.equivalent.map((entity) => (<tr><td></td><td><Link target="_new" href={entity.id}>{entity.id}</Link> <sup>{entity.type}</sup></td></tr>)): ""}

          {"assigned_by" in data ?  <tr><th>Attribute Assignments</th><td></td></tr> : ""}
          {"assigned_by" in data ? data.assigned_by.map((assign) => (<tr><th>Assignment</th><td>
            {
            assign.involved.map((set) => ( 
              <div>
              <h5>{set._label}</h5> 

              <ol> {set.about.map((s) => (
                <li key={s.id}><Link href={'/exhibition/' + s.id.split("/").pop()}>{s._label}</Link></li>
              ))}</ol>
            </div> ))}</td></tr>)): ""}

           
            </tbody></Table>



</div>
</div>
</div>

      </main>
    </div>


  )
}




export async function getStaticPaths() {

  const res = await fetch('http://localhost:3000/api/persons_all')
  const data = await res.json()

 
  const ids = data.result.map((person) => (
    {params:{id:person.id},}))
  return {
    paths: [...ids],
    fallback: false, // can also be true or 'blocking'
  }
}


export async function getStaticProps({ params }) {
  
  const res = await fetch('http://localhost:3000/api/person/' + params.id )
  const data = await res.json()

  
  return {
    props: {
      data,
    },
  }
}



/*


 const { data, error } = useSwr<Event[]>('/data/person/' + id.id + '.json', fetcher)

  if (error) return <div>Failed to load person data</div>


  */