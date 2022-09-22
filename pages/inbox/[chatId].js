import { Avatar } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FaPhone, FaVideo } from 'react-icons/fa'
import { IoArrowBack } from 'react-icons/io5'
import ChatBox from '../../components/chats/ChatBox'
import { supabase } from '../../utils/supabaseClient'


const Inbox = () => {
  const router = useRouter()
  const { chatId } = router.query
  const [chats, setChats] = React.useState([])
  
  useEffect(() => {
    const fetchChat = async () => {
      const { data, error } = await supabase
      .from('chats')
      .select('*')
      .eq('chat_id', chatId)
      if (error) {
        return
      }
      setChats(data)
  }
    fetchChat()
  }, [chatId])
  return (
    <div>
      <div className="flex justify-between w-full border-b border-gray-500 px-8">
        {chats?.map((chat) => (
          <div key={chat.chat_id}
            className="flex items-center justify-between w-full py-4">
            <div className="font-extrabold text-[#0fa84e]">
              <IoArrowBack size={20} />
            </div>              
            <div>
            <div className="items-center text-center">
                <Avatar size="md" name={chat.recipient_name} src={chat.recipient_pic} />
                <p className="text-[12px] text-gray-500 font-semibold">{chat.recipient_username}</p>
              </div>
            </div>              
            <div className="flex items-center space-x-3 text-[#0fa84e] text-[20px]">
              <FaVideo />
              {/* <FaPhone /> */}
            </div>              
          </div>
        ))}
      </div>

      <ChatBox chatData={chats} />
    </div>
  )
}

export default Inbox
