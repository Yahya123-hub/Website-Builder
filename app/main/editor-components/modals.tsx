'use client'

import { Badge } from '@/components/ui/badge'
import { EditorElement, useEditor } from '../editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const CarouselAndSliders: React.FC<{ element: EditorElement }> = ({ element }) => {
  const { dispatch, state } = useEditor()
  const [imageCarousels, setImageCarousels] = useState<string[]>([
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg',
  ])
  const [sliderValue, setSliderValue] = useState<number>(50)

  const handleDeleteImage = (index: number) => {
    setImageCarousels((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  const handleDeleteContainer = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <section
      style={{ ...element.styles }}
      className={clsx(
        'relative p-4',
        {
          '!border-blue-500': state.editor.selectedElement.id === element.id,
          '!border-solid': state.editor.selectedElement.id === element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {/* Container Badge and Delete Button */}
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <>
          <Badge className="absolute top-2 left-2 rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
          <div 
            className="absolute top-2 right-2 bg-red-500 px-2.5 py-1 text-xs font-bold rounded-none rounded-t-lg text-white cursor-pointer" 
            onClick={handleDeleteContainer}
          >
            <Trash size={16} />
          </div>
        </>
      )}

      {/* Image Carousel */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Image Carousel</h2>
        <Slider {...carouselSettings}>
          {imageCarousels.map((image, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img src={image} alt={`Carousel image ${index + 1}`} className="w-full h-auto" />
              {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
                <div 
                  className="absolute top-2 right-2 bg-red-500 px-2.5 py-1 text-xs font-bold rounded text-white cursor-pointer" 
                  onClick={() => handleDeleteImage(index)}
                >
                  <Trash size={16} />
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>

      {/* Slider for Adjusting Values */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Adjust Slider Value</h2>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-center mt-2">Slider Value: {sliderValue}</div>
      </div>
    </section>
  )
}

export default CarouselAndSliders
