import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Table, Button} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Message";
import Message from "../components/Loader";
import { listUsers } from "../action/userActions";
const UserListScreen = ({history}) => {

  const userList = useSelector(state => state.userList)
  const { loading, error, user} = userList
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo} = userLogin

  const dispatch = useDispatch()

  
  useEffect(() => {
    if (userLogin && userInfo.isAdmin) {
      dispatch(listUsers())
    } else{
      history.push(`/login`)
    }
    //remove userLogin and userInfor if dispatch fails
  }, [dispatch, history, userLogin, userInfo])
  
  const deleteHandler = (id) =>
  console.log('delete')
  
  return (
    <>
    <h1>Users</h1>
      { loading ? <Loader/> : error ? <Message variant='danger'>
        {error}</Message> : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
              <tbody>
                {user.map(user => (
                    <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td><a href={`mailto:${user.email}`} >{user.email}</a></td>
                    <td>{user.isAdmin ? (
                      <i className='fas fa-check' style={{color:'green'}}></i>):(
                      <i className='fas fa-times' style={{color:'red'}}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/user/${user._id}/edit`}></LinkContainer>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                      <Button variant='danger'  className='btn-sm' onClick={()=>{ deleteHandler(user._id)}}>  
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr> 

                )  
                )}

              
                
              </tbody>
            </thead>
          </Table>
        )}
    </>
  )
}

export default UserListScreen
