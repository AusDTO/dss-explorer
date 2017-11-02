import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import App from "./App.js";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { getOperationAST } from "graphql";

const simpleEndpoint = "https://api.graph.cool/simple/v1/cj8d0cdxq04f40144ryvk4vf4";
const wsEndpoint = "wss://subscriptions.graph.cool/v1/cj8d0cdxq04f40144ryvk4vf4";

const httpLink = createHttpLink({ uri: simpleEndpoint });
const middlewareLink = setContext(() => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem("auth0IdToken")}`
  }
}));

const wrappedHttpLink = middlewareLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: wsEndpoint,
  options: {
    reconnect: true,
    timeout: 30000, // See https://github.com/apollographql/subscriptions-transport-ws/issues/220
    connectionParams: {
      authorization: `Bearer ${localStorage.getItem("auth0IdToken")}`
    }
  }
});

const link = ApolloLink.split(
  operation => {
    const operationAST = getOperationAST(operation.query, operation.operationName);
    return !!operationAST && operationAST.operation === "subscription";
  },
  wsLink,
  wrappedHttpLink
);

const cache = new InMemoryCache();

const client = new ApolloClient({ link, cache });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
