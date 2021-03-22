import React from 'react'
import './Profile-v1.css'

import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'
import SideBar from '../../SideBar/SideBar'
import ProfileSettings from '../../ProfileSettings/ProfileSettings'
import Requests from '../../Requests/Requests'
import Address from '../../Address/Address'
import Footer from '../../Footer/Footer'

import { Route, Switch, Redirect } from 'react-router-dom'

const ProfileV1 = props => {
    
    const isProfile = true
    const url = props.match.url
    const user = props.user

    return (
        <div className="profile">
            <TopBannerV1 isProfile={isProfile} user={user}/>
            <div className="profile-main">
                <SideBar {...props} user={user}/>
                <Switch>
                    <Route exact path={`${url}/settings`} render={ props => {
                        return <ProfileSettings {...props}
                                            user={user}/>              
                    }}/>
                    <Route path={`${url}/requests`} render={ props => {
                        return <Requests {...props} />
                    }}/>
                    <Route path={`${url}/address`} render={ props => {
                        return <Address {...props} 
                                     address={user.address}/>
                    }}/>
                    <Redirect to={`${url}/settings`}/>
                </Switch>
            </div>
            <Footer/>
        </div>
    )
}

export default ProfileV1