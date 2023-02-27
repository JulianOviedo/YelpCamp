import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react"

export default function ShowCampground() {
    const [campground, setCampground] = useState([])

    const router = useRouter();
    const { _id } = router.query;
    useEffect(() => {
        const fetchCampgroundDetails = async () => {
            const res = await axios.get(`http://localhost:5000/campgrounds/${_id}`)
            await setCampground(res.data.campground)
        }
        fetchCampgroundDetails()
    }, [])


    return (
        <>
            <h1>Test by ID</h1>
            {campground && (
            <div key={campground.id}>
                <h1>{campground.title}</h1>
                <p>{campground.location}</p>
            </div>)}
        </>
    )
}
