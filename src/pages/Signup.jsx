import React, { useEffect } from 'react'
import { SignUp as SignUpComponent , Container  } from '../components'

function Signup() {

  useEffect(() => {
    document.title = "QuickBlog | Signup"
  },[])

  return (
    <Container>
      <SignUpComponent />
    </Container>
  )
}

export default Signup