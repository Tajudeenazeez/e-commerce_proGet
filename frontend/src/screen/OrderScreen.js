import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Row, ListGroup, Image, Card, Col } from "react-bootstrap";
import axios  from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import Message  from "../components/Message";
import Loader from "../components/CheckOutStep";
import { Link } from "react-router-dom";
import { getOrderDetails, payOrder  } from "../action/orderAction";
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = ({ match }) => {
  const orderId = match.params.id
  
  const [sdkReady, setSdkReady] = useState(false)
  
  const dispatch = useDispatch()
   
  const OrderDetails = useSelector(state => state.OrderDetails)
  const { order, loading, error } = OrderDetails

  const OrderPay = useSelector(state => state.OrderPay)
  const { loading: loadPay, success:successPay } = OrderPay


  if (!loading) {
      //calculate price
      const addDecimal = (num) => {
        return (Math.round(num * 100) /100 ).toFixed(2) 
      }  
        order.itemsPrice = addDecimal(
          order.orderItems.reduce(
        (acc, item) => acc + item.price * item.qty, 0
        ))
  }
   
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascrpt'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.appendChild('script')
      console.log(clientId)
    }
  if (!order || successPay) {
    dispatch({type: ORDER_PAY_RESET})
    dispatch(getOrderDetails(orderId))
    
  }  else if (!order.isPaid) {
    if(!window.paypal) {
      addPayPalScript()
    } else{
      setSdkReady(true)
    }
     
  }

  }, [dispatch, orderId, successPay, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }
 
  return loading ? <Loader/> : error ? <Message variant='danger'
  >{error}</Message> :
  <>
    <h1>Order {order._id} </h1>
    <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name:</strong>{order.user.name}</p>
              <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},
                {order.shippingAddress.city},{''}
                {order.shippingAddress.postalCode},{''}, 
                {order.shippingAddress.country}
              </p>
              {order.isDelievered ? <Message variant='success'>Delivered for {order.deliveredAt}</Message> :
              <Message variant='danger'>Not Delivered</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
              <strong>Method:</strong>
              {order.paymentMethod}
              </p>
              {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> :
              <Message variant='danger'>Not Paid</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <strong>Method:</strong>
              {order.orderItems.length === 0 ? <Message>order is empty</Message> 
              : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                  <Col>${order.orderPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadPay && <Loader />}
                  {!sdkReady ? ( 
                  <Loader /> 
                  ) : (
                    <PayPalButton 
                    amount={order.totalPrice} 
                    onSuccess={successPaymentHandler}
                    />
                  )}

                </ListGroup.Item>
              )}
              
            </ListGroup>

          </Card>
        </Col>
        
      </Row>
    
  </>


} 
    
  

export default OrderScreen