import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';


export default function ProductsSlider({ title, data }) {
    let [showPerPage, setShowPerPage] = useState(4)

    function handleWindowResize() {
        if (window.innerWidth < 576)
            setShowPerPage(1)
        else if (window.innerWidth < 798)
            setShowPerPage(2)
        else if (window.innerWidth < 1200)
            setShowPerPage(3)
        else
            setShowPerPage(4)

    }
    window.addEventListener("resize", handleWindowResize)

    return (
        <>
            <section id="team" className="team section">
                <div className="container section-title" data-aos="fade-up">
                    <h2>{title}</h2>
                    <p>Checkout our latest {title} Products</p>
                </div>
                <div className="container">
                    <div className=" gy-4">
                        <Swiper
                            slidesPerView={showPerPage}
                            spaceBetween={30}
                            freeMode={true}
                            loop={true}
                            pagination={false}
                            modules={[FreeMode, Pagination]}
                            className="mySwiper"
                        >
                            {
                                data.map((item) => {
                                    return <SwiperSlide key={item.id}>
                                        <div className=" d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                                            <div className="team-member">
                                                <div className="member-img">
                                                    <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic[0]}`} style={{ height: 300,width: "100%" }} className="w-100" alt="" /> 
                                                </div>
                                                <div className="member-info">
                                                    <h4 style={{height:50}}>{item.name}</h4>
                                                    <span>{item.stock ? `${item.stockQuantity} left in stock` : `Out Of Stock`}</span>
                                                    <p><del>&#8377;{item.basePrice}</del>  &#8377;{item.finalPrice} <sup>{item.discount}% off</sup></p>
                                                    <div className="">
                                                        <Link to={`/product/${item.id}`} className='btn btn-primary text-light w-75 btn-color'><i className="fa fa-shopping-cart"> Add to Cart</i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                })
                            }



                        </Swiper>

                    </div>
                </div>

            </section>
        </>
    )
}
