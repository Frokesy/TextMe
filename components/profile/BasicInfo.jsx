import React, { useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'


const BasicInfo = ({ profile, setProfile }) => {
    const [editData, setEditData] = React.useState(false)
    const [update, setUpdate] = React.useState({
        name: '',
        username: '',
      })
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState({
        error: '',
        success: '',
      })

    const updateBasicInfo = async (e) => {
        e.preventDefault()
        setLoading(true)
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
            setEditData(false)
            setLoading(false)
        }
      }
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
                .update({ sender_name: profile?.name, sender_username: profile?.username })
                .eq('sender_id', supabase.auth.user().id)
            if (error) {
                console.log(error)
            }   
        }
        if (user.recipient_id === supabase.auth.user().id) {
            const { data, error } = await supabase
                .from('chats')
                .update({ recipient_name: profile?.name, recipient_username: profile?.username })
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
  return (
    <div className="w-[90vw] bg-neutral-800 rounded-lg shadow-md py-4 px-4 flex flex-col mx-auto mt-10">
    {editData ? (
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
            <span onClick={() => setEditData(true)} className="text-[#0fa84e] cursor-pointer text-[15px] font-semibold bg-transparent">Edit</span>
          </div>
          {message ? 
            (
                <p 
                className={`${ message.error && 'text-red-700' } ${ message.success && 'text-[#0fa84e]' } text-[10px] bg-transparent font-semibold mt-4 rounded-md text-center`}>
                    { message.error ? message.error : message.success }
                </p>
          ) : ('')}
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
        )}
    </div>
  )
}

export default BasicInfo
