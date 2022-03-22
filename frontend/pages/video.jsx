import React from 'react'
import PageContainer from '../components/PageContainer'
import ReactPlayer from 'react-player'

function Video() {
  return (
    <PageContainer>
      <div className='h-screen flex flex-col items-center justify-center gap-5'>
        <h1 className='text-center font-bold text-2xl mt-5'>Ini Judul Video</h1>
        <div className='w-full h-[70%]' >
          <ReactPlayer controls url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' width="100%" height="100%" />
        </div>
      </div>
    </PageContainer>
  )
}

export default Video