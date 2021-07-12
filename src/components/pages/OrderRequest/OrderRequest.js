import React from 'react'
import './OrderRequest.css'
import { Link } from 'react-router-dom'
import { GoogleApiWrapper } from 'google-maps-react'
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

const style = {
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
            originPlaceId: "",
            destinationPlaceId: "",
            travelMode: this.props.google.maps.TravelMode.DRIVING
        }
        this.addItem = this.addItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.renderItems = this.renderItems.bind(this)
    }

    componentDidMount() {
        //Init Google Map
        const map = new this.props.google.maps.Map(document.getElementById("map"), {
            mapTypeControl: false,
            center: { lat: 33.9646, lng: -6.8479 },
            zoom: 13,
            style
        })
        const directionsRenderer =  new this.props.google.maps.DirectionsRenderer()
        directionsRenderer.setMap(map)
        const originInput = document.getElementById("address-departure")
        const destinationInput = document.getElementById("delivery-address")
        const options = { type: ['floor', 'street_number', 'route', 'locality', 'political', 'country', 'postal_code', 'establishment']}
        const originAutocomplete = new this.props.google.maps.places.Autocomplete(originInput, options)
        // Specify just the place data fields that you need.
        originAutocomplete.setFields(["place_id",'formatted_address', 'geometry', 'name', 'address_components'])
        const destinationAutocomplete = new this.props.google.maps.places.Autocomplete(destinationInput, options)
        // Specify just the place data fields that you need.
        destinationAutocomplete.setFields(["place_id", 'formatted_address', 'geometry', 'name', 'address_components'])
        this.setupPlaceChangedListener(originAutocomplete, "ORIG", map, directionsRenderer)
        this.setupPlaceChangedListener(destinationAutocomplete, "DEST", map, directionsRenderer)
    }

    setupPlaceChangedListener(autocomplete, mode, map, directionsRenderer) {
        autocomplete.bindTo("bounds", map)
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace()
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.")
            return
          }
          if (mode === "ORIG") {
            this.setState({ originPlaceId: place.place_id,
                            addressDeparture: place.name + ' ' + place.formatted_address})
          } else {
            this.setState({ destinationPlaceId: place.place_id,
                            deliveryAddress: place.name + ' ' + place.formatted_address})
          }
          this.route(directionsRenderer)
        })
    }

    route(directionsRenderer) {
        if (!this.state.originPlaceId || !this.state.destinationPlaceId) {
          return
        }
        const directionsService = new this.props.google.maps.DirectionsService()
        directionsService.route(
          {
            origin: { placeId: this.state.originPlaceId },
            destination: { placeId: this.state.destinationPlaceId },
            travelMode: this.state.travelMode,
          },
          (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response)
            } else {
              window.alert("Directions request failed due to " + status)
            }
          }
        )
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

    showSpinner() {
        document.getElementById('order-request-submit-button-value').hidden = true
        document.getElementById('order-request-submit-button-icon').hidden = false
    }

    hideSpinner() {
        document.getElementById('order-request-submit-button-value').hidden = false
        document.getElementById('order-request-submit-button-icon').hidden = true
    }

    onSubmit(event) {
        this.showSpinner()
        event.preventDefault()
        if(this.state.description === "") {
            const errors = ["Enter Description"]
            this.setState({ errors })
            this.hideSpinner()
            return null
        }
        if(this.state.items.length === 0) {
            const errors = ["Enter Items"]
            this.setState({ errors })
            this.hideSpinner()
            return null
        }
        if(this.state.date === '') {
            const errors = ["Enter Date"]
            this.setState({ errors })
            this.hideSpinner()
            return null
        }
        if(this.state.schedule === '') {
            const errors = ["Enter Schedule"]
            this.setState({ errors })
            this.hideSpinner()
            return null
        }
        if(this.state.costRange.from === 0 || this.state.costRange.to === 0) {
            const errors = ["Enter Cost Range"]
            this.setState({ errors })
            this.hideSpinner()
            return null
        }
        if(this.state.addressDeparture === '') {
            const errors = ["Enter Address Departure"]
            this.setState({ errors })
            this.hideSpinner()
            return null
        }
        if(this.state.deliveryAddress === '') {
            const errors = ["Enter Delivery Address"]
            this.setState({ errors })
            this.hideSpinner()
            return null
        }
        if(this.state.originPlaceId === '') {
            const errors = ["Origin place doesn't show on map"]
            this.setState({ errors })
            this.hideSpinner()
            return null
        }
        if(this.state.destinationPlaceId === '') {
            const errors = ["Destination place doesn't show on map"]
            this.setState({ errors })
            this.hideSpinner()
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
                deliveryAddress: this.state.deliveryAddress,
                originPlaceId: this.state.originPlaceId,
                destinationPlaceId: this.state.destinationPlaceId
            },
            refetchQueries:[{query, variables: { first: 5,
                                                 skip: 0,
                                                 orderBy: 'createdAt_DESC' }}]
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
                originPlaceId: "",
                destinationPlaceId: "",
                errors: []
            })
        }).then( () => {
           this.hideSpinner()
           const id = this.props.user.id
           this.props.history.push(`/profile/${id}/requests`)
        }).catch( res => {
            const errors = res.graphQLErrors.map( err => err.message )
            this.setState({ errors })
            this.hideSpinner()
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
                                    </div>
                                    <div id="order-request-errors">
                                        {this.state.errors.map( error => <div key={ error }>{ error }</div > )}
                                    </div>
                                </div>
                                <button id="order-request-submit-button" type="submit" onSubmit={this.onSubmit.bind(this)}>
                                    <p id="order-request-submit-button-value" hidden={false}>Request</p>
                                    <div id="order-request-submit-button-icon" hidden={true}><i className="fa fa-spinner fa-spin"></i></div>
                                </button>
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
                        $deliveryAddress: String!,
                        $originPlaceId: String!,
                        $destinationPlaceId: String!
                            ) {
            createRequest(data: {   description: $description,
                                    items: $items,
                                    date: $date,
                                    schedule: $schedule,
                                    costRange: $costRange,
                                    addressDeparture: $addressDeparture,
                                    deliveryAddress: $deliveryAddress,
                                    originPlaceId: $originPlaceId,
                                    destinationPlaceId: $destinationPlaceId}
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
                                originPlaceId
                                destinationPlaceId
            }
        }
`

export default 
    graphql(mutation)(
        GoogleApiWrapper({
            apiKey: process.env.REACT_APP_GOOGLE_SECRET_KEY
        })(OrderRequest)
    )

