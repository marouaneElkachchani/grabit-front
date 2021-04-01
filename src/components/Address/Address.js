import React from 'react'
import './Address.css'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class Address extends React.Component {

    constructor(props) {
        super(props)
        if(this.props.address) {
            this.state = {
                address: this.props.address
            }
        }else {
            this.state = {
                address: ""
            }
        }

    }

    onSubmit(event) {

        event.preventDefault()

        this.props.mutate({
            variables: {
                address: this.state.address
            }

        }).catch( (error) => {

            console.log(error)
            
        })

    }

    render() {
        const address = this.props.address
        const logout = this.props.logout

        return (
            <div className="main-right">
                <div className="main-right-top">
                    <h3>Address</h3>
                    <button id="logout" onClick={logout}>Logout</button>
                </div>
                <div id="address-form" className="main-right-form">
                    <div className="main-right-form-inputs">
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <section className="input">
                                <label>Address</label>
                                <br/>
                                <input type="text" name="address" id="address" 
                                       value={this.state.address}
                                       onChange={event => this.setState({ address: event.target.value })}/>
                            </section>
                            <br/>
                            <button id="address-button" type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mutation = gql`
    mutation
        UpdateUser( $address: String
                            ) {
            updateUser(data: {address: $address}
                       ) {
                            id
                            name
                            email
                            phone
                            address
            }
        }
`

export default graphql(mutation)(Address)