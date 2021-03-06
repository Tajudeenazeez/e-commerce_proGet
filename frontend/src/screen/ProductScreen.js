import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector}  from 'react-redux'
import {Row, Form, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import  Loader  from "../components/Loader";
import  Message  from "../components/Message";
import { listProductDetails, productCreateReviewAction } from '../action/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
   const dispatch = useDispatch()
   const [qty, setQty] = useState(1)
   const [rating, setRating] = useState(0)
   const [comment, setComment] = useState('')

   const productDetails = useSelector(state => state.productDetails)
   const { loading, error, product } = productDetails
  
   const productCreateReview = useSelector(state => state.productCreateReview)
   const { success:successCreateReview, error:errorCreateReview } = productCreateReview
  
   const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  //eslint-disable-next-line
  useEffect(() => {
    if(successCreateReview){
      alert('Reviewed Submitted!')
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
      
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch,match, successCreateReview, userInfo])

  const addToCartHandler = () => {
  history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(productCreateReviewAction(match.params.id,{
      rating,
      comment
    }))
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
        {loading ? <Loader/> : 
        error ? <Message variant = 'danger'>{error}</Message> : (
      <>    
    <Row>
      <Col md = {5}>
        <Image src={product.image} alt={product.image} fluid />
      </Col>
      <Col md={5}>
        <ListGroup variant='flush'>
          <ListGroup.Item><h2>{product.name}</h2> </ListGroup.Item>
          <ListGroup.Item>
            <Rating 
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
        </ListGroup.Item>
        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
        <ListGroup.Item>Decription:{product.description}</ListGroup.Item>
      </ListGroup>
    </Col>
    <Col md={3}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
          <Row>
            <Col>
              Price:
            </Col>
            <Col>
              <strong>${product.price}</strong>
            </Col>
          </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>
              Status:
              </Col>
              <Col>
              {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
              </Col>
            </Row>
          </ListGroup.Item>

          {product.countInStock > 0 && (
            <ListGroup.Item>
              <Row>
                <Col>Qty</Col>
                <Col>
                <Form.Control 
                as='select' 
                value={qty} 
                onChange ={(e) => setQty(e.target.value)}
                > 
                  {
                  [...Array(product.countInStock).keys()].map((x) => ( 
                    <option key={x + 1} value={x + 1}>
                    {x + 1}
                    </option>
                  )) 
                  }

                </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
          ) }
          <ListGroup.Item>
            <Button
            onClick={addToCartHandler}
            className='btn-block' type='button' 
            disabled={product.countInStock === 0 }  >
              ADD TO CART
              </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>

    </Col>
    </Row>
    
    {/* <Row>
      <Col>
      <h2>Reviews</h2>
      {product.reviews.length === 0 && <Message>No review</Message>}
      <ListGroup variant='flush'>
        {product.reviews.map(review => (
          <ListGroup.Item key={review._id}>
            <strong>{review.name}</strong>
            <Rating value={review.rating} />
            <p>{review.createAt.substring(0, 10)}</p>
            <p>{review.comment}</p>
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <h2>Write a Review</h2>
          {errorCreateReview && <Message variant='danger'>{errorCreateReview}</Message>}
          {userInfo ? (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='rating'>
              <Form.Label>Rating</Form.Label>
              <Form.Control
              as='select'
              value={rating}
              onChange={(e) => setRating(e.target.value)}>
                <option value=''>...Select</option>
                <option value='1'>1 - Poor</option>
                <option value='2'>2 - Fair</option>
                <option value='3'>3 - Good</option>
                <option value='4'>4 - Very Good</option>
                <option value='5'>5 - Excellent</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='comment'>
              <Form.Label>Comment</Form.Label>
              <Form.Control 
              as='textarea'
              row='3'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              ></Form.Control>
            </Form.Group> 
            <Button type='submit' variant='primary'>Submit</Button>

          </Form>): (
            <Message>
              Please <Link to='/login'>Sign in</Link> to write a review {''}
              
            </Message>
          ) }
        </ListGroup.Item>

      </ListGroup>
      
      </Col>
    </Row> */}
    </>
    )}
    </>

)}
    

export default ProductScreen
