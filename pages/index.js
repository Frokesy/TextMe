import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import Meta from '../defaults/Meta'
import Login from './login'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'


const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 4000);
  }, [])
  return (
    <div className="">
      <Meta />
      {loading ? <Loader /> : <Login />}
    </div>
  )
}

export default Home
