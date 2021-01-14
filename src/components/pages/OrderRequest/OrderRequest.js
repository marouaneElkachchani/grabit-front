import React from 'react';
import './OrderRequest.css';
import { Link } from 'react-router-dom';
import TopBanner from '../../TopBanner/TopBanner';

class OrderRequest extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

            const user = this.props.user;
            const isOrderRequest = true;

            return (
                <div className="order-request">
                    <TopBanner isOrderRequest={isOrderRequest} user={user} />
                    <div className="order-request-main">

                    </div>
                </div>
        );
    }
}

export default OrderRequest;