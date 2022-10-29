import { useState, useRouter } from 'react';

import Link from 'next/link';

import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';

export default function MainNav(props) {
  const router = useRouter();
  const [searchField, setSearchField] = useState('Homer Simpson');

  function submitSearchField() {
    e.preventDefault(); // prevent the browser from automatically submitting the form
    router.push(`/artwork?title=true&q=${searchField}`);
  }

  return (
    <>
      {/* <Navbar className='fixed-top navbar-dark bg-dark'></Navbar> {/* same as "NavBar" component below *\/} */}
      <Navbar className='fixed-top' bg='dark' variant='dark'>
        <Container fluid>
          <Navbar.Brand href='/'>Muhammad Ahmed</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav className='me-auto'>
              <Link href='/' passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href='/search' passHref>
                <Nav.Link>Advanced Search</Nav.Link>
              </Link>
            </Nav>
            <Form className='d-flex' onChange={(e) => setSearchField(e.target.value)} onSubmit={submitSearchField()}>
              <Form.Control
                className='me-2'
                type='search'
                placeholder='Search'
                aria-label='Search field'
                value={searchField}
              />
              <Button variant='outline-success' type='submit'>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

// defines default props if any properties did not recieve values when rendering component
MainNav.defaultProps = {};
