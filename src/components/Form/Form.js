import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:3005";


class Form extends Component {

    constructor(props) {

        super(props);

        this.state = {
            image_url: "",
            product_name: "",
            price: "",
            descript: "N/A"
        }

    }

    // Single function to update state for all input boxes
    updateInputState = (event, type) => {

        const input_string = event.target.value;

        switch (type) {

            case "Image URL":

                this.setState({ image_url: input_string })
                break;

            case "Product Name":

                this.setState({ product_name: input_string })
                break;

            case "Price":

                this.setState({ price: input_string })
                break;

            default:

                console.log("STATE DID NOT UPDATE")
                break;

        }

    }

    clearInput = () => {

        // Clear state
        this.setState({
            image_url: "",
            product_name: "",
            price: ""
        });

        // Clear input boxes
        this.refs.image_url.value = "";
        this.refs.product_name.value = "";
        this.refs.price.value = "";

    }

    addToInventory = () => {

        axios.post(`${BASE_URL}/api/product`, this.state).then(() => {

            this.clearInput();
            this.props.getData();

        })

    }

    render() {
        return (

            <div className="Form">

                <div className="InputBoxes">
                    <input ref="image_url" placeholder="Image URL" onChange={(event) => { this.updateInputState(event, "Image URL") }} />
                    <input ref="product_name" placeholder="Product Name" onChange={(event) => { this.updateInputState(event, "Product Name") }} />
                    <input ref="price" placeholder="Price" onChange={(event) => { this.updateInputState(event, "Price") }} />
                </div>

                <div className="FormButtons">
                    <button onClick={this.clearInput} >Cancel</button>
                    <button onClick={this.addToInventory} >Add to Inventory</button>
                </div>

            </div>

        )
    }

}

export default Form;