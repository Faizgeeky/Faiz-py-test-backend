import { useState } from "react";

// import { useDispatch, } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
  addToCart,
  calculateTotal,
} from "../redux/cartSlice";
import axios from "axios";
import { addFreeItem, removeFreeItem } from "../redux/freeSlice";
import offersData from "../data/Offers.json";
// import { addFreeItem, removeFreeItem } from '../redux/freeSlice';
const baseURL =
    "https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all";
export default function Cart() {
  const [open, setOpen] = useState(true);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

  // const freeItems = useSelector(state => state.cart.freeItems);
  // const cartItems = useSelector(state => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
    const freeItems = useSelector((state) => state.free.freeItems) || []; // Use an empty array as default
  const cartItems = useSelector((state) => state.cart.cartItems) || []; // Use an empty array as default


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${baseURL}`); // Replace with your actual API endpoint
            setProducts(response.data);
            // setFilteredProducts(response.data);
            // console.log(response.data);
        };

        fetchData();
        // console.log(cartItemsSS);
        console.log(cartItems);
    }, [ cartItems]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
      checkOffers();
  };

  const handleQuantityChange = (productId, quantity, product) => {
    
    // console.log("Product is", available)
      if (product.available >= quantity){

        dispatch(updateCartQuantity({ id: productId, quantity }));
    }else{
        return <p>We have only {quantity -1} {product.name} left</p>
    }
      checkOffers();
  };

  const checkOffers = () => {
        
        offersData.map((offerItem) => {
            console.log("Offer item:", offerItem);

            //   step2 
            const matchingCartItem = cartItems.find(
                (cartItem) => cartItem.id === offerItem.id
            );

            // step 2.1
            if (
                matchingCartItem &&
                matchingCartItem.quantity >= offerItem.total_buy
            ) {
                // step 3
                console.log("Matching cart item:", matchingCartItem);

                const newOfferItem = products.find(
                    (cartItem) => cartItem.id === offerItem.offer_product_id
                );

                if (newOfferItem) {
                    console.log("reacher here?")
                    // Step 4: Check if free item already exists
                    const existingFreeItem = freeItems.find(
                        (item) => item.id === newOfferItem.id
                    );

                    if (!existingFreeItem) {
                        // Step 5: Add free item with corrected name
                        const freeItemToAdd = { ...newOfferItem, name: offerItem.offer }; // Create a copy with modified name
                        dispatch(addFreeItem(freeItemToAdd));
                    } else {
                        console.log("Free item already exists:", existingFreeItem.name);
                    }
                }
            }})
    
  };

  useEffect(() => {
    dispatch(calculateTotal()); // Calculate total on every cart change
    // console.log(freeItems);
      console.log("freeitems", freeItems?.length)

    checkOffers();
  }, [
    cartItems,
    addFreeItem,
    handleQuantityChange,
    updateCartQuantity,
    // freeItems,
  ]);

  // console.log("---", matchingItem);

  return (
    <>
      {cartItems.length === 0 ? (
        <div>
          <h1 className="text-2xl font-bold mx-20 ">Checkout</h1>
          <h3 className="text-center mx-20 my-20">Shopping cart is empty</h3>
          <Link to="/">
            <p
              type="button"
              className="font-medium text-center text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </p>
          </Link>
        </div>
      ) : (
        <div>
          <div className="cart-container">
            <h1 className="text-2xl font-bold mx-20 ">Checkout</h1>
          </div>
          <div className="px-48">
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={product.img}>{product.name}</a>
                            </h3>
                            <p className="ml-4">{product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center">
                            {" "}
                            {/* Center the quantity controls */}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500 mr-2"
                              onClick={() =>
                                handleQuantityChange(
                                  product.id,
                                  product.quantity - 1,
                                    product
                                )
                              }
                            >
                              -
                            </button>
                            <p className="text-gray-500">
                              Qty {product.quantity}
                            </p>
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500 ml-2"
                              onClick={() =>
                                handleQuantityChange(
                                  product.id,
                                  product.quantity + 1,
                                    product
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <div className="flex">
                            {" "}
                            {/* Move "Remove" button to the right */}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => handleRemoveFromCart(product.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

           
          </div>
        </div>
      )}
      <div>
              <h1 className="text-2xl font-bold mx-20 ">Offers</h1>

          {freeItems && freeItems.length > 0 && (
            //   freeItems.map((item) => (
                  <div className="px-48">
                      <div className="mt-8">
                          <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-gray-200">
                                  {freeItems.map((item) => (
                                      <li key={item.id} className="flex py-6">
                                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                              <img
                                                  src={item.img}
                                                  alt={item.name}
                                                  className="h-full w-full object-cover object-center"
                                              />
                                          </div>

                                          <div className="ml-4 flex flex-1 flex-col">
                                              <div>
                                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                                      <h3>
                                                          <a href={item.img}>{item.name}</a>
                                                      </h3>
                                                      {/* <p className="ml-4">{item.price}</p> */}
                                                  </div>
                                                  <p className="mt-1 text-sm text-gray-500">
                                                      {item.color}
                                                  </p>
                                              </div>
                                             
                                          </div>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                              <p>Subtotal</p>
                              <p>£{cartTotal.toFixed(2)}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                              Shipping and taxes calculated at checkout.
                          </p>
                          <div className="mt-6">
                              <a
                                  href="#"
                                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                              >
                                  Checkout
                              </a>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                              <p>
                                  or{" "}
                                  <Link to="/">
                                      <p
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() => setOpen(false)}
                                      >
                                          Continue Shopping
                                          <span aria-hidden="true"> &rarr;</span>
                                      </p>
                                  </Link>
                              </p>
                          </div>
                      </div>
                     
                  </div>
            //   ))
          )}
          </div>

    </>
  );
}
