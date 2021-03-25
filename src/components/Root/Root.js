import React from 'react'
import './Root.css'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider } from 'react-apollo'

import App from '../App/App'
import LandingPage from '../pages/LandingPage/LandingPage'
import SignUp from '../pages/SignUp/SignUp'
import SignIn from '../pages/SignIn/SignIn'

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
                    <Switch>
                        <Route exact path="/" render={props => {
                            return <LandingPage {...props}/>
                        }}/>
                        <Route path="/sign-up/:role" render={props => {
                            return <SignUp {...props}/>
                        }}/>
                        <Route path="/sign-in" render={props => {
                            return <SignIn {...props}/>
                        }}/>
                        <Route path="/app" render={props => {
                            return <App {...props}/>
                        }}/>
                        <Redirect to="/"/>
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>
        )
    }
}

export default Root