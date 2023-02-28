import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function ShowCampground({ _id }) {
    const [campground, setCampground] = useState([])

    useEffect(() => {
        const fetchCampgroundDetails = async () => {
            const res = await axios.get(`http://localhost:5000/campgrounds/${_id}`)
            setCampground(res.data.campground)
        }
        fetchCampgroundDetails()
    }, [])


    return (
        <>
            {campground && (
                <div key={campground.id}>
                    <h1>{campground.title}</h1>
                    <p>{campground.location}</p>
                </div>
            )}
            <Link href='/'>Back to Home</Link>
            <Link href={`/campgrounds/${_id}/edit`}>Edit Campground</Link>

        </>
    )
}


ShowCampground.getInitialProps = async ({ query }) => {
    const { _id } = query
    return { _id }
}