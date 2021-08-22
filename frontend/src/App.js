import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from "./screen/RegisterScreen";
import ProfileScreen from './screen/ProfileScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import UserListScreen, {  } from "./screen/UserListScreen";
import UserEditScreen from './screen/UserEditScreen';


function App() {
  return (    <Router>
      <Header/> 
      <main className='py-3'>
        <Container>
           <Route path='/admin/user/:id/edit' component={UserEditScreen} />
           <Route path='/admin/userList' component={UserListScreen} />
           <Route path='/Order/:id' component={OrderScreen} />
           <Route path='/placeOrder' component={PlaceOrderScreen} />
           <Route path='/payment' component={PaymentScreen} />
           <Route path='/shipping' component={ShippingScreen} />  
           <Route path='/profile' component={ProfileScreen} />       
           <Route path='/register' component={RegisterScreen} />       
           <Route path='/login' component={LoginScreen} />
           <Route path='/product/:id' component={ProductScreen} />
           <Route path='/product/:id?' component={CartScreen} />
           <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
     
      <Footer/>
    </Router>

  

  );
}

export default App;
