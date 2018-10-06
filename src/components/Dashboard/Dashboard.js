import React, { Component } from 'react';
import Product from '../Product/Product'

class Dashboard extends Component {

    render() {

        let product_dash = this.props.inventory_list.map(product => {

            return (
                <div key={product.product_id} >
                    <Product details={product} getData={this.props.getData} setSelected={this.props.setSelected} />
                </div>
            )

        })

        return (

            <div className="Dashboard">

                Dashboard

                {product_dash}

            </div>

        )
    }

}

export default Dashboard;