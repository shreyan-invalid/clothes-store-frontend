import React from 'react';
import "./CheckoutProduct.css";
import {useStateValue} from '../../StateProvider';
import FlipMove from 'react-flip-move';
import image_not_available_lg from '../../images/image_not_available_lg.jpg'


function CheckoutProduct({title, image, price, rating, id, hideButton}) {

    const [{basket}, dispatch]= useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        })
    }

    
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image? image: image_not_available_lg}/>

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>

                <p className="checkoutProduct__price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>

                <div className="checkoutProduct__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p>🌟</p>
                    ))}
                </div>

                {!hideButton && (
                <button onClick={removeFromBasket}>Remove from basket</button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct;
