import React from 'react'
import SearchBox from "./SearchBox";
import { Route } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container, NavDropdown, Image} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../action/userActions";
const Header = () => {

const dispatch = useDispatch()
const userLogin = useSelector(state => state.userLogin)
const {userInfo} = userLogin

const logoutHandler = () => {
  dispatch(logout())
}
  return (
  <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand>
          <Image src='progetlogo.png' alt='proget' style={{height:'40px',width:'50px'}} />
        </Navbar.Brand>

        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id = 'basic-navbar-nav'>
         <Route render={({history}) => <SearchBox history={history} />}/> 
          <Nav className='ms-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link> 
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>
                  Logout 
                </NavDropdown.Item>
              </NavDropdown>
              
            ): (
            <LinkContainer to='/login'>
             <Nav.Link><i className='fas fa-user'></i> Sign in</Nav.Link> 
            </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='Adminmenu'>
              <LinkContainer to='/admin/userList'>
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/productList'>
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/orderList'>
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
              
            </NavDropdown>

            ) }
          </Nav>
        </Navbar.Collapse>   
      </Container>  
    </Navbar>    
  </header>
  )
}

export default Header
