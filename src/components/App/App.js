import React from 'react';
import LandingPage from '../LandingPage/LandingPage';
import Profile from '../Profile/Profile';
import './App.css';

class App extends React.Component {
    render() {
      return (
        <div className="App">
          <Profile />
        </div>
      );
    }
}

export default App;
