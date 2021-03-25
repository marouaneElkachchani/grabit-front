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
            phone: this.props.user.phone
        }

    }

    onSubmit(event) {
        event.preventDefault()



        this.props.mutate({
            variables: {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone
            }
        }).catch( (error) => {
            console.log(error)
        })

    }

    render() {
        const user = this.props.user

        return (
            <div className="main-right" >
                <div className="main-right-top">
                    <h3>Profile Settings</h3>
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