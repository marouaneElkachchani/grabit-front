import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import Footer from '../../Footer/Footer'
import grabitIconTitle from './assets/grabit-icon-title.png'
import weDeliverIt from './assets/we-deliver-it.png'
import helmet from './assets/helmet.png'
import arrow from './assets/arrow.png'
import manUser from './assets/man-user.png'
import driver from './assets/driver.png'
import restaurant from './assets/restaurant.png'
import driverDelivering from './assets/driver-delivering.png'
import driverRunning from './assets/driver-running.png'
import home from './assets/home.png'
import send2 from './assets/send-2.png'

class LandingPage extends React.Component {

    constructor(props) {
      super(props)
      this.userIsSignedIn = this.userIsSignedIn.bind(this)
    }

    userIsSignedIn() {
      if(this.props.logout) {
        return true
      }else {
        return false
      }
    }
    
    render() {
        let logout = null
        if( this.userIsSignedIn() ) {
          logout = this.props.logout
        }
        return (
          <div>
            <div className="block-1">
              <div className="block-1-top">
                <Link to="/">
                  <img src={grabitIconTitle} alt="Grabit"/>
                </Link>
                <Link to="/sign-in" hidden={this.userIsSignedIn()}>
                  <button>Sign in</button>
                </Link>
                <Link to="" onClick={logout} hidden={!this.userIsSignedIn()}>
                  <button>Logout</button>
                </Link>
              </div>
              <div className="block-1-middle">
                <img src={weDeliverIt} alt="Grabit"/>
              </div>
              <div className="block-1-bottom">
                <div className="box" id="driver">
                  <div className="box-top">
                    <img src={helmet} alt="Grabit"/>
                  </div>
                  <div className="box-bottom">
                    <p>Sign up as Driver</p>
                    <Link to="/sign-up/driver">
                      <img src={arrow} alt="Grabit"/>
                    </Link>
                  </div>
                </div>
                <div className="box" id="customer">
                  <div className="box-top">
                    <img src={manUser} alt="Grabit"/>
                  </div>
                  <div className="box-bottom">
                    <p>Sign up as Customer</p>
                    <Link to="/sign-up/customer">
                      <img src={arrow} alt="Grabit"/>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="block-2">
              <div className="block-2-title">
                <h1>How it works</h1>
              </div>
              <div className="block-2-top">
                <div className="box-presentation-top">
                  <h1>We do more than delivery .</h1>
                  <p>
                    Stocking Your Restaurant Kitchen Finding Reliable Sellers Of
                    Cookware In The Brick And Mortar World
                  </p>
                </div>
                <div className="box-images-top">
                  <img id="image-driver" src={driver} alt="Grabit" />
                  <img id="image-restaurant" src={restaurant} alt="Grabit" />
                </div>
              </div>
              <div className="block-2-middle">
                <div className="box-images-middle">
                  <img src={driverDelivering} alt="Grabit" />
                </div>
                <div className="box-presentation-middle">
                  <h1>Fast delivery with tracking.</h1>
                  <p>
                    Breast Augmentation Breast Enlargement Medical Tourism In
                    The Philipine
                  </p>
                </div>
              </div>
              <div className="block-2-bottom">
                <div className="box-presentation-bottom">
                  <h1>Stay at home we do it for you</h1>
                  <p>
                    Planning Helps Make A Party Perfect Keep Dinner Simple Heat
                    Frozen Vegetables And Precooked Smocked Sausage Together For
                    A Complete Meal
                  </p>
                </div>
                <div className="box-images-bottom">
                  <img id="image-driver-running" src={driverRunning} alt="Grabit" />
                  <img id="image-home" src={home} alt="Grabit" />
                </div>
              </div>
            </div>
            <div className="block-3">
              <div className="block-3-top">
                <h1>Ready to order ?</h1>
              </div>
              <div className="block-3-middle">
                <p>
                  Browse local restaurants and businesses available in your area
                  for delivery by entering your addess below.
                </p>
              </div>
              <div className="block-3-bottom">
                <input id="block-3-bottom-email-input" type="email"></input>
                <Link to="/sign-up/customer">
                  <button>
                    Send
                    <img src={send2} alt="Grabit"/>
                  </button>
                </Link>
              </div>
            </div>
            <Footer/>
          </div>
        )
    }
}

export default LandingPage