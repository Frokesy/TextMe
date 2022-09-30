import { Avatar } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FaPhone, FaVideo } from 'react-icons/fa'
import { IoArrowBack, IoCheckmark } from 'react-icons/io5'
import ChatBox from '../../components/chats/ChatBox'
import { UserContext } from '../../context/UserContext'
import Meta from '../../defaults/Meta'
import { supabase } from '../../utils/supabaseClient'


const Inbox = () => {
  const router = useRouter()
  const { chatId } = router.query
  const { user } = React.useContext(UserContext)
  const [chats, setChats] = React.useState([])
  const [colorModal, setColorModal] = React.useState(false)

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

  const updateColor = async (color) => {
    const { data, error } = await supabase
      .from('chats')
      .update({ color: color })
      .eq('chat_id', chatId)
    if (error) {
      return
    }
    setColorModal(false)
    fetchChat()
  }
  
  useEffect(() => {
    if (supabase.auth.user() === null) {
      router.push('/login')
    } else if (user?.user_id === null) {
      router.push('/login')
    }
  }, [router, user?.user_id])
  useEffect(() => {
    fetchChat()
  }, [chatId])
  return (
    <div>
      <Meta title="Inbox" />
      {colorModal && (
                <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-[10px]">
                    <div className="flex items-center justify-between w-full h-[50px] px-4 border-b border-gray-300">
                      <p className="font-semibold text-[#0fa84e]">Select a chat theme</p>
                      <div className="text-[#0fa84e] cursor-pointer"
                      onClick={() => setColorModal(false)}
                      >
                        <IoArrowBack size={20} />
                      </div>
                      </div>
                      <div className="flex items-center justify-between mx-auto mt-14 py-4 max-w-[95%] overflow-scroll px-4 border-b border-gray-300">
                        <div className="grid grid-cols-5 items-center gap-6 mb-8">
                          <div className="bg-[#0fa84e] w-12 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => updateColor('#0fa84e')}
                          ></div>
                          <div className="bg-[#ff0000] w-15 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => updateColor('#ff0000')}
                          ></div>
                          <div className="bg-[#ff00ff] w-15 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => updateColor('#ff00ff')}
                          ></div>
                          <div className="bg-[#0000ff] w-15 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => updateColor('#0000ff')}
                          ></div>
                          <div className="bg-[#00ffff] w-15 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => updateColor('#00ffff')}
                          ></div>
                          <div className="bg-[#00ff00] w-15 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => updateColor('#00ff00')}
                          ></div>
                          <div className="bg-[#ffff00] w-15 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => updateColor('#ffff00')}
                          ></div>
                          <div className="bg-[#ff6600] w-15 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => updateColor('#ff6600')}
                          ></div>
                          <div className="bg-[#ff9900] w-15 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => updateColor('#ff9900')}
                          ></div>
                          <div className="bg-[#ffcc00] w-15 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => updateColor('#ffcc00')}
                          ></div>
                        </div>
                          </div>
                          </div>
                          </div>
              )}
      <div className="flex justify-between w-full border-b border-gray-500 px-8">
        {chats?.map((chat) => (
          <div key={chat.chat_id}
            className="flex items-center justify-between w-full py-4">
          <div onClick={() => router.push('/chats')} className={`font-extrabold text-[${chat.color}]`}>
              <IoArrowBack size={20} />
            </div>              
            <div>
            <div className="items-center cursor-pointer text-center"
            onClick={() => router.push(`/profile/${user?.user_id === chat.sender_id ? chat.recipient_id : chat.sender_id}`)}
            >
                <Avatar size="md"
                 name={user?.user_id === chat.recipient_id ? chat.sender_name : chat.recipient_name} 
                 src={user?.user_id === chat.recipient_id ? chat.sender_pic : chat.recipient_pic} />
                <p className="text-[12px] text-gray-500 font-semibold">{user?.user_id === chat.recipient_id ? chat.sender_username : chat.recipient_username}</p>
              </div>
            </div>              
              <div className={`flex items-center space-x-6 text-[${chat.color}] text-[20px]`}>
              <FaVideo />
              <div 
              className={`bg-[${chats[0]?.color}] w-6 aspect-square border-[2px] border-white rounded-[100%]`}
              onClick={() => setColorModal(true)}
              ></div>
              

            </div>              
          </div>
        ))}
      </div>

      <ChatBox chatData={chats} />
    </div>
  )
}

export default Inbox
