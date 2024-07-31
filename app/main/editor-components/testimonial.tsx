import { Badge } from '@/components/ui/badge'
import { EditorElement, useEditor } from '../editor-provider'
import clsx from 'clsx'
import { Trash, User } from 'lucide-react'
import React from 'react'
import Image from 'next/image'


type Props = {
  element: EditorElement
}

const TestimonialComponent = (props: Props) => {
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

  const handleUpdateContent = (field: 'quote' | 'author', e: React.FocusEvent<HTMLDivElement>) => {
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
        'p-6 w-full flex flex-col items-center text-gray-800 relative',
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

      <div className="flex items-center mb-4">
        <Image
          src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Generic User"
          className="w-16 h-16 rounded-full border-2 border-gray-300"
          width={64} 
          height={64} 
        />
        <div className="ml-4">
          <p
            contentEditable={!state.editor.liveMode}
            onBlur={(e) => handleUpdateContent('quote', e)}
            className="text-lg italic"
          >
            {!Array.isArray(props.element.content) && props.element.content.quote || 'This is a fantastic service!'}
          </p>
          <p
            contentEditable={!state.editor.liveMode}
            onBlur={(e) => handleUpdateContent('author', e)}
            className="text-md font-semibold mt-2"
          >
            {!Array.isArray(props.element.content) && props.element.content.author || 'John Doe'}
          </p>
        </div>
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

export default TestimonialComponent
