import React from 'react'
import './OrderRequest.css'
import { Link } from 'react-router-dom'
import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'
import Footer from '../../Footer/Footer'
import ovalDsa from './assets/oval-dsa.png'
import ovalAddress from './assets/oval-address.png'
import ovalAsd from './assets/oval-asd.png'
import add from './assets/add.png'
import deleteItem from './assets/remove-item.png'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class OrderRequest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            description: "",
            item: "",
            items: [],
            date: "",
            schedule: "",
            orderCost: {from: "", to: ""},
            deliveryAddress: "",
            addressDeparture: ""
        }

        this.addItem = this.addItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.renderItems = this.renderItems.bind(this)
    }

    addItem() {
        if(this.state.item) {
            this.setState(prevState => ({
                items: [{name: this.state.item}, ...prevState.items],
                item: ""
              }))
        }
    }

    deleteItem(index) {
        const items = this.state.items
        items.splice(index, 1)
        this.setState({items})
    }

    renderItems() {
        return this.state.items.map( ({ name }, index) => {
            return (
                <div key={index} id="delete-item-block">
                    <a id="delete-item-link" onClick={ () => this.deleteItem(index) }>
                        <img id="delete-item" src={deleteItem} alt="Grabit"/>
                    </a>
                    <p>{name}</p>
                </div>
                );
        });
    }

    onSubmit(event) {
        event.preventDefault()
    //     this.props.mutate({
    //         variables: {
    //             description: this.state.description,
    //             items: [],
    //             date: this.state.date,
    //             schedule: this.state.schedule,
    //             orderCost: {},
    //             deliveryAddress: this.state.deliveryAddress,
    //             addressDeparture: this.state.addressDeparture
    //         }
    //     })
        console.log(this.state)
    }

    render() {

            const isOrderRequest = true

            return (
                <div>
                    <TopBannerV1 isOrderRequest={isOrderRequest}/>
                    <div className="order">
                        <div className="order-request-t">
                            <div className="order-request-top">
                                <h3>Order Request</h3>
                            </div>
                        </div>
                        <div className="order-request-m">
                            <form className="order-request-main" onSubmit={this.onSubmit.bind(this)}>
                                <div className="order-request-main-left">
                                    <section className="input">
                                        <label>Describe your order</label>
                                        <br/>
                                        <textarea id="description" type="text" name="description" 
                                                  value={this.state.description}
                                                  onChange={event => this.setState({ description: event.target.value })}/>
                                    </section>
                                    <section>
                                        <label>Items</label>
                                        <br/>
                                        <input id="items" type="text" name="items" 
                                               value={this.state.item}
                                               onChange={event => this.setState({ item: event.target.value })}/>
                                        <a id="add-item-link" onClick={this.addItem}>
                                            <img id="add" src={add} alt="Grabit"/>
                                        </a>
                                    </section>
                                    <section className="input">
                                        {this.renderItems()}
                                    </section>
                                    <section className="input">
                                        <label>Date</label>
                                        <br/>
                                        <input id="date" type="date" name="date"
                                               value={this.state.date}
                                               onChange={event => this.setState({ date: event.target.value })}/>
                                    </section>
                                    <section className="input">
                                        <label>Schedule</label>
                                        <br/>
                                        <select id="schedule" type="text" name="schedule"
                                                value={this.state.schedule}
                                                onChange={event => this.setState({ schedule: event.target.value })}>
                                            <option value="ASAP">ASAP</option>
                                            <option value="TODAY">TODAY</option>
                                            <option value="THISWEEK">THIS WEEK</option>
                                        </select>
                                    </section>
                                    <section className="input">
                                        <label>Cost Range</label>
                                        <br/>
                                        <input id="cost-range-from" type="number" name="cost-range" 
                                               value={this.state.orderCost.from}
                                               onChange={event => this.setState(prevState => ({ orderCost:{from: event.target.value, to: prevState.orderCost.to} }) )}/>
                                        <label>To</label>
                                        <input id="cost-range-to" type="number" name="cost-range" 
                                               value={this.state.orderCost.to}
                                               onChange={event => this.setState(prevState => ({ orderCost:{from: prevState.orderCost.from, to: event.target.value} }) )}/>
                                        <label>Dhs</label>
                                    </section>
                                </div>
                                <div className="order-request-main-right">
                                    <section className="input">
                                        <br/>
                                        <br />
                                        <img id="oval-dsa" src={ovalDsa} alt="Grabit" />
                                        <input id="address-departure" type="text" name="address-departure"
                                               value={this.state.addressDeparture}
                                               onChange={event => this.setState({ addressDeparture: event.target.value })}/>
                                        <br />
                                        <img className="oval-address" src={ovalAddress} alt="Grabit"/>
                                    </section>
                                    <section className="input">
                                        <img className="oval-address" src={ovalAddress} alt="Grabit"/>
                                        <br />
                                        <img className="oval-address" src={ovalAddress} alt="Grabit"/>
                                    </section>
                                    <section className="input">
                                        <img className="oval-address" src={ovalAddress} alt="Grabit"/> 
                                        <br />
                                        <img id="oval-asd" src={ovalAsd} alt="Grabit" />
                                        <input id="delivery-address" type="text" name="delivery-address" 
                                               value={this.state.deliveryAddress}
                                               onChange={event => this.setState({ deliveryAddress: event.target.value })}/>
                                    </section>
                                    <section className="input">
                                        <div id="map"></div>
                                    </section>
                                </div>
                                <input id="order-request-submit-button" type="submit" value="Request"/>
                            </form>
                        </div>
                        <Footer />
                    </div>
                </div>
            );
    }
}

// const mutation = gql`
//     mutation CreateRequest($description: String,
//                            $items: 
//                            $date: String,
//                            $schedule: String,
//                            $orderCost: 
//                            $deliveryAddress: String,
//                            $addressDeparture: String) {
//         createRequest(description: $description,
//                       items: $items,
//                       date: $date,
//                       schedule: $schedule,
//                       orderCost: $orderCost,
//                       deliveryAddress: $deliveryAddress,
//                       addressDeparture: $addressDeparture) {
//                       description
//                       items {
//                           name
//                       }
//                       date
//                       schedule
//                       orderCost{
//                           from
//                           to
//                       }
//                       deliveryAddress
//                       addressDeparture
//         }
//     }
// `

export default OrderRequest