import React, { useEffect } from 'react'
import { SignUp as SignUpComponent   } from '../components'

function Signup() {

  useEffect(() => {
    document.title = "QuickBlog | Signup"
  },[])

  return (
      <SignUpComponent />
  )
}

export default Signup