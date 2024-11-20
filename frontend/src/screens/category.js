import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import axios from 'axios'
import './category.css'
const Categoryscreen = ({ match }) => {
  const keyword = match.params.keyword
  const [pdcollection,setpdcollection]=useState([])
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(()=>{
    axios.get('https://online-supermarket1-1.onrender.com/productcollection')
    .then((res)=>{
      
      setpdcollection(res.data)
    })
    .catch((err)=>console.log(err))
  },[])

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  
  function atta(pds){
   return pds.category === 'Atta & Rice'
  }

  function bakes(pds){
    return pds.category === 'Bakery,Cakes, dairy'
   }

   function Chocolates(pds){
    return pds.category === 'Chocolates & Ice Cream'
   }

   function dals(pds){
    return pds.category === 'Dals & Sugar'
   }

   function eggs(pds){
    return pds.category === 'Eggs,Meat & Fish'
   }

   function grocery(pds){
    return pds.category === 'Grocery'
   }

   function fruirs(pds){
    return pds.category === 'Fruits & Vegitables'
   }
   
   function oil(pds){
    return pds.category === 'Oils & Dry Fruits'
   }


  return (
    <>
      <Meta />
      {/* {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1 className='text-center'>Latest Products</h1> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
           <h1 className='cate' >Atta & Rice</h1>
          <Row>
            {/* {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))} */}
             
                {pdcollection.filter(atta).map((product)=> (
                 
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
              
              ))}

          </Row>
  
          <h1 className='cate'>Bakery,Cakes and dairy</h1>
          <Row>
                        
                {pdcollection.filter(bakes).map((product)=> (
                 
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
              
              ))}

          </Row>

          <h1 className='cate'>Chocolates & Ice Cream</h1>
          <Row>
                        
                {pdcollection.filter(Chocolates).map((product)=> (
                 
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
              
              ))}

          </Row>

          <h1 className='cate'>Dals & Sugar</h1>
          <Row>
                        
                {pdcollection.filter(dals).map((product)=> (
                 
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
              
              ))}

          </Row>

          <h1 className='cate'>Eggs,Meat & Fish</h1>
          <Row>
                        
                {pdcollection.filter(eggs).map((product)=> (
                 
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
              
              ))}

          </Row>

          <h1 className='cate'>Grocery</h1>
          <Row>
                        
                {pdcollection.filter(grocery).map((product)=> (
                 
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
              
              ))}

          </Row>

          <h1 className='cate'>Fruits & Vegitables</h1>
          <Row>
                        
                {pdcollection.filter(fruirs).map((product)=> (
                 
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
              
              ))}

          </Row>

          <h1 className='cate'>Oils & Dry Fruits</h1>
          <Row>
                        
                {pdcollection.filter(oil).map((product)=> (
                 
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
              
              ))}

          </Row>



          {/* <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          /> */}
        </>
      )}
    </>
  )
}

export default Categoryscreen

