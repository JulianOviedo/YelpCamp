import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function useSignUpForm () {
    const BASE_URL = 'http://localhost:5000'
    const router = useRouter()

    const [SignUpInfo, setSignUpInfo] = useState({})

    const handleInputChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setSignUpInfo({
            ...SignUpInfo,
            [name]: value
        }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/user/signUp`, SignUpInfo,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                console.log(response.data)
                if (response.data.isRegistered) {
                    toast.success('User has been created successfully !')
                    router.push('/')
                }
            })
            .catch(err => {
                const { message } = err.response.data.err
                toast.error(message)
            })
    }

    return { handleSubmit, handleInputChange }
}
