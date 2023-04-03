import { useReducer } from "react";
import React from "react";
import CartContext from "./cart-context";

{
	/*
	 * this file is not necessary, but we do it to reduce this code from the app.js where we wrap all the jsx with cartProvider
	 * Goal:- to manage the cart-context data and provide that context to all components
	 *that want access to it. basically update the items in cart-comntext
	 */
}

const cartReducer = (state, action) => {
	return;
};

export default function CartProvider(props) {
	const addItemToCartHandler = (item) => {};

	const removeItemFromCarthandler = (id) => {};

	const cartContext = {
		//going to be dynamic data,or updates with time or
		// updating with the provider type component.
		items: [],
		totalAmount: 0,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCarthandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
}
