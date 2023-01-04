import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from '../fireConfig'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Homepage = () => {

    const [products, setProducts] = useState([])
    const {cartItems} = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
const [searchKey, setSearchKey] = useState('')
const[filterType, setFilterType] = useState('')
    useEffect(() => {
        getData()

    }, [])
    async function getData() {
   
        try {
            setLoading(true)
            const users = await getDocs(collection(fireDB, "products"))
            const productsArray = []
            users.forEach((doc) => {

                const obj = {
                    id: doc.id,
                    ...doc.data()
                }
                productsArray.push(obj)


            });

            setProducts(productsArray)
            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)

        }


    }
// to not lose data from cart 
useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))

}, [cartItems]);

    const addToCar = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product })
    } 
    return (
        <Layout loading={loading}>
            <div className='container'>
                <div className='d-flex w-50 align-items-center my-3 justify-content-center'>
                    <input type='text' value={searchKey} onChange={(e)=>{setSearchKey(e.target.value);}} className='form-control mx-2' placeholder='Search items'/>
                    <select   onChange={(e)=>{setFilterType(e.target.value)}} value={filterType} className='form-control mt-3'>
                        <option value=''>All</option>
                        <option value='electronics'>Electronics</option>
                        <option value='mobile'>Mobile</option>
                    </select>
                </div>
                <div className='row'>

                    {products.filter((obj)=>obj.name.toLowerCase().includes(searchKey))
                    .filter((obj)=> obj.category.toLowerCase().includes(filterType))
                    .map((products) => {
                        return <div className='col-md-4'>
                            <div className='m-2 p-1 product position-relative'>
                                <div className='product-content'>
                                    <p>{products.name}</p>
                                    <div className='text-center'>
                                        <img className='product-img' src={products.imageURL} alt='' />
                                    </div>
                                </div>
                                <div className='product-actions'>
                                    <h2>{products.price} Ars/-</h2>
                                    <div className='d-flex'>
                                        <button className='mx-2' onClick={() => addToCar(products)}> Add to Cart </button>

                                        <button onClick={() => {
                                            navigate(`/productinf/${products.id}`)
                                        }}> View</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    })
                    }

                </div>
            </div>
        </Layout>
    );
}

export default Homepage;
