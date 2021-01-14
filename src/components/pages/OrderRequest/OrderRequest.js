import React from 'react';
import './OrderRequest.css';
import { Link } from 'react-router-dom';
import TopBanner from '../../TopBanner/TopBanner';
import Footer from '../../Footer/Footer';

class OrderRequest extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
            const user = this.props.user;
            const isOrderRequest = true;
            return (
                <div>
                    <TopBanner user={user} isOrderRequest={isOrderRequest} />
                    <div className="order">
                        <div className="order-request-t">
                            <div className="order-request-top">
                                <h3>Order Request</h3>
                            </div>
                        </div>
                        <div className="order-request-m">
                                <div className="order-request-main">



                                    <div className="order-request-main-left">


                                        <section className="input">
                                            <label>Describe your order</label>
                                            <br/>
                                            <textarea id="order-description" type="text" name="order-description"  >
                                                Text goes here
                                            </textarea>    
                                        </section>

                                        <section className="input">
                                            <label>Date</label>
                                            <br/>
                                            <input id="order-date" type="text" name="order-date" />
                                        </section>

                                        <section className="input">
                                            <label>Schedule</label>
                                            <br/>
                                            <input id="order-schedule" type="text" name="order-schedule" />
                                        </section>
                                        

                                        <section className="input">
                                            <label>Order Cost</label>
                                            <br/>
                                            <input id="order-cost" type="text" name="order-cost" />
                                        </section>



                                    </div>



                                    <div className="order-request-main-right">

                                    </div>



                                </div>
                        </div>
                        <Footer />
                    </div>
                </div>
        );
    }
}

export default OrderRequest;