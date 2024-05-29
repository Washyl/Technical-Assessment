import Link from 'next/link';
import { Container, Button, Row, Col } from 'react-bootstrap';

const Home = () => (
  <Container className="text-center my-5">
    <h1>Home Page</h1>
    <Row>
      <Col>
        <Link href="/about" passHref>
          <Button variant="info" className="w-100 mb-2">About</Button>
        </Link>
      </Col>
    </Row>
    <Row>
      <Col>
        <Link href="/signup" passHref>
          <Button variant="success" className="w-100 mb-2">Sign Up</Button>
        </Link>
      </Col>
    </Row>
    <Row>
      <Col>
        <Link href="/login" passHref>
          <Button variant="primary" className="w-100 mb-2">Login</Button>
        </Link>
      </Col>
    </Row>
  </Container>
);

export default Home;
