import { useState, useEffect } from 'react';
import './index.css';

function FoodItem(props) {
  const { foodItemsData } = props;
  const {
    foodItemCost,
    foodItemId,
    foodItemImg,
    foodItemName,
    foodItemRating
  } = foodItemsData;

  const [count, setCount] = useState(0);
  const [showCounter,setShowCounter]=useState(false)

  // Load cart data from localStorage

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    const itemInCart = cartData.find(item => item.id === foodItemId);
    if (itemInCart) {
      setCount(itemInCart.quantity);
      setShowCounter(true); 
    }
  }, []);

  function updateCart(newCount) {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

    const updatedCart = cartData.filter(item => item.id !== foodItemId);
    
    if (newCount > 0) {
      updatedCart.push({
        id: foodItemId,
        name: foodItemName,
        cost: foodItemCost,
        quantity: newCount,
        imageUrl: foodItemImg
      });
    }

    localStorage.setItem('cartData', JSON.stringify(updatedCart));
  }

  const handleAdd = () => {
    setShowCounter(true);
    setCount(1);
    updateCart(1);
  };

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateCart(newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
      if (newCount >= 0) {
        setCount(newCount);
        updateCart(newCount);
        if (newCount === 0) {
        setShowCounter(false);
      }
    }
  };


  return (
         <>
            <div className="food-item-container">
                  <div className='img-container'>
                     <img src={foodItemImg} className="food-item-img"/>
                  </div>
               <div className="food-details">
                    <h1 className="food-name">{foodItemName}</h1>
                    <div className="cost-container">                         
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="rupee-icon">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6" />
                         </svg>
                        <p className='food-item-cost'>{foodItemCost}</p>
                     </div>
                     <div className="ratings-container">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFCC00" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="star-icon-food">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                         </svg>
                         <p className='food-item-rating'>{foodItemRating}</p>
                     </div>
                  {showCounter?<div className="fooditem-counter-container">
                         <button onClick={decrement} className="counter-button">-</button>
                        <p className='count-value'>{count}</p>
                         <button onClick={increment} className="counter-button">+</button>
                    </div>:<button className='add-button' onClick={handleAdd}>ADD</button>}

                 </div>

             </div>
         </>

  )
}

export default FoodItem;
