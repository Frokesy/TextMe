import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const Login = () => {
  return (
    <motion.div 
    className="w-[85vw] mx-auto pt-[3vh]"
    initial={{ opacity: 0, scale: 1.5 }}
    animate={{ opacity: 1, scale: [1.5 , 0.75, 1] }}
    transition={{ duration: 1.5 }}
    >
            <h2 className="text-[#0fa84e] font-[Combo] font-semibold text-[28px]">TextMe</h2>
            <div className="text-[#ccc] mt-[10vh]">
                <h2 className="text-[24px]">Login</h2>
                <span className="text-gray-500 italic">Hello Champ! Please proceed to login.</span>
                <div className="flex flex-col">
                    <form>
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
                        <div className="flex justify-between mt-8">
                            <a href="#" className="text-[#ccc] text-[12px]">Forgot Password?</a>
                            <button className="bg-[#0fa84e] text-white font-semibold py-2 px-14 rounded-md">Login</button>
                        </div>
                    </form>
                    <div className="flex justify-end pt-10 items-center">
                        <span className="text-gray-500 text-[12px]">Don&apos;t have an account?</span>
                        <Link href="#" passHref>
                            <span className="text-[#0fa84e] mx-2 text-[12px]">
                                Let&apos;s get started
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-[15vh] text-[10px] italic flex flex-col space-y-2 text-center text-gray-500">
                <span>V 1.0.0</span>
                <span className="">Designed by Frokes</span>
            </div>
        </motion.div>
  )
}

export default Login
