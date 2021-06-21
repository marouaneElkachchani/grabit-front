import React from 'react'
import './Root.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider } from 'react-apollo'
import App from '../App/App'

const httpLink = createUploadLink({
    uri: "http://localhost:4000",
    credentials: "same-origin"
})
let token = ""
if(window.localStorage.getItem('token')) {
    token = window.localStorage.getItem('token')
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
    //@ts-ignore
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