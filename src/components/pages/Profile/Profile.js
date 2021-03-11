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


const Profile  = props => {

    const isProfile = true;
    const user = props.user;
    const path = props.match.path;
    const handleNameChange = props.handleNameChange;
    const handleEmailChange = props.handleEmailChange;
    const handlePhoneChange = props.handlePhoneChange;
    const handleAddressChange = props.handleAddressChange;

    return (
    <div className="profile">
        <TopBanner isProfile={isProfile} user={user} />
        <div className="profile-main">
             <SideBar {...props} 
                      user={user} />
            <Switch>
                <Route exact path={`${path}/settings`} render={ props => {
                    return <ProfileSettings {...props}
                                            user={user} 
                                            handleNameChange={handleNameChange}
                                            handleEmailChange={handleEmailChange}
                                            handlePhoneChange={handlePhoneChange} />              
                }} />
                <Route path={`${path}/requests`} render={ props => {
                    return <Requests {...props} />
                } } />
                <Route path={`${path}/address`} render={ props => {
                    return <Address {...props} 
                                     user={user}
                                     handleAddressChange={handleAddressChange} />
                }} />
                <Redirect to={`${path}/settings`} />
            </Switch>
        </div>
        <Footer />
    </div>
    );
}

export default Profile;