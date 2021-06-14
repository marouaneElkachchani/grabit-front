import React from 'react'
import './OnHoldRequests.css'
import { Link } from 'react-router-dom'
import { GoogleApiWrapper } from 'google-maps-react'

import { Modal } from 'react-st-modal'

import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'
import Footer from '../../Footer/Footer'
import ovalDsa from './assets/oval-dsa.png'
import ovalAddress from './assets/oval-address.png'
import ovalAsd from './assets/oval-asd.png'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import query from '../../../queries/fetchOnHoldRequests'

const style = {
    width: '27.38%',
    height: '70%'
}

class OnHoldRequests extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
            errors: [],
            originPlaceId: "",
            destinationPlaceId: "",
            travelMode: this.props.google.maps.TravelMode.DRIVING
        }
    }

    renderOnHoldRequests() {
        return this.props.data.onHoldRequests.map( ({ id, description, status }) => {
            return (    
                        <div key={ id }>
                            <li>
                                { description } ----------- { status }
                                <button id="on-hold-requests-submit-button">
                                    Details
                                </button>
                            </li>
                            <br/>
                        </div>
            )
        })
    }

    setShow(bool) {

      //document.getElementsByClassName("modal").setAttribute.isOpen = true

        this.setState({
            show: bool
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

        //     },
        //    refetchQueries:[{query}]
        // }).then( () => {
        //     this.setState({

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
            const isOnHoldRequests = true
            const user = this.props.user
            if(this.props.data.loading)
            {
                return <div>Loading...</div>
            }
            const onHoldRequests = this.props.data.onHoldRequests
            return (
                <div>
                    <TopBannerV1 isOnHoldRequests={isOnHoldRequests} user={user}/>
                    <div className="on-hold">
                        <div className="on-hold-requests-t">
                            <div className="on-hold-requests-top">
                                <h3>Incomming Requests</h3>
                            </div>
                        </div>
                        <div className="on-hold-requests-m">
                            <div className="on-hold-requests-main">

                                <ul className="render-on-hold-requests">
                                    {this.renderOnHoldRequests()}
                                </ul>
                                

                                {/* 

                                    <Modal isOpen={this.state.show}
                                           className="modal"
                                           onAttemptClose={() => this.setShow(false)}>
                                        <button onClick={() => this.setShow(false)}>Close</button>       
                                        Some text
                                    </Modal> */}


                            </div>
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

graphql(query) (
    graphql(mutation)(
                        GoogleApiWrapper({
                            apiKey: process.env.REACT_APP_GOOGLE_SECRET_KEY
                        })(OnHoldRequests)
                    )
)

