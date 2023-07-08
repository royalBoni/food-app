import Landing from "./pages/landingPage/Landing";
import ContactUs from "./pages/contactUsPage/ContactUs";
import Layout from "./Components.js/Layout";
import About from "./pages/aboutUsPage/About";
import Menu from "./pages/menuPage/Menu";
import Single from "./pages/singleDishPage/Single";
import MissingPage from "./Components.js/MissingPage";
import Login from "./pages/registerLoginPage/Login";
import Register from "./pages/registerLoginPage/Register";
import Cart from "./pages/CartPage/Cart";
import CheckOut from "./pages/checkoutPage/CheckOut";
import AdminPage from "./pages/AdministratorPages/AdminPage";
import AdminLogin from "./pages/AdministratorPages/AdminLogin";
import { Route, Routes,  BrowserRouter} from 'react-router-dom';
import UnSubscribe from "./pages/unsubscribePage/UnSubscribe";
import MyAccount from "./pages/myAccountPage/MyAccount";
import IndexProfileSetupPage from "./pages/ProfileSetUpPage/IndexProfileSetupPage";

function App() {

  return(
   
   <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Landing/>} />

            <Route path="contact" element={<ContactUs/>}/>
            <Route path="about" element={<About/>}/>
            {/* <Route path="menu" element={<Menu dishes={dishes}/>}/> */}

            <Route path='menu'>
              <Route index element={<Menu/>}/>
              <Route path=':dishId' element={<Single/>}/>
            </Route>
            
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="checkout" element={<CheckOut/>}/>
            <Route path="unsubscribe/:subscriber_id" element={<UnSubscribe/>}/>
            <Route path="profile-setup" element={<IndexProfileSetupPage/>}/>
            <Route path="account" element={<MyAccount/>}/>
            <Route path="*" element={<MissingPage/>}/>
          </Route>
          
          <Route path="admin-login" element={<AdminLogin/>}/>
          <Route path="admin/dashboard" element={<AdminPage/>}/>
        </Routes>
      </BrowserRouter>
   </div>
   
  );
 
}

export default App;
