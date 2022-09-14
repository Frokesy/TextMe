import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import Login from './login'

const index = () => {
  return (
    <div className="relative">
      <div className="absolute left-10">
        <Login />
      </div>
      {/* <motion.div
      animate={{
        opacity: [0, 1, 0, 1, 0, 1, 0],
        scale: [1, 0.5, 1, 0.5, 1, 0.5, 2]
      }}
      transition={{
        duration: 5,
      }}
      className="h-[90vh] flex justify-center items-center">
        <Image src="/assets/messenger-green-icon.png" alt="logo" width="100px" height="100px" />
      </motion.div> */}
    </div>
  )
}

export default index
