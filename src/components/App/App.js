import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import Profile from '../pages/Profile/Profile';
import DriverSignUp from '../pages/DriverSignUp/DriverSignUp';
import CustomerSignUp from '../pages/CustomerSignUp/CustomerSignUp';
import OrderRequest from '../pages/OrderRequest/OrderRequest';
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
        },
        orderRequest: {
          description:"test test",
          date:"",
          orderCost:"",
          addressDeparture: "",
          addressArrival: ""
        }
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
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

  handleAddressChange(address) {
    this.setState(prevState => ({
      user: {
        id: prevState.user.id,
        name: prevState.user.name,
        address: address,
        email: prevState.user.email,
        phone: prevState.user.phone
      }
    }));
  }

  render() {
    const user = this.state.user;
    const handleNameChange = this.handleNameChange;
    const handleEmailChange = this.handleEmailChange;
    const handlePhoneChange = this.handlePhoneChange;
    const handleAddressChange = this.handleAddressChange;

    return (
      <BrowserRouter>
      <div>
          <Switch>
           <Route exact path="/" render={ props => {
             return <LandingPage {...props} 
                                 user={user} /> 
            }} />
           <Route path="/profile/:userId" render={ props => {
             return <Profile {...props} 
                             user={user} 
                             handleNameChange={handleNameChange}
                             handleEmailChange={handleEmailChange}
                             handlePhoneChange={handlePhoneChange}
                             handleAddressChange={handleAddressChange}/>
           }} /> 
            <Route path="/order-request" render={props => {
              return <OrderRequest {...props} 
                                   user={user} />
            }} />
           <Route path="/driver-sign-up" component={DriverSignUp}/>
           <Route path="/customer-sign-up" component={CustomerSignUp}/>
         </Switch>
      </div> 
    </BrowserRouter>
    );
  }


}

export default App;
