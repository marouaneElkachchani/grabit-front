import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'

import LandingPage from '../pages/LandingPage/LandingPage'
import SignUp from '../pages/SignUp/SignUp'
import SignIn from '../pages/SignIn/SignIn'
import ProfileV1 from '../pages-v1/Profile-v1/Profile-v1'
import OrderRequest from '../pages/OrderRequest/OrderRequest'

import { graphql } from 'react-apollo'
import query from '../../queries/fetchUserInfo'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    localStorage.removeItem('token')
    document.location.reload()
  }

  render() {
    if (this.props.data.loading) {
      return (
              <p>Loading...</p>
      )
    } else if(this.props.data.me) {
      const user = this.props.data.me
      const logout = this.logout
      return (
        <Switch>
            <Route exact path="/" render={props => {
                return <LandingPage {...props} user={user} logout={logout}/>
            }}/>
            <Route path="/profile/:userId" render={props => {
                return <ProfileV1 {...props} user={user} logout={logout}/>
            }}/>
            <Route path="/order-request/new" render={props => {
                return <OrderRequest {...props} user={user} logout={logout}/>
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
