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
                    console.log('qonda')
                    toast.success('User has been created successfully !')
                    router.push('/')
                }
                if (response.data.err) {
                    const err = response.data.err.message
                    console.log('erorr')
                    return toast.error(err)
                }
            })
            .catch(err => {
                const { statusCode, message, stack } = err.response.data
                toast.error('Ooops ! Something went wrong ... Try again later')
                window.location.href = `/error?statusCode=${statusCode}&message=${message}&stack=${stack}`
            })
    }

    return { handleSubmit, handleInputChange }
}
