import React from 'react'
import './TopBanner-v1.css'
import { Link, NavLink } from 'react-router-dom'
import grabitIcon from './assets/grabit-icon.png'
import requestOrderIcon from './assets/request-order-icon.png'
import oval from './assets/oval.png'

class TopBannerV1 extends React.Component {
    
    constructor(props) {
        super(props)
    }

    renderProfilePicture() {
        if(this.props.user.pictureUrl && this.props.user.pictureUrl !== '') {
          return (
            <img id="user-image-profile" src={this.props.user.pictureUrl} alt="Grabit"/>
          )
        } else {
          return (
            <img id="user-image-profile" src={oval} alt="Grabit"/>
          )
        }
    }

    render() {
            const isProfile = this.props.isProfile
            const isOrderRequest = this.props.isOrderRequest
            const user = this.props.user
            if(isProfile) {
                return (
                    <div className="top-banner-profile">
                        <Link to="/" id="grabit-icon-box-profile">
                            <img src={grabitIcon} alt="Grabit"/>
                        </Link>
                        <Link to="/order-request/new">
                            <button id="request-an-order-button">
                                    <img src={requestOrderIcon} alt="Grabit"/>
                                    Request an Order
                            </button>
                        </Link>
                        <a id="user-name-image-box-profile">
                            <span id="user-name-span">{user.name}</span>
                            {this.renderProfilePicture()}
                        </a>
                    </div>
                )
            } else if(isOrderRequest) {
                return(
                    <div className="top-banner-order-request">
                        <Link to="/" id="grabit-icon-box-order-request">
                            <img src={grabitIcon} alt="Grabit"/>
                        </Link>
                        <Link to={`/profile/${user.id}`} id="user-name-image-box-order-request">
                            <span id="user-name">{user.name}</span>
                            {this.renderProfilePicture()}
                        </Link>
                    </div>
                )
            }else {
                return (
                <div className="top-banner-sign-up">
                    <Link to="/" id="grabit-icon-box-sign-up">
                        <img src={grabitIcon} alt="Grabit"/>
                    </Link>
                </div>
                )
            }
    }
}

export default TopBannerV1