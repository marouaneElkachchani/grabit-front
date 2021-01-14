import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './Profile.css';
import { Link } from 'react-router-dom';
import TopBanner from '../../TopBanner/TopBanner';
import SideBar from '../../SideBar/SideBar';
import ProfileSettings from '../../ProfileSettings/ProfileSettings';
import Requests from '../../Requests/Requests';
import Address from '../../Address/Address';
import Footer from '../../Footer/Footer';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
    }

    handleNameChange(name) {
        this.props.handleNameChange(name);
    }

    handleEmailChange(email) {
        this.props.handleEmailChange(email);
    }

    handlePhoneChange(phone) {
        this.props.handlePhoneChange(phone);
    }

    handleAddressChange(address) {
        this.props.handleAddressChange(address);
    }

    render() {
            const isProfile = true;
            const user = this.props.user;
            const handleNameChange = this.handleNameChange;
            const handleEmailChange = this.handleEmailChange;
            const handlePhoneChange = this.handlePhoneChange;
            const handleAddressChange = this.handleAddressChange;
            

            return (
                <div className="profile">
                    <TopBanner isProfile={isProfile} user={user} />
                    <div className="profile-main">
                        <Switch>
                            <Route path="/profile/:userId/settings" exact>
                                 <SideBar user={user} isSettings={true} />
                                 <ProfileSettings user={user} handleNameChange={handleNameChange}
                                                              handleEmailChange={handleEmailChange}
                                                              handlePhoneChange={handlePhoneChange} />
                            </Route>
                            <Route path="/profile/:userId/requests" >
                                <SideBar user={user} isRequests={true} />
                                <Requests />
                            </Route>
                            <Route path="/profile/:userId/address" >
                                <SideBar user={user} isAddress={true} />
                                <Address user={user} handleAddressChange={handleAddressChange} />
                            </Route>
                            <Redirect to="/profile/:userId/settings" />
                        </Switch>
                    </div>
                    <Footer />
                </div>
                );
    }
}

export default Profile;