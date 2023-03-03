import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ShowCampground({ _id }) {
    const [campground, setCampground] = useState({})

    const BASE_URL = 'http://localhost:5000'

    useEffect(() => {
        const fetchCampgroundDetails = async () => {
            const res = await axios.get(`http://localhost:5000/campgrounds/${_id}`)
            setCampground(res.data.campground)
        }
        fetchCampgroundDetails()
    }, [_id])

    return (
        <>
            {campground && (
                <div className="row">
                    <div className="col-6 offset-3">
                        <div className="card mb-3">
                            <img src={campground.image} width={800} height={350} className="card-img-top" alt="campgroundImage"/>
                            <div className="card-body">
                                <h5 className="card-title">{campground.title}</h5>
                                <p className="card-text">{campground.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item text-muted">{campground.location}</li>
                                <li className="list-group-item">{'$' + campground.price}</li>
                            </ul>
                            <div className="card-body">
                                <Link className="card-link btn btn-info m-1" href={`/campgrounds/${_id}/edit`}>Edit</Link>
                                <form className="d-inline" action={`${BASE_URL}/campgrounds/${_id}?_method=DELETE`} method="POST">
                                    <button className="btn btn-danger">Delete</button>
                                </form>
                            </div>
                            <div className="card-footer text-muted">
                                2 days ago
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

ShowCampground.getInitialProps = async ({ query }) => {
    const { _id } = query
    return { _id }
}
