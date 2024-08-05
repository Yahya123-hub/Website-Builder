'use client'

import { Badge } from '@/components/ui/badge'
import { EditorBtns } from '../const'
import { EditorElement, useEditor } from '../editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'

type Props = {
  element: EditorElement
}

const ImageComponent = (props: Props) => {
  const { dispatch, state } = useEditor()
  const [imageUrl, setImageUrl] = useState<string>('')
  const styles = props.element.styles

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    })
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setImageUrl(url)
  }

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'image')}
      onClick={handleOnClick}
      className={clsx(
        'p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center',
        {
          '!border-blue-500': state.editor.selectedElement.id === props.element.id,
          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
          {state.editor.selectedElement.name}
        </Badge>
      )}

      {!state.editor.liveMode ? (
        <>
          <input
            type="text"
            value={imageUrl}
            onChange={handleUrlChange}
            className="absolute top-0 left-0 w-full p-2 bg-white border border-gray-300 rounded-lg"
            placeholder="Enter image URL"
          />
          {imageUrl && (
            <div style={{ position: 'relative', width: styles.width || '100%', height: styles.height || 'auto' }}>
              <Image
                src={imageUrl}
                alt="Loaded"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
        </>
      ) : (
        <div style={{ position: 'relative', width: styles.width || '100%', height: styles.height || 'auto' }}>
          <Image
            src={imageUrl}
            alt="Loaded"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}

      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
        <div
          className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white"
        >
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={handleDeleteElement}
          />
        </div>
      )}
    </div>
  )
}

export default ImageComponent
