import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '../context/UserContext'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
    </UserProvider>
  )
}

export default MyApp
