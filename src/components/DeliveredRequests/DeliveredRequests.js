import React from 'react'
import './DeliveredRequests.css'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import query from '../../queries/fetchRequests'

class DeliveredRequests extends React.Component {

    constructor(props) {
        super(props)
    }

    renderDeliveredRequests() {
        return this.props.data.myRequests.map( ({ id, description, status }) => {
            if( status === 'DELIVERED') {
                return (
                    <div key={ id }>
                        <li>
                            { description } ----------- { status }
                        </li>
                        <br/>
                    </div>
                )
            } else {
                return
            }
        })
    }

    render() {
        const logout = this.props.logout
        if( this.props.data.loading )
            {
                return <div>Loading...</div>
            }
        return (
            <div className="main-right" >
                <div className="main-right-top">
                    <h3>Delivered Requests</h3>
                    <button id="logout" onClick={logout}>Logout</button>
                </div>
                <div className="main-right-form">
                    <ul>
                        { this.renderDeliveredRequests() }
                    </ul>
                </div>
            </div>
        )
    }
}

export default graphql(query)(DeliveredRequests)