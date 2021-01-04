import React from 'react';
import LandingPage from '../LandingPage/LandingPage';
import Profile from '../Profile/Profile';
import DriverSignUp from '../DriverSignUp/DriverSignUp';
import CustomerSignUp from '../CustomerSignUp/CustomerSignUp';
import './App.css';

class App extends React.Component {
    render() {
      return (
        <div className="App">
          <CustomerSignUp />
        </div>
      );
    }
}

export default App;
