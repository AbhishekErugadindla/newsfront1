import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home';
import FetchData from './components/FetchData';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmailVerification from "./pages/EmailVerification";



const App = () => {

  return (
    <div><>
    <Router>
    <Navbar/>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
        <Route   path="/business" element={<FetchData cat="business"/>}/>
        <Route   path="/entertainment" element={<FetchData cat="entertainment"/>}/>

        <Route   path="/health" element={<FetchData cat="health"/>}/>

        <Route   path="/science" element={<FetchData cat="science"/>}/>

        <Route   path="/sports" element={<FetchData cat="sports"/>}/>

        <Route   path="/technology" element={<FetchData cat="technology"/>}/>

        <Route   path="/login" element={<Login />}/>
        <Route   path="/signup" element={<Signup />}/>

        <Route path="/verify-email/:emailToken" element={<EmailVerification />} />


      </Routes>
      <Footer/>

    </Router>

    </></div>
  )
}

export default App