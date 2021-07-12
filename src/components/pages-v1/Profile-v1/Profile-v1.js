import React from 'react'
import './Profile-v1.css'
import TopBannerV1 from '../../TopBanner-v1/TopBanner-v1'
import SideBar from '../../SideBar/SideBar'
import ProfileSettings from '../../ProfileSettings/ProfileSettings'
import Requests from '../../Requests/Requests'
import AssignedRequests from '../../AssignedRequests/AssignedRequests'
import DeliveredRequests from '../../DeliveredRequests/DeliveredRequests'
import Address from '../../Address/Address'
import Footer from '../../Footer/Footer'
import { Route, Switch, Redirect } from 'react-router-dom'

class ProfileV1 extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const isProfile = true
        const url = this.props.match.url
        const user = this.props.user
        const logout = this.props.logout
        const paginationOrderBy = this.props.paginationOrderBy
        const paginationPrevious = this.props.paginationPrevious
        const paginationNext = this.props.paginationNext
        const customerRequestsPaginationFirst = this.props.customerRequestsPaginationFirst
        const customerRequestsPaginationSkip = this.props.customerRequestsPaginationSkip
        const driverDeliveredRequestsPaginationFirst = this.props.driverDeliveredRequestsPaginationFirst
        const driverDeliveredRequestsPaginationSkip = this.props.driverDeliveredRequestsPaginationSkip
        const driverAssignedRequestsPaginationFirst = this.props.driverAssignedRequestsPaginationFirst
        const driverAssignedRequestsPaginationSkip = this.props.driverAssignedRequestsPaginationSkip
        return (
            <div className="profile">
                <TopBannerV1 isProfile={isProfile} user={user}/>
                <div className="profile-main">
                    <SideBar url={url} user={user}/>
                    <Switch>
                        <Route exact path={`${url}/settings`} render={ props => {
                            return <ProfileSettings {...props} user={user} logout={logout}/>        
                        }}/>
                        <Route path={`${url}/requests`} render={ props => {
                            return <Requests {...props} user={user} logout={logout}
                                                        paginationOrderBy={paginationOrderBy}
                                                        customerRequestsPaginationFirst={customerRequestsPaginationFirst}
                                                        customerRequestsPaginationSkip={customerRequestsPaginationSkip}
                                                        paginationPrevious={paginationPrevious}
                                                        paginationNext={paginationNext}/>
                        }}/>
                        <Route path={`${url}/assigned-requests`} render={ props => {
                            return <AssignedRequests {...props} user={user} logout={logout}
                                                                paginationOrderBy={paginationOrderBy}
                                                                driverAssignedRequestsPaginationFirst={driverAssignedRequestsPaginationFirst}
                                                                driverAssignedRequestsPaginationSkip={driverAssignedRequestsPaginationSkip}
                                                                paginationPrevious={paginationPrevious}
                                                                paginationNext={paginationNext}/>
                        }}/>
                        <Route path={`${url}/delivered-requests`} render={ props => {
                            return <DeliveredRequests {...props} user={user} logout={logout}
                                                                 paginationOrderBy={paginationOrderBy}
                                                                 driverDeliveredRequestsPaginationFirst={driverDeliveredRequestsPaginationFirst}
                                                                 driverDeliveredRequestsPaginationSkip={driverDeliveredRequestsPaginationSkip}
                                                                 paginationPrevious={paginationPrevious}
                                                                 paginationNext={paginationNext}/>
                        }}/>
                        <Route path={`${url}/address`} render={ props => {
                            return <Address {...props} address={user.address} logout={logout}/>
                        }}/>
                        <Redirect to={`${url}/settings`}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default ProfileV1