import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import introspectionQueryResultData from './fragment-types.gen.json';
import App from './App';
import { Authenticated } from './Authenticated';
import * as serviceWorker from './serviceWorker';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const client = new ApolloClient({
  cache: new InMemoryCache({ fragmentMatcher }),
  uri: 'http://localhost:5001/dixit-af060/us-central1/api/graphql',
  request: operation => {
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
    <Authenticated>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Authenticated>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
