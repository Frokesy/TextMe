import Image from 'next/image'
import React from 'react'
import { FaEdit, FaSearch } from 'react-icons/fa'

const Messages = () => {
  return (
    <div>
      <div className="w-[90vw] items-center mx-auto pt-3 flex justify-center">
        <Image src="/assets/UserPP.svg" alt="logo" width="60px" height="60px" />
      </div>
        <div className="w-[90vw] mx-auto flex items-center text-center justify-between">
            <h1 className="text-neutral-400 text-[30px]">Messages</h1>
            <FaEdit className="text-[#0fa84e] text-[22px]"/>
        </div>
        <div className="w-[90vw] mx-auto mt-2 space-x-2 bg-neutral-800 items-center rounded-2xl p-3 offset-0 border-none text-[#ccc] flex text-[13px]">
            <FaSearch className="bg-transparent"/>
            <input type="text" placeholder="Search" className="w-full h-full hover:border-none focus:border-none bg-transparent offset-0 outline-none border-none"/>
        </div>
      <div className="h-[70vh] w-screen text-center flex items-center justify-center">
        <h1 className="text-gray-500 text-[11px] font-light">No messages yet, start a conversation today!</h1>
      </div>
    </div>
  )
}

export default Messages
