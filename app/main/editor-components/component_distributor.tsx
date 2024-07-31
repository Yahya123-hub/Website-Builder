import { EditorElement } from '../editor-provider'
import React from 'react'
import TextComponent from './text'
import Container from './container'
import VideoComponent from './vid'
import LinkComponent from './link'
import ContactFormComponent from './contact-form'
import Checkout from './checkout'
import InputComponent from './input'
import HeaderComponent from './header'
import HeroSection from './hero'
import ValuePropositionSection from './value'
import TestimonialComponent from './testimonial'
import FeaturesSection from './features'
import FooterSection from './footer'
import ButtonSection from './Button'



type Props = {
  element: EditorElement
}

const Component_distributor = ({ element }: Props) => {
  switch (element.type) {
    case 'text':
      return <TextComponent element={element} />
    case 'container':
      return <Container element={element} />
    case 'video':
      return <VideoComponent element={element} />
    case 'contactForm':
      return <ContactFormComponent element={element} />
    case 'paymentForm':
      return <Checkout element={element} />
    case '2Col':
      return <Container element={element} />
    case '__body':
      return <Container element={element} />
    case 'link':
      return <LinkComponent element={element} />
    case 'inputfield':
        return <InputComponent element={element} />
    case 'header':
        return <HeaderComponent element={element} />
    case 'hero':
        return <HeroSection element={element} />
    case 'value':
        return <ValuePropositionSection element={element} />
    case 'testimonial':
        return <TestimonialComponent element={element} />
    case 'features':
        return <FeaturesSection element={element} />
    case 'footer':
        return <FooterSection element={element} />
    case 'button':
        return <ButtonSection element={element} />
    default:
      return null
  }
}

export default Component_distributor