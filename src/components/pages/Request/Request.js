import React from 'react'
import './Request-v1.css'
import { GoogleApiWrapper } from 'google-maps-react'
import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'
import Footer from '../../Footer/Footer'
import add from './assets/add.png'
import ovalDsa from './assets/oval-dsa.png'
import ovalAddress from './assets/oval-address.png'
import ovalAsd from './assets/oval-asd.png'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import query from '../../../queries/fetchRequest'

const style = {
    width: '27.38%',
    height: '70%'
}

class Request extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: [],
            originPlaceId: "",
            destinationPlaceId: "",
            travelMode: this.props.google.maps.TravelMode.DRIVING
        }
        this.renderItems = this.renderItems.bind(this)
    }

    renderItems(items) {
        return items.map( ({ name }, index) => {
            return (
                <div key={index} id="delete-item-block">
                    <a id="delete-item-link">
                        <img id="delete-item" src={add} alt="Grabit"/>
                    </a>
                    <p>{name}</p>
                </div>
                )
        })
    }

    componentDidMount() {
        //Init Google Map
        // const map = new this.props.google.maps.Map(document.getElementById("map"), {
        //     mapTypeControl: false,
        //     center: { lat: 33.9646, lng: -6.8479 },
        //     zoom: 13,
        //     style
        // })
        // const directionsRenderer =  new this.props.google.maps.DirectionsRenderer()
        // directionsRenderer.setMap(map)
        // const originInput = document.getElementById("address-departure")
        // const destinationInput = document.getElementById("delivery-address")
        // const options = { type: ['floor', 'street_number', 'route', 'locality', 'political', 'country', 'postal_code', 'establishment']}
        // const originAutocomplete = new this.props.google.maps.places.Autocomplete(originInput, options)
        // // Specify just the place data fields that you need.
        // originAutocomplete.setFields(["place_id",'formatted_address', 'geometry', 'name', 'address_components'])
        // const destinationAutocomplete = new this.props.google.maps.places.Autocomplete(destinationInput, options)
        // // Specify just the place data fields that you need.
        // destinationAutocomplete.setFields(["place_id", 'formatted_address', 'geometry', 'name', 'address_components'])
        // this.setupPlaceChangedListener(originAutocomplete, "ORIG", map, directionsRenderer)
        // this.setupPlaceChangedListener(destinationAutocomplete, "DEST", map, directionsRenderer)
    }

    setupPlaceChangedListener(autocomplete, mode, map, directionsRenderer) {
        // autocomplete.bindTo("bounds", map)
        // autocomplete.addListener("place_changed", () => {
        //   const place = autocomplete.getPlace()
        //   if (!place.place_id) {
        //     window.alert("Please select an option from the dropdown list.")
        //     return
        //   }
        //   if (mode === "ORIG") {
        //     this.setState({ originPlaceId: place.place_id,
        //                     addressDeparture: place.name + ' ' + place.formatted_address})
        //   } else {
        //     this.setState({ destinationPlaceId: place.place_id,
        //                     deliveryAddress: place.name + ' ' + place.formatted_address})
        //   }
        //   this.route(directionsRenderer)
        // })
    }

    route(directionsRenderer) {
        // if (!this.state.originPlaceId || !this.state.destinationPlaceId) {
        //   return
        // }
        // const directionsService = new this.props.google.maps.DirectionsService()
        // directionsService.route(
        //   {
        //     origin: { placeId: this.state.originPlaceId },
        //     destination: { placeId: this.state.destinationPlaceId },
        //     travelMode: this.state.travelMode,
        //   },
        //   (response, status) => {
        //     if (status === "OK") {
        //         directionsRenderer.setDirections(response)
        //     } else {
        //       window.alert("Directions request failed due to " + status)
        //     }
        //   }
        // )
    }

    onSubmit(event) {
        // event.preventDefault()

        // this.props.mutate({
        //     variables: {
        //         description: this.state.description,
        //     },
        //     refetchQueries:[{query}]
        // }).then( () => {
        //     this.setState({
        //         description: "",
        //         errors: []
        //     })
        // }).then( () => {
        //    const id = this.props.user.id 
        //    this.props.history.push(`/profile/${id}/requests`)
        // }).catch( res => {
        //     const errors = res.graphQLErrors.map( err => err.message )
        //     this.setState({ errors })
        // })
    }

    render() {
            const isRequest = true
            const user = this.props.user
            if(this.props.data.loading)
            {
                return <div>Loading...</div>
            }
            const request = this.props.data.request
            return (
                <div>
                    <TopBannerV1 isRequest={isRequest} user={user}/>

                    <div className="order">
                        <div className="order-request-t">
                            <div className="order-request-top">
                                <h3>Request</h3>
                            </div>
                        </div>

                        <div className="order-request-m">

                            <form className="order-request-main" onSubmit={this.onSubmit.bind(this)}>

                                <div className="order-request-main-left">


                                    <section className="input">
                                        <label>Description</label>
                                        <br/>
                                        <textarea id="description" type="text" name="description" disabled={true}
                                                  value={request.description}/>
                                    </section>
                                    
                                    <section>
                                        <label>Items</label>
                                        <br/>
                                    </section>

                                    <section className="input">
                                        {this.renderItems(request.items)}
                                    </section>


                                    <section className="input">
                                        <label>Date</label>
                                        <br/>
                                        <p>{request.date}</p>
                                    </section>


                                    <section className="input">
                                        <label>Schedule</label>
                                        <br/>
                                        <p>{request.schedule}</p>
                                    </section>

                                    <section className="input">

                                        <label>Cost Range</label>
                                        <br/>
                                        <p>{request.costRange.from}</p>

                                        <label>To</label>
                                        <p>{request.costRange.to}</p>

                                        <label>Dhs</label>

                                    </section>
                                </div>




                                <div className="order-request-main-right">


                                    <section className="input">
                                        <br/>
                                        <br/>
                                        <img id="oval-dsa" src={ovalDsa} alt="Grabit"/>
                                        <p>{request.addressDeparture}</p>
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
                                        <p>{request.deleveryAddress}</p>
                                    </section>

                                    <br/>

                                    {/* <div id="map">
                                    </div> */}

                                    <div id="order-request-errors">
                                        {this.state.errors.map( error => <div key={ error }>{ error }</div > )}
                                    </div>

                                </div>
                                <input id="order-request-submit-button" type="submit" value="Go!"/>
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
        UpdateRequest {
                updateRequest {
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
   graphql(query, { options: (props) => { return { variables: { id: props.match.params.requestId} } } } ) (
        graphql(mutation)(
                            GoogleApiWrapper({
                                apiKey: process.env.REACT_APP_GOOGLE_SECRET_KEY
                            })(Request)
                        )
    )

