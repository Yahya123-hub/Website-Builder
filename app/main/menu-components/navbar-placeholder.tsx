import { EditorBtns } from '../const'
import { Navigation2Icon } from 'lucide-react'
import React from 'react'

type Props = {}

const NavbarPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'navbars')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Navigation2Icon
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default NavbarPlaceholder