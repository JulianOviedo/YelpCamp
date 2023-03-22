import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'

export default function useLogInForm () {
    const [logInInfo, setLogInInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleInputChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setLogInInfo({
            ...logInInfo,
            [name]: value
        }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signIn('github', {
            identifier: logInInfo.email,
            password: logInInfo.password,
            redirect: false
        }).then(res => {
            if (res.ok) {
                toast.success('Logged in succesfully')
                setIsLoading(false)
                router.push('/home')
            }
            if (!res.ok) {
                toast.error('Wrong credentials')
                setIsLoading(false)
            }
        })
    }

    return { handleInputChange, handleSubmit, isLoading }
}
