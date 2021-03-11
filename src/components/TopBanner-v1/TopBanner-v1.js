import React from 'react'
import './TopBanner-v1.css'
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
            const user = this.props.user
            const isProfile = this.props.isProfile
            const isOrderRequest = this.props.isOrderRequest

            console.log(this.props)
            
            if(isProfile) {
                return (
                    <div className="top-banner-profile">
                        <a id="grabit-icon-box-profile">
                            <img src={grabitIcon} alt="Grabit"/>
                        </a>
                        <a>
                            <button id="request-an-order-button">
                                    <img src={requestOrderIcon} alt="Grabit"/>
                                    Request an Order
                            </button>
                        </a>
                        <a id="user-name-image-box-profile">
                            <p>{user.name}</p>
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
                        <a id="user-name-image-box-order-request">
                            <p>{user.name}</p>
                            <img id="user-image-order-request" src={oval} alt="Grabit"/>
                        </a>
                    </div>
                )
            }else {
                return (
                <div className="top-banner-sign-up">
                    <a id="grabit-icon-box-sign-up">
                        <img src={grabitIcon} alt="Grabit" />
                    </a>
                </div>
                )
            }
    }
}

const query = gql`
    query{
        users{
            name
        }
    }
`

export default graphql(query)(TopBannerV1)