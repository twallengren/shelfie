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
            descript: "N/A",
            selectedID: -1,
            addOrEdit: () => { return (<button onClick={this.addToInventory} >Add to Inventory</button>) }
        }

    }

    componentDidUpdate(prevProps) {

        if (this.props.selected !== prevProps.selected) {

            let prodID = this.props.selected.product_id;

            this.setState({ selectedID: prodID })

            if (prodID === -1) {

                console.log('prodID is -1')

                this.setState({ addOrEdit: () => { return (<button onClick={this.addToInventory} >Add to Inventory</button>) } })


            } else {

                this.setState({ addOrEdit: () => { return (<button onClick={this.editItem} >Save Changes</button>) } })

            }

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
            price: "",
            selectedID: -1
        });

        // Clear input boxes
        this.refs.image_url.value = "";
        this.refs.product_name.value = "";
        this.refs.price.value = "";

        // Unselect on App state
        this.props.unselect();

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
                    {this.state.addOrEdit()}
                </div>

            </div>

        )
    }

}

export default Form;