'use client'

import { Badge } from '@/components/ui/badge'
import { EditorElement, useEditor } from '../editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import styles from './AnimationSet.module.css'

type Props = {
  element: EditorElement
}

const AnimationSet = (props: Props) => {
  const { dispatch, state } = useEditor()
  const [animations, setAnimations] = useState([
    'bouncyBall',
    'spinningSquare',
    'floatingCircle',
    'pulsingDot',
    'bouncingHeart',
    'spinningPlanet',
    'waveEffect',
    'flashingRectangle',
    'swingingPendulum',
    'pulsingSquare',
    'rollingDice',
    'zoomingCircle',
    'rotatingArrow',
  ])

  const handleDeleteAnimation = (index: number) => {
    const updatedAnimations = animations.filter((_, i) => i !== index)
    setAnimations(updatedAnimations)
  }

  const handleDeleteContainer = () => {
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

  const renderAnimation = (type: string) => {
    switch(type) {
      case 'bouncyBall':
        return (
          <div className="relative w-24 h-24">
            <div className="absolute w-24 h-24 bg-blue-500 rounded-full animate-bounce" style={{ animationDuration: '0.6s', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}></div>
          </div>
        )
      case 'spinningSquare':
        return (
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 border-t-4 border-transparent rounded-md animate-spin" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}></div>
        )
      case 'floatingCircle':
        return (
          <div className="relative w-24 h-24">
            <div className="absolute w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}></div>
          </div>
        )
      case 'pulsingDot':
        return (
          <div className="relative w-24 h-24">
            <div className="absolute w-8 h-8 bg-red-500 rounded-full animate-ping" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}></div>
          </div>
        )
      case 'bouncingHeart':
        return (
          <div className="relative w-24 h-24">
            <div className="absolute w-24 h-24 bg-pink-500 rounded-full clip-heart animate-bounce" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}></div>
          </div>
        )
      case 'spinningPlanet':
        return (
          <div className="relative w-24 h-24">
            <div className="absolute w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-spin"></div>
            <div className="absolute w-24 h-24 border-4 border-gray-300 rounded-full animate-spin" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}></div>
          </div>
        )
      case 'waveEffect':
        return (
          <div className="relative w-24 h-24">
            <div className={`absolute w-full h-full bg-teal-500 ${styles.animateWave}`}></div>
          </div>
        )
      case 'flashingRectangle':
        return (
          <div className="relative w-24 h-24">
            <div className={`absolute w-full h-full bg-gradient-to-r from-blue-500 to-teal-500 ${styles.animateFlash}`}></div>
          </div>
        )
      case 'swingingPendulum':
        return (
          <div className="relative w-24 h-24">
            <div className={`absolute w-2 h-24 bg-gray-600 rotate-45 ${styles.animateSwing}`} style={{ animationDuration: '1s', transformOrigin: 'center bottom' }}></div>
          </div>
        )
      case 'rollingDice':
        return (
          <div className="relative w-24 h-24">
            <div className={`absolute w-24 h-24 bg-white border-4 border-gray-800 rounded-md ${styles.animateRoll}`} style={{ animationDuration: '1s' }}></div>
          </div>
        )
      case 'zoomingCircle':
        return (
          <div className="relative w-24 h-24">
            <div className={`absolute w-24 h-24 bg-orange-500 rounded-full ${styles.animateScale}`} style={{ animationDuration: '1s' }}></div>
          </div>
        )
      case 'rotatingArrow':
        return (
          <div className="relative w-24 h-24">
            <div className={`absolute w-0 h-0 border-l-12 border-r-12 border-b-24 border-b-red-500 border-l-transparent border-r-transparent rotate-45 ${styles.animateSpin}`} style={{ animationDuration: '1s' }}></div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section
      style={props.element.styles}
      className={clsx(
        'flex flex-col items-center justify-center text-center py-16 relative gap-4',
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
          <>
            <Badge className="absolute -top-4 left-1 rounded-none rounded-t-lg">
              {state.editor.selectedElement.name}
            </Badge>
            <div className="absolute bg-red-500 px-2.5 py-1 text-xs font-bold -top-4 -right-4 rounded-none rounded-t-lg text-white cursor-pointer" onClick={handleDeleteContainer}>
              <Trash size={16} />
            </div>
          </>
        )}

      {animations.map((animation, index) => (
        <div key={index} className="relative">
          {renderAnimation(animation)}
          {state.editor.selectedElement.id === props.element.id &&
            !state.editor.liveMode && (
              <div className="absolute bg-red-500 px-2.5 py-1 text-xs font-bold -top-4 -right-4 rounded-none rounded-t-lg text-white cursor-pointer" onClick={() => handleDeleteAnimation(index)}>
                <Trash size={16} />
              </div>
            )}
        </div>
      ))}
    </section>
  )
}

export default AnimationSet
