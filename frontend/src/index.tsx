import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import "@fontsource/lato";
import { BaseProvider, createTheme } from "baseui";
import React from "react";
import ReactDOM from "react-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { AuthContextProvider } from "./context/AuthContext";
import Router from "./Router";
import { Provider } from "react-redux";
import { store } from "./store/store";

const httpLink = new HttpLink({
  uri: "/api/v1/graphql",
});
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4455/api/v1/graphql",
  options: {
    reconnect: true,
    lazy: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const engine = new Styletron();

const theme = createTheme(
  {
    primaryFontFamily: "Lato, LatoOffline, sans-serif",
  },
  {},
);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <StyletronProvider value={engine}>
          <BaseProvider theme={theme}>
            <AuthContextProvider>
              <Router />
            </AuthContextProvider>
          </BaseProvider>
        </StyletronProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
