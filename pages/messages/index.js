import React, { useEffect } from 'react'
import { FaEdit, FaSearch } from 'react-icons/fa'
import Meta from '../../defaults/Meta'
import { Spinner, Avatar } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { supabase } from '../../utils/supabaseClient'
import Link from 'next/link'

const Messages = () => {
  const [visible, setVisible] = React.useState(false)
  const [profile, setProfile] = React.useState(null)

  const getUser = async () => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', supabase.auth.user().id)
    if (error) {
        console.log(error)
    } else {
        setProfile(data[0])
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 1000);
    getUser()
  }, [])
  return (
    <div className="">
      <Meta title="Messages" />
      {visible ? (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
          <div className="w-[90vw] cursor-pointer items-center mx-auto pt-4 flex justify-center">
            <Link href="/profile" passHref>
              <Avatar size="lg" mx="auto" name={profile?.name} src={profile?.profile_pic} />
            </Link>
          </div>
          <div className="w-[90vw] mx-auto flex items-center text-center justify-between">
              <h1 className="text-neutral-400 text-[30px]">Messages</h1>
              <FaEdit className="text-[#0fa84e] text-[22px]"/>
          </div>
          <div className="w-[90vw] mx-auto mt-2 space-x-2 bg-neutral-800 items-center rounded-2xl p-3 offset-0 border-none text-[#ccc] flex text-[13px]">
              <FaSearch className="bg-transparent"/>
              <input type="text" placeholder="Search" className="w-full h-full hover:border-none focus:border-none bg-transparent offset-0 outline-none border-none"/>
          </div>
        <div className="h-[60vh] w-screen text-center flex items-center justify-center">
          <h1 className="text-gray-500 text-[11px] font-light">No messages yet, start a conversation today!</h1>
        </div>
        </motion.div>
      ) : (
        <div className=" h-screen w-screen opacity-75 absolute flex items-center justify-center">
          <Spinner color="#0fa84e" size="lg" thickness="3px" />
        </div>
      )}
    </div>
  )
}

export default Messages
