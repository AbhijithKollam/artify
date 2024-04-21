import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import ArtCard from './ArtCard'
import { Col, Collapse, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { deleteAfterCartApi, getCartAPI } from '../Services/allAPI';
import { cartLengthResponseContext, cartToHeaderResponseContext, deleteCartResponseContext } from '../context/ContextShare';
import * as formik from 'formik';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



function Wishlist({ head, item }) {

  const navigate = useNavigate();
  const { deleteCartResponse, setDeleteCartResponse } = useContext(deleteCartResponseContext)
  const { cartToHeader, setCartToHeader } = useContext(cartToHeaderResponseContext)


  const { cartLength, setCartLength } = useContext(cartLengthResponseContext)

  const [open, setOpen] = useState(false);

  const [cart, setCart] = useState()

  const getCart = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getCartAPI(reqHeader);
      console.log("REsult fot carts------");
      console.log(result.data);
      setCart(result.data);
      console.log(cart);
      setCartLength(result.data)
    }

  }
  useEffect(() => {
    getCart()
    //cartLength
    //cart
  }, [deleteCartResponse, cartToHeader, cart])
  const totalPrice = cart?.reduce((total, item) => total + parseInt(item.price), 0);
  console.log("total price", totalPrice);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { Formik } = formik;

  const [amount, setamount] = useState('');
  const { price, artistName } = item || {}

  const handleBuy = async (e) => {

    handleClose();
    e.preventDefault();
    setamount(price);

    // alert("please enter amount");


    const dummyCardDetails = {
      card_number: '1234123412341234',
      cvv: '123',
      expiry_month: '12',
      expiry_year: '23',
      name: 'Test User'
    };
    var options = {
      key: "rzp_test_onpfABYyqFv9Iw",
      key_secret: "9GeokgmxTDVhZlsyRJxcE8r4",
      amount: totalPrice * 100,
      currency: "INR",
      name: "ARTIFY_GROUPS",
      description: "Puchasing Arts",
      handler: function (response) {
        console.log(response.razorpay_payment_id);
        if (response.razorpay_payment_id) {

          Swal.fire({
            title: 'Done!',
            text: 'Order places Successfully',
            icon: 'success',
            // confirmButtonText: 'Cool'
          })
          
          const handleDeleteAfterCart = async () => {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
              "Content-type": "application/json",
              "Authorization": `Bearer ${token}`
            }
            const result = await deleteAfterCartApi(reqHeader);
            console.log("result after delete===========================================", result);
            if (result.status === 200) {
              // alert("Project deleted successfully")
              setDeleteCartResponse(true)
              // getUserArt();
            }
            else {

            }
          }
          handleDeleteAfterCart();
        }

      },
      prefill: {
        name: "Artify",
        email: "abhijithspatharam05@gmail.com",
        contact: "7025120747"
      },
      notes: {
        address: "Razorpay Corporate office"
      },
      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();





  }



  return (
    <>

      <Header head={head} />
      <div className=' pt-32 flex flex-col md:flex-row h-screen' style={{ backgroundImage: `url(${require('../Assets/bgImage.jpg')})` }}>


        <div className='lg:w-1/4 mb-4 md:mb-0 bg-fixed'>


          <div className='card shadow p-5 mb-5'>
            <div className='d-flex justify-content-between'>
              <p className='text-4xl font-bold inline border-b-4 text-shadow text-shadow-lg border-pink-600 '>Payment</p>
              <button className='btn btn-outline-info' onClick={() => setOpen(!open)}>
                <i class="fa-solid fa-angle-down"></i>
              </button>
            </div>
            <Collapse in={open}>
              <div>

                <div className=''>
                  <div >
                    <p className='text-lg text-zinc-700 font-bold inline border-b-4 text-shadow text-shadow-lg border-pink-600 '>Cart Summary</p>
                    <div>
                      <h1>No. of items : {cart?.length}</h1>
                      {cart?.map((item, index) => (
                        <h1 key={index}>Price of item {index + 1}: {item.price}</h1>
                      ))}
                      <p className='m-3 font-bold'>Total Price: <span className='text-green-600'>{cart?.reduce((total, item) => total + parseInt(item.price), 0)}</span></p>
                    </div>
                  </div>

                  <button className='btn btn-success rounded w-25' onClick={handleShow}>Pay</button>



                  {/* cnclick handleShow is used to open modal */}
                  {/* modal */}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title className='grid grid-cols-2 justify-between'>
                        <p xs={8} className='text-md'>Shipping Address </p>
                        <button xs={4} className='text-end text-sm '> <i class="fa-solid fa-x ms-52 md:ms-56"></i></button>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                      <Formik
                        // validationSchema={schema}
                        onSubmit={console.log}
                        initialValues={{
                          firstName: '',
                          lastName: '',
                          username: '',
                          city: '',
                          state: '',
                          zip: '',
                          file: null,
                          terms: false,
                        }}
                      >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                          <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                              <Form.Group
                                as={Col}
                                md="4"
                                controlId="validationFormik101"
                                className="position-relative"
                              >
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                  type="text"
                                  // name="firstName"
                                  // value={values.firstName}
                                  onChange={handleChange}
                                  isValid={touched.firstName && !errors.firstName}
                                />
                                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                md="4"
                                controlId="validationFormik102"
                                className="position-relative"
                              >
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                  type="text"
                                  // name="lastName"
                                  // value={values.lastName}
                                  onChange={handleChange}
                                  isValid={touched.lastName && !errors.lastName}
                                />

                                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                              </Form.Group>
                              {/* <Form.Group as={Col} md="4" controlId="validationFormikUsername2">
                                <Form.Label>Username</Form.Label>
                                <InputGroup hasValidation>
                                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                  <Form.Control
                                    type="text"
                                    disabled
                                    placeholder=""
                                    aria-describedby="inputGroupPrepend"
                                    name="username"
                                    value={cart.artistName}
                                    onChange={handleChange}
                                    isInvalid={!!errors.username}
                                  />
                                  <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.username}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group> */}
                            </Row>
                            <Row>
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationFormik103"
                                className="position-relative">

                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                  type="text"

                                  // name="city"
                                  // value={values.city}
                                  onChange={handleChange}
                                  isInvalid={!!errors.city}
                                />

                                <Form.Control.Feedback type="invalid" tooltip>
                                  {errors.address}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>
                            <Row>
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationFormik103"
                                className="position-relative">

                                <Form.Label>LandMark</Form.Label>
                                <Form.Control
                                  type="text"

                                  // name="city"
                                  // value={values.city}
                                  onChange={handleChange}
                                  isInvalid={!!errors.city}
                                />

                                <Form.Control.Feedback type="invalid" tooltip>
                                  {errors.address}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>
                            <Row className="mb-3">
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationFormik103"
                                className="position-relative"
                              >
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                  type="text"
                                  // name="city"
                                  // value={values.city}
                                  onChange={handleChange}
                                  isInvalid={!!errors.city}
                                />

                                <Form.Control.Feedback type="invalid" tooltip>
                                  {errors.city}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                md="3"
                                controlId="validationFormik104"
                                className="position-relative"
                              >
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                  type="text"
                                  // name="state"
                                  // value={values.state}
                                  onChange={handleChange}
                                  isInvalid={!!errors.state}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                  {errors.state}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                md="3"
                                controlId="validationFormik105"
                                className="position-relative"
                              >
                                <Form.Label>Zip</Form.Label>
                                <Form.Control
                                  type="text"
                                  // name="zip"
                                  // value={values.zip}
                                  onChange={handleChange}
                                  isInvalid={!!errors.zip}
                                />


                              </Form.Group>
                            </Row>
                            <Row>
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationFormik103"
                                className="position-relative">

                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control
                                  type="text"

                                  // name="city"
                                  // value={values.city}
                                  onChange={handleChange}
                                  isInvalid={!!errors.city}
                                />

                                <Form.Control.Feedback type="invalid" tooltip>
                                  {errors.address}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>

                            <button className='btn btn-primary mt-3' onClick={handleBuy}>
                              Buy
                            </button>
                          </Form>
                        )}
                      </Formik>


                    </Modal.Body>
                    <Modal.Footer>


                    </Modal.Footer>
                  </Modal>




                </div>
              </div>
            </Collapse>
          </div>



        </div>

        <div className='lg:w-3/4 bg-gray-200-8'>
          <div className=''>
            <p className='text-4xl font-bold inline border-b-4 text-shadow text-shadow-lg border-pink-600 ps-5'>Carted Items</p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-evenly gap-3 mt-3 '>

            {
              cart?.length > 0 ?
                cart.map((item) => (
                  < ArtCard items={item} />

                )) :
                <p className='p-5'>No items added in cart</p>

            }

          </div>
        </div>

      </div>






    </>
  )
}

export default Wishlist