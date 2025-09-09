import './index.css';

function CartItem(props) {

  const { eachCartItem, updateCart } = props;
  const { id, name, quantity, cost, imageUrl } = eachCartItem;
  
  const increment = () => updateCart(id, quantity + 1);
  const decrement = () => updateCart(id, quantity - 1);

  
  return (
    <div className="single-food-item-details-container">
        <img src={imageUrl} alt={name} className="food-item-cart-img" />

        <p className="food-item-cart-name">{name}</p>
      <div className='counter-container-cart-item'>
          <div className="quantity-column">
            <button onClick={decrement} className="counter-button-cart-item">-</button>
            <p className="count-value">{quantity}</p>
            <button onClick={increment} className="counter-button-cart-item">+</button>
          </div>
      </div>
        <p className="price-column">₹ {cost * quantity}</p>
    </div>
  );
}

export default CartItem;
