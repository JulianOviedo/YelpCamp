import axios from 'axios'
import { useState } from 'react'

const BASE_URL = 'http://localhost:5000'

export default function useNewCampgroundForm() {
    const [inputInfo, setInputInfo] = useState({})

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
                    window.location.href = `/campgrounds/${response.data.newCampgroundId}`
                }
            })
            .catch(err => {
                const { statusCode, message, stack } = err.response.data
                window.location.href = `/error?statusCode=${statusCode}&message=${message}&stack=${stack}`
            })
    }

    return {
        handleInputChage, handleSubmit
    }
}
