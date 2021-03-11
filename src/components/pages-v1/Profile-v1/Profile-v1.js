import React from 'react'
import './Profile-v1.css'

import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'

import SideBarV1 from '../../SideBar-v1/SideBar-v1'
import ProfileSettings from '../../ProfileSettings/ProfileSettings'
import Footer from '../../Footer/Footer'

const ProfileV1 = props => {

    const isProfile = true
    const user = props.user
    const handleNameChange = props.handleNameChange
    const handleEmailChange = props.handleEmailChange
    const handlePhoneChange = props.handlePhoneChange
    const handleAddressChange = props.handleAddressChange

    return (
        <div className="profile">

            <TopBannerV1 isProfile={isProfile} user={user}/>
            
            <div className="profile-main">
                <SideBarV1 user={user}/>
                <ProfileSettings user={user}
                                 handleNameChange={handleNameChange}
                                 handleEmailChange={handleEmailChange}
                                 handlePhoneChange={handlePhoneChange}/>
            </div>
            <Footer/>
        </div>
    )
}

export default ProfileV1