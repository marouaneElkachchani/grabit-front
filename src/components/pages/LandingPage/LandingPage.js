import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import Footer from '../../Footer/Footer';

class LandingPage extends React.Component {

    constructor(props) {
      
      super(props);

    }

    render() {
        return (
          <div>
            <div className="block-1">
              <div className="block-1-top">
                <Link to="/">
                  <img src="./assets/grabit-icon-title.png" alt="Grabit" />
                </Link>
                <Link to="/profile">
                  <button>Sign in</button>
                </Link>
              </div>
              <div className="block-1-middle">
                <img src="./assets/we-deliver-it.png" alt="Grabit" />
              </div>
              <div className="block-1-bottom">
                <div className="box" id="driver">
                  <div className="box-top">
                    <img src="./assets/helmet.png" alt="Grabit" />
                  </div>
                  <div className="box-bottom">
                    <p>Sign up as Driver</p>
                    <Link to="/driverSignUp">
                      <img src="./assets/arrow.png" alt="Grabit" />
                    </Link>
                  </div>
                </div>
                <div className="box" id="customer">
                  <div className="box-top">
                    <img src="./assets/man-user.png" alt="Grabit" />
                  </div>
                  <div className="box-bottom">
                    <p>Sign up as Customer</p>
                    <Link to="/customerSignUp">
                      <img src="./assets/arrow.png" alt="Grabit" />
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
                  <img id="image-driver" src="./assets/driver.png" alt="Grabit" />
                  <img id="image-restaurant" src="./assets/restaurant.png" alt="Grabit" />
                </div>
              </div>
              <div className="block-2-middle">
                <div className="box-images-middle">
                  <img src="./assets/driver-delivering.png" alt="Grabit" />
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
                  <img id="image-driver-running" src="./assets/driver-running.png" alt="Grabit" />
                  <img id="image-home" src="./assets/home.png" alt="Grabit" />
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
                <button>
                  Send
                  <img src="./assets/send-2.png" alt="Grabit" />
                </button>
              </div>
            </div>
            <Footer />
          </div>
        );
    }
}

export default LandingPage;