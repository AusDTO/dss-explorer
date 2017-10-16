import React from "react";
import { Container, Menu, Dropdown, Image } from "semantic-ui-react";
import Logo from "./Logo.js";
import LoginAuth0 from "./LoginAuth0";
import { graphql, gql } from "react-apollo";
import { withRouter } from "react-router-dom";
import "./PageHeader.css";

const clientId = "qBRM3h1FdqACNyWnv6gaWr4XR4gxt622";
const domain = "dss-explorer.au.auth0.com";

class PageHeader extends React.Component {
  logout = () => {
    console.log("logout");
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem("auth0IdToken");
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      window.location.replace("/");
    }
  };

  render() {
    const { user } = this.props.data;
    return (
      <div className="page-header">
        <Menu inverted>
          <Container>
            <Menu.Item as="a" header href="/">
              <Logo />
              DSS Explorer
            </Menu.Item>
            {!!user && (
              <Menu.Item as="a" href="/projects">
                Projects
              </Menu.Item>
            )}
            {!!user && (
              <Menu.Item as="a" href="/admin">
                Admin
              </Menu.Item>
            )}

            <Menu.Menu position="right">
              {!!user && (
                <Menu.Item>
                  <Menu.Header>
                    <Image avatar src={user.avatarUrl} />
                    <Dropdown text={user.name || "Unnamed"}>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          icon="power"
                          text="Logout"
                          onClick={this.logout}
                        />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu.Header>
                </Menu.Item>
              )}
              {!user && (
                <Menu.Item>
                  <LoginAuth0 clientId={clientId} domain={domain} />
                </Menu.Item>
              )}
            </Menu.Menu>
          </Container>
        </Menu>
      </div>
    );
  }
}

const userQuery = gql`
  query userQuery {
    user {
      id
      name
      avatarUrl
    }
  }
`;

export default graphql(userQuery, { options: { fetchPolicy: "network-only" } })(
  withRouter(PageHeader)
);
