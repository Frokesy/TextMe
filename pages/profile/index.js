import React, { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoArrowBack, IoPower } from "react-icons/io5";
import { Spinner, Avatar } from '@chakra-ui/react'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'


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
    basicInfo: false,
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
    name: '',
    username: '',
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

  const updateBasicInfo = async (e) => {
    e.preventDefault()
    setLoading({
      ...loading,
      basicInfo: true,  
    })
    const name = update.name ? update.name : profile.name
    const username = update.username ? update.username : profile.username
    const { data, error } = await supabase
        .from('profiles')
        .update({ name, username })
        .eq('user_id', supabase.auth.user().id)
    if (error) {
        console.log(error)
        setMessage({
            error: error.message,
            success: '',
        })
    } else {
        setProfile(data[0])
        setMessage({
            error: '',
            success: 'Profile updated successfully',
        })
        setTimeout(() => {
            setMessage({
                error: '',
                success: '',
            })
        }, 2000)
        setEditData({
            ...editData,
            basicInfo: false,
        })
        setLoading({
          ...loading,
          basicInfo: false,
      })
    }

  }

  const updateAdditionalInfo = async (e) => {
    e.preventDefault()
    setLoading({
      ...loading,
      additionalInfo: true,
    })
    const email = update.email ? update.email : profile.email
    const mobile = update.mobile ? update.mobile : profile.mobile
    const summary = update.summary ? update.summary : profile.summary
    const { data, error } = await supabase
        .from('profiles')
        .update({ email, mobile, summary })
        .eq('user_id', supabase.auth.user().id)
    if (error) {
        console.log(error)
        setMessage({
            error: error.message,
            success: '',
        })
    } else {
        setProfile(data[0])
        setMessage({
            error: '',
            success: 'Profile updated successfully',
        })
        setTimeout(() => {
            setMessage({
                error: '',
                success: '',
            })
        }, 2000)
        setEditData({
            ...editData,
            additionalInfo: false,
        })
        setLoading({
          ...loading,
          additionalInfo: false,
      })
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
      {loading.default ? (
        <div className=" h-screen w-screen opacity-75 absolute flex items-center justify-center">
        <Spinner color="#0fa84e" size="lg" thickness="3px" />
      </div>
      ) : (
        <div className="pt-[3vh]">
          <div 
          onClick={() =>{
            router.push('/messages')
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


      <div className="w-[90vw] bg-neutral-800 rounded-lg shadow-md py-4 px-4 flex flex-col mx-auto mt-10">
        {editData.basicInfo ? (
          <div className="flex flex-col bg-transparent">
            <span className="text-neutral-400 text-[18px] font-semibold bg-transparent">Basic Info</span>
            <form className="bg-transparent" onSubmit={updateBasicInfo}>
              <div className="flex flex-col mt-4 bg-transparent">
                <label className="text-neutral-400 text-[13px] font-semibold bg-transparent">Name</label>
                <input type="text" 
                className="bg-transparent border-b-[1px] border-neutral-400 mt-4 text-neutral-400 text-[13px] font-semibold focus:border-b-[1px] offset-0 outline-none hover:border-b-[1px]" 
                placeholder={profile.name}
                value={update.name}
                onChange={(e) => setUpdate({ ...update, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col mt-4 bg-transparent">
                <label className="text-neutral-400 text-[13px] font-semibold bg-transparent">Username</label>
                <input type="text" 
                className="bg-transparent border-b-[1px] border-neutral-400 mt-4 text-neutral-400 text-[13px] font-semibold focus:border-b-[1px] offset-0 outline-none hover:border-b-[1px]" 
                placeholder={profile.username}
                value={update.username}
                onChange={(e) => setUpdate({ ...update, username: e.target.value })}
                />
              </div>
              <div className="flex bg-transparent flex-row justify-end mt-4">
                <button 
                  className="bg-[#0fa84e] text-[#fff] px-4 py-2 rounded-lg text-[12px] font-semibold">
                    
                      Save
                </button>
              </div>
            </form>
          </div>
        ) : (
        <div className="bg-transparent">
          <div className="flex justify-between bg-transparent">
            <span className="text-neutral-400 text-[18px] font-semibold bg-transparent">Basic Info</span>
            <span onClick={() => setEditData({...editData, basicInfo: true})} className="text-[#0fa84e] cursor-pointer text-[15px] font-semibold bg-transparent">Edit</span>
          </div>
          <div className="flex flex-col mt-4 bg-transparent">
            <span className="text-neutral-300 text-[13px] font-semibold bg-transparent">Name</span>
            <span className="text-neutral-400 text-[14px] bg-transparent">{profile?.name}</span>
          </div>
          <hr className="my-4" />
          <div className="flex flex-col bg-transparent">
            <span className="text-neutral-300 text-[13px] font-semibold bg-transparent">Username</span>
            <span className="text-neutral-400 italic text-[14px] bg-transparent"> 
              <span className="text-[#0fa84e] bg-transparent">@</span> 
              {profile?.username}
            </span>
          </div>
        </div>
        )}
      </div>


      <div className="w-[90vw] bg-neutral-800 rounded-lg shadow-md py-4 px-4 flex flex-col mx-auto mt-6">
        {editData.additionalInfo ? (
              <div className="flex flex-col bg-transparent">
              <span className="text-neutral-400 text-[18px] font-semibold bg-transparent">Basic Info</span>
              <form className="bg-transparent" onSubmit={updateAdditionalInfo}>
                <div className="flex flex-col mt-4 bg-transparent">
                  <label className="text-neutral-400 text-[13px] font-semibold bg-transparent">Email</label>
                  <input type="email" 
                  className="bg-transparent border-b-[1px] mt-4 border-neutral-400 text-neutral-400 text-[13px] font-semibold focus:border-b-[1px] offset-0 outline-none hover:border-b-[1px]" 
                  placeholder={profile.email}
                  value={update.email}
                  onChange={(e) => setUpdate({ ...update, email: e.target.value })}
                  />
                </div>
                <div className="flex flex-col mt-4 bg-transparent">
                  <label className="text-neutral-400 text-[13px] font-semibold bg-transparent">Mobile</label>
                  <input type="text" 
                  className="bg-transparent border-b-[1px] mt-4 border-neutral-400 text-neutral-400 text-[13px] font-semibold focus:border-b-[1px] offset-0 outline-none hover:border-b-[1px]" 
                  placeholder={profile.mobile}
                  value={update.mobile}
                  onChange={(e) => setUpdate({ ...update, mobile: e.target.value })}
                  />
                </div>
                <div className="flex flex-col mt-4 bg-transparent">
                  <label className="text-neutral-400 text-[13px] font-semibold bg-transparent">Profile Summary</label>
                  <textarea row="50" columns="50" type="text" 
                  className="bg-transparent border-b-[1px] mt-4 border-neutral-400 text-neutral-400 text-[13px] font-semibold focus:border-b-[1px] offset-0 outline-none hover:border-b-[1px]" 
                  placeholder={profile.summary}
                  value={update.summary}
                  onChange={(e) => setUpdate({ ...update, summary: e.target.value })}
                  />
                </div>
                <div className="flex bg-transparent flex-row justify-end mt-4">
                  <button 
                    className="bg-[#0fa84e] text-[#fff] px-4 py-2 rounded-lg text-[12px] font-semibold">
                      
                        Save
                  </button>
                </div>
              </form>
            </div> 
        ) : (
           <div className="bg-transparent">
            <div className="flex justify-between bg-transparent">
              <span className="text-neutral-400 text-[18px] font-semibold bg-transparent">Additional Info</span>
              <span onClick={() => setEditData({...editData, additionalInfo: true})} className="text-[#0fa84e] cursor-pointer text-[15px] font-semibold bg-transparent">Edit</span>
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
        )}
      </div>

      

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
