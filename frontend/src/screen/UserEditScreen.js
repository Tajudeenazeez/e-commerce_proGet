import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {  Link } from "react-router-dom";
import { Button, Form  } from "react-bootstrap";
import Loader from "../components/Message";
import Message from "../components/Loader";
import  FormContainer  from "../components/FormContainer";
import {getUserDetail} from "../action/userActions";

  const UserEditScreen = ({match, history}) => {
    const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()
  const userDetail = useSelector(state => state.userDetail)
  const { loading, error, user } = userDetail
  
  useEffect(() => {
    if (!user.name || user._id !== userId ) {
      dispatch(getUserDetail(userId))
    } else{
      setName(user.name)
      setName(user.email)
      setIsAdmin(user.isAdmin)
    }

  }, [dispatch, userId, user])

   const submitHandler = (e) => 
     e.preventDefault()
     
 return (
   <>
    <Link to='admin/userlist' className='btn btn-light my-3'>
     Go Back
    </Link>
    <FormContainer>
     <h1> Edit User</h1>
     { loading ? <Loader/> : error ? <Message variant = 'danger'>{error}</Message> :(
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
        <Form.Group controlId='isAdmin'>
            <Form.Check 
            type='checkbox' 
            label='Is Admin'
            checked={isAdmin}
            onChange= {(e) => setIsAdmin(e.target.checked)} >
            </Form.Check>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Edit
        </Button>
      </Form>
     )}
   </FormContainer>
   </>  
 )
}

export default UserEditScreen
