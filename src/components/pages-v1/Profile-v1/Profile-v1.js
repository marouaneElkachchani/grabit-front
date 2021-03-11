import React from 'react'
import './Profile-v1.css'

import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'
import SideBar from '../../SideBar/SideBar'
import ProfileSettings from '../../ProfileSettings/ProfileSettings'
import Requests from '../../Requests/Requests'
import Address from '../../Address/Address'
import Footer from '../../Footer/Footer'

import { Route, Switch, Redirect } from 'react-router-dom'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const ProfileV1 = props => {

    let user = {}
    if(props.data.loading) {
        user = {
            name: "Loading...",
            email: "",
            phone: "",
            address: ""
        }
    }else {
        user = props.data.me
    }
    
    const isProfile = true
    const name = user.name
    const address = user.address
    const handleNameChange = props.handleNameChange
    const handleEmailChange = props.handleEmailChange
    const handlePhoneChange = props.handlePhoneChange
    const handleAddressChange = props.handleAddressChange
    const path = props.match.url
    
    return (
        <div className="profile">
            <TopBannerV1 isProfile={isProfile}/>
            <div className="profile-main">
                <SideBar {...props} name={name}/>
                <Switch>
                    <Route exact path={`${path}/settings`} render={ props => {
                        return <ProfileSettings {...props}
                                            user={user}
                                            handleNameChange={handleNameChange}
                                            handleEmailChange={handleEmailChange}
                                            handlePhoneChange={handlePhoneChange}/>              
                    }}/>
                    <Route path={`${path}/requests`} render={ props => {
                        return <Requests {...props} />
                    }}/>
                    <Route path={`${path}/address`} render={ props => {
                        return <Address {...props} 
                                     address={address}
                                     handleAddressChange={handleAddressChange}/>
                    }}/>
                    <Redirect to={`${path}/settings`}/>
                </Switch>
            </div>
            <Footer/>
        </div>
    )
}

const query = gql`
    query{
        me{
            name
            email
            phone
            address
        }
    }
`

export default graphql(query)(ProfileV1)