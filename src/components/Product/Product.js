import React from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:3005";

var deleteProduct = (id, getCallback) => {

    axios.delete(`${BASE_URL}/api/inventory/${id}`).then(() => {

        // Callback function to update product list
        getCallback();

    })

}

var Product = (props) => {
    return (

        <div className="Product" >

            {props.details.product_name}
            <img src={props.details.image_url} alt={props.details.descript} />
            {props.details.price}

            <div className="productButtons">

                <button onClick={() => { deleteProduct(props.details.product_id, props.getData) }}>DELETE</button>
                <button>EDIT</button>

            </div>

        </div>

    )
}

export default Product;