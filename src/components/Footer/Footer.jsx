import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (

    <footer className='w-full mt-20  bg-black/40 text-white'>
      <div className='container mx-auto flex flex-col lg:flex-row items-center justify-between py-8 px-5 lg:px-20'>

        {/* Copyright Notice */}
        <div className='flex flex-col items-center space-y-2 text-sm'>
          <Logo className='w-28 invert' /> {/* Adjusted logo size for better proportion */}
          <span>© {new Date().getFullYear()} QuickBlog. All rights reserved.</span>
        </div>

        {/* Design and Developed By Section */}
        <div className='flex flex-col items-center space-y-2 text-sm mt-4 lg:mt-0'>
          <img src="/dev.webp" alt="Developer" className='w-12 h-12 rounded-full border-2 border-white' /> {/* Adjusted image size */}
          <div className='flex items-center space-x-2'>
            <p>Design and Developed By</p>
            <Link
              to="https://codewithabubakar.netlify.app/"
              className='text-white hover:underline'
              target="_blank"
              rel="noopener noreferrer"
            >
              Abubakar Aijaz
            </Link>
          </div>
        </div>
      </div>
    </footer>


  )
}

export default Footer