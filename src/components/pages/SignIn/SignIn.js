import React from 'react'
import './SignIn.css'
import { Link } from 'react-router-dom'
import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'
import facebookLogo from './assets/facebook-logo.png'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class SignIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errors: []
        }
    }

    onSubmit(event) {
        event.preventDefault()
        if(this.state.email === "") {
            const errors = ["Enter email"]
            this.setState({ errors })
            return null
        }
        if(this.state.password === "") {
            const errors = ["Enter password"]
            this.setState({ errors })
            return null
        }
        this.props.mutate({
            variables: {
                email: this.state.email,
                password: this.state.password
            }
        }).then( result => {
            localStorage.setItem('token', result.data.login.token)
            this.setState({
                email: "",
                password: ""
            })
        }).then( () => {
            document.location.reload()
        }).catch( res => {
            const errors = res.graphQLErrors.map( err => err.message )
            this.setState({ errors })
        })
    }

    render() {
            return (
                <div className="sign-in">
                    <TopBannerV1/>
                    <div className="sign-in-main">
                        <div className="sign-in-main-box">
                            <h3 id="sign-in-title">Sign in :</h3>
                            <h3>Continue with Facebook :</h3>
                            <Link id="sign-in-with-facebook" to="/sign-in">
                                <button>
                                    <img src={facebookLogo} alt="Grabit"/>
                                    Sign in with Facebook
                                </button>
                            </Link>
                            <h3>Or Continue with Email :</h3>
                            <br/>
                            <form className="sign-in-form" onSubmit={this.onSubmit.bind(this)}>
                                <section className="input">
                                    <label className="sign-in-label">Email :</label>
                                    <br/>
                                    <input className="sign-in-input" type="email" name="email" 
                                                value={this.state.email}
                                                onChange={event => this.setState({ email: event.target.value })}/>
                                </section>
                                <br/>
                                <section className="input">
                                    <label className="sign-in-label">Password :</label>
                                    <br/>
                                    <input className="sign-in-input" type="password" name="password" 
                                                value={this.state.password}
                                                onChange={event => this.setState({ password: event.target.value })}/>
                                </section>
                                <div id="errors">
                                    {this.state.errors.map( error => <div key={ error }>{ error }</div > )}
                                </div>
                                <input className="sign-in-submit-button" type="submit" value="Sign in"/>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }
}

const mutation = gql`
    mutation
        Login( $email: String!, $password: String! ) {
            login( data: { email: $email, password: $password } ) 
            {
                token
                user {
                      id
                      name
                      email
                      phone
                      address
                }
            }
        }
`

export default graphql(mutation)(SignIn)