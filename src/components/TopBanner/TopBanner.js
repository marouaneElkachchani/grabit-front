import React from 'react';
import './TopBanner.css';

class TopBanner extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

            return (
                <div className="TopBanner">
                        <a href="">
                            <img src="./assets/grabit-icon.png" alt="Grabit" />
                        </a>
                        <button id="requestAnOrderButton">
                            <img src="./assets/request-order-icon.png" alt="Grabit" />
                            Request an Order
                        </button>
                        <a id="user-image" href="">
                            <p>Patek Philippe</p>
                            <img id="oval" src="./assets/oval.png" alt="Grabit" />
                        </a>
                </div>
            );
    }
}
        
export default TopBanner;