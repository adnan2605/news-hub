import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { getTestimonial } from '../Redux/ActionCreators/TestimonialActionCreators'

export default function Testimonial() {
    let [showPerPage, setShowPerPage] = useState(3)
    let TestimonialStateData = useSelector((state) => state.TestimonialStateData)
    let dispatch = useDispatch()
    let option = {
        effect: 'coverflow',
        grabCursor: true,
        slidesPerView: showPerPage,
        spaceBetween: 50,
        freeMode: true,
        loop: true,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: true,
        modules: [EffectCoverflow, Pagination],
        className: "mySwiper"
    }



    function handleWindowResize() {
        if (window.innerWidth < 768)
            setShowPerPage(1)

        else
            setShowPerPage(3)

    }
    window.addEventListener("resize", handleWindowResize)
    useEffect(() => {
        dispatch(getTestimonial())
    }, [TestimonialStateData.length])
    return (
        <>
            <section id="testimonials" className="testimonials section">
                <div className="container section-title" data-aos="fade-up">
                    <h2>Testimonials</h2>
                    <p>What they are saying about us<br /></p>
                </div>
                <div className="container" data-aos="fade-up" data-aos-delay="100">

                    <Swiper {...option} >
                        {
                            TestimonialStateData.filter(x => x.active).map((item,index) => {
                                return <SwiperSlide key={index}>
                                    <div className="testimonial-item">
                                        <div className="stars">
                                            <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                        </div>
                                        <p className='slider-message'>
                                            {item.message}
                                        </p>
                                        <div className="profile mt-auto">
                                            <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`} className="testimonial-img" alt="" />
                                            <h3>{`${item.name}`}</h3>
                                            <h4>Ceo &amp; Founder</h4>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>


            </section>
        </>
    )
}
