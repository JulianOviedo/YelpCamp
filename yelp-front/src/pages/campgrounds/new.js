import Link from "next/link"

export default function NewCampground() {

    const BASE_URL = 'http://localhost:5000'

    return (
        <>
            <h1>New Campground</h1>
            <form action={`${BASE_URL}/campgrounds`} method="POST">
                <label htmlFor='title'> Title
                    <input type='text' id="title" name='campground[title]'></input>
                </label>
                <label htmlFor='location'> Location
                    <input type='text' id="location" name='campground[location]'></input>
                </label>
                <button type="submit">Add Campground</button>
            </form>
            <Link href='/'>Back to Home</Link>
        </>
    )
}