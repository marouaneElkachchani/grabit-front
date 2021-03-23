import React from 'react'
import './SideBar.css'
import { NavLink } from 'react-router-dom'
import oval from './assets/oval.png'
import userDark from './assets/user-dark.png'
import userWhite from './assets/user-white.png'
import requestsDark from './assets/requests-dark.png'
import requestsWhite from './assets/requests-white.png'
import addressDark from './assets/address-dark.png'
import addressWhite from './assets/address-white.png'

const SideBar = props => {

    const user = props.user
    const url = props.url
    const topMenu = (
        <div className="main-left-top">
            <img id="user-image-min" src={oval} alt="Grabit"/>
            <p>{user.name}</p>
        </div>
    )

    return (
        <div className="main-left">
            {topMenu}
            <ul>
                <NavLink to={`${url}/settings`} activeClassName="menu-option-clicked">
                    <li>
                        <img id="user-dark" src={userDark} alt="Grabit"/>
                        <p>Profile Settings</p>
                    </li>
                </NavLink>    
                <NavLink to={`${url}/requests`} activeClassName="menu-option-clicked">
                    <li>
                        <img id="requests-dark" src={requestsDark} alt="Grabit"/>
                        <p>Requests</p>
                    </li>
                </NavLink>
                <NavLink to={`${url}/address`} activeClassName="menu-option-clicked">
                    <li>
                        <img id="address-dark" src={addressDark} alt="Grabit"/>
                        <p>Address</p>
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}

export default SideBar