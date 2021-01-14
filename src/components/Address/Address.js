import React from 'react';
import './Address.css';
import { Link } from 'react-router-dom';

class Address extends React.Component {

    constructor(props) {
        super(props);
        this.handleAddressChange = this.handleAddressChange.bind(this);
    }

    handleAddressChange(event) {
        this.props.handleAddressChange(event.target.value);
    }

    render() { 
        const user = this.props.user;
        return (
            <div className="main-right" >
                <div className="main-right-top">
                    <h3>Address</h3>
                </div>
                <div id="address-form" className="main-right-form">
                    <div className="main-right-form-inputs">
                        <section className="input">
                            <label>Address</label>
                            <br/>
                            <input type="text" name="address" id="address" defaultValue={user.address} onChange={this.handleAddressChange} />
                        </section>
                        <br/>
                        <button id="address-button">Update</button>
                    </div>
                </div>
            </div>
        );
    }

}
export default Address;