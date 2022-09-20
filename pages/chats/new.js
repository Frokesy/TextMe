import Link from 'next/link'
import React from 'react'
import { FaEdit, FaSearch } from 'react-icons/fa'
import Meta from '../../defaults/Meta'
import { Spinner, Avatar } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { supabase } from '../../utils/supabaseClient'
import { UserContext } from '../../context/UserContext'
import { v4 as uuidv4 } from 'uuid'

const NewChat = () => {
    const { user, recentSearches, setRecentSearches } = React.useContext(UserContext)
    const [searchResult, setSearchResult] = React.useState('')
    const [searchQuery, setSearchQuery] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const getSearchResults = async (e) => {
      setSearchQuery(e.target.value)
      setLoading(true)
      setTimeout(async () => {
        const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .ilike('username', `%${searchQuery}%`)
      if (error) {
        console.log(error)
      }
        setLoading(false)
        setSearchResult(data)
      }, 500)
      return
    }

    const createChat = async (id) => {
      console.log(id)
      //check if chat has already been created
      const { data: chatData, error:chatError } = await supabase
      .from('chats')
      .select('*')
      .eq('user_id', user.user_id)
      .eq('recipient_id', id)
      if (chatError) {
        console.log(chatError)
      }
      if (chatData?.length === 0) {
        console.log(chatData)
        console.log('chat created')
        const { data, error } = await supabase
        .from('chats')
        .insert([
          {
            chat_id: uuidv4(), 
            user_id: user.user_id,
            recipient_id: id
          }
        ])
        if (error) {
          console.log(error)
        }
        console.log(data)
      // //add id to local storage and set recent searches to the result
      // const recentSearch = JSON.parse(localStorage.getItem('recentSearches'))
      // const newRecentSearches = [...recentSearch, id]
      // localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches))
      // setRecentSearches(newRecentSearches)
      return
      } else {
        console.log('chat already exists')
      }
    }
      console.log(recentSearches)
  return (
    <div>
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
            <span className="text-center flex justify-center mt-[5vh] text-[10px] font-light text-gray-500">You have no recent searches in the last seven days</span>
          </div>
          <hr className="mt-14 w-[90vw] mx-auto" />
          <div className="mt-4 w-[90vw] mx-auto">
            <h1 className="text-neutral-400 font-semibold text-[16px]">Latest Search results</h1>
            {searchQuery.length < 1 ? (
              <span 
              className="text-center flex justify-center mt-[5vh] text-[10px] font-light text-gray-500"
              onChange={getSearchResults}
              >
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
                        onClick={() => createChat(result?.user_id)}
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
