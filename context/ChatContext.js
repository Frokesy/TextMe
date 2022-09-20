import { createContext, useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient';

const ChatContext = createContext()
const { Provider } = ChatContext
const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const fetchChats = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
            .from('chats')
            .select('*')
            .order('id', { ascending: false })
            if (error) {
            setError(error)
            } else {
            setChats(data)
            }
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
        }
        fetchChats()
    }, [])
    
    return (
        <Provider value={{ 
            chats, 
            loading, 
            error,
            setChats,
        }}
        >
            {children}
        </Provider>
    )
};
export { ChatContext, ChatProvider }