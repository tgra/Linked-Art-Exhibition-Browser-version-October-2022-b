import Link from 'next/link';
import Head from 'next/head';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';

export default function Group({ data }) {
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
        <title> Alternative New York Exhibition - Group</title>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossOrigin="anonymous" />

      </Head>


      <main>
        <Breadcrumb>
          <Breadcrumb.Item href="/">{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
          <Breadcrumb.Item href="/group">{process.env.NEXT_PUBLIC_GROUP_BREADCRUMB_PLURAL}</Breadcrumb.Item>
          <Breadcrumb.Item active href="#">{process.env.NEXT_PUBLIC_GROUP_BREADCRUMB_SINGULAR}</Breadcrumb.Item>
        </Breadcrumb>

        <h1>{process.env.NEXT_PUBLIC_BREADCRUMB_SINGULAR}</h1>
 
        <Table striped borderless hover>
          <tbody>{names.map((ident) => (<tr><th>Name</th><td>{ident.content}</td></tr>))}
            {"born" in data ? <tr><th>Born</th><td>{data.born.timespan.begin_of_the_begin}</td></tr> : ""}
            {"died" in data ? <tr><th>Died</th><td>{data.died.timespan.begin_of_the_begin}</td></tr> : ""}
            {"referred_to_by" in data ? <tr><th>Description</th><td></td></tr> : ""}
          {"referred_to_by" in data ? data.referred_to_by.map((statement) => (<tr><td>{statement.classified_as[0]._label}</td><td>{statement.content}</td></tr>)): ""}

            <tr><th>Identifiers</th><td></td></tr>
            {identifiers.map((ident) => (<tr><td></td><td>{ident.content} <sup>attributed by:<Link href={ident.attributed_by[0].carried_out_by[0].id.toLowerCase().replace(process.env.NEXT_PUBLIC_BASE_URI,'')}>{ident.attributed_by[0].carried_out_by[0]._label}</Link></sup></td></tr>))}
         
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


      </main>
    </div>


  )
}


export async function getStaticPaths() {

  const res = await fetch('http://localhost:3000/api/groups_all')
  const data = await res.json()

 
  const ids = data.result.map((group) => (
    {params:{id:group.id.replace('https://www.moma.org/data/Group/','')},}))
  return {
    paths: [...ids],
    fallback: false, // can also be true or 'blocking'
  }
}


export async function getStaticProps({ params }) {
  
  const res = await fetch('http://localhost:3000/api/group/' + params.id )
  const data = await res.json()

  
  return {
    props: {
      data,
    },
  }
}