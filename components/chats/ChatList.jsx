import { Avatar } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { UserContext } from '../../context/UserContext'

const ChatList = ({chats}) => {
    const router = useRouter()
    const { user } = React.useContext(UserContext)
  return (
    <div className="w-[98vw] mx-auto mt-2 space-x-2 items-center p-3 text-[#ccc] flex text-[13px]">
      <div className="flex items-center space-x-3">
        <Avatar size="md" 
        name={user?.user_id === chats.recipient_id ? chats.sender_name : chats.recipient_name} 
        src={user?.user_id === chats.recipient_id ? chats.sender_pic : chats.recipient_pic} />
        <div onClick={() => router.push(`/inbox/${chats.chat_id}`)} className="flex flex-col">
            <h1 className="text-gray-500 text-[11px] font-bold">
              {user?.user_id === chats.recipient_id ? chats.sender_name : chats.recipient_name }
            </h1>
            <h1 className="text-gray-500 py-2 text-[11px] font-light">{chats.last_message}</h1>
            <hr className="w-[90vw]" />
        </div>
      </div>
      
    </div>
  )
}

export default ChatList
