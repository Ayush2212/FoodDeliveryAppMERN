import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import badge from 'react-bootstrap/Badge'
import Modal from '../Modal'
import { useCart } from './ContextReducer'
import Cart from '../screens/Cart'
import Badge from 'react-bootstrap/Badge'
export const Navbar = () => {

  let data= useCart();

  const [cartView, setCartView] = useState(false)

  const loadCart = () => {
    setCartView(true)
}

  //Add HERE log out function to remove item from local storage 
  return (
    
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fstlic" to="/">GoFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 ">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>

        {(localStorage.getItem("bool"))? <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">My Orders</Link>
        </li>
        
        : ""}
      </ul>
      {(localStorage.getItem("bool"))==="login" ? <div className='d-flex'>
            <div className='btn bg-white text-success mx-2' onClick={loadCart}>
            
          {<Badge pill bg="danger"> {data.length}</Badge>}
               My Cart
            </div>

            {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

            <Link className="btn bg-white text-success mx-1" to="/login">Log Out</Link>
            </div> : <div className='d-flex'>
            
            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
        
       
        <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link> 
    
      </div> }
      
    </div>
  </div>
</nav>

    
  )
}
