import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextWrapper } from "./context/AuthContext";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/v1/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthContextWrapper>
        <App />
      </AuthContextWrapper>
    </ApolloProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root"),
);
