import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './ContextReduser';
import { FaShoppingCart } from 'react-icons/fa';
import Modal from '../Modal';
import MyCart from './MyCart';




const Header = () => {

  const [cartView, setCartView] = useState(false);
  const navigate1 = useNavigate();

  const authToken = localStorage.getItem("authToken");
  console.log(authToken);
  const navigate = useNavigate();
  const cartItems = useCart();

  // Check if cartItems is undefined or empty before using reduce
  const uniqueItemsCount = cartItems ? cartItems.reduce((count, item) => {
    if (!count.includes(item.id)) {
      count.push(item.id);
    }
    return count;
  }, []).length : 0;

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-4 fst-italic" to="/">FoodPanda</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2n ">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {authToken && (
              <li className="nav-item">
                <Link className="nav-link active" to="/myorders">My Orders</Link>
              </li>
            )}
          </ul>
          <div className='d-flex'>
            {!authToken ? (
              <div>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-1" onClick={() => setCartView(true)}>
                  <FaShoppingCart />
                  {uniqueItemsCount > 0 && <span className="badge bg-secondary">{uniqueItemsCount}</span>}
                </div>


                {cartView ? <Modal onClose={()=>setCartView(false)}><MyCart/></Modal> : null}

                <div className='btn bg-white text-success mx-1' onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
