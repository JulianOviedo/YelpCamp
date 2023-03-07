import Link from 'next/link'
import useFormValidation from '@/hooks/useValidateForm'

export default function EditCampgroundForm ({ id, title, location, imageUrl, price, description, onChange }) {
    const BASE_URL = 'http://localhost:5000'
    const [formRef, isValidated] = useFormValidation()

    return (
        <div className="row">
            <h1 className="text-center">Edit Campground</h1>
            <div className="col-6 offset-3">
                <form ref={formRef} action={`${BASE_URL}/campgrounds/${id}?_method=PUT`} method="POST" noValidate className={isValidated ? 'was-validated' : 'form-validate'}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input className="form-control" type="text" id="title" name="campground[title]"
                            value={title} onChange={onChange} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="location">Location</label>
                        <input className="form-control" type="text" id="location" name="campground[location]"
                            value={location} onChange={onChange} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="image">Image Url</label>
                        <input className="form-control" type="text" id="image" name="campground[image]"
                            value={imageUrl} onChange={onChange} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="price">Campground Price</label>
                        <div className="input-group">
                            <span className="input-group-text" id="price-label">$</span>
                            <input type="text" className="form-control" id="price" placeholder="0.00" aria-label="price"
                                aria-describedby="price-label" name="campground[price]" value={price} onChange={onChange} required/>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea className="form-control" type="text" id="description"
                            name="campground[description]" value={description} onChange={onChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-info">Update Campground</button>
                    </div>
                </form>
                <Link href={`/campgrounds/${id}`}>Go back</Link>

            </div>
        </div>
    )
}
