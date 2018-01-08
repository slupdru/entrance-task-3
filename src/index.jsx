import React from 'react';
import ReactDOM  from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import App from './App';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';



const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
  <ApolloProvider client={client}>
        <App/>
  </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

