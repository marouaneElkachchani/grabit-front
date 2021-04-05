import React from 'react'
import './ProfileSettings.css'
import { Link } from 'react-router-dom'
import oval from './assets/oval.png'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class ProfileSettings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.user.name,
            email: this.props.user.email,
            phone: this.props.user.phone,
            errors: []
        }
    }

    onSubmit(event) {
        event.preventDefault()
        if(this.state.name === "") {
            const errors = ["Enter name"]
            this.setState({ errors })
            return null
        }
        if(this.state.email === "") {
            const errors = ["Enter email"]
            this.setState({ errors })
            return null
        }
        if(this.state.phone === "") {
            const errors = ["Enter phone"]
            this.setState({ errors })
            return null
        }
        this.props.mutate({
            variables: {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone
            }
        }).then( () => {
            this.setState({ errors: [] })
        }).catch( res => {
            const errors = res.graphQLErrors.map( err => {
                if(err.code === 3010){
                    return 'Email already taken'
                }
                return err.message
            })
            this.setState({ errors })
        })
    }

    render() {
        const user = this.props.user
        const logout = this.props.logout
        return (
            <div className="main-right" >
                <div className="main-right-top">
                    <h3>Profile Settings</h3>
                    <button id="logout" onClick={logout}>Logout</button>
                </div>
                <div className="main-right-form">
                    <div className="main-right-form-inputs">
                         <form onSubmit={this.onSubmit.bind(this)}>
                            <section className="input">
                                <label>First & Last Name</label>
                                <br/>
                                <input type="text" name="name" id="name" 
                                        value={this.state.name}
                                        onChange={event => this.setState({ name: event.target.value })}/>
                            </section>
                            <section className="input">
                                <label>Email</label>
                                <br/>
                                <input type="email" name="email" id="email" 
                                        value={this.state.email}
                                        onChange={event => this.setState({ email: event.target.value })}/>
                            </section>
                            <section className="input">
                                <label>Phone</label>
                                <br/>
                                <input type="text" name="phone" id="phone" 
                                        value={this.state.phone}
                                        onChange={event => this.setState({ phone: event.target.value })}/>
                            </section>
                            <div id="setting-errors">
                                        {this.state.errors.map( error => <div key={ error }>{ error }</div > )}
                            </div>
                            <br/>
                            <button type="submit">Update</button>
                        </form>    
                    </div>
                    <div className="main-right-form-image">
                        <img src={oval} alt="Grabit" />
                        <br/>
                        <button id="upload" >Upload</button>
                        <button id="remove" >Remove</button>
                    </div>
                </div>
        </div>
        )
    }
}

const mutation = gql`
    mutation
        UpdateUser( $name: String,
                    $email: String,
                    $phone: String
                            ) {
            updateUser(data: {  name: $name,
                                email: $email,
                                phone: $phone }
                       ) {
                            id
                            name
                            email
                            phone
                            address
            }
        }
`

export default graphql(mutation)(ProfileSettings)