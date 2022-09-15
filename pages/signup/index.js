import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const Signup = () => {
  return (
    <motion.div 
    className="w-[85vw] mx-auto pt-[3vh]"
    initial={{ opacity: 0, scale: 1.5 }}
    animate={{ opacity: 1, scale: [1.5 , 0.75, 1] }}
    transition={{ duration: 1.5 }}
    >
            <h2 className="text-[#0fa84e] font-[Combo] font-semibold text-[28px]">TextMe</h2>
            <div className="text-[#ccc] mt-[6vh]">
                <h2 className="text-[24px]">Create an Account</h2>
                <span className="text-gray-500 italic">Welcome here Champ, let&apos;s get you started!</span>
                <div className="flex flex-col">
                    <form>
                        <div className="input-field flex flex-col space-y-2 mt-6">
                            <label htmlFor="name" 
                                className="text-[#ccc]">
                                    Name:
                            </label>
                            <input type="name" name="name" id="name" 
                                placeholder="John Doe" 
                                className="border-gray-500 border-2 rounded-md p-3 focus:border focus:border-[#ccc] placeholder:italic outline-none outline-offset-2"
                            />
                        </div>
                        <div className="input-field flex flex-col space-y-2 mt-6">
                            <label htmlFor="username" 
                                className="text-[#ccc]">
                                    Username:
                            </label>
                            <input type="text" name="username" id="username" 
                                placeholder="johndoe19" 
                                className="border-gray-500 border-2 rounded-md p-3 focus:border focus:border-[#ccc] placeholder:italic outline-none outline-offset-2"
                            />
                        </div>
                        <div className="input-field flex flex-col space-y-2 mt-6">
                            <label htmlFor="email" 
                                className="text-[#ccc]">
                                    Email:
                            </label>
                            <input type="email" name="email" id="email" 
                                placeholder="johndoe@gmail.com" 
                                className="border-gray-500 border-2 rounded-md p-3 focus:border focus:border-[#ccc] placeholder:italic outline-none outline-offset-2"
                            />
                        </div>
                        <div className="input-field flex flex-col space-y-2 mt-6">
                            <label htmlFor="password" 
                                className="text-[#ccc] required:border-red-500">
                                    Password:
                            </label>
                            <input type="password" name="password" id="password" 
                                placeholder="********" 
                                className="border-gray-500 border-2 rounded-md p-3 focus:border focus:border-[#ccc] outline-none outline-offset-2" 
                            />
                        </div>
                        <div className="flex items-center justify-between mt-8">
                            <div className="">
                                <span className="text-gray-500 text-[12px]">Already a user?</span>
                                <Link href="/login" passHref>
                                    <span className="text-[#0fa84e] cursor-pointer mx-2 text-[12px]">
                                        Login
                                    </span>
                                </Link>
                            </div>
                            <button className="bg-[#0fa84e] text-white font-semibold py-2 px-14 rounded-md">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="mt-[15vh] text-[10px] italic flex flex-col space-y-2 text-center text-gray-500">
                <span>V 1.0.0</span>
                <span className="">Designed by Frokes</span>
            </div>
        </motion.div>
  )
}

export default Signup
