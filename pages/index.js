import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import Login from './login'

const Home = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 5000);
  }, [])
  return (
    <div className="">
      {visible ? (
         <Login />
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Home
