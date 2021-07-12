import React from 'react'
import './AssignedRequests.css'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import query from '../../queries/fetchAssignedRequests'
import queryFetchDeliveredRequests from '../../queries/fetchDeliveredRequests'
import queryFetchAssignedRequests from '../../queries/fetchAssignedRequests'
import gql from 'graphql-tag'

class AssignedRequests extends React.Component {

    constructor(props) {
        super(props)
    }

    showSpinner(id) {
        document.getElementById(`request-delivered-button-value-${ id }`).hidden = true
        document.getElementById(`request-delivered-button-icon-${ id }`).hidden = false
    }

    hideSpinner(id) {
        document.getElementById(`request-delivered-button-value-${ id }`).hidden = false
        document.getElementById(`request-delivered-button-icon-${ id }`).hidden = true
    }

    renderAssignedRequests() {
        return this.props.data.myAssignedRequests.map( ({ id, description, status }) => {
                return (
                    <div key={ id }>
                        <li id="rendered-assigned-requests">
                            <span id="description-assigned">{ description }</span>
                            --------------
                            <span id="status-assigned">{ status }</span>
                            <button id="request-delivered-button" onClick={ e => { e.preventDefault(); this.deliver(id) }}>
                                    <p id={`request-delivered-button-value-${ id }`} hidden={false}>Delivered!</p>
                                    <div id={`request-delivered-button-icon-${ id }`} hidden={true}><i className="fa fa-spinner fa-spin"></i></div>   
                            </button>
                        </li>
                        <br/>
                    </div>
                )
        })
    }

    componentDidUpdate() {
        if(this.props.data.myAssignedRequests.length === 0) {
            this.paginationPrevious()
            return
        }
    }

    deliver(id) {
        this.showSpinner(id)
        this.props.mutate({
            variables: {
                id
            },
            refetchQueries:[{ query: queryFetchDeliveredRequests, variables: { first: 5,
                                                                               skip: 0,
                                                                               orderBy: 'createdAt_DESC' } },
                            { query: queryFetchAssignedRequests, variables: { first: 5,
                                                                              skip: 0,
                                                                              orderBy: 'createdAt_DESC'} }]
        })
        .then( () => {
           this.props.history.push(`/profile/${this.props.user.id}/delivered-requests`)
        }).catch( res => {
            const errors = res.graphQLErrors.map( err => err.message )
            this.setState({ errors })
            this.hideSpinner(id)
        })
    }

    paginationPrevious() {
        this.props.paginationPrevious('driverAssignedRequests')
    }
    
    paginationNext() {
        if(this.props.data.myAssignedRequests.length !== 5) {
            return
        }
        this.props.paginationNext('driverAssignedRequests')
    }

    render() {
        const logout = this.props.logout
        const mainRightTop = (
            <div className="main-right-top">
                <h3>Assigned Requests</h3>
                <button id="logout" onClick={logout}>
                    <p id="logout-value" hidden={false}>Logout</p>
                    <div id="logout-icon" hidden={true}><i className="fa fa-spinner fa-spin"></i></div>
                </button>
            </div>
        )
        const previousButton = (
            <button className="customer-requests-pagination-button" onClick={ e => { e.preventDefault(); this.paginationPrevious() }}>
                <p id="customer-requests-pagination-previous-value" hidden={false}>Previous</p>
            </button>
        ) 
        const nextButton = (
                <button className="customer-requests-pagination-button" onClick={ e => { e.preventDefault(); this.paginationNext() }}>
                    <p id="customer-requests-pagination-next-value" hidden={false}>Next</p>
                </button>
        )
        if( this.props.data.loading ) {
                return (
                    <div className="main-right">
                        {mainRightTop}
                        <div className="main-right-form">
                            <div>Loading...</div>
                        </div>
                        <div className="pagination-buttons">{previousButton} {nextButton}</div>
                    </div>
                )
        } else {
            return (
                <div className="main-right">
                    {mainRightTop}
                    <div className="main-right-form">
                        <ul>{this.renderAssignedRequests()}</ul>
                    </div>
                    <div className="pagination-buttons">{previousButton} {nextButton}</div>
                </div>
            )
        }
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
        graphql(query, { options: (props) => {
            return { variables: { first: props.driverAssignedRequestsPaginationFirst,
                                  skip: props.driverAssignedRequestsPaginationSkip,
                                  orderBy: props.paginationOrderBy } }
            }
        } )(AssignedRequests)
    )