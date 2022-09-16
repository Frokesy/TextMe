import React from 'react'
import { FaEdit } from 'react-icons/fa'

const Profile = () => {
  return (
    <div>
        <div className="w-[90vw] mx-auto pt-[5vh] flex items-center text-center justify-between">
            <h1 className="text-[#ccc] text-[25px]">Messages</h1>
            <FaEdit className="text-[#0fa84e] text-[22px]"/>
        </div>
      <div className="h-[90vh] w-screen text-center flex items-center justify-center">
        <h1 className="text-gray-500 text-[14px] font-bold">No messages yet, start a conversation today!</h1>
      </div>
    </div>
  )
}

export default Profile
