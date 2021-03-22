import React from 'react'
import './Address.css'

class Address extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const address = this.props.address
        return (
            <div className="main-right">
                <div className="main-right-top">
                    <h3>Address</h3>
                </div>
                <div id="address-form" className="main-right-form">
                    <div className="main-right-form-inputs">
                        <section className="input">
                            <label>Address</label>
                            <br/>
                            <input type="text" name="address" id="address" defaultValue=""/>
                        </section>
                        <br/>
                        <button id="address-button">Update</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Address