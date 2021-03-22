import React from 'react'
import './TopBanner-v1.css'
import { Link } from 'react-router-dom'
import grabitIcon from './assets/grabit-icon.png'
import requestOrderIcon from './assets/request-order-icon.png'
import oval from './assets/oval.png'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class TopBannerV1 extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render() {

            let id = ""
            let name = ""
            
            if(this.props.data.loading) {
                    id = ""
                    name = "Loading..."
            }else {
                id = this.props.data.me.id
                name = this.props.data.me.name
            }
            const isProfile = this.props.isProfile
            const isOrderRequest = this.props.isOrderRequest

            if(isProfile) {
                return (
                    <div className="top-banner-profile">
                        <a id="grabit-icon-box-profile">
                            <img src={grabitIcon} alt="Grabit"/>
                        </a>
                        <Link to="/order-request/new">
                            <button id="request-an-order-button">
                                    <img src={requestOrderIcon} alt="Grabit"/>
                                    Request an Order
                            </button>
                        </Link>
                        <a id="user-name-image-box-profile">
                            <p>{name}</p>
                            <img id="user-image-profile" src={oval} alt="Grabit"/>
                        </a>
                    </div>
                )
            } else if(isOrderRequest) {
                return(
                    <div className="top-banner-order-request">
                        <a id="grabit-icon-box-order-request">
                            <img src={grabitIcon} alt="Grabit"/>
                        </a>
                        <Link to={`/profile/${id}`} id="user-name-image-box-order-request">
                            <p>{name}</p>
                            <img id="user-image-order-request" src={oval} alt="Grabit"/>
                        </Link>
                    </div>
                )
            }else {
                return (
                <div className="top-banner-sign-up">
                    <a id="grabit-icon-box-sign-up">
                        <img src={grabitIcon} alt="Grabit"/>
                    </a>
                </div>
                )
            }
    }
}

const query = gql`
    query{
        me{
            id
            name
        }
    }
`

export default graphql(query)(TopBannerV1)