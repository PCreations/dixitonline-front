import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import ApolloClient from 'apollo-boost';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import introspectionQueryResultData from './fragment-types.gen.json';
import App from './App';
import * as serviceWorker from './serviceWorker';

Sentry.init({ dsn: 'https://8c8ffb1dd1a34b8d9bd30d1e9793e020@o377168.ingest.sentry.io/5198896' });

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const client = new ApolloClient({
  cache: new InMemoryCache({ fragmentMatcher }),
  uri: process.env.REACT_APP_GRAPHQL_API,
  request: (operation) => {
    const token = localStorage.getItem('idToken');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
