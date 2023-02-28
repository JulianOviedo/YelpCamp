import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function EditCampground({ _id }) {
    const [campground, setCampground] = useState({})

    useEffect(() => {
        const fetchCampgroundDetails = async () => {
            const res = await axios.get(`http://localhost:5000/campgrounds/${_id}`)
            setCampground(res.data.campground)
        }
        fetchCampgroundDetails()
    }, [_id])

    const BASE_URL = 'http://localhost:5000'

    return (
        <>
            <h1>Edit Campground</h1>
            <form action={`${BASE_URL}/campgrounds/${_id}?_method=PUT`} method='POST'>
                <label htmlFor='title'> New Title
                    <input type='text' id="title" name='campground[title]' placeholder={campground.title}></input>
                </label>
                <label htmlFor='location'> New Location
                    <input type='text' id="location" name='campground[location]' placeholder={campground.location}></input>
                </label>
                <button type="submit">Edit Campground</button>
            </form>
            <Link href={`/campgrounds/${_id}`}>Go back</Link>
        </>
    )
}


EditCampground.getInitialProps = async ({ query }) => {
    const { _id } = query
    return { _id }
}