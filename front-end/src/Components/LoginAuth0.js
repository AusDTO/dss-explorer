import React from "react";
import PropTypes from "prop-types";
import Auth0Lock from "auth0-lock";
import { Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class LoginAuth0 extends React.Component {
  static propTypes = {
    clientId: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired
  };

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

  goToRoot = () => {
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      window.location.replace("/");
    }
  };

  createOrUpdateUser = (auth0IdToken, userProps) => {
    console.log("creating user", userProps);

    const variables = {
      idToken: auth0IdToken,
      emailAddress: userProps.email || "missing email",
      name: userProps.name || "Missing name",
      avatarUrl: userProps.picture
    };
    this.props
      .createUser({ variables: variables })
      .then(createResp => {
        console.log("create response", createResp);
        this.goToRoot();
      })
      .catch(e => {
        console.log("create failed. probably user already exists", e);
        this.goToRoot();

        // It should be possible to update the user at this point, but
        // we don't (yet) know the current user id. There's probably a
        // way around this, but I don't want to waste the time to figure it out.

        // this.props
        //   .updateUser({ id: this.props.data.user.id, ...variables })
        //   .then(updateResp => {
        //     console.log("update response", updateResp);
        //     this.goToRoot();
        //   })
        //   .catch(e => {
        //     console.error(e);
        //     this.goToRoot();
        //   });
      });
  };

  onAuthenticated = authResult => {
    console.log("authenticated", authResult);

    // Setting this tells Graphcool who is current user is
    // (in conjunction with the middleware in index.js)
    window.localStorage.setItem("auth0IdToken", authResult.idToken);
    this.createOrUpdateUser(authResult.idToken, authResult.idTokenPayload);

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
  };

  componentDidMount() {
    this._lock.on("authenticated", this.onAuthenticated);
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
  mutation CreateUser($idToken: String!, $name: String!, $emailAddress: String!, $avatarUrl: String) {
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

// const updateUser = gql`
//   mutation(
//     $id: String!
//     $name: String!
//     $emailAddress: String!
//     $avatarUrl: String
//   ) {
//     updateUser(
//       id: $id
//       name: $name
//       emailAddress: $emailAddress
//       avatarUrl: $avatarUrl
//     ) {
//       id
//     }
//   }
// `;

export default graphql(createUser, { name: "createUser" })(LoginAuth0);
