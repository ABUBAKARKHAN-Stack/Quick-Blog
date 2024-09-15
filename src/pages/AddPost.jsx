import React, { useEffect } from 'react'
import {PostForm  , Container} from "../components/index"

function AddPost() {

  useEffect(() => {
    document.title = "QuickBlog | Add Post"
  },[])

  return (
    <Container>
      <PostForm />
    </Container>
  )
}

export default AddPost