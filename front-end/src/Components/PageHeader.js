import React from "react";
import { Container, Menu } from "semantic-ui-react";
import Logo from "./Logo.js";

class PageHeader extends React.Component {
  render() {
    return (
      <div>
        <Menu inverted>
          <Container>
            <Menu.Item as="a" header href="/">
              <div style={{ marginRight: "1em" }}>
                <Logo />
              </div>
              DSS Explorer
            </Menu.Item>
            <Menu.Item as="a" href="/dashboard">
              Home
            </Menu.Item>
            <Menu.Item as="a" href="/projects">
              Projects
            </Menu.Item>
            <Menu.Item as="a" href="/admin">
              Admin
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    );
  }
}

export default PageHeader;
