import Link from 'next/link'
import useFormValidation from '@/hooks/useValidateForm'
import useNewCampgroundForm from '@/hooks/useNewCampgroundForm'
import LoadingButton from './LoadingButton'

export default function NewCampgroundForm() {
    const [formRef, isValidated] = useFormValidation()
    const { handleSubmit, handleInputChage } = useNewCampgroundForm()

    return (
        <>
            <div className="row">
                <h1 className="text-center">New Campground</h1>
                <div className="col-6 offset-3">
                    <form ref={formRef} onSubmit={handleSubmit} noValidate className={isValidated ? 'was-validated' : 'form-validate'} >
                        <div className="mb-3">
                            <label className="form-label" htmlFor="title">Title</label>
                            <input className="form-control" type="text" name="campground[title]" required onChange={handleInputChage} />
                            <div className='valid-feedback'>
                                Looks Good!
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="location">Location</label>
                            <input className="form-control" type="text" id="location" name="campground[location]" required onChange={handleInputChage} />
                            <div className='valid-feedback'>
                                Looks Good!
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="image">Image Url</label>
                            <input className="form-control" type="text" id="image" name="campground[image]" required onChange={handleInputChage} />
                            <div className='valid-feedback'>
                                Looks Good!
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="price">Campground Price</label>
                            <div className="input-group">
                                <span className="input-group-text" id="price-label">$</span>
                                <input type="text" className="form-control" id="price" placeholder="0.00" aria-label="price"
                                    aria-describedby="price-label" name="campground[price]" required onChange={handleInputChage}/>
                                <div className='valid-feedback'>
                                Looks Good!
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="description">Description</label>
                            <textarea className="form-control" type="text" id="description" name="campground[description]" required onChange={handleInputChage}/>
                            <div className='valid-feedback'>
                                Looks Good!
                            </div>
                        </div>
                        <div className="mb-3">
                            {isValidated ? <LoadingButton value='   Saving Campground...'/> : <button className="btn btn-success">Add Campground</button>}
                        </div>
                    </form>
                    <Link href='/'>Back to Home</Link>
                </div>
            </div>

        </>

    )
}
