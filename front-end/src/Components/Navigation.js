import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Navigation = props => (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">DSS Explorer</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav activeHref={window.location.pathname} bsStyle="pills">
          <NavItem eventKey={1} href="/dashboard">Dashboard2</NavItem>
          <NavItem eventKey={2} href="/projects">Projects</NavItem>
          <NavItem eventKey={3} href="/admin">Admin</NavItem>
        </Nav>
        <Nav pullRight>
          <NavDropdown eventKey={4} href="/user" title="Phillip Piper" id="userMenu">
            <MenuItem eventKey={4.1}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

export default Navigation ;