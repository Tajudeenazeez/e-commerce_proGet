import React, {useState, useEffect}  from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import  Message from "../components/Message";
import  Loader  from "../components/Loader";
import   { getUserDetail, updateProfileAction }  from "../action/userActions";

const ProfileScreen = ({history} ) => {
  const dispatch = useDispatch()
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const userDetail = useSelector((state) => state.userDetail)
  const { loading, error, user  } = userDetail  

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  const updateProfile = useSelector(state => state.updateProfile)
  const { success } = updateProfile
  
  const orderDisplay = useSelector(state => state.orderDisplay)
  const { loading:loadingOrders, error:errorOrders} = orderDisplay

  useEffect(() => {
    if(!userInfo) {
      history.push(`/login`)
    } else {
      if (!userInfo.name) {
        dispatch(getUserDetail('profile'))
      } else{
        setName(userInfo.name)
        setEmail(userInfo.email)
      }  
    } 
  }, [dispatch, history, userInfo])

   const submitHandler = (e) => {
     e.preventDefault()
      if (password !== confirmPassword) {
       setMessage('Password do not match')
     } else {
       //dispatch update profile
       dispatch(updateProfileAction({id: user._id, name, email}))

     }
   }

 return <Row>

   <Col md={3}>
     <h2> User Profile</h2>
     {message && <Message variant='danger'>{message}</Message>}
     {error && <Message variant='danger'>{error}</Message>}
     {success && <Message variant='success'>Profile update</Message>}
     {loading && <Loader/>}
     <Form onSubmit={submitHandler}>
       <Form.Group controlId='name'>
           <Form.Label>Name</Form.Label>
           <Form.Control 
           type='name' 
           placeholder='Enter name'
           value ={name} 
           onChange= {(e) => setName(e.target.value)} >
           </Form.Control>
       </Form.Group>

       <Form.Group controlId='email'>
           <Form.Label>Email</Form.Label>
           <Form.Control 
           type='email'
           placeholder='Enter email'
           value ={email} 
           onChange= {(e) => setEmail(e.target.value)} >
           </Form.Control>
       </Form.Group>

       <Form.Group controlId ='password'>
           <Form.Label>password</Form.Label>
           <Form.Control 
           type='password' 
           placeholder='Enter password'
           value ={password} 
           onChange= {(e) => setPassword(e.target.value)} >
           </Form.Control>
       </Form.Group>

       <Form.Group controlId ='confirmPassword'>
           <Form.Label>Confirm Password </Form.Label>
           <Form.Control 
           type='password' 
           placeholder='confirm password'
           value ={confirmPassword} 
           onChange= {(e) => setConfirmPassword(e.target.value)} >
           </Form.Control>
       </Form.Group>

       <Button type='submit' variant='primary'>
         Update
       </Button>
    </Form>
    </Col>

   <Col md={9}>
     <h2>My Order</h2>
     {loadingOrders ? <Loader/> :
      errorOrders ? <Message variant='danger'>{error}</Message> : (
       <Table striped bordered hover responsive className = 'table-sm'>
         <thead>
           <tr>
             <th>ID</th>
             <th>DATE</th>
             <th>TOTAL</th>
             <th>PAID</th>
             <th>DELIVERED</th>
             <th></th>
           </tr>
         </thead>

       </Table>

     )  
    }
   
   </Col>
  </Row>   
  
}
       

export default ProfileScreen