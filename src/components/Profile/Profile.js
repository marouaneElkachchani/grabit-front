import React from 'react';
import './Profile.css';

class Profile extends React.Component {
    render() {
        return (
            <div className="profile">
                <div className="top">
                    <a href="">
                        <img src="./assets/grabit-icon.png" alt="Grabit" />
                    </a>
                    <button>Request an Order</button>
                    <a href="">
                        <p>Patek Philippe</p>
                    </a>
                </div>
                <div className="main">
                    <div className="main-left">
                            <div className="main-left-top">
                                <p>Patek Philippe</p>
                            </div>
                            <ul>
                                <a href="">        
                                    <li>
                                        <p>Profile Settings</p>
                                    </li>
                                </a>    
                                <a href="">
                                    <li>
                                        <p>Requests</p>
                                    </li>
                                </a>
                                <a href="">
                                    <li>
                                        <p>Address</p>
                                    </li>
                                </a>
                            </ul>
                    </div>
                    <div className="main-right">
                        <div className="main-right-top">
                            <h3>Profile Settings</h3>
                        </div>
                    </div>
                </div>
            </div>
            );
        }
    }
    
export default Profile;