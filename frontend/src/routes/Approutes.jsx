import { Route,Routes } from "react-router-dom"
import First from "../pages/First"
import BuyerSignup from "../pages/Buyersignup"
import Sellersignup from "../pages/Sellersignup"

import Home from "../pages/Home"
import Profile from "../pages/Profile"
import Cart from "../pages/Cart"
import About from "../pages/About"
import Help from "../pages/Help"
import Contact from "../pages/Contact"
import SellerDashboard from "../pages/Sellerdashboard"
import Addproduct from "../pages/Addproduct"
import Loginasseller from "../pages/Loginasseller"
import BuyerLogin from "../pages/BuyerLogin"
function Approutes() {
  return (
    
    <>
    <Routes>
    
      <Route path="/"  element={<First></First>} />
      <Route path="/buyersignup"  element={<BuyerSignup></BuyerSignup>} />
      <Route path="/sellersignup"  element={<Sellersignup></Sellersignup>} />
      <Route path="/loginseller"  element={<Loginasseller></Loginasseller>} />
      <Route path="/home"  element={<Home></Home>} />
      <Route path="/profile"  element={<Profile></Profile>} />
      <Route path="/cart"  element={<Cart></Cart>} />
      <Route path="/about"  element={<About></About>} />
      <Route path="/help"  element={ <Help></Help>} />
      <Route path="/contact"  element={<Contact></Contact>} />
      <Route path="/dashboard"  element={<SellerDashboard></SellerDashboard>} />
      <Route path="/additem"  element={<Addproduct></Addproduct>} />
      <Route path="/buyerlogin"  element={<BuyerLogin></BuyerLogin>} />



    </Routes>




    </>
  )
}

export default Approutes