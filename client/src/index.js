import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { ApolloProvider } from 'react-apollo'
import {DefaultInterface} from './Utilities'

ReactDOM.render(
  <div>
    <ApolloProvider client={DefaultInterface.client}>
      <App />
    </ApolloProvider>
  </div>,
  document.getElementById('root')
);
