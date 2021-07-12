import React from 'react'
import './Request.css'
import { GoogleApiWrapper } from 'google-maps-react'
import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'
import Footer from '../../Footer/Footer'
import add from './assets/add-request-circle.png'
import ovalDsa from './assets/oval-dsa.png'
import ovalAddress from './assets/oval-address.png'
import ovalAsd from './assets/oval-asd.png'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import query from '../../../queries/fetchRequest'
import queryFetchAssignedRequests from '../../../queries/fetchAssignedRequests'
import queryFetchOnHoldRequests from '../../../queries/fetchOnHoldRequests'

const style = {
    width: '27.38%',
    height: '70%'
}

class Request extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: [],
            travelMode: this.props.google.maps.TravelMode.DRIVING
        }
        this.renderItems = this.renderItems.bind(this)
        this.initGoogleMap = this.initGoogleMap.bind(this)
    }

    renderItems(items) {
        return items.map( ({ name }, index) => {
            return (
                <div key={index} id="item-block">
                    <img id="add-icon" src={add} alt="Grabit"/>
                    <p id="item-name">{name}</p>
                </div>
                )
        })
    }

    initGoogleMap() {
        const map = new this.props.google.maps.Map(document.getElementById("map-for-driver"), {
            mapTypeControl: false,
            center: { lat: 33.9646, lng: -6.8479 },
            zoom: 13,
            style
        })
        const directionsRenderer =  new this.props.google.maps.DirectionsRenderer()
        directionsRenderer.setMap(map)
        this.route(directionsRenderer)
    }

    componentDidMount() {
        //Init Google Map
        if (document.getElementById("map-for-driver"))
            { this.initGoogleMap() }
    }

    componentDidUpdate() {
        this.initGoogleMap()
    }

    route(directionsRenderer) {
        if (!this.props.data.request.originPlaceId || !this.props.data.request.destinationPlaceId) {
          return
        }
        const directionsService = new this.props.google.maps.DirectionsService()
        directionsService.route(
          {
            origin: { placeId: this.props.data.request.originPlaceId },
            destination: { placeId: this.props.data.request.destinationPlaceId },
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

    showSpinner() {
        document.getElementById('request-submit-button-value').hidden = true
        document.getElementById('request-submit-button-icon').hidden = false
    }

    hideSpinner() {
        document.getElementById('request-submit-button-value').hidden = false
        document.getElementById('request-submit-button-icon').hidden = true
    }

    onSubmit(event) {
        this.showSpinner()
        event.preventDefault()
        this.props.mutate({
            variables: {
                id: this.props.data.request.id,
            },
            refetchQueries:[{ query: queryFetchAssignedRequests, variables: { first: 5,
                                                                              skip: 0,
                                                                              orderBy: 'createdAt_DESC' } },
                            { query: queryFetchOnHoldRequests}]
        })
        .then( () => {
           this.hideSpinner() 
           this.props.history.push(`/profile/${this.props.user.id}/assigned-requests`)
        }).catch( res => {
            const errors = res.graphQLErrors.map( err => err.message )
            this.setState({ errors })
            this.hideSpinner()
        })
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
                    <div className="request">
                        <div className="request-t">
                            <div className="request-top">
                                <h3>Request</h3>
                            </div>
                        </div>
                        <div className="request-m">
                            <form className="request-main" onSubmit={this.onSubmit.bind(this)}>
                                <div className="request-main-left">
                                    <section className="input">
                                        <label>Description</label>
                                        <br/>
                                        <textarea id="description" type="text" name="description" disabled={true}
                                                  value={request.description}/>
                                    </section>
                                    <section className="input">
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
                                        <div className="input-cost-range-block">
                                            <p>{request.costRange.from}</p>
                                            <label className="input-cost-range-to-label">To</label>
                                            <p className="input-cost-range-to-value">{request.costRange.to}</p>
                                            <label className="input-cost-range-dhs-label">Dhs</label>
                                        </div>
                                    </section>
                                </div>
                                <div className="request-main-right">
                                    <section className="input-address-departure">
                                        <img id="oval-dsa" src={ovalDsa} alt="Grabit"/>
                                        <p className="input-address-departure-value">{request.addressDeparture}</p>
                                    </section>
                                    <section className="input-ovals-address">
                                        <img id="oval-address-1" src={ovalAddress} alt="Grabit"/>
                                        <br/>
                                        <img id="oval-address-2" src={ovalAddress} alt="Grabit"/>
                                        <br/>
                                        <img id="oval-address-3" src={ovalAddress} alt="Grabit"/>
                                        <br/>
                                        <img id="oval-address-4" src={ovalAddress} alt="Grabit"/>
                                    </section>
                                    <section className="input-delivery-address">
                                        <img id="oval-asd" src={ovalAsd} alt="Grabit" />
                                        <p className="input-delivery-address-value">{request.deliveryAddress}</p>
                                    </section>
                                    <br/>
                                    <div id="map-for-driver">map</div>
                                    <div id="request-errors">
                                        {this.state.errors.map( error => <div key={ error }>{ error }</div > )}
                                    </div>
                                </div>
                                <button id="request-submit-button" type="submit" onSubmit={this.onSubmit.bind(this)}>
                                    <p id="request-submit-button-value" hidden={false}>Go!</p>
                                    <div id="request-submit-button-icon" hidden={true}><i className="fa fa-spinner fa-spin"></i></div>
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
        UpdateRequest( $id: ID! ) {
                updateRequest( id: $id ) {
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
   graphql(query, { options: (props) => { return { variables: { id: props.match.params.requestId} } } } ) (
        graphql(mutation)(
                            GoogleApiWrapper({
                                apiKey: process.env.REACT_APP_GOOGLE_SECRET_KEY
                            })(Request)
                        )
    )

