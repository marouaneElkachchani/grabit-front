import React from 'react'
import './Address.css'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class Address extends React.Component {

    constructor(props) {
        super(props)
        if(this.props.address) {
            this.state = {
                address: this.props.address,
                errors: []
            }
        }else {
            this.state = {
                address: "",
                errors: []
            }
        }
    }

    showSpinner() {
        document.getElementById('address-submit-button-value').hidden = true
        document.getElementById('address-submit-button-icon').hidden = false
    }

    hideSpinner() {
        document.getElementById('address-submit-button-value').hidden = false
        document.getElementById('address-submit-button-icon').hidden = true
    }

    onSubmit(event) {
        this.showSpinner()
        event.preventDefault()
        if(this.state.address === "") {
            const errors = ["Enter address"]
            this.setState({ errors })
            this.hideSpinner()
            return null
        }
        this.props.mutate({
            variables: {
                address: this.state.address
            }
        }).then( () => {
            this.setState({ errors: [] })
            this.hideSpinner()
        }).catch( res => {
            const errors = res.graphQLErrors.map( err => err.message )
            this.setState({ errors })
            this.hideSpinner()
        })
    }

    render() {
        const address = this.props.address
        const logout = this.props.logout
        return (
            <div className="main-right">
                <div className="main-right-top">
                    <h3>Address</h3>
                    <button id="logout" onClick={logout}>
                        <p id="logout-value" hidden={false}>Logout</p>
                        <div id="logout-icon" hidden={true}><i className="fa fa-spinner fa-spin"></i></div>
                    </button>
                </div>
                <div id="address-form" className="main-right-form">
                    <div className="main-right-form-inputs">
                        <form onSubmit={this.onSubmit.bind(this)} >
                            <section className="input">
                                <label>Address</label>
                                <br/>
                                <input type="text" name="address" id="address"
                                       minLength="10"
                                       maxLength="50"
                                       value={this.state.address}
                                       onChange={event => this.setState({ address: event.target.value })}/>
                            </section>
                            <div id="address-errors">
                                        {this.state.errors.map( error => <div key={ error }>{ error }</div > )}
                            </div>
                            <br/>
                            <button id="address-button" type="submit" onSubmit={this.onSubmit.bind(this)}>
                                    <p id="address-submit-button-value" hidden={false}>Update</p>
                                    <div id="address-submit-button-icon" hidden={true}><i className="fa fa-spinner fa-spin"></i></div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mutation = gql`
    mutation
        UpdateUser($address: String) {
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