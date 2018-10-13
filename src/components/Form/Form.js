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
            selectedID: props.match.params.id,
            edit_image: null,
            addOrEdit: () => { return (<button onClick={this.addToInventory} >Add to Inventory</button>) },
        }

    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.setState({ selectedID: this.props.match.params.id })
            this.setState({ addOrEdit: () => { return (<button onClick={this.editItem} >Save Changes</button>) } })
            this.getItem()
        } else {
            this.setState({ selectedID: null })
            this.setState({ addOrEdit: () => { return (<button onClick={this.addToInventory} >Add to Inventory</button>) } })
        }
    }

    componentDidUpdate(prevProps) {

        if (this.props.match.params.id !== prevProps.match.params.id) {

            let prodID = this.props.match.params.id;

            this.setState({ selectedID: prodID })

            if (!prodID) {

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

    editItem = () => {

        const selected = this.state.selectedID;

        axios.put(`${BASE_URL}/api/inventory/${selected}`, this.state).then(() => {

            this.clearInput();

        })

    }

    getItem = () => {

        const selected = this.state.selectedID;

        axios.get(`${BASE_URL}/api/inventory/${selected}`, this.state).then((response) => {

            this.setState({ edit_image: response.data[0].image_url })

        })

    }

    render() {

        if (this.state.selectedID) {

            var img = <img src={`${this.state.edit_image}`} alt={`${this.state.selectedID}`} />;

        } else {
            var img = <div></div>;
        }

        return (

            <div className="Form">

                {img}

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