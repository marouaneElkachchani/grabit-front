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
            picture: false,
            pictureUrl: this.props.user.pictureUrl,
            errors: []
        }
        this.uploadImage = this.uploadImage.bind(this)
        this.removeImage = this.removeImage.bind(this)
    }

    handlePictureSelected(event) {
        var picture = event.target.files[0]
        var pictureUrl = URL.createObjectURL(picture)
        this.setState({
          picture: picture,
          pictureUrl: pictureUrl
        })
    }

    renderProfilePicture() {
        if(this.state.pictureUrl && this.state.pictureUrl !== '') {
          return (
            <img src={this.state.pictureUrl}/>
          )
        } else {
          return (
            <img src={oval} alt="Grabit"/>
          )
        }
    }

    showSpinner(option) {
        document.getElementById(`${option}-submit-button-value`).hidden = true
        document.getElementById(`${option}-submit-button-icon`).hidden = false
    }

    hideSpinner(option) {
        document.getElementById(`${option}-submit-button-value`).hidden = false
        document.getElementById(`${option}-submit-button-icon`).hidden = true
    }

    uploadImage() {
        this.showSpinner('upload')
        this.props.mutate({
            variables: {
                picture: this.state.picture
            }
        }).then( (result) => {
            this.setState({ picture: false,
                            pictureUrl: result.data.updateUser.pictureUrl,
                            errors: [] }) 
            this.hideSpinner('upload')
        }).catch( res => {
            const errors = res.graphQLErrors.map( err => err.message )
            this.setState({ errors })
            this.hideSpinner('upload')
        })
    }

    removeImage() {
        this.showSpinner('remove')
        this.props.mutate({
            variables: {
                picture: ''
            }
        }).then( (result) => {
            this.setState({ picture: false,
                            pictureUrl: '',
                            errors: [] })
            this.hideSpinner('remove')
        }).catch( res => {
            const errors = res.graphQLErrors.map( err => err.message )
            this.setState({ errors })
            this.hideSpinner('remove')
        })
    }

    onSubmit(event) {
        this.showSpinner('settings')
        event.preventDefault()
        if(this.state.name === "") {
            const errors = ["Enter name"]
            this.setState({ errors })
            this.hideSpinner('settings')
            return null
        }
        if(this.state.email === "") {
            const errors = ["Enter email"]
            this.setState({ errors })
            this.hideSpinner('settings')
            return null
        }
        if(this.state.phone === "") {
            const errors = ["Enter phone"]
            this.setState({ errors })
            this.hideSpinner('settings')
            return null
        }
        this.props.mutate({
            variables: {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                pictureUrl: this.state.pictureUrl,
            }
        }).then( () => {
            this.setState({ errors: [] })
            this.hideSpinner('settings')
        }).catch( res => {
            const errors = res.graphQLErrors.map( err => {
                if(err.code === 3010){
                    return 'Email already taken'
                }
                return err.message
            })
            this.setState({ errors })
            this.hideSpinner('settings')
        })
    }

    render() {
        const user = this.props.user
        const logout = this.props.logout
        return (
            <div className="main-right" >
                <div className="main-right-top">
                    <h3>Profile Settings</h3>
                    <button id="logout" onClick={logout}>
                        <p id="logout-value" hidden={false}>Logout</p>
                        <div id="logout-icon" hidden={true}><i className="fa fa-spinner fa-spin"></i></div>
                    </button>
                </div>
                <div className="main-right-form">
                    <div className="main-right-form-inputs">
                         <form onSubmit={this.onSubmit.bind(this)}>
                            <section className="input">
                                <label>First & Last Name</label>
                                <br/>
                                <input  type="text" name="name" id="name"
                                        pattern="^([a-zA-Z]+\s)*[a-zA-Z]+$"
                                        title="Name must be A-Z, a-z and single space characters"
                                        minLength="3"
                                        maxLength="25"
                                        value={this.state.name}
                                        onChange={event => this.setState({ name: event.target.value })}/>
                            </section>
                            <section className="input">
                                <label>Email</label>
                                <br/>
                                <input  type="email" name="email" id="email"
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                        title="Must be a valid email"
                                        value={this.state.email}
                                        onChange={event => this.setState({ email: event.target.value })}/>
                            </section>
                            <section className="input">
                                <label>Phone</label>
                                <br/>
                                <input  type="text" name="phone" id="phone"
                                        pattern="^\d{10}$"
                                        minLength="10"
                                        maxLength="10"
                                        title="Phone must be ten numbers"
                                        value={this.state.phone}
                                        onChange={event => this.setState({ phone: event.target.value })}/>
                            </section>
                            <div id="setting-errors">
                                    {this.state.errors.map( error => <div key={ error }>{ error }</div > )}
                            </div>
                            <br/>
                            <button className="settings-submit-button" type="submit" onSubmit={this.onSubmit.bind(this)}>
                                    <p id="settings-submit-button-value" hidden={false}>Update</p>
                                    <div id="settings-submit-button-icon" hidden={true}><i className="fa fa-spinner fa-spin"></i></div>
                            </button>
                        </form>    
                    </div>
                    <div className="main-right-form-image">
                        {this.renderProfilePicture()}
                        <label htmlFor="file" className="label-file">Choose file</label>
                        <input id="file" className="input-file" type="file" onChange={this.handlePictureSelected.bind(this)}></input>
                        <br/>
                        <button id="upload" onClick={this.uploadImage}>
                            <p id="upload-submit-button-value" hidden={false}>Upload</p>
                            <div id="upload-submit-button-icon" hidden={true}><i className="fa fa-spinner fa-spin"></i></div>
                        </button>
                        <button id="remove" onClick={this.removeImage}>
                            <p id="remove-submit-button-value" hidden={false}>Remove</p>
                            <div id="remove-submit-button-icon" hidden={true}><i className="fa fa-spinner fa-spin"></i></div>
                        </button>
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
                    $phone: String,
                    $picture: Upload,
                    $pictureUrl: String
                            ) {
            updateUser(data: {  name: $name,
                                email: $email,
                                phone: $phone,
                                picture: $picture,
                                pictureUrl: $pictureUrl}
                       ) {
                            id
                            name
                            email
                            pictureUrl
                            phone
                            address
            }
        }
`

export default graphql(mutation)(ProfileSettings)