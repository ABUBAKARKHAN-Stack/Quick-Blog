import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Spanner} from './index'

function AuthLayout({ children, authentication = true }) {
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    useEffect(() => {
       
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate])

    if (loader) return <Spanner />;

    return (
        <>{children}</>
    )
}

export default AuthLayout