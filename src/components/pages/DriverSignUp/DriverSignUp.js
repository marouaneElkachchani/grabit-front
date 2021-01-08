import React from 'react';
import './DriverSignUp.css';
import { Link } from 'react-router-dom';
import TopBanner from '../../TopBanner/TopBanner';
import facebookLogo from './assets/facebook-logo.png';

class DriverSignUp extends React.Component {
    render() {
            return (
                <div className="driverSignUp">
                    <TopBanner />
                    <div className="driverSignUp-main">
                        <div className="driverSignUp-main-box">
                            <h3>Sign up as Driver</h3>
                            <button>
                                <img src={facebookLogo} alt="Grabit" />
                                Continue with Facebook
                            </button>
                        </div>
                    </div>
                </div>
        );
    }
}

export default DriverSignUp;