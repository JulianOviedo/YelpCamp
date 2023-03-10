import Link from 'next/link'

export default function CampgroundCard ({ image, title, description, location, id }) {
    return (
        <div className='card mb-3' >
            <div className='row'>
                <div className='col-md-4'>
                    <img className='img-fluid' alt='campImg' src={image}></img>
                </div>
                <div className='col-md-8'>
                    <div className='card-body'>
                        <h5 className='card-title'>{title}</h5>
                        <p className='card-text'>{description}</p>
                        <p className='card-text'>
                            <small className='text-muted'>{location}</small>
                        </p>
                        <Link className='btn btn-primary' href={`/campgrounds/${id}`}>{`View ${title}`}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
