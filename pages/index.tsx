import Head from 'next/head'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Home() {

  const activity_link = "/exhibition?page=1&pp=" + process.env.NEXT_PUBLIC_RECORDS_PER_PAGE;

  const person_link = "/person?page=1&pp=" + process.env.NEXT_PUBLIC_RECORDS_PER_PAGE;

  const group_link = "/group?page=1&pp=" + process.env.NEXT_PUBLIC_RECORDS_PER_PAGE;

  return (

    <div>
      <Head>
        <title>MOMA and Alternative New York Exhibitions</title>
          <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossOrigin="anonymous"
        ></link>
 <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin></script>
      
      </Head>

      <main>
      <Container>
        <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
          <p className="description">{process.env.NEXT_PUBLIC_APP_DESCRIPTION}</p>
          
          <Row>
            <Col><Card>
              <Card.Body>
                <Card.Title>{process.env.NEXT_PUBLIC_ACTIVITY_TITLE}</Card.Title>
                <Card.Text>{process.env.NEXT_PUBLIC_ACTIVITY_DESCRIPTION}</Card.Text>
                <Card.Link href={activity_link}>{process.env.NEXT_PUBLIC_ACTIVITY_LINK}</Card.Link>
              </Card.Body>
            </Card>
              <Card>
              <Card.Body>
                <Card.Title>{process.env.NEXT_PUBLIC_PERSON_TITLE}</Card.Title>
                <Card.Text>{process.env.NEXT_PUBLIC_PERSON_DESCRIPTION}</Card.Text>
                <Card.Link href={person_link}>{process.env.NEXT_PUBLIC_PERSON_LINK}</Card.Link>
              </Card.Body>
              </Card>
              <Card>
              <Card.Body>
                <Card.Title>{process.env.NEXT_PUBLIC_GROUP_TITLE}</Card.Title>
                <Card.Text>{process.env.NEXT_PUBLIC_GROUP_DESCRIPTION}</Card.Text>
                <Card.Link href={group_link}>{process.env.NEXT_PUBLIC_GROUP_LINK}</Card.Link>
              </Card.Body>
              </Card>
              
              </Col>
          </Row>
        </Container>
      </main>
     
    </div>



  )
}


