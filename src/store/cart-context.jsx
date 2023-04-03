import React from "react";

/** 
 * 
 * STEP NO 1.
 *It will create a global object named CartContext.
 *we can access this cartContext using CartContext.provider
 *in the component where we will update these states.
 *and it will update the states globally then it can be accesible using 

 *const cctx = useContext(cartContext);
 *and then use cctx as props
 *cctx.items or 
 *cctx.totalAmount
*/

// provides the data by context items
//  and updates with the use of provider function

const CartContext = React.createContext({
	items: [],
	totalAmount: 0,
	addItem: (item) => {},
	removeItem: (id) => {},
});

export default CartContext;
