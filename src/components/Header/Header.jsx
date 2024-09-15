import React from 'react'
import { useSelector } from 'react-redux'
import { Logo, LogoutBtn } from '../index'
import { FaHouse } from "react-icons/fa6";
import { NavLink } from 'react-router-dom'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    console.log("Header", authStatus);
    const navItems = [
        {
            name: <FaHouse className='lg:text-2xl text-xl' title='Home' />,
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "Your Posts",
            slug: "/your-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        },

    ]
    return (
        <header className='lg:h-[100px] h-auto w-full bg-black/40'>
        <nav className='flex flex-col  lg:flex-row justify-between items-center h-full w-full gap-y-5 py-4 px-5 lg:px-20'>
          {/* Logo Component */}
          <Logo />
          
          {/* Navigation Items */}
          <ul className='flex flex-row   gap-x-4  items-center gap-y-2 lg:gap-x-6'>
            {
              navItems.map((navItem) => navItem.active && (
                <NavLink 
                  to={navItem.slug} 
                  key={navItem.slug} 
                  className={({ isActive }) => 
                    isActive ? "text-[#f84e46]" : "text-white"
                  }
                >
                  <li title={navItem.name} className='hover:text-[#f84e46] sm:text-sm text-xs font-semibold transition-colors duration-200 ease-linear tracking-wide'>
                    {navItem.name}
                  </li>
                </NavLink>
              ))
            }
            
            {/* Logout Button */}
            {authStatus && (
              <li className='hover:text-[#f84e46] cursor-pointer'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </header>
      
    )
}

export default Header