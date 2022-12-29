import { useState } from 'react'
import { Box, Flex, Input, Button, VStack, useToast, Text } from '@chakra-ui/react'
import { useNavigate, useMatch, Link } from 'react-router-dom'
import axiosInstance from '../utils/axios'

const AuthForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isloading, setIsloading] = useState(false)
  const navigateTo = useNavigate()
  const isSignInRoute = useMatch('/login')
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsloading(true)
    if (isSignInRoute){
        try {
        const res = await axiosInstance.post('/api/token', { email, password })
        if (res) {
            setIsloading(false)
            console.log(res)
            localStorage.setItem('access_token', res.data.access)
            localStorage.setItem('refresh_token', res.data.refresh)
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token')
            navigateTo('/')
        }
        } catch (e) {
        setIsloading(false)
        toast({
            title: 'Invalid Credentials',
            description: e.message,
            status: 'error',
            duration: 5000,
        })
        }
    } else {
        try {
          const res = await axiosInstance.post('/api/user/register', { email, password })
          if (res) {
            setIsloading(false)
            console.log(res)
            navigateTo('/login')
          }
        } catch (e) {
          setIsloading(false)
          toast({
            title: 'Invalid Credentials',
            description: e.message,
            status: 'error',
            duration: 5000,
          })
        }
    }
  }

  return (
    <Box height="100vh" width="100vw" >
      <Flex direction='column' justify="center" align="center" height="calc(100vh - 200px)">
        <Box padding="40px" borderRadius="8px">
          <form onSubmit={handleSubmit}>
            <VStack width="100%" spacing="3">
              <Input
                required
                placeholder="Email"
                type="email"
                width="320px"
                variant='filled'
                onChange={(e) => setEmail(e.target.value.trim())}
              />
              <Input
                required
                placeholder="Password"
                type="password"
                width="320px"
                variant='filled'
                onChange={(e) => setPassword(e.target.value.trim())}
              />
            </VStack>
            <Box justify="center" align="center" marginTop={8} px={8}>
              <Button
                type="submit"
                bg="green.700"
                width="320px"
                _hover={{ background: 'green.500' }}
                isLoading={isloading}
              >
                <Text color='white'>{isSignInRoute ? 'Login' : 'Sign Up'}</Text>
              </Button>
            </Box>
          </form>
        </Box>
        <Box>
            {isSignInRoute
            ? (
                <Link to='/signup'><Text fontWeight='semibold'>Don't have an account?</Text></Link>
            ) : (
                <Link to='/login'><Text fontWeight='semibold'>Have an account?</Text></Link>
            )}
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
