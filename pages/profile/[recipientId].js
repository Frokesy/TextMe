import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../utils/supabaseClient'
import AdditionalInfo from '../../components/profile/AdditionalInfo'
import BasicInfo from '../../components/profile/BasicInfo'
import { FaEdit } from 'react-icons/fa'
import { Avatar, Spinner } from '@chakra-ui/react'
import { IoArrowBack } from 'react-icons/io5'
import Meta from '../../defaults/Meta'


const RecipientProfile = () => {
    const router = useRouter()
    const { recipientId } = router.query
    const [profile, setProfile] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        const fetchRecipient = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', recipientId)
            if (error) {
                console.log(error)
            } else {
                setProfile(data[0])
                setLoading(false)
            }
        }
        fetchRecipient()
    }, [recipientId])


    return (
    <div>
       <Meta title={profile ? `${profile.username}'s profile` : 'Profile'} />
      {loading ? (
        <div className=" h-screen w-screen opacity-75 absolute flex items-center justify-center">
        <Spinner color="#0fa84e" size="lg" thickness="3px" />
      </div>
      ) : (
        <div className="pt-[3vh]">
          <div 
          onClick={() =>{
            router.push('/chats')
          }}
          className="flex mb-10 text-[#0fa84e] w-[90vw] mx-auto font-extrabold items-center">
            <IoArrowBack size={20} />
          </div>
      <div className="w-min aspect-square relative mx-auto">
        <Avatar size="2xl" mx="auto" name={profile?.name} src={profile?.profile_pic} />
        </div>

            <div className="w-[90vw] bg-neutral-800 rounded-lg shadow-md py-4 px-4 flex flex-col mx-auto mt-10">
                <div className="bg-transparent">
                <div className="flex justify-between bg-transparent">
                    <span className="text-neutral-400 text-[18px] font-semibold bg-transparent">Basic Info</span>
                </div>
                
                <div className="flex flex-col mt-4 bg-transparent">
                    <span className="text-neutral-300 text-[13px] font-semibold bg-transparent">Name</span>
                    <span className="text-neutral-400 text-[14px] bg-transparent">{profile?.name}</span>
                </div>
                <hr className="my-4" />
                <div className="flex flex-col bg-transparent">
                    <span className="text-neutral-300 text-[13px] font-semibold bg-transparent">Username</span>
                    <span className="text-neutral-400 text-[14px] lowercase bg-transparent"> 
                    <span className="text-[#0fa84e] bg-transparent">@</span> 
                    {profile?.username}
                    </span>
                </div>
                </div>
            </div>


            <div className="w-[90vw] bg-neutral-800 rounded-lg shadow-md py-4 px-4 flex flex-col mx-auto mt-6">
                <div className="bg-transparent">
                    <div className="flex justify-between bg-transparent">
                    <span className="text-neutral-400 text-[18px] font-semibold bg-transparent">Additional Info</span>
                    </div>
                    <div className="flex flex-col mt-4 bg-transparent">
                    <span className="text-neutral-300 text-[13px] font-semibold bg-transparent">Email</span>
                    <span className="text-neutral-400 text-[14px] bg-transparent">{profile?.email}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex flex-col bg-transparent">
                    <span className="text-neutral-300 text-[13px] font-semibold bg-transparent">Mobile</span>
                    <span className="text-neutral-400 text-[14px] bg-transparent">{profile?.mobile}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex flex-col bg-transparent">
                    <span className="text-neutral-300 text-[13px] font-semibold bg-transparent">Profile Summary</span>
                    <span className="text-neutral-400 text-[14px] bg-transparent">{profile?.summary}</span>
                    </div>
                </div>
            </div>
            <div className="my-14 text-[10px] italic flex flex-col space-y-2 text-center text-gray-500">
                <span>V 1.0.0</span>
                <span className="">Designed by Frokes</span>
            </div>
        </div>
        )}
    </div>    
  )
}

export default RecipientProfile
