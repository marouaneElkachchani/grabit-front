import React from 'react';
import './CustomerSignUp.css';
import { Link } from 'react-router-dom';
import TopBanner from '../../TopBanner/TopBanner';
import facebookLogo from './assets/facebook-logo.png';

class CustomerSignUp extends React.Component {
    render() {
            return (
                <div className="customerSignUp">
                    <TopBanner />
                    <div className="customerSignUp-main">
                        <div className="customerSignUp-main-box">
                            <h3>Sign up as Customer</h3>
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

export default CustomerSignUp;