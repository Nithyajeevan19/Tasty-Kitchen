import { useEffect, useState } from "react";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Navbar from "../Navbar";
import CartItem from "../CartItem";
import Footer from "../../Footer";
import './index.css';

import { replace, useNavigate } from "react-router-dom";

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [showOrderPlaced,setShowOrderPlaced]=useState(false)

  const navigate=useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cartData")) || [];
    setCartData(data);
  }, []);

  const updateCart = (id, newQty) => {
    const updated = cartData.map(item => {
      if (item.id === id) return { ...item, quantity: newQty };
      return item;
    }).filter(item => item.quantity > 0);

    localStorage.setItem("cartData", JSON.stringify(updated));
    setCartData(updated);
  };


  const getTotalPrice = () =>
    cartData.reduce((acc, item) => acc + item.quantity * item.cost, 0)

  if (cartData.length === 0) {
    return (
      <>
        <Navbar/>
        <div className="empty-cart">
          <img
            src="https://res.cloudinary.com/dhgkvhtol/image/upload/v1752898605/cooking_1_etcyxp.png"
            alt="empty cart"
            clasaName="order-img"
          />
          <h2 className="payment-heading">No Orders Yet!</h2>
          <p>Your cart is empty. Add something from the menu.</p>
          <button className="go-to-home-page" onClick={goToHome}>Order Now</button>
        </div>
      </>
    );
  }
  function placeOrder(){
    setShowOrderPlaced(true)
  }
  function goToHome(){
    setShowOrderPlaced(false)
    navigate('/',{replace:true})
  }

  return (
    <>
      <Navbar/>
      {showOrderPlaced?<div className="payment-container">
        <FontAwesomeIcon icon={faCircleCheck} className="green-icon"/>
        <h1 className="payment-heading">Payment Successful</h1>
        <p>Thankyou for ordering</p>
        <p>Your Payment is successfully completed</p>
        <button className="go-to-home-page" onClick={goToHome}>Go to Home Page</button>

      </div>:
            <div className="cart-container">
                <div className="checkout-container">
                    <div className="cart-headings-container">
                        <h3 className="column-name-item">Item</h3>
                        <h3 className="column-name-quantity">Quantity</h3>
                        <h3 className="column-name-price">Price</h3> 
                    </div>

                      <div className="all-cart-items-container">
                        {cartData.map(item=>{
                        return (
                          <CartItem eachCartItem={item} updateCart={updateCart} key={item.id}/>
                        )})}
                      </div>

                    <div className="order-total">
                      <h3>Order Total:</h3>
                      <h3 className="total-price" data-testid="total-price">₹ {getTotalPrice()}</h3>

                    </div>
                    <div className="button-container">
                      <button className="place-order-button" onClick={placeOrder}>Place Order</button>
                    </div>
                </div>
            </div>
        
        }
        <Footer/>

    </>
  );
}

export default Cart;
