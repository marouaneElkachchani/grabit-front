import React from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'
import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'
import facebookLogo from './assets/facebook-logo.png'

class SignUp extends React.Component {
    render() {
            const role = this.props.match.params.role
            if(role === 'customer' || role === 'driver') {
                return (
                    <div className="sign-up">
                        <TopBannerV1/>
                        <div className="sign-up-main">
                            <div className="sign-up-main-box">
                                <h3 id="sign-up-title">Sign up as {role} :</h3>
                                <h3>Continue with Facebook :</h3>
                                <button>
                                    <img src={facebookLogo} alt="Grabit"/>
                                    Sign up with Facebook
                                </button>
                                <h3>Or Continue with Email :</h3>
                            </div>
                        </div>
                    </div>
                )
            }else {
                this.props.history.push(`/`)
                return null
            }
    }
}

export default SignUp