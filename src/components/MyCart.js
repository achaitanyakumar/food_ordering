import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useCart, useDispatchCart } from './ContextReduser';

const MyCart = () => {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return <div className='m-5 w-100 text-center fs-3'>The Cart is empty</div>;
  }

  let totalPrice = data.reduce((total, item) => total + item.totalPrice, 0);

  const handleRemoveItem = (index) => {
    dispatch({ type: 'REMOVE', payload: { index } });
  };




  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
        console.error("No user email found in localStorage");
        return alert("User email is required to place an order.");
    }

    try {
        // Create order data
        let orderData = {
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString()
        };

        // Remove circular references
        let cleanedOrderData = JSON.parse(JSON.stringify(orderData));

        let response = await fetch("http://localhost:4000/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cleanedOrderData)
        });

        console.log("Order Response:", response);

        if (response.ok) { // response.ok is true when response.status is 200-299
            let responseData = await response.json();
            console.log("Order placed successfully:", responseData);
            dispatch({ type: "DROP" });
            alert("Order placed successfully!");
        } else {
            let errorData = await response.json();
            console.error("Error placing order:", errorData);
            alert("Failed to place order: " + errorData.error);
        }
    } catch (error) {
        console.error("Error during checkout:", error);
        alert("Failed to place order: " + error.message);
    }
};


  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.size}</td>
                <td>{item.totalPrice}</td>
                <td>
                  <button
                    type='button'
                    className='btn p-0'
                    onClick={() => handleRemoveItem(index)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
