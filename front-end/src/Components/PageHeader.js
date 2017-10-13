import React from "react";
import { Container, Menu, Dropdown, Image } from "semantic-ui-react";
import Logo from "./Logo.js";
import LoginAuth0 from "./LoginAuth0";
import { graphql, gql } from "react-apollo";
import { withRouter } from "react-router-dom";

const clientId = "qBRM3h1FdqACNyWnv6gaWr4XR4gxt622";
const domain = "dss-explorer.au.auth0.com";

class PageHeader extends React.Component {
  logout = () => {
    console.log("logout");
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem("auth0IdToken");
    window.location.reload();
  };

  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    const { user } = this.props.data;
    if (!user) {
      return (
        <div style={{ margin: "0.5em" }}>
          <Menu inverted>
            <Container>
              <Menu.Item as="a" header href="/">
                <div style={{ marginRight: "1em" }}>
                  <Logo />
                </div>
                DSS Explorer
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item>
                  <LoginAuth0 clientId={clientId} domain={domain} />
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
        </div>
      );
    }
    return (
      <div style={{ margin: "0.5em" }}>
        <Menu inverted>
          <Container>
            <Menu.Item as="a" header href="/">
              <div style={{ marginRight: "1em" }}>
                <Logo />
              </div>
              DSS Explorer
            </Menu.Item>
            <Menu.Item as="a" href="/projects">
              Projects
            </Menu.Item>
            <Menu.Item as="a" href="/admin">
              Admin
            </Menu.Item>

            <Menu.Menu position="right">
              <Menu.Item>
                <Menu.Header>
                  <Image avatar src={user.avatarUrl} />
                  {user.name || "Unnamed"}
                </Menu.Header>
                <Dropdown>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      icon="cogs"
                      text="Logout"
                      onClick={this.logout}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
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
