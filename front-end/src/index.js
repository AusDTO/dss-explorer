import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import App from "./App.js";
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";

const networkInterface = createNetworkInterface({
  uri: "https://api.graph.cool/simple/v1/cj8d0cdxq04f40144ryvk4vf4"
});

// use the auth0IdToken in localStorage for authorized requests
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      // get the authentication token from local storage if it exists
      if (localStorage.getItem("auth0IdToken")) {
        req.options.headers.authorization = `Bearer ${localStorage.getItem(
          "auth0IdToken"
        )}`;
      }
      next();
    }
  }
]);

const client = new ApolloClient({ networkInterface });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
