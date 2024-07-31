import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { EditorBtns } from '../const'
import React from 'react'
import TextPlaceholder from './text-placeholder'
import ContainerPlaceholder from './container-placeholder'
import VideoPlaceholder from './video-placeholder'
import TwoColumnsPlaceholder from './two-columns-placeholder'
import LinkPlaceholder from './link-placeholder'
import ContactFormComponentPlaceholder from './contact-form-placeholder'
import CheckoutPlaceholder from './checkout-placeholder'
import InputPlaceholder from './input-field-placeholder'
import HeaderPlaceholder from './header-section-placeholder'
import HeroPlaceholder from './hero-section-placeholder'
import ValPlaceholder from './value-section-placeholder'
import TestPlaceholder from './testimonial-section-placeholder'
import FeaturePlaceholder from './feature-section-placeholder'
import FooterPlaceholder from './footer-section-placeholder'
import ButtonPlaceholder from './button-placeholder'




type Props = {}

const ComponentsTab = (props: Props) => {
  const elements: {
    Component: React.ReactNode
    label: string
    id: EditorBtns
    group: 'layout' | 'Basic elements' | 'landing page elements'
  }[] = [
    {
      Component: <TextPlaceholder />,
      label: 'Text',
      id: 'text',
      group: 'Basic elements',
    },
    {
      Component: <HeaderPlaceholder />,
      label: 'Header',
      id: 'header',
      group: 'landing page elements',
    },
    {
      Component: <HeroPlaceholder />,
      label: 'Hero',
      id: 'hero',
      group: 'landing page elements',
    },
    {
      Component: <ValPlaceholder />,
      label: 'Value',
      id: 'value',
      group: 'landing page elements',
    },
    {
      Component: <FeaturePlaceholder />,
      label: 'Features',
      id: 'features',
      group: 'landing page elements',
    },
    {
      Component: <FooterPlaceholder />,
      label: 'Footer',
      id: 'footer',
      group: 'landing page elements',
    },
    {
      Component: <TestPlaceholder />,
      label: 'Testimonials',
      id: 'testimonial',
      group: 'landing page elements',
    },
    {
      Component: <InputPlaceholder />,
      label: 'Input',
      id: 'inputfield',
      group: 'Basic elements',
    },
    {
      Component: <ButtonPlaceholder />,
      label: 'Button',
      id: 'button',
      group: 'Basic elements',
    },
    {
      Component: <ContainerPlaceholder />,
      label: 'Container',
      id: 'container',
      group: 'layout',
    },
    {
      Component: <TwoColumnsPlaceholder />,
      label: '2 Columns',
      id: '2Col',
      group: 'layout',
    },
    {
      Component: <VideoPlaceholder />,
      label: 'Video',
      id: 'video',
      group: 'Basic elements',
    },
    {
      Component: <ContactFormComponentPlaceholder />,
      label: 'Contact',
      id: 'contactForm',
      group: 'Basic elements',
    },
    {
      Component: <CheckoutPlaceholder />,
      label: 'Checkout',
      id: 'paymentForm',
      group: 'Basic elements',
    },
    {
      Component: <LinkPlaceholder />,
      label: 'Link',
      id: 'link',
      group: 'Basic elements',
    },
  ]

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['Layout', 'Elements','Pre Made Website Templates']}
    >
      <AccordionItem
        value="Layout"
        className="px-6 py-0 border-y-[1px]"
      >
        <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === 'layout')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>


      <AccordionItem
        value="Elements"
        className="px-6 py-0 "
      >
        <AccordionTrigger className="!no-underline">Basic Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === 'Basic elements')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="Website Structures"
        className="px-6 py-0 "
      >
        <AccordionTrigger className="!no-underline">Landing Page Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === 'landing page elements')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>


    </Accordion>
  )
}

export default ComponentsTab