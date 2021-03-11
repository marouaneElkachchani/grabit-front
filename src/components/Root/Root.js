import React from 'react'
import './Root.css'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider } from 'react-apollo'

import ProfileV1 from '../pages-v1/Profile-v1/Profile-v1'
import OrderRequest from '../pages/OrderRequest/OrderRequest'

const httpLink = createHttpLink({
    uri: "http://localhost:4000",
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja20waW55Z20wMXU4MDkzNWF3eXRoMXAyIiwiaWF0IjoxNjE1NDU0NzE0LCJleHAiOjE2MTYwNTk1MTR9.lHXJ3O5a-wdaMdIdABstw4w818brO_XtAuDB7bYPaN8"
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
      this.handleNameChange = this.handleNameChange.bind(this)
      this.handleEmailChange = this.handleEmailChange.bind(this)
      this.handlePhoneChange = this.handlePhoneChange.bind(this)
      this.handleAddressChange = this.handleAddressChange.bind(this)
    }

    handleNameChange(name) {
        this.setState(prevState => ({
          user: {
            id: prevState.user.id,
            name: name,
            address: prevState.user.address,
            email: prevState.user.email,
            phone: prevState.user.phone
          }
        }));
    }
    
    handleEmailChange(email) {
        this.setState(prevState => ({
          user: {
            id: prevState.user.id,
            name: prevState.user.name,
            address: prevState.user.address,
            email: email,
            phone: prevState.user.phone
          }
        }));
    }
    
    handlePhoneChange(phone) {
        this.setState(prevState => ({
          user: {
            id: prevState.user.id,
            name: prevState.user.name,
            address: prevState.user.address,
            email: prevState.user.email,
            phone: phone
          }
        }));
    }

    handleAddressChange(address) {
        this.setState(prevState => ({
          user: {
            id: prevState.user.id,
            name: prevState.user.name,
            address: address,
            email: prevState.user.email,
            phone: prevState.user.phone
          }
        }))
    }

    render() {
        const handleNameChange = this.handleNameChange
        const handleEmailChange = this.handleEmailChange
        const handlePhoneChange = this.handlePhoneChange
        const handleAddressChange = this.handleAddressChange

        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/profile/:userId" render={props => {
                            return <ProfileV1 {...props}
                                              handleNameChange={handleNameChange}
                                              handleEmailChange={handleEmailChange}
                                              handlePhoneChange={handlePhoneChange}
                                              handleAddressChange={handleAddressChange}/>
                        }}/>
                        <Route path="/order-request" render={props => {
                            return <OrderRequest {...props}/>
                        }}/>
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>
        )
    }
}

export default Root