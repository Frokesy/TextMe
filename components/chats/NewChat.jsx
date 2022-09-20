import Link from 'next/link'
import React from 'react'
import { FaEdit, FaSearch } from 'react-icons/fa'
import Meta from '../../defaults/Meta'
import { Spinner, Avatar } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { supabase } from '../../utils/supabaseClient'


const NewChat = () => {

  return (
    <div>
        <div className="w-[90vw] cursor-pointer items-center mx-auto pt-4 flex justify-center">
            <Link href="/profile" passHref>
                <Avatar size="lg" mx="auto" name={profile?.name} src={profile?.profile_pic} />
            </Link>
        </div>
        <div className="w-[90vw] mx-auto flex items-center text-center justify-between">
              <h1 className="text-neutral-400 text-[30px]">New Chat</h1>
              <FaEdit className="text-[#0fa84e] text-[22px]"/>
        </div>
    </div>
  )
}

export default NewChat
