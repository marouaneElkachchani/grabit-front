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
            const name = this.props.name;
            const isProfile = this.props.isProfile;

            if(isProfile) {
                return (
                    <div className="top-banner">
                        <Link to="/">
                            <img src={grabitIcon} alt="Grabit" />
                        </Link>
                        <button id="requestAnOrderButton">
                            <img src={requestOrderIcon} alt="Grabit" />
                            Request an Order
                        </button>
                        <Link to="/profile" id="user-image">
                            <p>{name}</p>
                            <img id="oval" src={oval} alt="Grabit" />
                        </Link>
                    </div>
                );
            } else {
                return (
                <div className="top-banner-sign-up">
                    <Link to="/">
                        <img src={grabitIcon} alt="Grabit" />
                    </Link>
                </div>
                );
            }
    }
}
        
export default TopBanner;