import { EditorBtns } from '../const'
import { MenuIcon  } from 'lucide-react'
import React from 'react'

type Props = {}

const FooterPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'footer')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <MenuIcon
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default FooterPlaceholder