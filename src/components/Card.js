import React, { useState, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReduser';

const Card = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('regular');
  const [defaultPrice, setDefaultPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatchCart();
  const data = useCart();

  useEffect(() => {
    if (!item || !item.options) return;

    const { options } = item;
    const firstOptionPrice = options[0]?.[size];

    setDefaultPrice(firstOptionPrice || 0);
    setTotalPrice((firstOptionPrice || 0) * quantity);
  }, [item, quantity, size]);

  const handleAddToCart = async () => {
    if (!item || !item.options) {
      console.error('Error: Item or options not available');
      return;
    }

    const selectedTotalPrice = (item.options[0]?.[size] || defaultPrice) * quantity;

    try {

      dispatch({
        type: 'ADD',
        payload: {
          id: item.id,
          name: item.name,
          quantity,
          size,
          price: item.options[0]?.[size] || defaultPrice,
          totalPrice: selectedTotalPrice
        }
      });

      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const handleSizeChange = (event) => {
    const selectedSize = event.target.value;
    setSize(selectedSize);
  };

  if (!item || !item.options) {
    return <div>Error: Item or options not available</div>;
  }

  const { options } = item;

  return (
    <div className="card mt-4" style={{ width: "18rem", maxHeight: "360px" }}>
      <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "fill" }} />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <div className='container w-100'>
          <select className='m-2 h-100 bg-success' value={quantity} onChange={handleQuantityChange}>
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select className='m-2 h-100 bg-success' value={size} onChange={handleSizeChange}>
            {Object.entries(options[0] || {}).map(([size, price]) => (
              <option key={size} value={size}>
                {size.charAt(0).toUpperCase() + size.slice(1)}: {price}
              </option>
            ))}
          </select>
        </div>
        <div className="row mt-3">
          <div className="col text-start fs-5">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
        </div>
        <hr />
        <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  );
};

export default Card;
