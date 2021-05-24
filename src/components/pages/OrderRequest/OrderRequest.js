import React from 'react'
import './OrderRequest.css'
import { Link } from 'react-router-dom'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import Script from 'react-load-script'

import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'
import Footer from '../../Footer/Footer'

import ovalDsa from './assets/oval-dsa.png'
import ovalAddress from './assets/oval-address.png'
import ovalAsd from './assets/oval-asd.png'
import add from './assets/add.png'
import deleteItem from './assets/remove-item.png'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import query from '../../../queries/fetchRequests'

const mapStyles = {
    width: '27.38%',
    height: '70%'
}

class OrderRequest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            description: "",
            item: "",
            items: [],
            date: "",
            schedule: "ASAP",
            costRange: {from: 0, to: 0},
            addressDeparture: "",
            deliveryAddress: "",
            errors: [],

            showingInfoWindow: false,  // Hides or shows the InfoWindow
            activeMarker: {},          // Shows the active marker upon click
            selectedPlace: {},          // Shows the InfoWindow to the selected place upon a marker

            cityDeparture: '',
            cityDelivery: ''
        }
        this.addItem = this.addItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.renderItems = this.renderItems.bind(this)

        this.initAutocomplete = this.initAutocomplete.bind(this)
        this.handlePlaceSelectDeparture = this.handlePlaceSelectDeparture.bind(this)
        this.handlePlaceSelectDelivery = this.handlePlaceSelectDelivery.bind(this)
    }

    initAutocomplete() { 

        // Declare Options For Autocomplete 
        const options = { types: ['(cities)'] }

        // Initialize Google Autocomplete 
          /*global google*/
        this.autocompleteDeparture = new google.maps.places.Autocomplete(
                                 document.getElementById('address-departure'),
                                 options )
        
        this.autocompleteDelivery = new google.maps.places.Autocomplete(
             document.getElementById('delivery-address'),
             options )

         // Avoid paying for data that you don't need by restricting the 
         // set of place fields that are returned to just the address
         // components and formatted address
        this.autocompleteDeparture.setFields(['address_components',   
                                         'formatted_address'])

        this.autocompleteDelivery.setFields(['address_components',   
                                         'formatted_address'])

         // Fire Event when a suggested name is selected
        this.autocompleteDeparture.addListener('place_changed',
                                       this.handlePlaceSelectDeparture)

        this.autocompleteDelivery.addListener('place_changed',
                                        this.handlePlaceSelectDelivery)

    }

    handlePlaceSelectDeparture = () => {

        // Extract City From Address Object
        const addressObject = this.autocompleteDeparture.getPlace()
        const address = addressObject.address_components
    
         // Check if address is valid
        if (address) {
          // Set State
           this.setState(
            {
               cityDeparture: address[0].long_name,
               addressDeparture: addressObject.formatted_address,
            }
           )
        }

    }

    handlePlaceSelectDelivery = () => {

        // Extract City From Address Object
        const addressObject = this.autocompleteDelivery.getPlace()
        const address = addressObject.address_components
    
        // Check if address is valid
        if (address) {
          // Set State
           this.setState(
            {
               cityDelivery: address[0].long_name,
               deliveryAddress: addressObject.formatted_address,
            }
           )
         }

    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    })

    onClose = props => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
        }
    }

    addItem() {
        if(this.state.item.length >= 3 && this.state.item.length < 20) {
            this.setState(prevState => ({
                items: [{name: this.state.item}, ...prevState.items],
                item: "",
                errors: []
              }))
        }else {
            const errors = ["Item name must be 3 to 20 characters"]
            this.setState({ errors })
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
                )
        })
    }

    onSubmit(event) {
        event.preventDefault()
        if(this.state.description === "") {
            const errors = ["Enter Description"]
            this.setState({ errors })
            return null
        }
        if(this.state.items.length === 0) {
            const errors = ["Enter Items"]
            this.setState({ errors })
            return null
        }
        if(this.state.date === '') {
            const errors = ["Enter Date"]
            this.setState({ errors })
            return null
        }
        if(this.state.schedule === '') {
            const errors = ["Enter Schedule"]
            this.setState({ errors })
            return null
        }
        if(this.state.costRange.from === 0 || this.state.costRange.to === 0) {
            const errors = ["Enter Cost Range"]
            this.setState({ errors })
            return null
        }
        if(this.state.addressDeparture === '') {
            const errors = ["Enter Address Departure"]
            this.setState({ errors })
            return null
        }
        if(this.state.deliveryAddress === '') {
            const errors = ["Enter Delivery Address"]
            this.setState({ errors })
            return null
        }
        this.props.mutate({
            variables: {
                description: this.state.description,
                items: this.state.items,
                date: this.state.date,
                schedule: this.state.schedule,
                costRange: this.state.costRange,
                addressDeparture: this.state.addressDeparture,
                deliveryAddress: this.state.deliveryAddress
            },
            refetchQueries:[{query}]
        }).then( () => {
            this.setState({
                description: "",
                item: "",
                items: [],
                date: "",
                schedule: "ASAP",
                costRange: {from: 0, to: 0},
                addressDeparture: "",
                deliveryAddress: "",
                errors: []
            })
        }).then( () => {
           const id = this.props.user.id 
           this.props.history.push(`/profile/${id}/requests`)
        }).catch( res => {
            const errors = res.graphQLErrors.map( err => err.message )
            this.setState({ errors })
        })
    }

    render() {
            const isOrderRequest = true
            const user = this.props.user
            return (
                <div>
                    <TopBannerV1 isOrderRequest={isOrderRequest} user={user}/>
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
                                               pattern="^([a-zA-Z]+\s)*[a-zA-Z]+$"
                                               title="Item must be A-Z, a-z and single space characters"
                                               minLength="3"
                                               maxLength="20"
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
                                               value={this.state.costRange.from}
                                               onChange={event => this.setState(prevState => ({ costRange:{from: event.target.value, to: prevState.costRange.to} }) )}/>
                                        <label>To</label>
                                        <input id="cost-range-to" type="number" name="cost-range" 
                                               value={this.state.costRange.to}
                                               onChange={event => this.setState(prevState => ({ costRange:{from: prevState.costRange.from, to: event.target.value} }) )}/>
                                        <label>Dhs</label>
                                    </section>
                                </div>
                                <div className="order-request-main-right">


                                    <section className="input">
                                        <br/>
                                        <br />
                                        <img id="oval-dsa" src={ovalDsa} alt="Grabit"/>

                                        <input id="address-departure" type="text" name="address-departure"
                                               minLength="10"
                                               maxLength="50"
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
                                               minLength="10"
                                               maxLength="50"
                                               value={this.state.deliveryAddress}
                                               onChange={event => this.setState({ deliveryAddress: event.target.value })}/>
                                    </section>



                                    <br/>
                                    <div id="map">
  
                                            <Map google={this.props.google}
                                                    onReady={this.initAutocomplete}
                                                    zoom={4}
                                                    style={mapStyles}
                                                    initialCenter={
                                                    {
                                                    lat: 33.996750914324764,
                                                    lng:  -6.847294231421396
                                                    }
                                                    }>

                                                <Marker onClick={this.onMarkerClick}
                                                        name={'Morocco'}/>

                                                <InfoWindow marker={this.state.activeMarker}
                                                            visible={this.state.showingInfoWindow}
                                                            onClose={this.onClose}>
                                                    <div>
                                                        <h4>{this.state.selectedPlace.name}</h4>
                                                    </div>
                                                </InfoWindow>

                                            </Map>

                                    </div>
                                    <div id="order-request-errors">
                                        {this.state.errors.map( error => <div key={ error }>{ error }</div > )}
                                    </div>
                                </div>
                                <input id="order-request-submit-button" type="submit" value="Request"/>
                            </form>
                        </div>
                        <Footer/>
                    </div>
                </div>
            )
    }
}

const mutation = gql`
    mutation
        CreateRequest(  $description: String!,
                        $items: [CreateItemInput!]!,
                        $date: String!,
                        $schedule: String!,
                        $costRange: CreateCostRangeInput!,
                        $addressDeparture: String!,
                        $deliveryAddress: String!
                            ) {
            createRequest(data: {   description: $description,
                                    items: $items,
                                    date: $date,
                                    schedule: $schedule,
                                    costRange: $costRange,
                                    addressDeparture: $addressDeparture,
                                    deliveryAddress: $deliveryAddress }
                       ) {
                                id
                                description
                                items {
                                        id
                                        name
                                }
                                status
                                date
                                schedule
                                costRange {
                                            id
                                            from
                                            to
                                }
                                addressDeparture
                                deliveryAddress
            }
        }
`

export default 
    graphql(mutation)(
        GoogleApiWrapper({
            apiKey: 'AIzaSyA3qDycI2ifEAACcNb3-fcdLes3bYxTthw'
        })(OrderRequest)
    )

