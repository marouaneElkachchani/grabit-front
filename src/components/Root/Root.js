import React from 'react'
import './Root.css'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider } from 'react-apollo'

import App from '../App/App'

const httpLink = createHttpLink({
    uri: "http://localhost:4000",
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja21hZGF3djMwMzhjMDkzNTdyeHAyeW16IiwiaWF0IjoxNjE2NDAzODMzLCJleHAiOjE2MTcwMDg2MzN9.qoxxcRUMl60lF0tiv840LwxRqk9Kblp9hNVCwswvuBM"
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
})

const cache = new InMemoryCache({})
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
})

class Root extends React.Component {

    constructor(props) {
      super(props)
      this.state = {}
    }

    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ApolloProvider>
        )
    }
}

export default Root