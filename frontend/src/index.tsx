import React from "react";
import ReactDOM from "react-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled, createTheme } from "baseui";
import Router from "./Router";
import "@fontsource/lato";

const engine = new Styletron();

const client = new ApolloClient({
  uri: "/v1/graphql",
  cache: new InMemoryCache(),
});

const theme = createTheme(
  {
    primaryFontFamily: "Lato, LatoOffline, sans-serif",
  },
  {},
);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={theme}>
          <AuthContextProvider>
            <Router />
          </AuthContextProvider>
        </BaseProvider>
      </StyletronProvider>
    </ApolloProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root"),
);
