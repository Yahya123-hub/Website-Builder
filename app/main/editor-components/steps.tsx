'use client'

import { Badge } from '@/components/ui/badge'
import { EditorElement, useEditor } from '../editor-provider'
import clsx from 'clsx'
import React, { useState } from 'react'
import { Trash } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const StepsSection: React.FC<{ element: EditorElement }> = ({ element }) => {
  const { dispatch, state } = useEditor()
  const [steps, setSteps] = useState<{ title: string; description: string }[]>([
    { title: 'Step 1', description: 'Description for Step 1' },
    { title: 'Step 2', description: 'Description for Step 2' },
    { title: 'Step 3', description: 'Description for Step 3' },
  ])
  const [StepHeading, setStepHeading] = useState('Steps')


  const handleStepChange = (index: number, field: 'title' | 'description', value: string) => {
    setSteps((prev) =>
      prev.map((step, i) =>
        i === index
          ? { ...step, [field]: value }
          : step
      )
    )
  }

  const handleDeleteStep = (index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index))
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

  return (
    <section
      style={{ ...element.styles }}
      className={clsx(
        'relative p-4 rounded-lg shadow-md transition-all',
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
            className="absolute top-2 right-2 bg-red-500 px-2.5 py-1 text-xs font-bold rounded-none rounded-t-lg text-white cursor-pointer transition-transform transform hover:scale-110" 
            onClick={handleDeleteContainer}
          >
            <Trash size={16} />
          </div>
        </>
      )}

      {/* Steps */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          <input
            type="text"
            value={StepHeading}
            onChange={(e) => setStepHeading(e.target.value)}
            className="bg-transparent border-none outline-none text-2xl font-bold mb-4"
            readOnly={state.editor.liveMode}
          />
        </h2>
        <AnimatePresence>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative border-b border-gray-300 mb-4 pb-4 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <input
                type="text"
                value={step.title}
                onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                className="bg-transparent border-none outline-none text-xl font-semibold mb-2 transition-colors hover:border-blue-500 focus:border-blue-500"
                readOnly={state.editor.liveMode}
              />
              <textarea
                value={step.description}
                onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                className="w-full bg-transparent border-none outline-none transition-all resize-none"
                rows={4}
                readOnly={state.editor.liveMode}
              />
              {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
                <div 
                  className="absolute top-2 right-2 bg-red-500 px-2.5 py-1 text-xs font-bold rounded text-white cursor-pointer transition-transform transform hover:scale-110" 
                  onClick={() => handleDeleteStep(index)}
                >
                  <Trash size={16} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default StepsSection
