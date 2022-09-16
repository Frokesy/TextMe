import Image from 'next/image'
import React from 'react'
import { FaEdit, FaSearch } from 'react-icons/fa'

const Messages = () => {
  return (
    <div>
      <div className="w-[90vw] items-center mx-auto pt-6 flex justify-center">
        <Image src="/assets/UserPP.svg" alt="logo" width="40px" height="40px" />
      </div>
        <div className="w-[90vw] mx-auto pt-10 flex items-center text-center justify-between">
            <h1 className="text-[#ccc] text-[25px]">Messages</h1>
            <FaEdit className="text-[#0fa84e] text-[22px]"/>
        </div>
        <div className="w-[90vw] mx-auto mt-10 border border-gray-500 space-x-2 bg-gray-800 items-center rounded-2xl p-2 text-[#ccc] flex text-[13px]">
            <FaSearch className="bg-transparent"/>
            <input type="text" placeholder="Search" className="w-full bg-transparent"/>
        </div>
      <div className="h-[70vh] w-screen text-center flex items-center justify-center">
        <h1 className="text-gray-500 text-[14px] font-bold">No messages yet, start a conversation today!</h1>
      </div>
    </div>
  )
}

export default Messages
