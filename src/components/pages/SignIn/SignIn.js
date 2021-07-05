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

    showSpinner() {
        document.getElementById('sign-in-submit-button-value').hidden = true
        document.getElementById('sign-in-submit-button-icon').hidden = false
    }

    hideSpinner() {
        document.getElementById('sign-in-submit-button-value').hidden = false
        document.getElementById('sign-in-submit-button-icon').hidden = true
    }

    onSubmit(event) {
        event.preventDefault()
        window.localStorage.removeItem('token')
        this.showSpinner()
        if(this.state.email === "") {
            const errors = ["Enter email"]
            this.setState({ errors })
            this.hideSpinner()
            return null
        }
        if(this.state.password === "") {
            const errors = ["Enter password"]
            this.setState({ errors })
            this.hideSpinner()
            return null
        }
        this.props.mutate({
            variables: {
                email: this.state.email,
                password: this.state.password
            }
        }).then( result => {
            window.localStorage.setItem('token', result.data.login.token)
            this.setState({
                email: "",
                password: ""
            })
            this.hideSpinner()
        }).then( () => {
            document.location.reload()
        }).catch( res => {
            this.hideSpinner()
            const errors = res.graphQLErrors.map( err => err.message )
            // if jwt expired error:     
            // window.localStorage.removeItem('token')
            // document.location.reload()
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
                                    <input  className="sign-in-input" type="email" name="email"
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                            title="Must be a valid email"
                                            value={this.state.email}
                                            onChange={event => this.setState({ email: event.target.value })}/>
                                </section>
                                <br/>
                                <section className="input">
                                    <label className="sign-in-label">Password :</label>
                                    <br/>
                                    <input  className="sign-in-input" type="password" name="password"
                                            pattern=".{8,}" 
                                            title="Password must be eight or more characters"
                                            value={this.state.password}
                                            onChange={event => this.setState({ password: event.target.value })}/>
                                </section>
                                <div id="errors">
                                    {this.state.errors.map( error => <div key={ error }>{ error }</div > )}
                                </div>
                                <button className="sign-in-submit-button" onSubmit={this.onSubmit.bind(this)}>
                                    <p id="sign-in-submit-button-value" hidden={false}>Sign in</p>
                                    <div id="sign-in-submit-button-icon" hidden={true}><i className="fa fa-spinner fa-spin"></i></div>
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