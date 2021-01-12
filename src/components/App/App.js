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
      this.state = {
        user: {
          id: 3293455,
          name: "Mark Hamilton", 
          address: "352, New York City, NY", 
          email: "mark@hamilton.com",
          phone: 26220033452
        }
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }

  handleNameChange(name) {
    this.setState(prevState => ({
      user: {
        id: prevState.user.id,
        name: name,
        address: prevState.user.address,
        email: prevState.user.email,
        phone: prevState.user.phone
      }
    }));
  }

  handleEmailChange(email) {
    this.setState(prevState => ({
      user: {
        id: prevState.user.id,
        name: prevState.user.name,
        address: prevState.user.address,
        email: email,
        phone: prevState.user.phone
      }
    }));
  }

  handlePhoneChange(phone) {
    this.setState(prevState => ({
      user: {
        id: prevState.user.id,
        name: prevState.user.name,
        address: prevState.user.address,
        email: prevState.user.email,
        phone: phone
      }
    }));
  }

  render() {
    const user = this.state.user;
    const handleNameChange = this.handleNameChange;
    const handleEmailChange = this.handleEmailChange;
    const handlePhoneChange = this.handlePhoneChange;

    return (
      <BrowserRouter>
      <div>
          <Switch>

           <Route path="/" exact>
             <LandingPage user={user} />
           </Route>  

           <Route path="/profile/:userId" > 
             <Profile user={user} handleNameChange={handleNameChange}
                                  handleEmailChange={handleEmailChange}
                                  handlePhoneChange={handlePhoneChange}/>
           </Route>  

           <Route path="/driverSignUp" component={DriverSignUp}/>
           <Route path="/customerSignUp" component={CustomerSignUp}/>

         </Switch>
      </div> 
    </BrowserRouter>

    );
  }


}

export default App;
