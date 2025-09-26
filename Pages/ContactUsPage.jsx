import React, { useState } from 'react'
import Breadcrum from '../Components/Breadcrum'
import { Link } from 'react-router-dom'
import FormValidator from '../Validators/FormValidator'
import { useDispatch } from 'react-redux'
import { createContactUs } from '../Redux/ActionCreators/ContactusActionCreators'



export default function ContactUsPage() {
    let [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name field is Mendatory",
        email: "Email field is Mendatory",
        phone: "Phone field is Mendatory",
        subject: "Subject field is Mendatory",
        message: "Message field is Mendatory",
    })


    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")

    let dispatch = useDispatch("")


    function getInputData(e) {
        let { name, value } = e.target

        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidator(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function postData(e) {
        e.preventDefault()
       
        let error=Object.values(errorMessage).find(x=>x!=="")
        if (error){
            setShow(true)
        }
        else{
            dispatch(createContactUs({ ...data, active: true, date: new Date() }))
            setData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            })
        setErrorMessage({
            
                name: "Name field is Mendatory",
                email: "Email field is Mendatory",
                phone: "Phone field is Mendatory",
                subject: "Subject field is Mendatory",
                message: "Message field is Mendatory",
            
        })

            setMessage('Thanks for sharing your Query with Us. Our Team will contact you soon')
        }
    }
    return (
        <>
            <Breadcrum title="Contact Us" />
            <section id="contact" className="contact section">


                <div className="container section-title" data-aos="fade-up">
                    {/* <h2>Contact</h2> */}
                    <p>Contact Us</p>
                </div>

                <div className="container" data-aos="fade-up" data-aos-delay="100">

                    <div className="row gy-4">

                        <div className="col-lg-6">

                            <div className="row gy-4">
                                <div className="col-md-6">
                                    <div className="info-item text-center" data-aos="fade" data-aos-delay="200">
                                        <i className="bi bi-geo-alt"></i>
                                        <h3>Address</h3>
                                        <p>{process.env.REACT_APP_ADDRESS}</p>
                                        <p></p>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item text-center" data-aos="fade" data-aos-delay="300">
                                        <i className="bi bi-telephone"></i>
                                        <h3>Call Us</h3>
                                        <Link to={`${process.env.REACT_APP_PHONE}`} target='_blank' rel='nonreffer'>{process.env.REACT_APP_PHONE}</Link>
                                        {/* <p>{process.env.REACT_APP_PHONE}</p> */}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item text-center" data-aos="fade" data-aos-delay="400">
                                        <i className="bi bi-envelope"></i>
                                        <h3>Email Us</h3>
                                        <Link to={`mailto:${process.env.REACT_APP_EMAIL}`} target='_blank'>{process.env.REACT_APP_EMAIL}</Link>

                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item text-center" data-aos="fade" data-aos-delay="500">
                                        <i className="bi bi-clock"></i>
                                        <h3>Whatsapp</h3>
                                        <Link to={`https://wa.me/${process.env.REACT_APP_WHATSAPP}`} target='_blank'>{process.env.REACT_APP_WHATSAPP}</Link>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-6">
                            <div className="info-item">
                                <p className='text-center mb-3 '>{message?message:'Do you have any Query? Please Write to Us'}</p>
                                <form onSubmit={postData} data-aos="fade-up" data-aos-delay="200">
                                    <div className="row gy-4">

                                        <div className="col-md-12">
                                            <input type="text" name="name" onChange={getInputData} value={data.name} className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`} placeholder="Your Name" />
                                            {show && errorMessage.name ? <p>{errorMessage.name}</p> : null}
                                        </div>

                                        <div className="col-md-6 ">
                                            <input type="email" className={`form-control ${show && errorMessage.email ? 'border-danger' : ''}`} value={data.email} onChange={getInputData} name="email" placeholder="Your Email" />
                                            {show && errorMessage.email ? <p>{errorMessage.email}</p> : null}
                                        </div>
                                        <div className="col-md-6 ">
                                            <input type="text" className={`form-control ${show && errorMessage.phone ? 'border-danger' : ''}`} value={data.phone} onChange={getInputData} name="phone" placeholder="Phone Number" />
                                            {show && errorMessage.phone ? <p>{errorMessage.phone}</p> : null}
                                        </div>

                                        <div className="col-12">
                                            <input type="text" className={`form-control ${show && errorMessage.subject ? 'border-danger' : ''}`} value={data.subject} onChange={getInputData} name="subject" placeholder="Subject" />
                                            {show && errorMessage.subject ? <p>{errorMessage.subject}</p> : null}
                                        </div>

                                        <div className="col-12">
                                            <textarea className={`form-control ${show && errorMessage.message ? 'border-danger' : ''}`} value={data.message} name="message" onChange={getInputData} rows="5" placeholder="Message" ></textarea>
                                            {show && errorMessage.message ? <p>{errorMessage.message}</p> : null}
                                        </div>

                                        <div className="col-12 text-center">


                                            <button type="submit" className='btn btn-primary'>Send Message</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="w-100 mt-5">
                    <iframe width='100%' height={300} src="https://maps.google.com/maps?q=A-43, Sector 16, Noida, 201301, India&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                </div>
            </section>
        </>
    )
}
