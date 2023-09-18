import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { authActions } from '../store';
import "../styles/navbar.css";
import logofinal from '../images/logofinal.png';
axios.defaults.withCredentials = true;

const Navbar = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.signup());
  }, [dispatch]);


  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isSignedUp = useSelector((state) => state.isSignedUp);
  const username = useSelector((state) => state.username);

  const sendLogoutReq = async () => {
    try {
      await axios.post("http://3.110.108.170:5000/api/logout", null, {
        withCredentials: true,
      });

      // Clear the Redux state and perform logout
      dispatch(authActions.logout());
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle logout error here if needed
    }
  };


  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid" >
        
          <Link className="navbar-brand text-white" to="/"><img src={logofinal} alt="News Logo"  style={{
    width: "100px",
    height: "auto",
  }}/></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
          aria-expanded="false" aria-label="Toggle navigation" id='res'>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {  !isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active text-white" id='login' to="/login">Login</Link>
                  </li>
                  <li className="nav-item" id='sinup'>
                    <Link className="nav-link active text-white" to="/signup">Signup</Link>
                  </li>
                </>
              )}
              { isSignedUp && isLoggedIn &&(
                <>
                  <li className="nav-item">
                    <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active text-white" aria-current="page" to="/business">Business</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active text-white" aria-current="page" to="/entertainment">Entertainment</Link>
                  </li>
                   <li className="nav-item">
            <Link className="nav-link active text-white" aria-current="page" to="/health">Health</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active text-white" aria-current="page" to="/science">Science</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active text-white" aria-current="page" to="/sports">Sports</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active text-white" aria-current="page" to="/technology">Technology</Link>
          </li>   <li className="nav-item">
                    <span className="nav-link active text-white" aria-current="page">
                      {username} {/* Display the username */}
                    </span>
                  </li>
                  {/* Add other links here */}
                  <li className="nav-item">
                    <Link onClick={handleLogout} className="nav-link active text-white" aria-current="page" to="/">Logout</Link>
                  </li>
                
                </>
              )}
            
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;

