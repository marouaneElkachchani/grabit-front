import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import LandingPage from '../pages/LandingPage/LandingPage'
import SignUp from '../pages/SignUp/SignUp'
import SignIn from '../pages/SignIn/SignIn'
import ProfileV1 from '../pages-v1/Profile-v1/Profile-v1'
import OrderRequest from '../pages/OrderRequest/OrderRequest'
import OnHoldRequests from '../pages/OnHoldRequests/OnHoldRequests'
import Request from '../pages/Request/Request'
import { graphql } from 'react-apollo'
import query from '../../queries/fetchUserInfo'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      paginationOrderBy: 'createdAt_DESC',
      customerRequestsPaginationFirst: 5,
      customerRequestsPaginationSkip: 0,
      driverDeliveredRequestsPaginationFirst: 5,
      driverDeliveredRequestsPaginationSkip: 0,
      driverAssignedRequestsPaginationFirst: 5,
      driverAssignedRequestsPaginationSkip: 0,
      onHoldRequestsPaginationFirst: 5,
      onHoldRequestsPaginationSkip: 0
    }
    this.logout = this.logout.bind(this)
    this.paginationPrevious = this.paginationPrevious.bind(this)
    this.paginationNext = this.paginationNext.bind(this)
  }

  paginationPrevious(requests) {
    if(requests === 'customerRequests') {
      if(this.state.customerRequestsPaginationSkip === 0) {
        return
      }
      this.setState( (prevState) => ({
        customerRequestsPaginationSkip: prevState.customerRequestsPaginationSkip - 5
      }) )
    }else if (requests === 'driverDeliveredRequests') {
      if(this.state.driverDeliveredRequestsPaginationSkip === 0) {
        return
      }
      this.setState( (prevState) => ({
        driverDeliveredRequestsPaginationSkip: prevState.driverDeliveredRequestsPaginationSkip - 5
      }) )
    } else if (requests === 'driverAssignedRequests') {
      if(this.state.driverAssignedRequestsPaginationSkip === 0) {
        return
      }
      this.setState( (prevState) => ({
        driverAssignedRequestsPaginationSkip: prevState.driverAssignedRequestsPaginationSkip - 5
      }) )
    } else if(requests === 'onHoldRequests') {
      if(this.state.onHoldRequestsPaginationSkip === 0) {
        return
      }
      this.setState( (prevState) => ({
        onHoldRequestsPaginationSkip: prevState.onHoldRequestsPaginationSkip - 5
      }) )
    }
  }

  paginationNext(requests) {
    if(requests === 'customerRequests') {
      this.setState( (prevState) => ({
        customerRequestsPaginationSkip: prevState.customerRequestsPaginationSkip + 5
      }) )
    } else if (requests === 'driverDeliveredRequests') {
      this.setState( (prevState) => ({
        driverDeliveredRequestsPaginationSkip: prevState.driverDeliveredRequestsPaginationSkip + 5
      }) )
    } else if (requests === 'driverAssignedRequests') {
      this.setState( (prevState) => ({
        driverAssignedRequestsPaginationSkip: prevState.driverAssignedRequestsPaginationSkip + 5
      }) )
    } else if( requests === 'onHoldRequests') {
      this.setState( (prevState) => ({
        onHoldRequestsPaginationSkip: prevState.onHoldRequestsPaginationSkip + 5
      }) )
    }
  }

  showSpinner() {
    document.getElementById('logout-value').hidden = true
    document.getElementById('logout-icon').hidden = false
  }

  logout() {
    this.showSpinner()
    window.localStorage.removeItem('token')
    document.location.reload()
  }

  render() {
    if (this.props.data.loading) {
      return (
              <p>Loading...</p>
      )
    } else if (this.props.data.me) {
      const user = this.props.data.me
      const logout = this.logout
      const paginationPrevious = this.paginationPrevious
      const paginationNext = this.paginationNext
      const paginationOrderBy = this.state.paginationOrderBy
      const customerRequestsPaginationFirst = this.state.customerRequestsPaginationFirst
      const customerRequestsPaginationSkip = this.state.customerRequestsPaginationSkip
      const driverDeliveredRequestsPaginationFirst = this.state.driverDeliveredRequestsPaginationFirst
      const driverDeliveredRequestsPaginationSkip = this.state.driverDeliveredRequestsPaginationSkip
      const driverAssignedRequestsPaginationFirst = this.state.driverAssignedRequestsPaginationFirst
      const driverAssignedRequestsPaginationSkip = this.state.driverAssignedRequestsPaginationSkip

      return (
        <Switch>
            <Route exact path="/" render={props => {
                return <LandingPage {...props} id={user.id} logout={logout}/>
            }}/>
            <Route path="/profile/:userId" render={props => {
                return <ProfileV1 {...props} user={user} logout={logout}
                                             paginationOrderBy={paginationOrderBy}
                                             paginationPrevious={paginationPrevious}
                                             paginationNext={paginationNext}
                                             customerRequestsPaginationFirst={customerRequestsPaginationFirst}
                                             customerRequestsPaginationSkip={customerRequestsPaginationSkip}
                                             driverDeliveredRequestsPaginationFirst={driverDeliveredRequestsPaginationFirst}
                                             driverDeliveredRequestsPaginationSkip={driverDeliveredRequestsPaginationSkip}
                                             driverAssignedRequestsPaginationFirst={driverAssignedRequestsPaginationFirst}
                                             driverAssignedRequestsPaginationSkip={driverAssignedRequestsPaginationSkip}/>
            }}/>
            <Route path="/order-request/new" render={props => {
                return <OrderRequest {...props} user={user}/>
            }}/>
            <Route exact path="/on-hold-requests" render={props => {
                return <OnHoldRequests {...props} user={user}/>
            }}/>
            <Route path="/on-hold-requests/:requestId" render={props => {
                return <Request {...props} user={user} />
            }}/>
            <Redirect to={`/profile/${user.id}`}/>
        </Switch>
      )
    }else {
      return (
        <Switch>
            <Route exact path="/" render={props => {
                return <LandingPage {...props}/>
            }}/>
            <Route path="/sign-up/:role" render={props => {
                return <SignUp {...props}/>
            }}/>
            <Route path="/sign-in" render={props => {
                return <SignIn {...props}/>
            }}/>
            <Redirect to="/"/>
        </Switch>
      )
    }
  }
}

export default graphql(query)(App)
