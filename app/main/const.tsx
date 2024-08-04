export type EditorBtns =
  | 'text'
  | 'container'
  | 'section'
  | 'contactForm'
  | 'paymentForm'
  | 'link'
  | '2Col'
  | 'video'
  | '__body'
  | 'image'
  | 'hero'
  | 'value'
  | 'testimonial'
  | 'cartoons'
  | 'features'  
  | 'footer'  
  | 'button'  
  | 'buttonset'  
  | 'loading'  
  | 'lasers'  
  | 'graph'  
  | 'navbars'  
  | 'gridsandcards'  
  | 'texthover'  
  | 'tc'  
  | 'sm'  
  | 'steps'  
  | 'search'  
  | 'modals'  
  | 'inputfield'
  | 'greetings'
  | 'header'
  | null
  | '3Col'

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: 'center',
  objectFit: 'cover',
  backgroundRepeat: 'no-repeat',
  textAlign: 'left',
  opacity: '100%',
}