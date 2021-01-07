import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import TopBanner from '../../TopBanner/TopBanner';
import SideBar from '../../SideBar/SideBar';
import ProfileSettings from '../../ProfileSettings/ProfileSettings';
import Footer from '../../Footer/Footer';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 329,
            userName: "Mark Hamilton", 
            userAddress: "352, New York City, NY", 
            userEmail: "mark@hamilton.com",
            userPhone: 26220033452,
            userInfoId: 329,
            userInfoName: "Mark Hamilton", 
            userInfoAddress: "352, New York City, NY", 
            userInfoEmail: "mark@hamilton.com",
            userInfoPhone: 26220033452
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            userInfoName: event.target.value
        });
    }

    handleEmailChange(event) {
        this.setState({
            userInfoEmail: event.target.value
        });
    }

    handlePhoneChange(event) {
        this.setState({
            userInfoPhone: event.target.value
        });
    }

    handleSubmit() {
        this.setState({
           userName: this.state.userInfoName,
           userEmail: this.state.userInfoEmail,
           userPhone: this.state.userInfoPhone
        });
    }

    render() {
            const isProfile = true;
            const name = this.state.userName;
            const userInfoName = this.state.userInfoName;
            const userInfoEmail = this.state.userInfoEmail;
            const userInfoPhone = this.state.userInfoPhone;
            const handleNameChange = this.handleNameChange;
            const handleEmailChange = this.handleEmailChange;
            const handlePhoneChange = this.handlePhoneChange;
            const handleSubmit = this.handleSubmit;
            return (
                <div className="profile">
                    <TopBanner isProfile={isProfile} name={name} />
                    <div className="profile-main">
                        <SideBar name={name} />
                        <ProfileSettings userInfoName={userInfoName}
                                         userInfoEmail={userInfoEmail}
                                         userInfoPhone={userInfoPhone}
                                         handleNameChange={handleNameChange}
                                         handleEmailChange={handleEmailChange}
                                         handlePhoneChange={handlePhoneChange}
                                         handleSubmit={handleSubmit} />
                    </div>
                    <Footer />
                </div>
                );
    }
}

export default Profile;