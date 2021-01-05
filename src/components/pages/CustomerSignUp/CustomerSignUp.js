import React from 'react';
import './CustomerSignUp.css';

class CustomerSignUp extends React.Component {
    render() {
            return (
                <div className="customerSignUp">
                    <div className="customerSignUp-top">
                        <a href="/">
                            <img src="./assets/grabit-icon.png" alt="Grabit" />
                        </a>
                    </div>
                    <div className="customerSignUp-main">
                        <div className="customerSignUp-main-box">
                            <h3>Sign up as Customer</h3>
                            <button>
                                <img src="./assets/facebook-logo.png" alt="Grabit" />
                                Continue with Facebook
                            </button>
                        </div>
                    </div>
                </div>
        );
    }
}

export default CustomerSignUp;