
const PostCard = ({post}) => {
    console.log(post)
  return (
    <div className='h-[500px] border border-gray-400 rounded-md p-5 w-[500px] flex flex-col gap-[100px] items-center'>
      <div className='image-container h-[200px] w-[200px] border overflow-hidden flex justify-center items-center'>
        <img src={post.image} alt="" className='object-fit'/>
      </div>
      <h6 className='post-caption font-semibold text-lg text-white'>{post.caption}</h6>
    </div>
  )
}

export default PostCard
