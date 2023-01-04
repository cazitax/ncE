import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import fireDB from '../fireConfig'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Loader from '../components/Loader';
import { addDoc, collection } from 'firebase/firestore'
const Cartpage = () => {
    const { cartItems } = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()
    const [totalAmount, setTotalAmount] = useState(0)
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [adress, setAdress] = useState('')
    const [pincode, setPincode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let temp = 0
        cartItems.forEach((cartItem) => {
            temp = temp + cartItem.price
        })

        setTotalAmount(temp)
    }, [cartItems]);


    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))

    }, [cartItems]);

    const deleteFromCart = (product) => {
        dispatch({ type: 'DELETE_FROM_CART', payload: product })
    }

    const placeOrder = async () => {
        const adressInfo = {
            name, adress, pincode, phoneNumber
        }
        // console.log(adressInfo)

        const orderInfo = {
            cartItems, adressInfo, email: JSON.parse(localStorage.getItem('currentUser')).user.email,
            userid: JSON.parse(localStorage.getItem('currentUser')).user.uid
        }

        try {
            setLoading(true)
            const result = await addDoc(collection(fireDB, 'orders'), orderInfo)
            toast.success('Order placed successfully')
            setLoading(false)
            handleClose()

        } catch (error) {
            console.log(error)
            toast.error('Order failed')
            setLoading(false)

        }

    }
    return (
        <Layout loading={loading}>
            <table className='table mt-3'>
                <thead>
                    <tr>
                        <th>Product image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => {
                        return <tr>
                            <td><img src={item.imageURL} alt='' height='80' width='80' /></td>

                            <td>{item.name}</td>

                            <td>{item.price}</td>


                            <td><FaTrash onClick={() => { deleteFromCart(item) }} /></td>
                        </tr>
                    })}

                </tbody>
            </table>

            <div className='d-flex justify-content-end'>
                <h1 className='total-amount'> Total:$ {totalAmount} /ars </h1>
            </div>
            <div className='d-flex justify-content-end mt-3'>
                <button onClick={handleShow}>  Place Order</button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add your adress</Modal.Title>
                </Modal.Header>
                <Modal.Body><div className='register-form'>
                    <h2>Register</h2>
                    <hr />
                    <input type='text' className='form-control' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Name' />


                    <textarea type='text' className='form-control' value={adress} row={3} onChange={(e) => { setAdress(e.target.value) }} placeholder='Adress' />


                    <input type='text' className='form-control' value={pincode} onChange={(e) => { setPincode(e.target.value) }} placeholder='Pincode' />

                    <input type='number' className='form-control' value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} placeholder='Tel' />

                </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}>
                        Close
                    </button>
                    <button onClick={placeOrder}>
                        Order
                    </button>
                </Modal.Footer>
            </Modal>
        </Layout>
    );
}

export default Cartpage;
