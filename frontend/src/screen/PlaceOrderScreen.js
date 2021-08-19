import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Row, ListGroup, Image, Card, Button, Col } from "react-bootstrap";
import Message  from "../components/Message";
import CheckOutStep from "../components/CheckOutStep";
import { Link } from "react-router-dom";
import { createOrder } from "../action/orderAction";

const PlaceOrderScreen = ({history}) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  

  //calculate price
  const addDecimal = (num) => {Math.round((num * 100) /100 ).toFixed(2) }
  cart.itemsPrice = addDecimal(cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty, 0
    ))
    cart.shippingPrice = addDecimal(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
      Number(cart.itemsPrice) + 
      Number(cart.shippingPrice) + 
      Number(cart.taxPrice)).toFixed(2)

  const orderCreate = useSelector(state => state.orderCreate)
  const {order, success, error} = orderCreate

  useEffect(() => {
    if(success){
      history.push(`/order/${order._id}`)
    }
    //eslint disable-next-line
  
  }, [history, success, order._id])
 
  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,

  })
    )
} 
  return (
    <>
      <CheckOutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},{''}
                {cart.shippingAddress.postalCode},{''}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Mthod:</strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <strong>Method:</strong>
              {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> 
              : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    < ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}
                          ><Image src={item.image} alt={item.name}
                          fluid rounded/></Col>
                        <Col>
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>

          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}

              </ListGroup.Item>
              

              <ListGroup.Item>
                <Button
                type='submit'
                className='btn-block' 
                disabled= {cart.cartItems === 0}
                onClick={placeOrderHandler}
                >Place Order</Button>
              </ListGroup.Item>
            </ListGroup>

          </Card>
        </Col>
        
      </Row>
    
      
    </>
  )
}

export default PlaceOrderScreen
