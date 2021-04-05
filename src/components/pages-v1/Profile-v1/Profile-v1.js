import React from 'react'
import './Profile-v1.css'

import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'
import SideBar from '../../SideBar/SideBar'
import ProfileSettings from '../../ProfileSettings/ProfileSettings'
import Requests from '../../Requests/Requests'
import Address from '../../Address/Address'
import Footer from '../../Footer/Footer'

import { Route, Switch, Redirect } from 'react-router-dom'

class ProfileV1 extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const isProfile = true
        const url = this.props.match.url
        const user = this.props.user
        const logout = this.props.logout
        return (
            <div className="profile">
                <TopBannerV1 isProfile={isProfile} user={user}/>
                <div className="profile-main">
                    <SideBar url={url} user={user}/>
                    <Switch>
                        <Route exact path={`${url}/settings`} render={ props => {
                            return <ProfileSettings {...props}
                                                user={user} logout={logout}/>           
                        }}/>
                        <Route path={`${url}/requests`} render={ props => {
                            return <Requests {...props} logout={logout}/>
                        }}/>
                        <Route path={`${url}/address`} render={ props => {
                            return <Address {...props} 
                                         address={user.address} logout={logout}/>
                        }}/>
                        <Redirect to={`${url}/settings`}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        )
    }

}

export default ProfileV1