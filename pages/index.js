import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Login from './login'

const Home = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 5000);
  }, [])
  return (
    <div className="relative">
      {visible ? (
         <motion.div 
         className="absolute left-6"
         initial={{ opacity: 0, scale: 1.5 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 1 }}
         >
         <Login />
       </motion.div>
      ) : (
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
      )}
    </div>
  )
}

export default Home
