import React from "react";
import PropTypes from "prop-types";
import Auth0Lock from "auth0-lock";
import { withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { graphql, gql, compose } from "react-apollo";

class LoginAuth0 extends React.Component {
  constructor(props) {
    super(props);

    this._lock = new Auth0Lock(props.clientId, props.domain, {
      // allowedConnections: ["google-oauth2", "github"],
      allowSignUp: false,
      auth: {
        params: {
          scope: "openid profile email token"
        }
      },
      theme: {
        logo: "http://dss-explorer.apps.staging.digital.gov.au/icon-small.png"
      },
      languageDictionary: {
        title: "DSS Explorer"
      }
    });
  }

  static propTypes = {
    clientId: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
  };

  createOrUpdateUser = userProps => {
    console.log("creating user", userProps);

    const variables = {
      idToken: window.localStorage.getItem("auth0IdToken"),
      emailAddress: userProps.email || "missing email",
      name: userProps.name || "Missing name",
      avatarUrl: userProps.picture
    };

    this.props
      .createUser({ variables })
      .then(response => {
        console.log("created user", response);
        window.location.reload();
      })
      .catch(e => {
        console.error(e);
        window.location.reload();
      });
  };

  componentDidMount() {
    this._lock.on("authenticated", authResult => {
      console.log("authenticated", authResult);

      // Setting this tells Graphcool who is current user is
      window.localStorage.setItem("auth0IdToken", authResult.idToken);
      this.createOrUpdateUser(authResult.idTokenPayload);

      // To make the above work, I had to disable OIDC compliance in the Auth0 client definition.
      // With OIDC in place, the above only returns an accessToken, which is then used in
      // the following code to get the actual profile. BUT... Graphcool only works with an
      // authToken which is NOT included when OIDC is active.
      // reference: https://www.graph.cool/forum/t/the-provided-idtoken-is-invalid-please-see-https-auth0-com-docs-tokens-id-token-for-how-to-obtain-a-valid-idtoken/1160

      // this._lock.getUserInfo(authResult.accessToken, function(error, profile) {
      //   if (error) {
      //     console.log("error getting profile", error);
      //   } else {
      //     console.log("user profile", profile);
      //   }
      // });
    });
  }

  _showLogin = () => {
    this._lock.show();
  };

  render() {
    return (
      <div>
        <Button as="a" primary onClick={this._showLogin}>
          Sign In
        </Button>
      </div>
    );
  }
}

const createUser = gql`
  mutation(
    $idToken: String!
    $name: String!
    $emailAddress: String!
    $avatarUrl: String
  ) {
    createUser(
      authProvider: { auth0: { idToken: $idToken } }
      name: $name
      emailAddress: $emailAddress
      avatarUrl: $avatarUrl
    ) {
      id
    }
  }
`;

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default compose(
  graphql(createUser, { name: "createUser" }),
  graphql(userQuery, { options: { fetchPolicy: "network-only" } })
)(withRouter(LoginAuth0));
