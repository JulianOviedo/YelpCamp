import Link from 'next/link'
import useFormValidation from '@/hooks/useValidateForm'

export default function NewCampgroundForm() {
    const BASE_URL = 'http://localhost:5000'

    const [formRef, isValidated] = useFormValidation()

    return (
        <>
            <div className="row">
                <h1 className="text-center">New Campground</h1>
                <div className="col-6 offset-3">
                    <form action={`${BASE_URL}/campgrounds`} ref={formRef} method="POST" noValidate className={isValidated ? 'was-validated' : 'form-validate'} >
                        <div className="mb-3">
                            <label className="form-label" htmlFor="title">Title</label>
                            <input className="form-control" type="text" id="title" name="campground[title]" required />
                            <div className='valid-feedback'>
                                Looks Good!
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="location">Location</label>
                            <input className="form-control" type="text" id="location" name="campground[location]" required />
                            <div className='valid-feedback'>
                                Looks Good!
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="image">Image Url</label>
                            <input className="form-control" type="text" id="image" name="campground[image]" required />
                            <div className='valid-feedback'>
                                Looks Good!
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="price">Campground Price</label>
                            <div className="input-group">
                                <span className="input-group-text" id="price-label">$</span>
                                <input type="text" className="form-control" id="price" placeholder="0.00" aria-label="price"
                                    aria-describedby="price-label" name="campground[price]" required />
                                <div className='valid-feedback'>
                                Looks Good!
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="description">Description</label>
                            <textarea className="form-control" type="text" id="description" name="campground[description]" required />
                            <div className='valid-feedback'>
                                Looks Good!
                            </div>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-success">Add Campground</button>
                        </div>
                    </form>
                    <Link href='/'>Back to Home</Link>
                </div>
            </div>

        </>

    )
}
