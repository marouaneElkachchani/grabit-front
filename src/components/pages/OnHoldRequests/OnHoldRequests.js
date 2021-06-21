import React from 'react'
import './OnHoldRequests.css'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import { GoogleApiWrapper } from 'google-maps-react'
import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'
import Footer from '../../Footer/Footer'
import { graphql } from 'react-apollo'
import query from '../../../queries/fetchOnHoldRequests'

class OnHoldRequests extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: []
        }
    }

    renderOnHoldRequests() {
        return this.props.data.onHoldRequests.map( (request) => {
            return (    
                    <div key={ request.id }>
                        <li className="on-hold-requests-info-and-button-block">
                            { request.description } ----------- { request.status }
                            <Link to={`/on-hold-requests/${request.id}`}>
                                <button id="on-hold-requests-details-button">
                                    Details
                                </button>
                            </Link>
                        </li>
                        <br/>
                    </div>
            )
        })
    }

    render() {
            const isOnHoldRequests = true
            const user = this.props.user
            if(this.props.data.loading)
            {
              return <div>Loading...</div>
            }
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
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            )
    }
}

export default

graphql(query) (
                GoogleApiWrapper({
                    apiKey: process.env.REACT_APP_GOOGLE_SECRET_KEY
                })(OnHoldRequests)
)

