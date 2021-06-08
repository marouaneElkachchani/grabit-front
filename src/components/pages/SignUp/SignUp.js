import React from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'
import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'
import facebookLogo from './assets/facebook-logo.png'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            phone: "",
            pictureUrl: "",
            errors: []
        }
    }

    onSubmit(event) {
        const role = this.props.match.params.role.toUpperCase()
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
        if(this.state.password === "") {
            const errors = ["Enter password"]
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
                password: this.state.password,
                role,
                phone: this.state.phone,
                pictureUrl: this.state.pictureUrl
            }
        }).then( result => {
            localStorage.setItem('token', result.data.createUser.token)
            this.setState({
                name: "",
                email: "",
                password: "",
                phone: "",
                pictureUrl: ""
            })
        }).then( () => {
            document.location.reload()
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
            const role = this.props.match.params.role
            if(role === 'customer' || role === 'driver') {
                return (
                    <div className="sign-up">
                        <TopBannerV1/>
                        <div className="sign-up-main">
                            <div className="sign-up-main-box">
                                <h3 id="sign-up-title">Sign up as {role} :</h3>
                                <h3>Continue with Facebook :</h3>
                                <Link id="sign-up-with-facebook" to={`/sign-up/${role}`}>
                                    <button>
                                        <img src={facebookLogo} alt="Grabit"/>
                                        Sign up with Facebook
                                    </button>
                                </Link>
                                <h3>Or Continue with Email :</h3>
                                <br/>
                                <form className="sign-up-form" onSubmit={this.onSubmit.bind(this)}>
                                    <section className="input">
                                        <label className="sign-up-label">Name :</label>
                                        <br/>
                                        <input  className="sign-up-input" type="text" name="name"
                                                pattern="^([a-zA-Z]+\s)*[a-zA-Z]+$"
                                                title="Name must be A-Z, a-z and single space characters"
                                                minLength="3"
                                                maxLength="25"
                                                value={this.state.name}
                                                onChange={event => this.setState({ name: event.target.value })}/>
                                    </section>
                                    <br/>
                                    <section className="input">
                                        <label className="sign-up-label">Email :</label>
                                        <br/>
                                        <input  className="sign-up-input" type="email" name="email"
                                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                title="Must be a valid email"
                                                value={this.state.email}
                                                onChange={event => this.setState({ email: event.target.value })}/>
                                    </section>
                                    <br/>
                                    <section className="input">
                                        <label className="sign-up-label">Password :</label>
                                        <br/>
                                        <input  className="sign-up-input" type="password" name="password"
                                                pattern=".{8,}" 
                                                title="Password must be eight or more characters"
                                                value={this.state.password}
                                                onChange={event => this.setState({ password: event.target.value })}/>
                                    </section>
                                    <br/>
                                    <section className="input">
                                        <label className="sign-up-label">Phone :</label>
                                        <br/>
                                        <input  className="sign-up-input" type="text" name="phone"
                                                pattern="^\d{10}$"
                                                minLength="10"
                                                maxLength="10"
                                                title="Phone must be ten numbers"
                                                value={this.state.phone}
                                                onChange={event => this.setState({ phone: event.target.value })}/>
                                    </section>
                                    <div id="errors">
                                        {this.state.errors.map( error => <div key={ error }>{ error }</div > )}
                                    </div>
                                    <input className="sign-up-submit-button" type="submit" value="Sign up"/>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }else {
                this.props.history.push(`/`)
                return null
            }
    }
}

const mutation = gql`
    mutation
        CreateUser( $name: String!,
                    $email: String!, 
                    $password: String!,
                    $role: String!,
                    $phone: String!,
                    $pictureUrl: String ) {
            createUser( data: { email: $email,
                                password: $password,
                                role: $role,
                                name: $name,
                                phone: $phone,
                                pictureUrl: $pictureUrl } )
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

export default graphql(mutation)(SignUp)