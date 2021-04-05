import React from 'react'
import './Root.css'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider } from 'react-apollo'

import App from '../App/App'

const httpLink = createHttpLink({
    uri: "http://localhost:4000",
    credentials: "same-origin"
})
let token = ""
if(localStorage.getItem('token')) {
    token = localStorage.getItem('token')
}
const authLink = setContext((_, { headers }) => {
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
    cache,
    dataIdFromObject: o => o.id
})

class Root extends React.Component {

    constructor(props) {
      super(props)
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