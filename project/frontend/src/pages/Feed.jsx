import  { useEffect, useState } from 'react'
import PostCard from '../components/PostCard';
import axios from 'axios'
const Feed = () => {

    const [posts, setPosts] = useState([]);

    useEffect( () => {
        axios.get('http://localhost:3000/get-posts')
        .then((res)=>{
            setPosts(res.data.posts);
        });
    }, []);
    

    

    console.log(posts)
  return (
    <div className='post-container flex flex-col items-center gap-[50px] min-h-[100%] w-[100vw]  p-10'> 
      {
        posts.map((post, idx)=>{
            return (
                <PostCard key={idx} post={post}/>
            )
        })
      }
    </div>
  )
}

export default Feed
