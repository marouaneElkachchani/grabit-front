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

        this.settingsClicked = this.settingsClicked.bind(this);
        this.requestsClicked = this.requestsClicked.bind(this);
        this.addressClicked = this.addressClicked.bind(this);
    }

    settingsClicked() {

        const settings = document.getElementById("settings");
        const requests = document.getElementById("requests");
        const address = document.getElementById("address");
        const whiteUser = document.getElementById("user-white");
        const darkUser = document.getElementById("user-dark");
        const whiteRequests = document.getElementById("requests-white");
        const darkRequests = document.getElementById("requests-dark");
        const whiteAddress = document.getElementById("address-white");
        const darkAddress = document.getElementById("address-dark");

        whiteUser.style.display = "block";
        darkUser.style.display = "none";
        whiteRequests.style.display = "none";
        darkRequests.style.display = "block";
        whiteAddress.style.display = "none";
        darkAddress.style.display = "block";
        settings.style.background = "#F71117";
        settings.style.color = "white";
        requests.style.background = "white";
        requests.style.color = "#222A30";
        address.style.background = "white";
        address.style.color = "#222A30";
    }

    requestsClicked() {
        const requests = document.getElementById("requests");
        const settings = document.getElementById("settings");
        const address = document.getElementById("address");
        const whiteRequests = document.getElementById("requests-white");
        const darkRequests = document.getElementById("requests-dark");
        const whiteUser = document.getElementById("user-white");
        const darkUser = document.getElementById("user-dark");
        const whiteAddress = document.getElementById("address-white");
        const darkAddress = document.getElementById("address-dark");

        whiteRequests.style.display = "block";
        darkRequests.style.display = "none";
        whiteUser.style.display = "none";
        darkUser.style.display = "block";
        whiteAddress.style.display = "none";
        darkAddress.style.display = "block";
        requests.style.background = "#F71117";
        requests.style.color = "white";
        settings.style.background = "white";
        settings.style.color = "#222A30";
        address.style.background = "white";
        address.style.color = "#222A30";
    }

    addressClicked() {

        const address = document.getElementById("address");
        const requests = document.getElementById("requests");
        const settings = document.getElementById("settings");
        const whiteAddress = document.getElementById("address-white");
        const darkAddress = document.getElementById("address-dark");
        const whiteUser = document.getElementById("user-white");
        const darkUser = document.getElementById("user-dark");
        const whiteRequests = document.getElementById("requests-white");
        const darkRequests = document.getElementById("requests-dark");

        whiteAddress.style.display = "block";
        darkAddress.style.display = "none";
        whiteUser.style.display = "none";
        darkUser.style.display = "block";
        whiteRequests.style.display = "none";
        darkRequests.style.display = "block";
        address.style.background = "#F71117";
        address.style.color = "white";
        requests.style.background = "white";
        requests.style.color = "#222A30";
        settings.style.background = "white";
        settings.style.color = "#222A30";


    }

    render() {
            const user = this.props.user;

            return (
            <div className="main-left">
                <div className="main-left-top">
                    <img id="image-icon" src={oval} alt="Grabit" />
                    <p>{user.name}</p>
                </div>
                <ul>
                    <Link to={`/profile/${user.id}/settings`} onClick={this.settingsClicked}>        
                        <li id="settings">
                            <img id="user-dark" src={userDark} alt="Grabit" />
                            <img id="user-white" src={userWhite} alt="Grabit" />
                            <p>Profile Settings</p>
                        </li>
                    </Link>    
                    <Link to={`/profile/${user.id}/requests`} onClick={this.requestsClicked} >
                        <li  id="requests">
                            <img id="requests-dark" src={requestsDark} alt="Grabit" />
                            <img id="requests-white" src={requestsWhite} alt="Grabit" />
                            <p>Requests</p>
                        </li>
                    </Link>
                    <Link to={`/profile/${user.id}/address`} onClick={this.addressClicked} >
                        <li id="address">
                            <img id="address-dark" src={addressDark} alt="Grabit" />
                            <img id="address-white" src={addressWhite} alt="Grabit" />
                            <p>Address</p>
                        </li>
                    </Link>
                </ul>
            </div>
            );
    }
}
        
export default SideBar;