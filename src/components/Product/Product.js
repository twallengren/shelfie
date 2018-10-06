import React from 'react';

var Product = (props) => {
    return (

        <div className="Product" >

            {props.details.product_name}
            <img src={props.details.image_url} alt={props.details.descript} />
            {props.details.price}

        </div>

    )
}

export default Product;