import "./Order.css";

import React from 'react'
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';

function Order({order}) {
    console.log(order);
    return (
        <div className="order">
            <h2>Order</h2>
            {console.log(order)}
            <p>{moment.unix(order.data.timestamp).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small>Successful</small>
            </p>
            {
                order.data.items?.map(item => (
                    <CheckoutProduct
                        id={item.id}
                        title={item.description}
                        image={item.image}
                        price={item.amount_total/100}
                        rating={item.rating}
                        key={item.id}
                        hideButton
                    />
                ))
            }

            <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order__total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={order.data.amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />

        </div>
    )
}

export default Order
