import React from 'react'
import { FaCamera } from 'react-icons/fa'
import { IoArrowUp, IoArrowUpCircle } from 'react-icons/io5'

const ChatBox = ({ chatData }) => {
    const [message, setMessage] = React.useState('')
    console.log(chatData)
  return (
    <div>
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
