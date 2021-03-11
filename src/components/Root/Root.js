import React from 'react';
import './Root.css'
import { InMemoryCache, ApolloClient } from '@apollo/client'
import { ApolloProvider } from 'react-apollo'

import ProfileV1 from '../pages-v1/Profile-v1/Profile-v1'

const cache = new InMemoryCache({})
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache
})

class Root extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          user: {
            id: 3293455,
            name: "Mark Hamilton", 
            address: "352, New York City, NY", 
            email: "mark@hamilton.com",
            phone: 26220033452
          }
      }
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
        const user = this.state.user
        const handleNameChange = this.handleNameChange
        const handleEmailChange = this.handleEmailChange
        const handlePhoneChange = this.handlePhoneChange
        const handleAddressChange = this.handleAddressChange

        return (
            <ApolloProvider client={client}>
                <ProfileV1 user={user}
                           handleNameChange={handleNameChange}
                           handleEmailChange={handleEmailChange}
                           handlePhoneChange={handlePhoneChange}
                           handleAddressChange={handleAddressChange}/>
            </ApolloProvider>
        )
    }

}

export default Root