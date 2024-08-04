'use client'

import { Badge } from '@/components/ui/badge'
import { EditorBtns } from '../const'
import { EditorElement, useEditor } from '../editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

type Props = {
  element: EditorElement
}

const VideoComponent = (props: Props) => {
  const { dispatch, state } = useEditor()
  const [url, setUrl] = useState<string>('')
  const [isVideo, setIsVideo] = useState<boolean>(true)
  const [isValidUrl, setIsValidUrl] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const styles = props.element.styles

  useEffect(() => {
    if (!url) {
      setImageUrl(null)
      return
    }

    // Check if the URL is a valid image URL
    if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
      setIsVideo(false)
      setIsValidUrl(true)
      setImageUrl(url)
    } else if (url.includes('youtube.com/watch') || url.includes('youtu.be')) {
      setIsVideo(true)
      setIsValidUrl(convertToEmbedUrl(url) !== '')
    } else {
      setIsVideo(false)
      setIsValidUrl(false)
      setImageUrl(null)
    }
  }, [url])

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
    setUrl(e.target.value)
  }

  const convertToEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    if (videoIdMatch) {
      const videoId = videoIdMatch[1]
      return `https://www.youtube.com/embed/${videoId}`
    }
    return ''
  }

  const renderContent = () => {
    if (!isValidUrl) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <span className="text-gray-600">Invalid URL</span>
        </div>
      )
    }

    if (isVideo) {
      return (
        <iframe
          width={styles.width || '560'}
          height={styles.height || '315'}
          src={convertToEmbedUrl(url)}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full h-full"
        />
      )
    }

    return (
      <Image
        src={imageUrl || ''}
        alt="Image"
        width={ 560}
        height={315}
        className="object-cover"
        unoptimized={true}  // Optional: Use if needed
      />
    )
  }

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'video')}
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
            value={url}
            onChange={handleUrlChange}
            className="absolute top-0 left-0 w-full p-2 bg-white border border-gray-300 rounded-lg"
            placeholder="Enter video or image URL"
          />
          {renderContent()}
        </>
      ) : (
        renderContent()
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

export default VideoComponent
