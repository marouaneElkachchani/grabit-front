import React from 'react'
import './Requests.css'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import query from '../../queries/fetchRequests'

class Requests extends React.Component {

    constructor(props) {
        super(props)
    }

    renderRequests() {
        return this.props.data.myRequests.map( ({ id, description, status }) => {
            return (    
                        <div key={ id }>
                            <li>
                                { description } ----------- { status }
                            </li>
                            <br/>
                        </div>
            )
        })
    }

    renderRequestsOrDeliveredRequestsTitle() {
        if(this.props.user.role === 'CUSTOMER') {
            return (
                <h3>Requests</h3>
            )
        } else {
            return (
                <h3>Assigned Requests</h3>
            )
        }
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
                    { this.renderRequestsOrDeliveredRequestsTitle() }
                    <button id="logout" onClick={logout}>Logout</button>
                </div>
                <div className="main-right-form">
                    <ul>
                        { this.renderRequests() }
                    </ul>
                </div>
            </div>
        )
    }
}

export default graphql(query)(Requests)