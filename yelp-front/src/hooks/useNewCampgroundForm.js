import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const BASE_URL = 'http://localhost:5000'

export default function useNewCampgroundForm() {
    const [inputInfo, setInputInfo] = useState({})
    const router = useRouter()

    const handleInputChage = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setInputInfo({
            ...inputInfo,
            [name]: value
        }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/campgrounds`, inputInfo,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                if (response.status === 200) {
                    toast.success('Campground added successfully !')
                    router.push(`/campgrounds/${response.data.newCampgroundId}`)
                }
            })
            .catch(err => {
                const { statusCode, message, stack } = err.response.data
                toast.error('Ooops ! Something went wrong ... Try again later')
                router.push(`/error?statusCode=${statusCode}&message=${message}&stack=${stack}`)
            })
    }

    return {
        handleInputChage, handleSubmit
    }
}
