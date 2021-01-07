import React from 'react';
import './ProfileSettings.css';
import { Link } from 'react-router-dom';

class ProfileSettings extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const userInfoName = this.props.userInfoName;
        const userInfoEmail = this.props.userInfoEmail;
        const userInfoPhone = this.props.userInfoPhone;
        const handleNameChange = this.props.handleNameChange;
        const handleEmailChange = this.props.handleEmailChange;
        const handlePhoneChange = this.props.handlePhoneChange;
        const handleSubmit = this.props.handleSubmit;

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
                            <input type="text" name="name" id="name" value={userInfoName} onChange={handleNameChange} />
                        </section>
                        <section className="input">
                            <label>Email</label>
                            <br/>
                            <input type="email" name="email" id="email" value={userInfoEmail} onChange={handleEmailChange}/>
                        </section>
                        <section className="input">
                            <label>Phone</label>
                            <br/>
                            <input type="text" name="phone" id="phone" value={userInfoPhone} onChange={handlePhoneChange}/>
                        </section>
                        <br/>
                        <button onClick={handleSubmit} >Update</button>
                    </div>
                    <div className="main-right-form-image">
                        <img src="./assets/oval.png" alt="Grabit" />
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