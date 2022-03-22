import React from 'react'
import DragDrop from '../components/DragDrop'

function Drag({clickHandler, dropHandler}) {


  return (
    <div className='h-screen bg-black flex items-center justify-center select-none'>
      <DragDrop />
    </div>
  )
}

export default Drag