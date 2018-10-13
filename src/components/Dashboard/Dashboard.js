import React, { Component } from 'react';
import Product from '../Product/Product';
import axios from 'axios';

const BASE_URL = "http://localhost:3005";

class Dashboard extends Component {

    constructor() {

        super();

        this.state = {
            inventory: [],
        }

    }

    componentDidMount() {

        this.getData();

    }

    getData = () => {
        // Get inventory list
        axios.get(`${BASE_URL}/api/inventory`).then(response => {

            this.setState({ inventory: response.data })

        })
    }

    render() {

        let product_dash = this.state.inventory.map(product => {

            return (
                <div key={product.product_id} >
                    <Product details={product} getData={this.getData} />
                </div>
            )

        })

        return (

            <div className="Dashboard">

                {product_dash}

            </div>

        )
    }

}

export default Dashboard;