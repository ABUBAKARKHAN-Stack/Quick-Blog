import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import configuration from '../appwrite/configuration'
import { Container, PostForm } from '../components/index'


function EditPost() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)

    useEffect(() => {
        if (slug) {
            configuration.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate])

    return post ? (
        <Container>
            <PostForm post={post} />
        </Container>
    ) : null
}

export default EditPost