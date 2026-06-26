import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CreatePost = () => {

  const navigate = useNavigate()

    const formHandler = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target);
        axios.post('http://localhost:3000/create-post',formData)
        .then(()=>{
          navigate('/feed')
        })
        .catch((err)=>{
            alert('error')
            console.log(err)
        })
    }

  return (
    <div className='min-h-[100%] w-100vw flex flex-col gap-[70px] items-center p-10'>
      <h1 className='font-semibold text-7xl text-white'>Create post</h1>
      <form onSubmit={(e)=>{
        formHandler(e)
      }} action="" className='border border-gray-300 rounded-md flex flex-col gap-[90px] items-center w-[60%] px-7 py-10'>
        <input type="file" name='image' className='bg-transparent border-2 h-10 border-emerald-300 rounded-2xl text-white text-sm w-full' />
        <input type="text" name='caption' className='bg-transparent h-10 w-full border-2 border-emerald-300 rounded-2xl text-white text-sm' required placeholder='Enter Caption'/>
        <button type='submit' className='bg-emerald-600 text-lg font-medium rounded-md text-white px-4 py-2'>Submit</button>
      </form>
    </div>
  )
}

export default CreatePost
