import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function EditCampground({ _id }) {
    const [campground, setCampground] = useState({})
    const BASE_URL = 'http://localhost:5000'

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
            <div className="row">
                <h1 className="text-center">Edit Campground</h1>
                <div className="col-6 offset-3">
                    <form action={`${BASE_URL}/campgrounds/${campground._id}?_method=PUT`} method="POST">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="title">Title</label>
                            <input className="form-control" type="text" id="title" name="campground[title]"
                                value={campground.title} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="location">Location</label>
                            <input className="form-control" type="text" id="location" name="campground[location]"
                                value={campground.location} onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="image">Image Url</label>
                            <input className="form-control" type="text" id="image" name="campground[image]"
                                value={campground.image} onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="price">Campground Price</label>
                            <div className="input-group">
                                <span className="input-group-text" id="price-label">$</span>
                                <input type="text" className="form-control" id="price" placeholder="0.00" aria-label="price"
                                    aria-describedby="price-label" name="campground[price]" value={campground.price} onChange={handleChange}/>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="description">Description</label>
                            <textarea className="form-control" type="text" id="description"
                                name="campground[description]" value={campground.description} onChange={handleChange}></textarea>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-info">Update Campground</button>
                        </div>
                    </form>
                    <Link href={`/campgrounds/${campground._id}`}>Go back</Link>

                </div>
            </div>
        </>
    )
}

EditCampground.getInitialProps = async ({ query }) => {
    const { _id } = query
    return { _id }
}
