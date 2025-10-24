import { ImageIcon, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const GenerateImages = () => {
  const style=[
    {text:"Realistic"},
    {text:"Ghibli style"},
    {text:"Anime style"},
    {text:"Cartoon style"},
    {text:"Fantasy style"},
    {text:"Realistic style"},
    {text:"3D style"},
    {text:"Portrait style"},
    
  ]

  const [selectedStyle,setselectedStyle]=useState(style[0])
  const[input,setInput]=useState('')
  const [publish,setPublish]=useState(false)
  
    const onSubmitHandler=async(e)=>{
      e.preventDefault();
    }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start  gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#00ad25]'/>
          <h1 className='text-xl font-semibold'>AI Image Generator</h1>
          
        </div>
        <p className='mt-6 text-sm font-medium'>Describe Your Image</p>

        <textarea type='text' placeholder='Describe what you want to see in the image...' rows={4}required className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' onChange={(e)=>setInput(e.target.value)}/>

        <p className='mt-4 text-sm font-medium'>Style</p>
        
        <div className='mt-3 grid grid-cols-2 sm:grid-cols-3 flex-wrap gap-3 md:max-w-9/11 '>
          {style.map((item,index)=>
          <span key={index} className={`text-xs text-center px-4 py-1 border rounded-full cursor-pointer ${selectedStyle.text===item.text ? 'bg-green-50 text-green-700':'text-gray-500 border-gray-300'}`} onClick={()=>setselectedStyle(item)}>
            {item.text}
          </span>
        )
          }
        </div>

        <div className='my-6 flex items-center gap-2'>
          <label className='relative cursor-pointer'>
            <input type='checkbox' checked={publish} className='sr-only peer' onChange={(e)=>setPublish(e.target.checked)}/>
            <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'></div>
            <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
          </label>
          <p className='text-sm'>Make this image Public</p>
        </div>        
        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00ad25] to-[#04ff50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          <ImageIcon className='w-5'/>
          Generate image
        </button>

      </form>
      {/* right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <ImageIcon className='w-5 h-5 text-[#00ad25]'/>
          <h1 className='text-xl font-semibold'> Generated images</h1>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <ImageIcon className='w-9 h-9'/>
            <p className=''>Enter a topic and click "Generate image" to get started</p>

          </div>

        </div>
      </div>
        
    </div>
  )
}

export default GenerateImages