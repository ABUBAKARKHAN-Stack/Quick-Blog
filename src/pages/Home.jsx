import React, { useState, useEffect } from 'react'
import configuration from '../appwrite/configuration'
import { Container, Footer, PostCard, Spanner } from '../components'
import { useSelector } from 'react-redux'
import { BiHappyHeartEyes } from "react-icons/bi";
import { RiEmotionUnhappyLine } from "react-icons/ri";




function Home() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const post = await configuration.getAllPosts()
        if (post?.documents) {
          setPosts(post.documents)
        }
      } catch (error) {
        console.log(error);
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

  if (posts.length <= 0 && authStatus === false) {
    return (
      <Container>
        <div className='text-3xl w-full h-full justify-center items-center flex flex-col gap-y-2 tracking-widest font-light'>
          <p>Login to read posts</p>
          <BiHappyHeartEyes className='text-5xl' />
        </div>
      </Container>
    )
  }

  if (posts.length <= 0 && authStatus === true) {
    return (
      <Container>
        <div className="text-3xl w-full h-full justify-center items-center flex flex-col gap-y-2 tracking-widest font-light">
          <p>No posts available at the moment.</p>
          <RiEmotionUnhappyLine className="text-4xl" />
        </div>
      </Container>
    );
  }


  return (
    <>

      <div className="grid px-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-20">
        {posts.map((eachPost) => (
          <div key={eachPost.$id}>
            <PostCard {...eachPost} />
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}

export default Home