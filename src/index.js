import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AUTH_TYPE } from 'aws-appsync';
import aws_config from './aws-exports';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloLink } from 'apollo-link';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createHttpLink } from 'apollo-link-http';
import { HttpLink } from 'apollo-link-http'
import { XSchemaProvider } from './context/XSchema.context';

const url = aws_config.aws_appsync_graphqlEndpoint
const region = aws_config.aws_appsync_region
const auth = {
  type: AUTH_TYPE.API_KEY,
  apiKey: aws_config.aws_appsync_apiKey,
}

const link = ApolloLink.from([
   createAuthLink({ url, region, auth }), 
   createHttpLink({ uri: url })
]);

// const link = new HttpLink({ uri: 'https://localhost:4000/' })

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <XSchemaProvider>
      <App/>
    </XSchemaProvider>
  </ApolloProvider>
)

ReactDOM.render(
  <WithProvider/>,
  document.getElementById('root')
);
