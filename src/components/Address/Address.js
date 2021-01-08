import React from 'react';
import './Address.css';
import { Link } from 'react-router-dom';

class Address extends React.Component {

    constructor(props) {
        super(props);
    }

    render() { 

        return (
            <div className="main-right" >
                <div className="main-right-top">
                    <h3>Address</h3>
                </div>
                <div className="main-right-form">

                </div>
            </div>
        );
    }

}
export default Address;