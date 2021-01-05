import React from 'react';
import './DriverSignUp.css';

class DriverSignUp extends React.Component {
    render() {
            return (
                <div className="driverSignUp">
                    <div className="driverSignUp-top">
                        <a href="/">
                            <img src="./assets/grabit-icon.png" alt="Grabit" />
                        </a>
                    </div>
                    <div className="driverSignUp-main">
                        <div className="driverSignUp-main-box">
                            <h3>Sign up as Driver</h3>
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

export default DriverSignUp;