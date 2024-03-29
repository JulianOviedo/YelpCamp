import EditCampgroundForm from '@/components/EditCampgroundForm'
import useUpdateCampgroundForm from '@/hooks/useUpdateCampgroundForm'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function EditCampground({ _id }) {
    const [campground, setCampground] = useState({})
    const { handleSubmit } = useUpdateCampgroundForm({ _id, campground })

    useEffect(() => {
        const fetchCampgroundDetails = async () => {
            const res = await axios.get(`http://localhost:5000/campgrounds/${_id}`)
            setCampground(res.data.campground)
        }
        fetchCampgroundDetails()
    }, [_id])

    const handleChange = (e) => {
        const { id, value } = e.target
        setCampground(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    return (
        <>
            <EditCampgroundForm
                id={campground._id}
                imageUrl={campground.image}
                title={campground.title}
                description={campground.description}
                location={campground.location}
                price={campground.price}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </>
    )
}

EditCampground.getInitialProps = async ({ query }) => {
    const { _id } = query
    return { _id }
}
