import React from 'react'
import './Requests.css'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import query from '../../queries/fetchRequests'

class Requests extends React.Component {

    constructor(props) {
        super(props)
    }

    renderStatus(status) {
        if(status === 'DELIVERED') {
            return <span id="customer-request-status" style={{backgroundColor: 'forestgreen'}} >{ status }</span>
        } else if(status === 'ASSIGNED') {
            return <span id="customer-request-status" style={{backgroundColor: 'orange'}}>{ status }</span>
        } else if(status === 'ONHOLD') {
            return <span id="customer-request-status" style={{backgroundColor: 'red'}}>{ status }</span>
        } 
    }

    renderRequests() {
        return this.props.data.myRequests.map( ({ id, description, status }) => {
            return (    
                    <div key={ id }>
                        <li id="rendered-customer-requests">
                            <span id="customer-request-description">{ description }</span>
                            ----------- 
                            {this.renderStatus(status)}
                        </li>
                        <br/>
                    </div>
            )
        })
    }

    componentDidUpdate() {
        if(this.props.data.myRequests.length === 0) {
            this.paginationPrevious()
            return
        }
    }

    paginationPrevious() {
        this.props.paginationPrevious('customerRequests')
    }
    
    paginationNext() {
        if(this.props.data.myRequests.length !== 5) {
            return
        }
        this.props.paginationNext('customerRequests')
    }

    render() {
        const logout = this.props.logout
        const mainRightTop = (  
                                <div className="main-right-top">
                                    <h3>Requests</h3>
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
                            <ul>{this.renderRequests()}</ul>
                        </div>
                        <div className="pagination-buttons">{previousButton} {nextButton}</div>
                    </div>
                )
            }
    }
}

export default graphql(query, { options: (props) => {
    return { variables: { first: props.customerRequestsPaginationFirst,
                          skip: props.customerRequestsPaginationSkip,
                          orderBy: props.paginationOrderBy } }
    }
} )(Requests)
