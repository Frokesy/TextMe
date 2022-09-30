import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'


const Logo = () => {
  return (
    <div className="flex -space-x-2">
      
      <h2 className="text-[20px] text-[#ccc]">TextMe</h2>
      <div className="bg-zinc-900 opacity-50 w-screen h-screen">
        <motion.div
        animate={{
          opacity: [0, 1, 0, 1, 0, 1, 0],
          scale: [1, 0.5, 1, 0.5, 1, 0.5, 2]
        }}
        transition={{
          duration: 5,
        }}
        className="h-[90vh] flex justify-center items-center">
          <Image src="/assets/messenger-green-icon.png" alt="logo" width="100px" height="100px" />
        </motion.div>
    </div>
    <div className="flex items-center space-x-4">
                          <div className="bg-[#0fa84e] w-6 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => setColor('#0fa84e')}
                          ></div>
                          <div className="bg-[#ff0000] w-6 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => setColor('#ff0000')}
                          ></div>
                          <div className="bg-[#ff00ff] w-6 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => setColor('#ff00ff')}
                          ></div>
                          <div className="bg-[#0000ff] w-6 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => setColor('#0000ff')}
                          ></div>
                          <div className="bg-[#00ffff] w-6 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => setColor('#00ffff')}
                          ></div>
                          <div className="bg-[#00ff00] w-6 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => setColor('#00ff00')}
                          ></div>
                          <div className="bg-[#ffff00] w-6 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => setColor('#ffff00')}
                          ></div>
                          <div className="bg-[#ff6600] w-6 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => setColor('#ff6600')}
                          ></div>
                          <div className="bg-[#ff9900] w-6 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => setColor('#ff9900')}
                          ></div>
                          <div className="bg-[#ffcc00] w-6 aspect-square border-[2px] border-white rounded-[100%]"
                          onClick={() => setColor('#ffcc00')}
                          ></div>
                        </div>
    </div>
  )
}

export default Logo
