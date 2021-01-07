import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from '../pages/LandingPage/LandingPage';
import Profile from '../pages/Profile/Profile';
import DriverSignUp from '../pages/DriverSignUp/DriverSignUp';
import CustomerSignUp from '../pages/CustomerSignUp/CustomerSignUp';

import './App.css';

class App extends React.Component {

  constructor(props) {

    super(props);

  }

  render() {

    return (

      <BrowserRouter>
      <div>

          <Switch>

           <Route path="/" component={LandingPage} exact/>
           <Route path="/profile" component={Profile} exact/>
           <Route path="/driverSignUp" component={DriverSignUp}/>
           <Route path="/customerSignUp" component={CustomerSignUp}/>

         </Switch>
      </div> 
    </BrowserRouter>

    );
  }


}

export default App;
