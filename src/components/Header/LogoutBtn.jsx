import React from 'react'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from "react-icons/hi";
function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        authService.logoutUser()
            .then(() => {
                dispatch(logout())
                navigate('/login')
            })      
    }
    return (

        <HiOutlineLogout  onClick={logoutHandler} className='lg:text-2xl text-xl' title='Logout' />

    )
}

export default LogoutBtn