import React from 'react';
import './Profile.css';

class Profile extends React.Component {
    render() {
            return (
                <div className="profile">
                    <div className="profile-top">
                        <a href="/">
                            <img src="./assets/grabit-icon.png" alt="Grabit" />
                        </a>
                        <button>
                            <img src="./assets/request-order-icon.png" alt="Grabit" />
                            Request an Order
                        </button>
                        <a id="user-name-image" href="">
                            <p>Patek Philippe</p>
                            <img id="image-icon-top" src="./assets/oval.png" alt="Grabit" />
                        </a>
                    </div>
                    <div className="profile-main">
                        <div className="main-left">
                                <div className="main-left-top">
                                    <img id="image-icon" src="./assets/oval.png" alt="Grabit" />
                                    <p>Patek Philippe</p>
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
                        <div className="main-right" >
                            <div className="main-right-top">
                                <h3>Profile Settings</h3>
                            </div>
                            <div className="main-right-form">
                                <div className="main-right-form-inputs">
                                    <section class="input">
                                        <label for="name">First & Last Name</label>
                                        <br/>
                                        <input type="text" name="name" id="name"/>
                                    </section>
                                    <section class="input">
                                        <label for="email">Email</label>
                                        <br/>
                                        <input type="email" name="email" id="email"/>
                                    </section>
                                    <section class="input">
                                        <label for="phone">Phone</label>
                                        <br/>
                                        <input type="text" name="phone" id="phone"/>
                                    </section>
                                    <br/>
                                    <button>Update</button>
                                </div>
                                <div className="main-right-form-image">
                                    <img src="./assets/oval.png" alt="Grabit" />
                                    <br/>
                                    <button id="upload" >Upload</button>
                                    <button id="remove" >Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-bottom">
                        <ul>
                            <li>
                                <a href="">2019 grabit</a>
                            </li>
                            <li>
                                <a href="">Terms</a>
                            </li>
                            <li>
                                <a href="">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                </div>
                );
    }
}

export default Profile;