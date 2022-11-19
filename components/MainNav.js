import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../globals/store';

import Link from 'next/link';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function MainNav(props) {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const submitSearchField = (e) => {
    e.preventDefault(); // prevent the browser from automatically submitting the form
    setIsExpanded(false);

    let queryString = `title=true&q=${searchField}`;

    setSearchHistory((current) => [...current, queryString]);
    router.push(`/artwork?${queryString}`);
  };

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* <Navbar className='navbar navbar-expand-lg fixed-top navbar-light bg-light'></Navbar> {/* same as "NavBar" component below *\/} */}
      <Navbar className='fixed-top' expand='lg' bg='light' variant='light' expanded={isExpanded} collapseOnSelect>
        <Container fluid>
          <Navbar.Brand href='/'>Muhammad Ahmed</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' onClick={toggleNavbar} />
          <Navbar.Collapse id='collapse navbar-collapse navbarScroll'>
            <Nav className='me-auto'>
              <Link href='/' passHref legacyBehavior>
                <Nav.Link
                  onClick={(e) => {
                    setIsExpanded(false);
                  }}
                >
                  Home
                </Nav.Link>
              </Link>
              <Link href='/search' passHref legacyBehavior>
                <Nav.Link
                  onClick={(e) => {
                    setIsExpanded(false);
                  }}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            &nbsp;
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
            &nbsp;
            <Nav>
              <NavDropdown title='User Name' id='basic-nav-dropdown'>
                <Link href='/favorites' passHref legacyBehavior>
                  <NavDropdown.Item onClick={toggleNavbar}>Favorites</NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
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
