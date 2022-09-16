import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import Loader from '../../components/Loader'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState({
        error: '',
        success: '',
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (!email || !password) {
            setMessage({
                error: 'All fields are required',
                success: '',
            })
            setTimeout(() => {
                setMessage({
                    error: '',
                    success: '',
                })
            }, 4000)
            setLoading(false)
            return
        }
        try {
            const { user, error } = await supabase.auth.signIn({
                email: email,
                password: password
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
                }, 4000)
                return
            }
            setLoading(false)
            setMessage({
                error: '',
                success: "Login successful, you'll be redirected shortly",
            })
            setTimeout(() => {
                router.push('/profile')
                setMessage({
                    error: '',
                    success: '',
                })
            }, 3000)
        } catch (error) {
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
            }, 4000)
        }
    }
  return (
    <div>
    {loading ? (
        <Loader />
    ) : (
    <motion.div 
    className="w-[85vw] mx-auto pt-[3vh]"
    initial={{ opacity: 0, scale: 1.5 }}
    animate={{ opacity: 1, scale: [1.5 , 0.75, 1] }}
    transition={{ duration: 1.5 }}
    >
            <h2 className="text-[#0fa84e] font-[Combo] font-semibold text-[28px]">TextMe</h2>
            <div className="text-[#ccc] mt-[6vh]">
                <h2 className="text-[24px]">Login</h2>
                <span className="text-gray-500 italic">Hello Champ! Please proceed to login.</span>
                {message && 
                <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1}} 
                className={`${ message.error && 'bg-red-700' } ${ message.success && 'bg-[#0fa84e]' }  ${ message.error && 'text-red-100' } ${ message.success && 'text-[#fff]' } p-3 text-[10px] font-semibold mt-4 rounded-md text-center`}>
                    { message.error ? message.error : message.success }
                </motion.p>
                }
                <div className="flex flex-col">
                    <form onSubmit={handleLogin}>
                        <div className="input-field flex flex-col space-y-2 mt-6">
                            <label htmlFor="email" 
                                className="text-[#ccc]">
                                    Email:
                            </label>
                            <input type="email" name="email" id="email" 
                                placeholder="johndoe@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-gray-500 border-2 rounded-md p-3 focus:border focus:border-[#ccc] outline-none outline-offset-2" 
                            />
                        </div>
                        <div className="flex items-center justify-between mt-8">
                            <Link href="#" passHref>
                                <span className="text-[#ccc] cursor-pointer text-[12px]">
                                    Forgot Password?
                                </span>
                            </Link>
                            <button className="bg-[#0fa84e] text-white font-semibold py-2 px-14 rounded-md">Login</button>
                        </div>
                    </form>
                    <div className="flex justify-end pt-10 items-center">
                        <span className="text-gray-500 text-[12px]">Don&apos;t have an account?</span>
                        <Link href="/signup" passHref>
                            <span className="text-[#0fa84e] cursor-pointer mx-2 text-[12px]">
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
    )}
    </div>
  )
}

export default Login
