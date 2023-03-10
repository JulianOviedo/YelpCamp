import useFormValidation from '@/hooks/useValidateForm'
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

    const [formRef, isValidated] = useFormValidation()

    return (
        <div className="row">
            {campground && (
                <div className="col-6">
                    <div className="card mb-3">
                        <img src={campground.image} width={800} height={350} className="card-img-top" alt="campgroundImage" />
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
            )}
            <div className="col-6">
                <h2>Leave a Review</h2>
                <form action={`${BASE_URL}/campgrounds/${_id}/reviews`} method="POST" ref={formRef} className={isValidated ? 'was-validated' : 'form-validate mb-3'} noValidate>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="rating">Rating</label>
                        <input className="form-range" type="range" min="1" max="5" name="review[rating]" id="rating" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="body">Review</label>
                        <textarea className="form-control" name="review[body]" id="body" cols="30" rows="3" required></textarea>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
                {campground.review !== [] && campground.review.length > 0 && (
                    campground.review.map(r => (
                        <div key={r._id} className="card mb-3 ">
                            <div className="card-body">
                                <h5 className="card-title">{`Rating : ${r.rating}`}</h5>
                                <p className="card-text">{`Review : ${r.body}`}</p>
                                <form action="/campgrounds/<%=campground._id%>/reviews/<%=review._id%>?_method=DELETE" method="POST">
                                    <button className="btn btn-sm btn-danger">Delete</button>
                                </form>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>

    )
}

ShowCampground.getInitialProps = async ({ query }) => {
    const { _id } = query
    return { _id }
}
