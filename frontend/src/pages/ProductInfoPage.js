import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

import { doc, getDoc } from "firebase/firestore";
import fireDB from '../fireConfig'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Productinfopage = () => {
    const [product, setProduct] = useState([])
    const params = useParams()
    const {cartItems} = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        getData()

    }, [])
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    
    }, [cartItems]);
    async function getData() {
        try {
            setLoading(true)
            const productTemp = await getDoc(doc(fireDB, "products", params.productid))

            // .data() method to get info from firebase 
            setProduct(productTemp.data())
            setLoading(false)
        } catch (error) {
            console.log(error);
       
            setLoading(false)
        }


    }
    const addToCar = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product })
    } 
    return (
        <Layout loading={loading}>
            <div className='container'>
             <div className='row justify-content-center'>
                <div className='col-md-8'>
                {
                    product && (<div>

                        <p> <b>{product.name} </b></p>
                        <img src={product.imageURL} className='product-info-imgs' />

                        <hr />
                        <p>{product.description}</p>

                        <div className='d-flex my-3 justify-content-end'>
                            <button onClick={()=>addToCar(product)}> Add to Cart</button>
                        </div>
                    </div>)
                }


                </div>

             </div>

            </div>


        </Layout>
    );
}

export default Productinfopage;
