import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

export default function useUpdateCampgroundForm ({ _id, campground }) {
    const BASE_URL = 'http://localhost:5000'
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/campgrounds/${_id}?_method=PUT`, campground,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
            if (response.status === 200) {
                toast.success('Campground updated successfully !')
                router.push(`/campgrounds/${response.data.updatedCampgroundId}`)
            }
        })
            .catch(err => {
                const { statusCode, message, stack } = err.response.data
                toast.error('Ooops ! Something went wrong ...')
                router.push(`/error?statusCode=${statusCode}&message=${message}&stack=${stack}`)
            })
    }

    return { handleSubmit }
}
