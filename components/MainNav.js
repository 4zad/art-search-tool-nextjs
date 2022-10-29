import { useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';

export default function MainNav(props) {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');

  function submitSearchField(e) {
    e.preventDefault(); // prevent the browser from automatically submitting the form
    router.push(`/artwork?title=true&q=${searchField}`);
  }

  return (
    <>
      {/* <Navbar className='fixed-top navbar-light bg-light'></Navbar> {/* same as "NavBar" component below *\/} */}
      <Navbar className='fixed-top' bg='light' variant='light'>
        <Container fluid>
          <Navbar.Brand href='/'>Muhammad Ahmed</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/search'>Advanced Search</Nav.Link>
            </Nav>
            <Form
              className='d-flex'
              onChange={(e) => setSearchField(e.target.value)}
              onSubmit={(e) => submitSearchField(e)}
            >
              <Form.Control
                className='me-2'
                type='search'
                placeholder='Search'
                aria-label='Search field'
                defaultValue={searchField}
              />
              <Button variant='outline-info' type='submit'>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </>
  );
}

// defines default props if any properties did not recieve values when rendering component
MainNav.defaultProps = {};
