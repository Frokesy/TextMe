import React, { useEffect } from 'react'
import { FaCamera } from 'react-icons/fa'
import { IoArrowUp, IoArrowUpCircle } from 'react-icons/io5'
import { UserContext } from '../../context/UserContext'
import { supabase } from '../../utils/supabaseClient'

const ChatBox = ({ chatData }) => {
    const { user } = React.useContext(UserContext)
    const [message, setMessage] = React.useState('')
    const [messages, setMessages] = React.useState([])

    const sendMessage = async (e) => {
        e.preventDefault()
        if (!message) {
            return
        }
        try {
            const { data, error } = await supabase
                .from('messages')
                .insert([
                    {
                        chat_id: chatData[0]?.chat_id,
                        message: message,
                        sender_id: user?.user_id,
                    },
                ])
            if (error) {
                throw error
            }
            const { data: lastMessage, error: lastMessageError } = await supabase
                .from('chats')
                .update({ last_message: message })
                .eq('chat_id', chatData[0]?.chat_id)
            if (lastMessageError) {
                throw lastMessageError
            }
            setMessage('')
        } catch (error) {
            return
        }
    }
    const fetchMessages = async () => {
      const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('chat_id', chatData[0]?.chat_id)
      // if (error) {
      //     console.log(error)
      // }
      setMessages(data)
  }
  fetchMessages()
    useEffect(() => {

    }, [chatData])
  return (
    <div>
      <div className="message-container mt-4">
        {messages?.map((message) => (
          <div
            key={message.id}
            className={`message ${ message.sender_id === user?.user_id ? 'flex justify-end' : 'flex justify-start' }`}
          >
            <span 
              className={`message ${
                message.sender_id === user?.user_id ? 'flex justify-end mt-1 max-w-[60vw] mx-4 rounded-full text-gray-200 font-light text-[12px] bg-blue-500 p-3' : 'justify-start mt-1 max-w-[60vw] mx-4 rounded-full text-gray-200 font-light text-[12px] bg-gray-500 p-3'}`}
            >{message.message}</span>
          </div>
        ))}
      </div>
      <div className="message-input">
        <div className="fixed bottom-2 w-full">
            <div className="flex items-center justify-between space-x-2 px-2">
                <div className="text-[20px] text-gray-500">
                    <FaCamera />
                </div>
                <div className="w-full space-x-2 items-center rounded-2xl px-3 py-2 offset-0 border border-gray-500 text-[#ccc] flex text-[13px]">
                    <input type="text" 
                    className="w-full h-full hover:border-none focus:border-none bg-transparent offset-0 outline-none border-none" 
                    placeholder="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                    {message.length > 0 && (
                        <div onClick={sendMessage} className="text-[18px] rounded-full">
                            <IoArrowUpCircle color="#0fa84e" />
                        </div>
                    )}
                </div>
            </div>

        </div>    
      </div>
    </div>
  )
}

export default ChatBox
