import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../globals/store';

import { readToken, removeToken } from '../lib/authenticate';
import { addToHistory } from '../lib/userData';

import Link from 'next/link';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function MainNav(props) {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const token = readToken();

  const submitSearchField = async (e) => {
    e.preventDefault(); // prevent the browser from automatically submitting the form
    setIsExpanded(false);

    let queryString = `title=true&q=${searchField}`;

    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
  };

  const logout = () => {
    setIsExpanded(false);
    removeToken();
    router.push(`/login`);
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
                  active={router.pathname === '/'}
                  onClick={(e) => {
                    setIsExpanded(false);
                  }}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href='/search' passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === '/search'}
                    onClick={(e) => {
                      setIsExpanded(false);
                    }}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {!token && (
              <Nav>
                <Link href='/register' passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === '/register'}
                    onClick={(e) => {
                      setIsExpanded(false);
                    }}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href='/login' passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === '/login'}
                    onClick={(e) => {
                      setIsExpanded(false);
                    }}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
            {token && (
              <>
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
              </>
            )}
            <Nav>
              {token && (
                <NavDropdown title={token.userName} id='basic-nav-dropdown'>
                  <Link href='/favorites' passHref legacyBehavior>
                    <NavDropdown.Item active={router.pathname === '/favorites'} onClick={toggleNavbar}>
                      Favorites
                    </NavDropdown.Item>
                  </Link>
                  <Link href='/history' passHref legacyBehavior>
                    <NavDropdown.Item active={router.pathname === '/history'} onClick={toggleNavbar}>
                      History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <Link href='/history' passHref legacyBehavior>
                    <NavDropdown.Item active={router.pathname === '/history'} onClick={logout}>
                      Logout
                    </NavDropdown.Item>
                  </Link>
                </NavDropdown>
              )}
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
