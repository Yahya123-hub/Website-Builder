'use client';

import { Badge } from '@/components/ui/badge';
import { EditorBtns } from '../const';
import { EditorElement, useEditor } from '../editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
  element: EditorElement;
};

const MediaComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const [mediaUrl, setMediaUrl] = useState<string>('');
  const [imageWidth, setImageWidth] = useState<string>('100%');
  const [imageHeight, setImageHeight] = useState<string>('auto');
  const styles = props.element.styles;

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData('componentType', type);
  };

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setMediaUrl(convertToEmbedUrl(url));
  };

  const convertToEmbedUrl = (url: string) => {
    // Check if the URL is a YouTube URL and convert it to an embed URL if so
    const youtubeMatch = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // Return the URL as is if it's not a YouTube link
  };

  const isImageUrl = (url: string) => {
    // Check for common image URL patterns and Google's CDN patterns
    return /\.(jpeg|jpg|gif|png|webp|bmp|svg|tiff|ico)$/.test(url) || url.includes('images?q=');
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageWidth(e.target.value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageHeight(e.target.value);
  };

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'media')}
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
            value={mediaUrl}
            onChange={handleUrlChange}
            className="absolute top-0 left-0 w-full p-2 bg-white border border-gray-300 rounded-lg"
            placeholder="Enter media URL"
          />
          {isImageUrl(mediaUrl) && (
            <div className="absolute top-12 left-0 w-full p-2 bg-white border border-gray-300 rounded-lg">
              <label className="mr-2">Width:</label>
              <input
                type="text"
                value={imageWidth}
                onChange={handleWidthChange}
                className="w-16 p-1 mr-4"
              />
            </div>
          )}
          {isImageUrl(mediaUrl) ? (
            <img
              src={mediaUrl}
              alt="Loaded media"
              style={{
                width: imageWidth,
                height: imageHeight,
                objectFit: 'cover',
              }}
            />
          ) : (
            <iframe
              width={styles.width || '560'}
              height={styles.height || '315'}
              src={mediaUrl}
              title="Media player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          )}
        </>
      ) : (
        isImageUrl(mediaUrl) ? (
          <img
            src={mediaUrl}
            alt="Loaded media"
            style={{
              width: imageWidth,
              height: imageHeight,
              objectFit: 'cover',
            }}
          />
        ) : (
          <iframe
            width={styles.width || '560'}
            height={styles.height || '315'}
            src={mediaUrl}
            title="Media player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        )
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
  );
};

export default MediaComponent;
