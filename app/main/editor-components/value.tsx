'use client'

import { Badge } from '@/components/ui/badge'
import { EditorElement, useEditor } from '../editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React from 'react'

type Props = {
  element: EditorElement
}

const ValuePropositionSection = (props: Props) => {
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

  const handleUpdateContent = (field: 'title' | 'description' | 'value1' | 'value2' | 'value3' | 'value4' | `${'value1' | 'value2' | 'value3' | 'value4'}Description`, e: React.FocusEvent<HTMLDivElement>) => {
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

      <h2
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('title', e)}
        className="text-3xl font-semibold mb-4"
      >
        {!Array.isArray(props.element.content) && props.element.content.title || 'Your Value Proposition Title'}
      </h2>
      <p
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('description', e)}
        className="text-lg mb-8"
      >
        {!Array.isArray(props.element.content) && props.element.content.description || 'A compelling description of the value you offer to your customers.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {['value1', 'value2', 'value3', 'value4'].map((valueKey, index) => (
          <div key={index} className="p-6 border rounded-lg bg-white shadow-md">
            <h3
              contentEditable={!state.editor.liveMode}
              onBlur={(e) => handleUpdateContent(valueKey as 'value1' | 'value2' | 'value3' | 'value4', e)}
              className="text-xl font-semibold mb-2"
            >
              {!Array.isArray(props.element.content) && props.element.content[valueKey] || `Core Value ${index + 1}`}
            </h3>
            <p
              contentEditable={!state.editor.liveMode}
              onBlur={(e) => handleUpdateContent(`${valueKey}Description` as `${'value1' | 'value2' | 'value3' | 'value4'}Description`, e)}
              className="text-gray-600"
            >
              {!Array.isArray(props.element.content) && props.element.content[`${valueKey}Description`] || 'Description of core value.'}
            </p>
          </div>
        ))}
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

export default ValuePropositionSection
