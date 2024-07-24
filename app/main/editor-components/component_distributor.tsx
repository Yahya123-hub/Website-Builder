import { EditorElement } from '../editor-provider'
import React from 'react'
import TextComponent from './text'
import Container from './container'
import VideoComponent from './vid'
import LinkComponent from './link'
import ContactFormComponent from './contact-form'
import Checkout from './checkout'

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
    default:
      return null
  }
}

export default Component_distributor