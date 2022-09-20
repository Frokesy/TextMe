import Link from 'next/link'
import React from 'react'
import { FaEdit, FaSearch } from 'react-icons/fa'
import Meta from '../../defaults/Meta'
import { Spinner, Avatar } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { supabase } from '../../utils/supabaseClient'
import { UserContext } from '../../context/UserContext'


const NewChat = () => {
    const { user, setUser } = React.useContext(UserContext)
  return (
    <div>
        <div className="w-[90vw] cursor-pointer items-center mx-auto pt-4 flex justify-center">
            <Link href="/profile" passHref>
              <Avatar size="lg" mx="auto" name={user?.name} src={user?.profile_pic} />
            </Link>
          </div>
          <div className="w-[90vw] mx-auto mt-2 flex items-center text-center justify-between">
              <h1 className="text-neutral-400 text-[25px]">New Chat</h1>
              <span className="text-[#08af4e] text-[16px]">
                <Link href="/chats" passHref>
                    Cancel
                </Link>
              </span>
          </div>
          <div className="w-[90vw] mx-auto mt-2 space-x-2 bg-neutral-800 items-center rounded-2xl p-3 offset-0 border-none text-[#ccc] flex text-[13px]">
              <input type="text" placeholder="start a new chat" className="w-full h-full hover:border-none focus:border-none bg-transparent offset-0 outline-none border-none"/>
          </div>
    </div>
  )
}

export default NewChat
