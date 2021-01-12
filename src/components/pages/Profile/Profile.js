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

    render() {
            const isProfile = true;
            const user = this.props.user;
            const handleNameChange = this.handleNameChange;
            const handleEmailChange = this.handleEmailChange;
            const handlePhoneChange = this.handlePhoneChange;

            return (
                <div className="profile">
                    <TopBanner isProfile={isProfile} name={user.name} />
                    <div className="profile-main">
                        <SideBar user={user} />
                        <Switch>
                            <Route path="/profile/:userId/settings" exact>
                                 <ProfileSettings user={user} handleNameChange={handleNameChange}
                                                              handleEmailChange={handleEmailChange}
                                                              handlePhoneChange={handlePhoneChange} />
                            </Route>
                            <Route path="/profile/:userId/requests" >
                                <Requests />
                            </Route>
                            <Route path="/profile/:userId/address" >
                                <Address />
                            </Route>
                            <Redirect to="/profile/:userId/settings"/>
                        </Switch>
                    </div>
                    <Footer />
                </div>
                );
    }
}

export default Profile;