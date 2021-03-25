import React from 'react'
import './SignIn.css'
import { Link } from 'react-router-dom'
import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'
import facebookLogo from './assets/facebook-logo.png'

class SignIn extends React.Component {
    render() {
            return (
                <div className="sign-in">
                    <TopBannerV1/>
                    <div className="sign-in-main">
                        <div className="sign-in-main-box">
                            <h3 id="sign-in-title">Sign in :</h3>
                            <h3>Continue with Facebook :</h3>
                            <Link id="sign-in-with-facebook" to="/app">
                                <button>
                                    <img src={facebookLogo} alt="Grabit"/>
                                    Sign in with Facebook
                                </button>
                            </Link>
                            <h3>Or Continue with Email :</h3>
                        </div>
                    </div>
                </div>
        )
    }
}

export default SignIn