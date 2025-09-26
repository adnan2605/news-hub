import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import Value from '../Components/Value'
import Facts from '../Components/Facts'
import Features from '../Components/Features'
import Testimonial from '../Components/Testimonial'
import About from '../Components/About'

export default function FeaturesPage() {
  return (
    <>
          <Breadcrum title='Features'/>
          <Value />
          <Facts />
          <Features />
          <Testimonial />
          <About />
        </>
  )
}
