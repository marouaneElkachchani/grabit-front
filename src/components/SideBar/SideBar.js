import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';

class SideBar extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

            const name = this.props.name;
            return (
            <div className="main-left">
                <div className="main-left-top">
                    <img id="image-icon" src="./assets/oval.png" alt="Grabit" />
                    <p>{name}</p>
                </div>
                <ul>
                    <a href="">        
                        <li>
                            <img id="user-dark" src="./assets/user-dark.png" alt="Grabit" />
                            <img id="user-white" src="./assets/user-white.png" alt="Grabit" />
                            <p>Profile Settings</p>
                        </li>
                    </a>    
                    <a href="">
                        <li>
                            <img id="requests-dark" src="./assets/requests-dark.png" alt="Grabit" />
                            <img id="requests-white" src="./assets/requests-white.png" alt="Grabit" />
                            <p>Requests</p>
                        </li>
                    </a>
                    <a href="">
                        <li>
                            <img id="address-dark" src="./assets/address-dark.png" alt="Grabit" />
                            <img id="address-white" src="./assets/address-white.png" alt="Grabit" />
                            <p>Address</p>
                        </li>
                    </a>
                </ul>
            </div>
            );

    }
}
        
export default SideBar;