import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';
import oval from './assets/oval.png';
import userDark from './assets/user-dark.png';
import userWhite from './assets/user-white.png';
import requestsDark from './assets/requests-dark.png';
import requestsWhite from './assets/requests-white.png';
import addressDark from './assets/address-dark.png';
import addressWhite from './assets/address-white.png';

class SideBar extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
            const user = this.props.user;
            const isSettings = this.props.isSettings;
            const isRequests = this.props.isRequests;
            const isAddress = this.props.isAddress;
            const topMenu = (
                <div className="main-left-top">
                    <img id="user-image-min" src={oval} alt="Grabit" />
                    <p>{user.name}</p>
                </div>
            );
            if(isSettings) {
                return (
                    <div className="main-left">
                        {topMenu}
                        <ul>
                            <Link to={`/profile/${user.id}/settings`} >        
                                <li className="menu-option-clicked">
                                    <img id="user-white" src={userWhite} alt="Grabit" />
                                    <p>Profile Settings</p>
                                </li>
                            </Link>    
                            <Link to={`/profile/${user.id}/requests`} >
                                <li  className="menu-option">
                                    <img id="requests-dark" src={requestsDark} alt="Grabit" />
                                    <p>Requests</p>
                                </li>
                            </Link>
                            <Link to={`/profile/${user.id}/address`} >
                                <li className="menu-option">
                                    <img id="address-dark" src={addressDark} alt="Grabit" />
                                    <p>Address</p>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    );
            }else if (isRequests) {
                return (
                    <div className="main-left">
                        {topMenu}
                        <ul>
                            <Link to={`/profile/${user.id}/settings`} >        
                                <li className="menu-option">
                                    <img id="user-dark" src={userDark} alt="Grabit" />
                                    <p>Profile Settings</p>
                                </li>
                            </Link>    
                            <Link to={`/profile/${user.id}/requests`} >
                                <li  className="menu-option-clicked">
                                    <img id="requests-white" src={requestsWhite} alt="Grabit" />
                                    <p>Requests</p>
                                </li>
                            </Link>
                            <Link to={`/profile/${user.id}/address`} >
                                <li className="menu-option">
                                    <img id="address-dark" src={addressDark} alt="Grabit" />
                                    <p>Address</p>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    );
            }else {
                return (
                    <div className="main-left">
                        {topMenu}
                        <ul>
                            <Link to={`/profile/${user.id}/settings`} >        
                                <li className="menu-option">
                                    <img id="user-dark" src={userDark} alt="Grabit" />
                                    <p>Profile Settings</p>
                                </li>
                            </Link>    
                            <Link to={`/profile/${user.id}/requests`}>
                                <li  className="menu-option">
                                    <img id="requests-dark" src={requestsDark} alt="Grabit" />
                                    <p>Requests</p>
                                </li>
                            </Link>
                            <Link to={`/profile/${user.id}/address`} >
                                <li className="menu-option-clicked">
                                    <img id="address-white" src={addressWhite} alt="Grabit" />
                                    <p>Address</p>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    );
            }
    }
}
        
export default SideBar;