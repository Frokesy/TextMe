import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaEdit, FaSearch } from 'react-icons/fa'
import Meta from '../../defaults/Meta'
import { Spinner, Avatar } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { supabase } from '../../utils/supabaseClient'
import { UserContext } from '../../context/UserContext'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'

const NewChat = () => {
    const router = useRouter()
    const { recentSearches, setRecentSearches } = React.useContext(UserContext)
    const [user, setUser] = React.useState(null)
    const [searchResult, setSearchResult] = React.useState('')
    const [searchQuery, setSearchQuery] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    let recentSearch = []
    
    const getSearchResults = async (e) => {
      setSearchQuery(e.target.value)
      setLoading(true)
      setTimeout(async () => {
        const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('user_id', supabase.auth.user().id)
        .ilike('username', `%${searchQuery}%`)
      if (error) {
        console.log(error)
      }
        setLoading(false)
        setSearchResult(data)
      }, 500)
      return
    }
    const createChat = async (id, pic, username, name) => {
      const newRecentSearch = [
        {
          id: id,
          pic: pic,
          username: username,
          name: name
        }
      ]
      //add newRecentSearch to local storage
      recentSearch = JSON.parse(localStorage.getItem('recentSearches')) || []
      const searches = newRecentSearch.concat(recentSearch)
      localStorage.setItem('recentSearches', JSON.stringify(searches))
      if (typeof window !== 'undefined') {
        const search = JSON.parse(localStorage.getItem('recentSearches'))
        setRecentSearches(search)  
      }

      //check if chat has already been created
      const { data: chatData, error:chatError } = await supabase
      .from('chats')
      .select('*')
      if (chatError) {
        console.log(chatError)
      }
      const chatExists = chatData.find(chat => chat.sender_id === supabase.auth.user().id && chat.recipient_id === id) || chatData.find(chat => chat.sender_id === id && chat.recipient_id === supabase.auth.user().id)
      if (chatExists) {
        router.push(`/inbox/${chatExists.chat_id}`)
      } else {
        if (user) {
          const { data, error } = await supabase
          .from('chats')
          .insert([
            {
              chat_id: uuidv4(), 
              sender_id: user?.user_id,
              sender_name: user?.name,
              sender_username: user?.username,
              sender_pic: user?.profile_pic,
              recipient_id: id,
              recipient_name: name,
              recipient_username: username,
              recipient_pic: pic,
            }
          ])
          if (error) {
            console.log(error)
          }
          router.push(`/inbox/${data[0].chat_id}`)
        }     
      }


    }

    if (typeof window !== 'undefined') {
      setInterval(() => {
        localStorage.removeItem('recentSearches')
        setRecentSearches([])
      }, 1800000)
     }

     useEffect(() => {
      if (supabase.auth.user() === null) {
        router.push('/login')
      } else if (user?.user_id === null) {
        router.push('/login')
      }
    }, [router, user?.user_id])

    useEffect(() => {
          const search = JSON.parse(localStorage.getItem('recentSearches'))
          setRecentSearches(search)
    }, [setRecentSearches])

    useEffect(() => {
      const fetchUser = async () => {
      try {
          const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', supabase.auth.user().id)
          if (error) {
          setError(error)
          } else {
          setUser(data[0])
          }
      } catch (error) {
          setError(error)
      }}
      fetchUser()
  }, [])
  return (
    <div>
      <Meta title="New Chat" />
        <div className="w-[90vw] cursor-pointer items-center mx-auto pt-4 flex justify-center">
            <Link href="/profile" passHref>
              <Avatar size="lg" mx="auto" name={user?.name} src={user?.profile_pic} />
            </Link>
          </div>
          <div className="w-[90vw] mx-auto mt-2 flex items-center text-center justify-between">
              <h1 className="text-neutral-400 text-[24px]">New Chat</h1>
              <span className="text-[#08af4e] text-[16px]">
                <Link href="/chats" passHref>
                    Cancel
                </Link>
              </span>
          </div>
          <div className="w-[90vw] mx-auto mt-2 space-x-2 bg-neutral-800 items-center rounded-2xl p-3 offset-0 border-none text-[#ccc] flex text-[13px]">
              <FaSearch className="bg-transparent"/>
              <input type="text" 
              placeholder="search by username" 
              className="w-full h-full hover:border-none focus:border-none bg-transparent offset-0 outline-none border-none"
              value={searchQuery}
              onChange={getSearchResults}
              />
          </div>

          <div className="mt-4 w-[90vw] mx-auto">
            <h1 className="text-neutral-400 font-semibold text-[16px]">Recently Searched</h1>
            {recentSearches?.length > 0 ? (
              <div className="mt-4 -mb-4 flex justify-start space-x-12 max-w-[90vw] overflow-scroll">
              {recentSearches?.map((search, index) => (
                <div key={index} onClick={() => createChat(search?.id, search?.pic, search?.username, search?.name)} className="flex flex-col items-center space-y-1 text-center mt-2">
                  {search.id !== user?.user_id && (
                      <div>
                        <Avatar size="lg" name={search.username} src={search.pic} />
                        <span className="text-neutral-400 text-[10px] lowercase">@{search.username}</span>
                      </div>
                  )}
                </div>
              ))}
            </div>
            ) : (
              <div className="mt-2">
                <span className="text-center flex justify-center mt-[5vh] text-[10px] font-light text-gray-500">No recent searches</span>
              </div>
            )}

          </div>
          <hr className="mt-14 w-[90vw] mx-auto" />
          <div className="mt-4 w-[90vw] mx-auto">
            <h1 className="text-neutral-400 font-semibold text-[16px]">Latest Search results</h1>
            {searchQuery.length < 1 ? (
              <span className="text-center flex justify-center mt-[5vh] text-[10px] font-light text-gray-500">
                You have not made any search requests yet.
              </span>
            ) : (
              <div>
                {loading ? (
                <div className="flex justify-center mt-[5vh]">
                  <Spinner color="#0fa84e" />
                </div>
              ) : (
                <div>
                  {searchResult?.length ? (
                    <div>
                      {searchResult?.map((result) => (
                        <div 
                        key={result.id} 
                        className="flex cursor-pointer flex-col"
                        onClick={() => createChat(result?.user_id, result?.profile_pic, result?.username, result?.name)}
                        >
                          <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center">
                            <Avatar size="sm" name={result.username} src={result.profile_pic} />
                            <div className="flex flex-col mx-4 space-y-1" >
                              <span className="text-neutral-400 text-[14px] font-semibold">{result.name}</span>
                              <span className="text-neutral-400 text-[10px]">username: {result.username}</span>
                            </div>
                          </div>
                        </div>
                        {searchResult?.length > 1 && (
                          <hr className=" my-2 w-full mr-5 mx-auto "/>
                        )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <span className="text-center flex justify-center mt-[5vh] text-[10px] font-light text-gray-500">No results found</span>
                    </div>
                  )}     
                </div>
              )}
              </div>
            )}
          </div>
    </div>
  )
}

export default NewChat
