import React from "react";
import { BiCart } from "react-icons/bi";
import { HeartIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from '../redux/cartAction';
import { addToCart, removeFromCart } from "../redux/cartSlice";
// import { addToCart, removeFromCart } from '../redux/cartSlice';
import { addSaveItem, removeSaveItem } from "../redux/saveSlice";

const baseURL =
  "https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=";

export default function Home({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [likedProduct, setLikedProduct] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const saveItems = useSelector((state) => state.save.saveItems);

  const categories = ["All", "Fruit", "Bakery", "Drinks"];
  // const cartItemsSS = useSelector(state => state.cart.cartItems);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseURL}${category}`); // Replace with your actual API endpoint
      setProducts(response.data);
      setFilteredProducts(response.data);
      console.log(response.data);
    };

    fetchData();
    // console.log(cartItemsSS);
    console.log(cartItems);
  }, [category, setCategory, cartItems, saveItems]);

  useEffect(() => {
    console.log("search query", searchQuery);
    // Filter products based on search query
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  const handleAddToCart = (product, productId) => {
    const isAdded = cartItem.includes(productId);

    cartItems?.some((item) => item.id === productId)
      ? dispatch(removeFromCart(productId))
      : dispatch(addToCart(product));
  };

  const handleLike = (product, productId) => {
    console.log("like product", product);
    // Implement like functionality here (e.g., update product data, send like request)
    // const isLiked = likedProduct.includes(productId);
    // setSelectedProducts(isLiked ? selectedProducts.filter((id) => id !== productId) : [...selectedProducts, productId]); // Toggle like state
    // setLikedProduct(isLiked ? likedProduct.filter((id) => id !== productId) : [...likedProduct, productId]);
    saveItems?.some((item) => item.id === productId)
      ? dispatch(removeSaveItem(productId))
      : dispatch(addSaveItem(product));
  };

  return (
    <>
      <div className="m-10 text-black  gap-8 max-w-[1150px] mx-20">
        {categories.map((cat) => (
          <button
            key={cat} // Use category for unique key
            className={`outline outline-1 border-black hover:bg-blue-700 hover:text-white text-black py-2 px-4 rounded-full m-2 
          ${cat.toLowerCase() === category ? "bg-blue-700 text-white" : ""}`} // Add/remove blue class based on selected category
            onClick={() => setCategory(cat.toLowerCase())}
          >
            {cat}
          </button>
        ))}
      </div>

      <h1 className="text-2xl font-bold mx-20 ">Trending Items</h1>
      {filteredProducts.length > 0 ? (
        <div className="m-10 text-black grid grid-cols-2 gap-8 max-w-[1150px] mx-20">
          {filteredProducts.map((product) => (
            <div
              className="grid grid-cols-2 flex flex-col rounded-lg text-black bg-white md:max-w-xl md:flex-row 
                        shadow-lg border-black/10 "
            >
              <div className="w-full h-98 object-center">
                <img
                  className="object-center h-98 w-full rounded-t-lg object-cover md:h-auto md:w-full md:rounded-none md:rounded-l-lg"
                  src={product.img}
                  alt=""
                />
              </div>
              <div className="justify-start p-6">
                <div>
                  <h5 className="mb-2 text-xl  font-medium text-neutral-800 ">
                    {product.name}
                  </h5>
                  <p className="mb-4 text-base text-neutral-600 ">
                    {product.description}
                  </p>
                </div>
                <div>
                    { product.available <10 ? (

                        <p className="rounded-full bg-orange-400 w-32 text-center text-white">
                    Only {product.available} left
                  </p>
                      ):(
                          <p className="rounded-full bg-orange-400 w-32 text-center text-white">
                              Available
                          </p>
                      ) }
                </div>

                <div className="grid grid-cols-2  pb-5">
                  <div className=" space-x-4 ">
                    <p className="float-left">{product.price}</p>
                  </div>
                  {cartItems?.some((item) => item.id === product.id)}
                  <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4 ">
                    <HeartIcon
                      color={
                        saveItems?.some((item) => item.id === product.id)
                          ? "pink"
                          : "black"
                      }
                      fill={
                        saveItems?.some((item) => item.id === product.id)
                          ? "pink"
                          : "white"
                      }
                      height={"30px"}
                      onClick={() => handleLike(product, product.id)}
                    />

                    <BiCart
                      size={30}
                      color={
                        cartItems?.some((item) => item.id === product.id)
                          ? "orange"
                          : "black"
                      }
                      //  color={cartItem.id === product.id ? 'orange' : 'black'}
                      onClick={() => handleAddToCart(product, product.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading products...</p>
      )}
    </>
  );
}

// import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";
// const baseURL = "https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all";
// // useState
// export default function Home() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await axios.get('https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all'); // Replace with your actual API endpoint
//             setProducts(response.data);
//         };

//         fetchData();
//     }, []);

//     if (!products) return null;

//     return (
//         <div>
//             <h2>Product Names</h2>
//             {products.length > 0 ? (
//                 <ul>
//                     {products.map((product) => (
//                         <li key={product.id}>{product.name}</li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>Loading products...</p>
//             )}
//         </div>
//     );
// }
