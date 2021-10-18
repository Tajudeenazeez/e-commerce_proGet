import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Row, Col, Button} from "react-bootstrap";
import Loader from "../components/Message";
import Message from "../components/Loader";
import  {orderListAction}   from "../action/orderAction";

  const OrderListScreen = ({history}) => {
  const dispatch = useDispatch()

  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders} = orderList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo} = userLogin
 

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push(`/login`)
    }else {
      dispatch(orderListAction())
    }

  }, [dispatch, history, userInfo, orders ])
  
  return (
    <>
    <Row className='align-items-center'>
      <Col>
        <h1>Orders</h1> 
      </Col>
    </Row>
    { loading ? <Loader/> : 
    error ? <Message variant ='danger'>{error}</Message> : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
              <tbody>
                {orders.map(order => (
                    <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>${order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice }</td>
                    <td>{order.isPaid ? (order.paidAt.substring(0, 10)):
                    <i className='fa fa-times' style={{color:'red'}}></i>
                    }</td>
                    <td>{order.isDelivered ? (order.DeliveredAt.substring(0, 10)):
                    <i className='fa fa-times' style={{color:'red'}}></i>
                    }</td>
                    <td>
                      <LinkContainer to={`/order/${order.id}`}>
                        <Button variant='light' className='btn-sm'>Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                )  
                )}
              </tbody>
          </Table>
        )}
    </>
   )
}

export default OrderListScreen
