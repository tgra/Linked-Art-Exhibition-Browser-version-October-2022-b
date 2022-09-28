import Head from 'next/head'
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


export default function Home({buildTimestamp}) {
  return (


    <div>
      <Head>
        <title>MOMA and Alternative New York Exhibitions</title>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
        <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
  integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
  crossorigin="anonymous"
/>
        
      </Head>

      <main>
        


        <Container>
        <h1 >MOMA &amp; Alternative New York Exhibitions</h1>
        <h1></h1>

        <p className="description">
          This is a demo visualisation of art exhibition data represented using the Linked Art data model.
        </p>
      <Row>
        <Col><Card style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title>Exhibitions</Card.Title>
      
        <Card.Text>
        
          </Card.Text>
          <Link href="/exhibition?page=1&pp=10">Explore exhibitions</Link>
          </Card.Body>
          </Card></Col>
        <Col>
        
        <Card style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title>People</Card.Title>
      
        <Card.Text>
       
          </Card.Text>
          <Card.Link href="/person?page=1&pp=10">Explore people</Card.Link>
          </Card.Body>
          
          </Card></Col>
      </Row>
      
        




      <br/>
      <footer>
     App built at: {Date(Number(buildTimestamp))}
     </footer>
        </Container>
      
       </main></div>
        
   

    

  )
}


export const getStaticProps = () => {
  return {
    props: {
      buildTimestamp: Date.now()
    }
  }
}