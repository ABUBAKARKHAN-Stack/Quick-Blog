import React, { useEffect, useState } from 'react'
import { Container, PostCard, Spanner } from '../components'
import configuration from '../appwrite/configuration'
import { useSelector } from 'react-redux'
import { RiEmotionUnhappyLine } from "react-icons/ri";


function YourPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const user = userData.user ? userData.user : userData;
  const authorPost = posts.filter((post) => post.userID === user.$id)

  useEffect(() => {
    document.title = "QuickBlog | Your Posts" 
  },[])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const post = await configuration.getAllPosts()
        if (post?.documents) {
          setPosts(post.documents)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) return (
    <Container>
      <Spanner />
    </Container>
  )


  if (authorPost.length <= 0 && authStatus === true) {
    return (
      <Container>
        <div className="sm:text-3xl text-2xl w-full h-full flex flex-col justify-center items-center gap-y-2 tracking-widest font-light">
          <p className='text-wrap text-center'>You haven&apos;t made any posts yet.</p>
          <RiEmotionUnhappyLine className="text-4xl" />
          <p className="text-sm">Share your first post to get started!</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-20">
        {authorPost.map((eachPost) => (
          <div key={eachPost.$id}>
            <PostCard {...eachPost} />
          </div>
        ))}
      </div>
    </Container>
  )
}

export default YourPosts