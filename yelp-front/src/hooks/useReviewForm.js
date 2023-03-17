import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const BASE_URL = 'http://localhost:5000'

export default function useReviewForm({ _id }) {
    const [reviewInfo, setReviewInfo] = useState({})
    const router = useRouter()

    const handleInputChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setReviewInfo({
            ...reviewInfo,
            [name]: value
        }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/campgrounds/${_id}/reviews`, reviewInfo,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                if (response.status === 200) {
                    toast.success('Review added successfully !')
                    router.reload()
                }
            })
            .catch(err => {
                const { statusCode, message, stack } = err.response.data
                toast.error('Ooops ! Something went wrong ... ')
                router.push(`/error?statusCode=${statusCode}&message=${message}&stack=${stack}`)
            })
    }

    return {
        handleInputChange, handleSubmit
    }
}
