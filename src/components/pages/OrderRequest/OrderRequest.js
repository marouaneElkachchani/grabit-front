import React from 'react';
import './OrderRequest.css';
import { Link } from 'react-router-dom';
import TopBanner from '../../TopBanner/TopBanner';
import Footer from '../../Footer/Footer';
import ovalDsa from './assets/oval-dsa.png';
import ovalAddress from './assets/oval-address.png';
import ovalAsd from './assets/oval-asd.png';

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
                                            <textarea id="order-description" type="text" name="order-description" defaultValue="Text goes here"  />
                                        </section>
                                        <section className="input">
                                            <label>Date</label>
                                            <br/>
                                            <input id="order-date" type="text" name="order-date" defaultValue=""/>
                                        </section>
                                        <section className="input">
                                            <label>Schedule</label>
                                            <br/>
                                            <input id="order-schedule" type="text" name="order-schedule" defaultValue=""/>
                                        </section>                                 
                                        <section className="input">
                                            <label>Order Cost</label>
                                            <br/>
                                            <input id="order-cost" type="text" name="order-cost" defaultValue=""/>
                                        </section>
                                    </div>
                                    <div className="order-request-main-right">
                                        <section className="input">
                                            <br />
                                            <br />
                                            <img id="oval-dsa" src={ovalDsa} alt="Grabit" />
                                            <input id="order-address-departure" type="text" name="order-address-departure" defaultValue=""/>
                                            <br />
                                            <img className="oval-address" src={ovalAddress} alt="Grabit" />   
                                        </section>
                                        <section className="input">
                                            <img className="oval-address" src={ovalAddress} alt="Grabit" />
                                            <br />
                                            <img className="oval-address" src={ovalAddress} alt="Grabit" />
                                        </section>
                                        <section className="input">
                                            <img className="oval-address" src={ovalAddress} alt="Grabit" /> 
                                            <br />
                                            <img id="oval-asd" src={ovalAsd} alt="Grabit" />
                                            <input id="order-address-arrival" type="text" name="order-address-arrival" defaultValue={user.address} />
                                        </section>
                                        <section className="input">
                                            <div id="map"></div>
                                        </section>
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