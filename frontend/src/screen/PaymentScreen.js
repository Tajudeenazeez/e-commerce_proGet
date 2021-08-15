import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Form, Button , Col } from "react-bootstrap";
import  FormContainer  from "../components/FormContainer";
import { savePaymentMethod } from "../action/cartAction";
import CheckOutStep from "../components/CheckOutStep";
const PaymentScreen = ({history}) => {
  const cart = useSelector(state => state.cart)
  const {saveShippingAddress} = cart

  if(saveShippingAddress) {
    history.push('/shipping')
  }
  
  const [paymentMethod, setPaymentMethod] = useState('')
  const dispatch = useDispatch()
  
  
  
  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }


  return (
    <FormContainer>
      <CheckOutStep step1 step2 step3></CheckOutStep>
      <h1>Payment method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group >
          <Form.Label as='legend'>Select method</Form.Label>
          
      
        <Col>
          <Form.Check 
            type='radio' 
            label='PayPal or Credit Card'
            id='PayPal'
            name='paymentMthod'
            value='PayPal'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>

        
        </Col>
        
        </Form.Group>
        <Button type='submit' variant='primary'>Continue</Button>


      </Form>
      
    </FormContainer>
  )
}

export default PaymentScreen
