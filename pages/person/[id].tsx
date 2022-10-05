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
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossorigin="anonymous" />

      </Head>


      <main>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/person">People</Breadcrumb.Item>
          <Breadcrumb.Item active href="#">Person</Breadcrumb.Item>
        </Breadcrumb>

        <h1>Person</h1>
 
        <Table striped borderless hover>
          <tbody>{names.map((ident) => (<tr><th>Name</th><td>{ident.content}</td></tr>))}
            {"born" in data ? <tr><th>Born</th><td>{data.born.timespan.begin_of_the_begin}</td></tr> : ""}
            {"died" in data ? <tr><th>Died</th><td>{data.died.timespan.begin_of_the_begin}</td></tr> : ""}
            {"referred_to_by" in data ? <tr><th>Description</th><td></td></tr> : ""}
          {"referred_to_by" in data ? data.referred_to_by.map((statement) => (<tr><td>{statement.classified_as[0]._label}</td><td>{statement.content}</td></tr>)): ""}

            <tr><th>Identifiers</th><td></td></tr>
            {identifiers.map((ident) => (<tr><td></td><td>{ident.content} <sup>attributed by:<a href="{ident.attributed_by[0].carried_out_by[0].id}">{ident.attributed_by[0].carried_out_by[0].id}</a></sup></td></tr>))}
         
          {"equivalent" in data ? <tr><th>Equivalent Entities</th><td></td></tr> : ""}
          {"equivalent" in data ? data.equivalent.map((entity) => (<tr><td></td><td><a target="_new" href={entity.id}>{entity.id}</a> <sup>{entity.type}</sup></td></tr>)): ""}

          {"assigned_by" in data ?  <tr><th>Attribute Assignments</th><td></td></tr> : ""}
          {"assigned_by" in data ? data.assigned_by.map((assign) => (<tr><th>Assignment</th><td>
            {
            assign.involved.map((set) => ( 
              <div>
              <h5>{set._label}</h5> 

              <ol> {set.about.map((s) => (
                <li key={s.id}><a href={'/exhibition/' + s.id.split("/").pop()}>{s._label}</a></li>
              ))}</ol>
            </div> ))}</td></tr>)): ""}

           
            </tbody></Table>







      </main>
    </div>


  )
}

export default Person

