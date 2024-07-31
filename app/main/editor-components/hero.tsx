'use client'

import { Badge } from '@/components/ui/badge'
import { EditorElement, useEditor } from '../editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React from 'react'

type Props = {
  element: EditorElement
}

const HeroSection = (props: Props) => {
  const { dispatch, state } = useEditor()

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    })
  }

  const handleUpdateContent = (field: 'heading' | 'subheading', e: React.FocusEvent<HTMLDivElement>) => {
    const divElement = e.target as HTMLDivElement
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...props.element,
          content: {
            ...props.element.content,
            [field]: divElement.innerText,
          },
        },
      },
    })
  }

  const styles = props.element.styles

  return (
    <section
      style={styles}
      className={clsx(
        'flex flex-col items-center justify-center text-center py-16 relative',
        {
          '!border-blue-500': state.editor.selectedElement.id === props.element.id,
          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-4 left-1 rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <h1
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('heading', e)}
        className="text-4xl font-bold mb-4"
      >
        {!Array.isArray(props.element.content) && props.element.content.heading || 'Your Main Heading Here'}
      </h1>
      <p
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('subheading', e)}
        className="text-xl mb-8"
      >
        {!Array.isArray(props.element.content) && props.element.content.subheading || 'Your compelling subheading goes here.'}
      </p>
      <div className="flex gap-6">
        <a href="#learn-more" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark">Learn More</a>
        <a href="#learn-more" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark">Get In Touch</a>

      </div>

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-red-500 px-2.5 py-1 text-xs font-bold -top-4 -right-4 rounded-none rounded-t-lg text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </section>
  )
}

export default HeroSection
