import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'

import ProfileV1 from '../pages-v1/Profile-v1/Profile-v1'
import OrderRequest from '../pages/OrderRequest/OrderRequest'

import { graphql } from 'react-apollo'
import query from '../../queries/fetchUserInfo'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.data.loading) {
      return (
              <p>Loading...</p>
            )
    }else {
      const user = this.props.data.me
      return (
        <Switch>
            <Route path="/profile/:userId" render={props => {
                return <ProfileV1 {...props} user={user}/>
            }}/>
            <Route path="/order-request/new" render={props => {
                return <OrderRequest {...props} user={user}/>
            }}/>
        </Switch>
      )
    }
  }

}

export default graphql(query)(App)
