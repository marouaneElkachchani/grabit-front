import React from 'react';
import './SideBar-v1.css';
import oval from './assets/oval.png';
import userDark from './assets/user-dark.png';
import userWhite from './assets/user-white.png';
import requestsDark from './assets/requests-dark.png';
import requestsWhite from './assets/requests-white.png';
import addressDark from './assets/address-dark.png';
import addressWhite from './assets/address-white.png';

const SideBarV1 = props => {

    const user = props.user;

    const topMenu = (
        <div className="main-left-top">
            <img id="user-image-min" src={oval} alt="Grabit"/>
            <p>{user.name}</p>
        </div>
    );

        return (
            <div className="main-left">
                {topMenu}
                <ul>
                    <a ClassName="menu-option-clicked">    
                        <li>
                            <img id="user-dark" src={userDark} alt="Grabit"/>
                            <p>Profile Settings</p>
                        </li>
                    </a>    
                    <a ClassName="menu-option-clicked">
                        <li>
                            <img id="requests-dark" src={requestsDark} alt="Grabit" />
                            <p>Requests</p>
                        </li>
                    </a>
                    <a ClassName="menu-option-clicked">
                        <li>
                            <img id="address-dark" src={addressDark} alt="Grabit" />
                            <p>Address</p>
                        </li>
                    </a>
                </ul>
            </div>
        );
}

export default SideBarV1;