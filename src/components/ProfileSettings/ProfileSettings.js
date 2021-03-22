import React from 'react'
import './ProfileSettings.css'
import { Link } from 'react-router-dom'
import oval from './assets/oval.png'

class ProfileSettings extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const user = this.props.user;

        return (
            <div className="main-right" >
                <div className="main-right-top">
                    <h3>Profile Settings</h3>
                </div>
                <div className="main-right-form">
                    <div className="main-right-form-inputs">
                        <section className="input">
                            <label>First & Last Name</label>
                            <br/>
                            <input type="text" name="name" id="name" defaultValue=""/>
                        </section>
                        <section className="input">
                            <label>Email</label>
                            <br/>
                            <input type="email" name="email" id="email" defaultValue=""/>
                        </section>
                        <section className="input">
                            <label>Phone</label>
                            <br/>
                            <input type="text" name="phone" id="phone" defaultValue=""/>
                        </section>
                        <br/>
                        <button >Update</button>
                    </div>
                    <div className="main-right-form-image">
                        <img src={oval} alt="Grabit" />
                        <br/>
                        <button id="upload" >Upload</button>
                        <button id="remove" >Remove</button>
                    </div>
                </div>
        </div>
        );
    }

}
        
export default ProfileSettings;