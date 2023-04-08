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

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

/**
 * We are using this useReducer insted of useState to manage the cart-context state.
 * Purpose of this staAte management is to check if the item is already
 * present in the cart then update the object otherwise add it to the cart.
 * @param {*} state
 * @param {*} action
 * @returns
 */
const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		const existingCartItemsIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemsIndex];
		let updatedItems;

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemsIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === "REMOVE") {
		const existingCartItemsIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const existingItem = state.items[existingCartItemsIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		let updatedItems;
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
			updatedItems = [...state.items];
			updatedItems[existingCartItemsIndex] = updatedItem;
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === "CLEAR") {
		return defaultCartState;
	}
	return defaultCartState;
};

export default function CartProvider(props) {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: "ADD", item: item });
	};

	const removeItemFromCarthandler = (id) => {
		dispatchCartAction({ type: "REMOVE", id: id });
	};

	const clearCartHandler = () => {
		dispatchCartAction({ type: "CLEAR" });
	};

	const cartContext = {
		//going to be dynamic data,or updates with time or
		// updating with the provider type component.
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCarthandler,
		clearCart: clearCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
}
