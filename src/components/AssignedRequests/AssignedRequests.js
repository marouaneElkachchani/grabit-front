import React from 'react'
import './AssignedRequests.css'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import query from '../../queries/fetchRequests'
import gql from 'graphql-tag'

class AssignedRequests extends React.Component {

    constructor(props) {
        super(props)
    }

    showSpinner() {
        document.getElementById('request-delivered-button-value').hidden = true
        document.getElementById('request-delivered-button-icon').hidden = false
    }

    hideSpinner() {
        document.getElementById('request-delivered-button-value').hidden = false
        document.getElementById('request-delivered-button-icon').hidden = true
    }

    renderAssignedRequests() {
        return this.props.data.myRequests.map( ({ id, description, status }) => {
            if( status === 'ASSIGNED') {
                return (
                    <div key={ id }>
                        <li id="rendered-assigned-requests">
                            <span id="description-assigned">{ description }</span>
                            --------------
                            <span id="status-assigned">{ status }</span>
                            <button id="request-delivered-button" onClick={ e => { e.preventDefault(); this.deliver(id) }}>
                                    <p id="request-delivered-button-value" hidden={false}>Delivered!</p>
                                    <div id="request-delivered-button-icon" hidden={true}><i className="fa fa-spinner fa-spin"></i></div>
                            </button>
                        </li>
                        <br/>
                    </div>
                )
            } else {
                return
            }
        })
    }

    deliver(id) {
        this.showSpinner()
        this.props.mutate({
            variables: {
                id
            },
            refetchQueries:[{ query }]
        })
        .then( () => {
           this.props.history.push(`/profile/${this.props.user.id}/delivered-requests`)
        }).catch( res => {
            const errors = res.graphQLErrors.map( err => err.message )
            this.setState({ errors })
            this.hideSpinner()
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
                    <h3>Assigned Requests</h3>
                    <button id="logout" onClick={logout}>
                        <p id="logout-value" hidden={false}>Logout</p>
                        <div id="logout-icon" hidden={true}><i className="fa fa-spinner fa-spin"></i></div>
                    </button>
                </div>
                <div className="main-right-form">
                    <ul>
                        { this.renderAssignedRequests() }
                    </ul>
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
    graphql(mutation) ( 
        graphql(query)(AssignedRequests) 
    )