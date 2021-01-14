import React from 'react';
import './TopBanner.css';
import { Link } from 'react-router-dom';
import grabitIcon from './assets/grabit-icon.png';
import requestOrderIcon from './assets/request-order-icon.png';
import oval from './assets/oval.png';


class TopBanner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
            const user = this.props.user;
            const isProfile = this.props.isProfile;
            const isOrderRequest = this.props.isOrderRequest;
            if(isProfile) {
                return (
                    <div className="top-banner-profile">
                        <Link to="/" id="grabit-icon-box-profile">
                            <img src={grabitIcon} alt="Grabit" />
                        </Link>
                        <Link to="/order-request">
                            <button id="request-an-order-button">
                                    <img src={requestOrderIcon} alt="Grabit" />
                                    Request an Order
                            </button>
                        </Link>
                        <Link to={`/profile/${user.id}`} id="user-name-image-box-profile">
                            <p>{user.name}</p>
                            <img id="user-image-profile" src={oval} alt="Grabit" />
                        </Link>
                    </div>
                );
            } else if(isOrderRequest) {
                return(
                    <div className="top-banner-order-request">
                        <Link to="/" id="grabit-icon-box-order-request">
                            <img src={grabitIcon} alt="Grabit" />
                        </Link>
                        <Link to={`/profile/${user.id}`} id="user-name-image-box-order-request" >
                            <p>{user.name}</p>
                            <img id="user-image-order-request" src={oval} alt="Grabit" />
                        </Link>
                    </div>
                );
            }else {
                return (
                <div className="top-banner-sign-up">
                    <Link to="/" id="grabit-icon-box-sign-up">
                        <img src={grabitIcon} alt="Grabit" />
                    </Link>
                </div>
                );
            }
    }
}
        
export default TopBanner;