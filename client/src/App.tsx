import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import React from 'react';

import {ApolloProvider, InMemoryCache, ApolloClient} from '@apollo/client'

const client = new ApolloClient({

  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),

})

const App: React.FC = () => {
    
  return (
    <ApolloProvider client={client}>
    
    <>
      <Navbar />
      <Outlet />
    </>
    </ApolloProvider>
  );
}

export default App;
