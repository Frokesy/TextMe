import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
        <>
            <h2 className="pt-[3vh] text-[#0fa84e] font-[Combo] font-semibold text-[28px]">TextMe</h2>
            <div className="text-[#ccc] mt-[10vh] w-[85vw]">
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
                            <a href="#" className="text-[#ccc]">Forgot Password?</a>
                            <button className="bg-[#0fa84e] text-white font-semibold py-2 px-14 rounded-md">Login</button>
                        </div>
                    </form>
                    <div className="flex justify-end pt-10 items-center">
                        <span className="text-gray-500 text-[10px]">Don&apos;t have an account?</span>
                        <Link href="#" passHref>
                            <span className="text-[#0fa84e] mx-2 text-[10px]">
                                Let&apos;s get started
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-[20vh] italic flex flex-col space-y-2 text-center text-gray-500">
                <span>V 1.0.0</span>
                <span className="">Designed by Frokes</span>
            </div>
        </>
  )
}

export default Login
