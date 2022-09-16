import Link from 'next/link'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase } from '../../utils/supabaseClient'
import { useToast } from '@chakra-ui/react'
import { useRouter } from "next/router";
import Loader from '../../components/Loader'

const Signup = () => {
    const toast = useToast()
    const router = useRouter();
    const [userProfile, setUserProfile] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({
        error: '',
        success: '',
    })

    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)


        if (!userProfile.name || !userProfile.username || !userProfile.email || !userProfile.password) {
            setMessage({
                error: 'Please fill all the fields',
                success: '',
            })
            setTimeout(() => {
                setMessage({
                    error: '',
                    success: '',
                })
            }, 3000)
            setLoading(false)
            return
        }


        try {
            const { user, error } = await supabase.auth.signUp({
                email: userProfile.email,
                password: userProfile.password
            })
            if (error) {
                setLoading(false)
                setMessage({
                    error: error.message,
                    success: '',
                })
                setTimeout(() => {
                    setMessage({
                        error: '',
                        success: '',
                    })
                }, 3000)
                return
            }
            const id = user?.id

            const { data, error: authError } = await supabase.from("profiles").insert([
                {
                    user_id: id,
                    name: userProfile.name,
                    username: userProfile.username,
                    email: userProfile.email,
                }
            ])
            authError ? (
                setLoading(false),
                setMessage({
                    error: authError.message,
                    success: '',
                }),
                setTimeout(() => {
                    setMessage({
                        error: '',
                        success: '',
                    })
                }, 3000)
            ) : (
                setMessage({
                    error: "",
                    success: "Account created successfully, you'll be redirected shortly",
                }),
                setTimeout(() => {
                    router.push("/profile")
                    setMessage({
                        error: '',
                        success: '',
                    })
                }, 3000),
                setLoading(false)
            ) 
        } catch (error) {
            setLoading(false)
            setError(error?.message)
            setTimeout(() => {
                setError(null)
            }, 3000)
            console.log(error)
        }
    }
  return (
    <div>
        {loading ? (<Loader />) :
        (
    <motion.div 
    className="w-[85vw] mx-auto pt-[3vh]"
    initial={{ opacity: 0, scale: 1.5 }}
    animate={{ opacity: 1, scale: [1.5 , 0.75, 1] }}
    transition={{ duration: 1.5 }}
    >
            <h2 className="text-[#0fa84e] font-[Combo] font-semibold text-[28px]">TextMe</h2>
            <div className="text-[#ccc] mt-[6vh]">
                <h2 className="text-[24px]">Create an Account</h2>
                <span className="text-gray-500 italic">Welcome here, Sign Up to TextMe to get started!</span>
                {message && 
                <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1}} 
                className={`${ message.error && 'bg-red-500' } ${ message.success && 'bg-[#0fa84e]' }  ${ message.error && 'text-red-200' } ${ message.success && 'text-[#fff]' } p-3 text-[10px] font-semibold mt-4 rounded-md text-center`}>
                    { message.error ? message.error : message.success }
                </motion.p>
                }
                <div className="flex flex-col">
                    <form onSubmit={handleSignUp}>
                        <div className="input-field flex flex-col space-y-2 mt-6">
                            <label htmlFor="name" 
                                className="text-[#ccc]">
                                    Name:
                            </label>
                            <input type="name" name="name" id="name" 
                                placeholder="John Doe" 
                                className="border-gray-500 border-2 rounded-md p-3 focus:border focus:border-[#ccc] placeholder:italic outline-none outline-offset-2"
                                value={userProfile.name}
                                onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
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
                                value={userProfile.username}
                                onChange={(e) => setUserProfile({...userProfile, username: e.target.value})}
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
                                value={userProfile.email}
                                onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
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
                                value={userProfile.password}
                                onChange={(e) => setUserProfile({...userProfile, password: e.target.value})}
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
        )}
    </div>
  )
}

export default Signup
