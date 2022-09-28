import React, { useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'

const AdditionalInfo = ({ profile, setProfile }) => {
    const [editData, setEditData] = React.useState(false)
    const [update, setUpdate] = React.useState({
        email: '',
        mobile: '',
        summary: '',
      })
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState({
        error: '',
        success: '',
      })

      const updateAdditionalInfo = async (e) => {
        e.preventDefault()
        setLoading(true)
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
            setEditData(false)
            setLoading(false)
        }
      }
  return (
    <div className="w-[90vw] bg-neutral-800 rounded-lg shadow-md py-4 px-4 flex flex-col mx-auto mt-6">
        {editData ? (
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
  )
}

export default AdditionalInfo
