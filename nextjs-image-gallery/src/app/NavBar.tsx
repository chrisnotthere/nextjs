"use client";

import Link from "next/link";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
// we can import directly from bootstrap because this is a client component
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <Navbar bg="primary" variant="dark" sticky="top" expand='sm' collapseOnSelect >
      <Container>
        <Navbar.Brand as={Link} href="/">
            NextJS Image Gallery
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            {/* <Nav.Link as={Link} href="/hello" active={pathname === '/hello'}>Hello</Nav.Link> */}
            <Nav.Link as={Link} href="/static" active={pathname === '/static'}>Static</Nav.Link>
            <Nav.Link as={Link} href="/dynamic" active={pathname === '/dynamic'}>Dynamic</Nav.Link>
            <Nav.Link as={Link} href="/isr" active={pathname === '/isr'}>ISR</Nav.Link>
            <NavDropdown title='Topics' id='topics-dropdown'>
              <NavDropdown.Item as={Link} href="/topics/cats" active={pathname === '/topics/cats'}>Cats</NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/dogs" active={pathname === '/topics/dogs'}>Dogs</NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/birds" active={pathname === '/topics/birds'}>Birds</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} href="/search" active={pathname === '/search'}>Search</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
