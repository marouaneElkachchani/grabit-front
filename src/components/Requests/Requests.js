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

    render() {
        const logout = this.props.logout
        if( this.props.data.loading )
            {
                return <div>Loading...</div>
            }
        return (
            <div className="main-right" >
                <div className="main-right-top">
                    <h3>Requests</h3>
                    <button id="logout" onClick={logout}>
                        <p id="logout-value" hidden={false}>Logout</p>
                        <div id="logout-icon" hidden={true}><i className="fa fa-spinner fa-spin"></i></div>
                    </button>
                </div>
                <div className="main-right-form">
                    <ul>{this.renderRequests()}</ul>
                </div>
            </div>
        )
    }
}

export default graphql(query)(Requests)