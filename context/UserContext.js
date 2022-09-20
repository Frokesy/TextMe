import { createContext, useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient';

const UserContext = createContext()
const { Provider } = UserContext
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [recentSearches, setRecentSearches] = useState([])
    
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
        <Provider value={{ 
            user, 
            error,
            setUser,
            recentSearches,
            setRecentSearches
        }}
        >
            {children}
        </Provider>
    )
}   
export { UserContext, UserProvider }