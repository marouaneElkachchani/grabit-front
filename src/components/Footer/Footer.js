import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
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
        );
    }
}
        
export default Footer;