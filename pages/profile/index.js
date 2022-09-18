import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoArrowBack, IoPower } from "react-icons/io5";
import { Spinner, Avatar } from '@chakra-ui/react'


const Profile = () => {
  const updatePic = (pic) => {
      console.log(pic)
  }
  return (
    <div className="pt-[5vh]">
      <div className="w-min aspect-square relative mx-auto">
        <Avatar size="2xl" mx="auto" name="DP" src="/assets/sub.jpg" />
        <div className="absolute text-[#fff] right-[10%] top-[80%] w-5 aspect-square border-[3px] rounded-full">
            <input accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }}  onChange={(e) => updatePic( e.target.files[0])} />
            <label htmlFor="icon-button-file" className="cursor-pointer">
          <FaEdit />
          </label>
          </div>    
        </div>
      <div className="w-[90vw] bg-neutral-800 rounded-lg shadow-md py-4 px-4 flex flex-col mx-auto mt-10">
        <span className="text-neutral-400 text-[18px] font-semibold bg-transparent">Basic Info</span>
        <div className="flex flex-col mt-4 bg-transparent">
          <span className="text-neutral-400 text-[13px] bg-transparent">Name</span>
          <span className="text-neutral-200 text-[14px] bg-transparent">John Doe</span>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col bg-transparent">
          <span className="text-neutral-400 text-[13px] bg-transparent">Username</span>
          <span className="text-neutral-200 italic text-[14px] bg-transparent"> 
            <span className="text-[#0fa84e] bg-transparent">@</span> 
            johndoe19
          </span>
        </div>
      </div>


      <div className="w-[90vw] bg-neutral-800 rounded-lg shadow-md py-4 px-4 flex flex-col mx-auto mt-6">
        <span className="text-neutral-400 text-[18px] font-semibold bg-transparent">Additional Info</span>
        <div className="flex flex-col mt-4 bg-transparent">
          <span className="text-neutral-400 text-[13px] bg-transparent">Email</span>
          <span className="text-neutral-200 text-[14px] bg-transparent">johndoe19@gmail.com</span>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col bg-transparent">
          <span className="text-neutral-400 text-[13px] bg-transparent">Mobile</span>
          <span className="text-neutral-200 text-[14px] bg-transparent">+2349157881431</span>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col bg-transparent">
          <span className="text-neutral-400 text-[13px] bg-transparent mb-2">Profile Summary</span>
          <span className="text-neutral-200 text-[14px] bg-transparent">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur eaque laboriosam laborum incidunt nobis vitae saepe quia reiciendis doloribus quod?</span>
        </div>
      </div>

      <div className="w-[90vw] bg-neutral-800 rounded-lg shadow-md py-4 px-4 flex flex-col mx-auto mt-6">
        <span className="text-neutral-400 text-[18px] font-semibold bg-transparent">Useful Links</span>
        <div className="flex flex-col mt-4 bg-transparent">
          <span className="text-neutral-400 text-[13px] bg-transparent">GitHub</span>
          <a href="#" className="text-blue-800 text-[14px] bg-transparent">www.github.com</a>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col bg-transparent">
          <span className="text-neutral-400 text-[13px] bg-transparent">LinkedIn</span>
          <a href="#" className="text-blue-800 text-[14px] bg-transparent">www.linkedin.com</a>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col bg-transparent">
          <span className="text-neutral-400 text-[13px] bg-transparent mb-2">Facebook</span>
          <a href="#" className="text-blue-800 text-[14px] bg-transparent">www.facebook.com</a>
        </div>
      </div>

      <div className="w-[90vw] bg-neutral-800 rounded-lg shadow-md py-4 px-4 flex flex-col mx-auto mt-6">
        <span className="text-neutral-400 text-[18px] font-semibold bg-transparent">Change Password</span>
        <div className="flex flex-col mt-4 bg-transparent">
          <span className="text-neutral-400 text-[13px] bg-transparent">Current Password</span>
          <input type="password" className="text-neutral-200 mt-2 text-[14px] bg-transparent border-none focus:outline-none" />
        </div>
        <hr className="mb-4" />
        <div className="flex flex-col bg-transparent">
          <span className="text-neutral-400 text-[13px] bg-transparent">New Password</span>
          <input type="password" className="text-neutral-200 mt-2 text-[14px] bg-transparent border-none focus:outline-none" />
        </div>
        <hr className="mb-4" />
        <div className="flex flex-col bg-transparent">
          <span className="text-neutral-400 text-[13px] bg-transparent">Confirm Password</span>
          <input type="password" className="text-neutral-200 mt-2 text-[14px] bg-transparent border-none focus:outline-none" />
        </div>
        <hr />
        <div className="flex bg-transparent flex-row justify-end mt-4">
          <button className="bg-[#0fa84e] text-[#fff] px-4 py-2 rounded-lg text-[14px] font-semibold">Save</button>
        </div>
      </div>
      <div className="flex justify-center my-10 font-semibold text-red-700 space-x-1 items-center">
        <IoPower size={16} />
        <span className=" text-[14px]">Logout</span>
      </div>
      <div className="my-10 text-[10px] italic flex flex-col space-y-2 text-center text-gray-500">
                <span>V 1.0.0</span>
                <span className="">Designed by Frokes</span>
      </div>
    </div>
  )
}

export default Profile
