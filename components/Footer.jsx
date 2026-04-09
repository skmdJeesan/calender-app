'use client'
import React from 'react'
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram, FaGithub } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const socials = [
  { icon: <CiLinkedin />, href: 'https://linkedin.com/in/smjeesan/', label: 'LinkedIn' },
  { icon: <FaGithub />, href: 'https://github.com/skmdJeesan', label: 'GitHub' },
  // { icon: <FaInstagram />, href: 'https://instagram.com/xxx', label: 'Instagram' },
  { icon: <BiLogoGmail />, href: 'mailto:skmdjeesan@gmail.com', label: 'Email' },
]

const Footer = () => {
  return (
    <div className='border-t border-white/50 flex flex-col sm:flex-row items-center justify-between py-5 px-6 sm:px-10 mt-10 gap-4 sm:gap-5 mx-4 sm:mx-10'>
      <div className='left flex items-center gap-3'>
        <div className='w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 text-sm font-medium shrink-0'>SJ</div>
        <div>
          <p className='text-sm font-medium text-gray-900 m-0'>Sk Md Jeesan</p>
          <p className='text-xs text-gray-400 m-0'>Designer & Developer</p>
        </div>
      </div>

      <p className='center text-xs sm:text-sm text-gray-400 text-center order-last sm:order-0'>
        Built with care &mdash; &copy; {new Date().getFullYear()} CalendarApp
      </p>

      <div className='right flex items-center gap-2'>
        {socials.map(({ icon, href, label }) => (
          <a
            key={label}
            href={href}
            title={label}
            target='_blank'
            rel='noreferrer'
            className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 border border-gray-100 flex items-center justify-center text-base sm:text-xl text-gray-400 hover:bg-gray-300 transition-colors'
          >{icon}</a>
        ))}
      </div>

    </div>
  )
}

export default Footer