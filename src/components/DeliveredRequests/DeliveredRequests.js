import React from 'react'
import './DeliveredRequests.css'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import query from '../../queries/fetchDeliveredRequests'

class DeliveredRequests extends React.Component {

    constructor(props) {
        super(props)
    }

    renderDeliveredRequests() {
        return this.props.data.myDeliveredRequests.map( ({ id, description, status }) => {
                return (
                    <div key={ id }>
                        <li id="rendered-delivered-requests">
                            <span id="description-delivered">{ description }</span>
                            --------------
                            <span id="status-delivered">{ status }</span>
                        </li>
                        <br/>
                    </div>
                )
        })
    }

    componentDidUpdate() {
        if(this.props.data.myDeliveredRequests.length === 0) {
            this.paginationPrevious()
            return
        }
    }

    paginationPrevious() {
        this.props.paginationPrevious('driverDeliveredRequests')
    }
    
    paginationNext() {
        if(this.props.data.myDeliveredRequests.length !== 5) {
            return
        }
        this.props.paginationNext('driverDeliveredRequests')
    }

    render() {
        const logout = this.props.logout
        const mainRightTop = (
            <div className="main-right-top">
                <h3>Delivered Requests</h3>
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
                        <ul>{this.renderDeliveredRequests()}</ul>
                    </div>
                    <div className="pagination-buttons">{previousButton} {nextButton}</div>
                </div>
            )
        }
    }
}

export default graphql(query, { options: (props) => {
    return { variables: { first: props.driverDeliveredRequestsPaginationFirst,
                          skip: props.driverDeliveredRequestsPaginationSkip,
                          orderBy: props.paginationOrderBy } }
    }
} )(DeliveredRequests)