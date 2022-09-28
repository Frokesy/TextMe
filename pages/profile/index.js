import React, { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoArrowBack, IoPower } from "react-icons/io5";
import { Spinner, Avatar } from '@chakra-ui/react'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import Meta from '../../defaults/Meta';
import BasicInfo from '../../components/profile/BasicInfo';
import AdditionalInfo from '../../components/profile/AdditionalInfo';


const Profile = () => {
  const router = useRouter();
  const [profile, setProfile] = React.useState(null)
  const [editData, setEditData] = React.useState({
    basicInfo: false,
    additionalInfo: false,
    links: false,
    password: false,
  })
  const [loading, setLoading] = React.useState({
    default: true,
    additionalInfo: false,
    links: false,
    password: false,
  })
  const [message, setMessage] = React.useState({
    error: '',
    success: '',
  })
  const [update, setUpdate] = React.useState({
    pic: '',
    email: '',
    mobile: '',
    summary: '',
  })

  const updatePic = (pics) => {
    if (pics === undefined) {
      setMessage({
        error: 'Please select a picture',
        success: '',
      })
      setTimeout(() => {
        setMessage({
          error: '',
          success: '',
        })
      }, 2000)
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "loveatlast");
      data.append("cloud_name", "dapeum1v8");
      fetch("https://api.cloudinary.com/v1_1/dapeum1v8/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUpdate({
            ...update,
            pic: data.url.toString(),
          });
          supabase
            .from("profiles")
            .update({ profile_pic: data.url.toString() })
            .eq("user_id", supabase.auth.user().id)
            .then((data) => {
              setProfile(data.data[0])
              setMessage({
                error: '',
                success: 'Profile picture updated successfully',
              })
              setTimeout(() => {
                setMessage({
                  error: '',
                  success: '',
                })
              }, 2000)
            })
        })
      } else {
        setMessage({
          error: 'Please select a valid image',
          success: '',
        })
        setTimeout(() => {
          setMessage({
            error: '',
            success: '',
          })
        }, 2000)
      }
  }


  const getUser = async () => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', supabase.auth.user().id)
    if (error) {
        console.log(error)
    } else {
        setProfile(data[0])
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
    } else {
      router.push('/')
    }
  }

  useEffect(() => {
    if (supabase.auth.user() === null) {
      router.push('/login')
    } else if (profile?.user_id === null) {
      router.push('/login')
    }
  }, [router, profile?.user_id])

  useEffect(() => {
    const updateDataInChat = async () => {
        const { data, error } = await supabase
            .from('chats')
            .select('*')
        if (error) {
            console.log(error)
        }
        
  const findUser = data.map(async user => {
    if (user.sender_id === supabase.auth.user().id) {
        const { data, error } = await supabase
            .from('chats')
            .update({ sender_pic: profile?.profile_pic })
            .eq('sender_id', supabase.auth.user().id)
        if (error) {
            console.log(error)
        }   
    }
    if (user.recipient_id === supabase.auth.user().id) {
        const { data, error } = await supabase
            .from('chats')
            .update({ recipient_pic: profile?.profile_pic })
            .eq('recipient_id', supabase.auth.user().id)
        if (error) {
            console.log(error)
        }
    }
    })
    return findUser
}
    updateDataInChat()
  }, [profile])

  useEffect(() => {
    setTimeout(() => {
        setLoading({
            ...loading,
            default: false,
        })
    }, 1000)
  }, [loading])

  useEffect(() => {
    getUser()
  }, [])



  return (
    <div>
      <Meta title={profile ? `${profile.username}'s profile` : 'Profile'} />
      {loading.default ? (
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
        <div className="absolute text-[#fff] right-[10%] top-[80%] w-5 aspect-square border-[3px] rounded-full">
            <input accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }}  onChange={(e) => updatePic( e.target.files[0])} />
            <label htmlFor="icon-button-file" className="cursor-pointer">
          <FaEdit />
          </label>
          </div>    
        </div>
        {message ? 
            (
                <p 
                className={`${ message.error && 'text-red-700' } ${ message.success && 'text-[#0fa84e]' } text-[10px] bg-transparent font-semibold mt-4 rounded-md text-center`}>
                    { message.error ? message.error : message.success }
                </p>
        ) : ('')}

        <BasicInfo profile={profile} setProfile={setProfile} />
        <AdditionalInfo profile={profile} setProfile={setProfile} />

      

      <div className="w-[90vw] bg-neutral-800 rounded-lg shadow-md py-4 px-4 flex flex-col mx-auto mt-6">
        <div className="flex justify-between bg-transparent">
          <span className="text-neutral-400 text-[18px] font-semibold bg-transparent">Useful Links</span>
          <span className="text-[#0fa84e] text-[15px] font-semibold bg-transparent">Edit</span>
        </div>
        <div className="flex flex-col mt-4 bg-transparent">
          <span className="text-neutral-300 text-[13px] bg-transparent">GitHub</span>
          <a href="#" className="text-blue-800 text-[14px] bg-transparent">www.github.com</a>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col bg-transparent">
          <span className="text-neutral-300 text-[13px] bg-transparent">LinkedIn</span>
          <a href="#" className="text-blue-800 text-[14px] bg-transparent">www.linkedin.com</a>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col bg-transparent">
          <span className="text-neutral-300 text-[13px] bg-transparent mb-2">Facebook</span>
          <a href="#" className="text-blue-800 text-[14px] bg-transparent">www.facebook.com</a>
        </div>
      </div>

      <div className="w-[90vw] bg-neutral-800 rounded-lg shadow-md py-4 px-4 flex flex-col mx-auto mt-6">
        <span className="text-neutral-400 text-[18px] font-semibold bg-transparent">Change Password</span>
        <div className="flex flex-col mt-4 bg-transparent">
          <span className="text-neutral-300 text-[13px] font-semibold bg-transparent">Current Password</span>
          <input type="password" className="text-neutral-200 mt-2 text-[14px] bg-transparent border-none focus:outline-none" />
        </div>
        <hr className="mb-4" />
        <div className="flex flex-col bg-transparent">
          <span className="text-neutral-300 text-[13px] font-semibold bg-transparent">New Password</span>
          <input type="password" className="text-neutral-200 mt-2 text-[14px] bg-transparent border-none focus:outline-none" />
        </div>
        <hr className="mb-4" />
        <div className="flex flex-col bg-transparent">
          <span className="text-neutral-300 text-[13px] font-semibold bg-transparent">Confirm Password</span>
          <input type="password" className="text-neutral-200 mt-2 text-[14px] bg-transparent border-none focus:outline-none" />
        </div>
        <hr />
        <div className="flex bg-transparent flex-row justify-end mt-4">
          <button className="bg-[#0fa84e] text-[#fff] px-4 py-2 rounded-lg text-[14px] font-semibold">Save</button>
        </div>
      </div>
      <div onClick={handleLogout} className="flex justify-center cursor-pointer my-10 font-semibold text-red-700 space-x-1 items-center">
        <IoPower size={16} />
        <span className=" text-[14px]">Logout</span>
      </div>
      <div className="my-10 text-[10px] italic flex flex-col space-y-2 text-center text-gray-500">
                <span>V 1.0.0</span>
                <span className="">Designed by Frokes</span>
      </div>
    </div>
        )}
    </div>
  )
}

export default Profile
