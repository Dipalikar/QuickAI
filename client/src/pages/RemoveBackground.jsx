import { EraserIcon, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const RemoveBackground = () => {

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
  }
  const[input,setInput]=useState('')

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start  gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#ff4938]'/>
          <h1 className='text-xl font-semibold'>Background Removal</h1>
          
        </div>
        <p className='mt-6 text-sm font-medium'>Upload image</p>

        <input accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm text-gray-600 rounded-md border border-gray-300' required type='file' onChange={(e)=>setInput(e.target.files[0])}/>    
        <p className='text-xs font-light text-gray-500 mt-1'>Supports JPG, PNG, and other image formats</p>
        <br/>

        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#f6ab41] to-[#ff4938] text-white px-4 py-2  text-sm rounded-lg cursor-pointer'>
          <EraserIcon className='w-5'/>
          Remove background
        </button>

      </form>
      {/* right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <EraserIcon className='w-5 h-5 text-[#ff4938]'/>
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <EraserIcon className='w-9 h-9'/>
            <p className=''>Upload an image and click "Remove Background" to get started</p>

          </div>

        </div>
      </div>
        
    </div>
  )
}

export default RemoveBackground