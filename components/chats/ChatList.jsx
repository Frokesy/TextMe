import { Avatar } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { supabase } from '../../utils/supabaseClient'

const ChatList = ({chats}) => {
    const router = useRouter()
    const [user, setUser] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [messageTime, setMessageTime] = React.useState('')

    //extract time from chats.last_message_time in 24-hour format
    const extractTime = (time) => {
        const date = new Date(time)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes
        const strTime = `${hours}:${minutesFormatted}`
        setMessageTime(strTime)
    }
    useEffect(() => {
      extractTime(chats.last_message_time)
    }, [chats.last_message_time])

    useEffect(() => {
      const fetchUser = async () => {
      try {
          const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', supabase.auth.user().id)
          if (error) {
          setError(error)
          } else {
          setUser(data[0])
          }
      } catch (error) {
          setError(error)
      }}
      fetchUser()
  }, [])
  return (
    <div className="w-[98vw] mx-auto mt-4 space-x-2 px-3 text-[#ccc] flex flex-col text-[13px]">
      <div 
        onClick={() => router.push(`/inbox/${chats.chat_id}`)}
        className="flex justify-between cursor-pointer items-center space-x-1">
      <div className="flex items-center space-x-3">
        <div className="">
        <Avatar size="md" 
        name={user?.user_id === chats.sender_id ? chats.recipient_name : chats.sender_name} 
        src={user?.user_id === chats.sender_id ? chats.recipient_pic : chats.sender_pic} />
        </div>
        <div className="flex flex-col">
            <span className="text-gray-100 text-[13px] font-semibold">
              {user?.user_id === chats.sender_id ? chats.recipient_name : chats.sender_name }
            </span>
            <span className="text-gray-400 mb-4 text-[12px] font-light">{chats.last_message}</span>
        </div>
      </div>
      <div className="flex">
          <span className="text-gray-400 text-[10px] font-light">{messageTime}</span>
        </div>
      </div>
      <div className="w-[94vw] border-b border-gray-600 mt-4" />
    </div>
  )
}

export default ChatList
