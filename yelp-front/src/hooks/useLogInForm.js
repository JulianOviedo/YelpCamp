import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function useLogInForm () {
    const BASE_URL = 'http://localhost:5000'

    const [logInInfo, setLogInInfo] = useState({})
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
        axios.post(`${BASE_URL}/user/logIn`, logInInfo,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                if (response.status === 200) {
                    toast.success('Logged in successfully !')
                    router.push('/home')
                }
            })
            .catch(err => {
                console.log(err)
                toast.error('Password or Username are incorrect')
            })
    }
    return { handleInputChange, handleSubmit }
}
