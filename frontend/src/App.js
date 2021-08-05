import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import LoginScreen from './screen/LoginScreen';
import CartScreen from './screen/CartScreen';

function App() {
  return (
    <Router>
      <Header/> 
      <main className='py-3'>
        <Container>
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
