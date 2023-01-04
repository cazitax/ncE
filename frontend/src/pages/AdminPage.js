import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { collection, addDoc, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import fireDB from '../fireConfig'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import Orderadminpage from './OrderadminPage';
import { toast } from 'react-toastify';
const Adminpage = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({
        price: 0,
        description: "",
        name: "",
        category: "",
        imageURL: ""
    })

    const [add, setAdd] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const deleteProduct = async (item) => {
        try {
            setLoading(true)
            await deleteDoc(doc(fireDB, 'products', item.id))
            toast.success('Product deleted successfully')
            setLoading(false)
            getData()
        } catch (error) {
            console.log(error)
            toast.error('Product deleted failed')
            setLoading(false)

        }
    }

    const updateProduct = async () => {
        try {
            setLoading(true)
            await setDoc(doc(fireDB, "products", product.id), product)

            handleClose()
            toast.success('Product updated successfully')
            setLoading(false)

            window.location.reload()
        } catch (error) {
            console.log(error)
            setLoading(false)

            toast.error('Product updated failed')
        }
    }


    const addProduct = async () => {
        try {
            setLoading(true)
            await addDoc(collection(fireDB, "products"), product)
            handleClose()
            toast.success('Product added successfully')
            setLoading(false)
            window.location.reload()
        } catch (error) {
            console.log(error)
            setLoading(false)

            toast.error('Product added failed')
        }
    }
    const editHandler = (item) => {
        setProduct(item);
        setShow(true)
    }
    const addHandler = () => {
        setAdd(true)
        handleShow()

    }
    return (
        <Layout loading={loading}>
        <Tabs defaultActiveKey="Products" id="uncontrolled-tab-example" className="mb-3">
<Tab eventKey="Products" title="Products">
<div className='d-flex justify-content-between'>
                        <h4>Product list</h4>
                        <button onClick={addHandler}>Add product</button>
                    </div>
                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Product image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(item => {
                                return <tr>
                                    <td><img src={item.imageURL} alt='' height='80' width='80' /></td>

                                    <td>{item.name}</td>

                                    <td>{item.price}</td>
                                    <td>{item.category}</td>

                                    <td><FaTrash color='red' onClick={() => deleteProduct(item)} size={20} />
                                        <FaEdit
                                            onClick={() => editHandler(item)}
                                            color='blue'
                                            size={20}
                                        /></td>

                                </tr>
                            })}

                        </tbody>
                    </table>


    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{add ? 'Add a Product' : 'Edit Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {" "}
            <div className='register-form'>

                <input type='text' className='form-control' value={product.name} onChange={(e) => { setProduct({ ...product, name: e.target.value }) }} placeholder='Name' />

                <input type='text' className='form-control' value={product.imageURL} onChange={(e) => { setProduct({ ...product, imageURL: e.target.value }) }} placeholder='ImageURL' />


                <input type='number' className='form-control' value={product.price} onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) })} placeholder='Price' />
                <input type='text' className='form-control' value={product.category} onChange={(e) => { setProduct({ ...product, category: e.target.value }) }} placeholder='Category' />

            </div>
        </Modal.Body>
        <Modal.Footer>
            <button>
                Close
            </button>
            {add ? (<button onClick={addProduct}> Save</button>) : (<button onClick={updateProduct}>Save</button>)}
        </Modal.Footer>
    </Modal>

</Tab>
<Tab eventKey="Orders" title="Orders">
            <Orderadminpage/>

</Tab>
<Tab eventKey="Users" title="Users" disabled>
    {/* <Sonnet /> */}
</Tab>
</Tabs>


           

        </Layout>
    );
}

export default Adminpage;
