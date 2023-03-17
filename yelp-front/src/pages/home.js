import CampgroundCard from '@/components/CampgroundCard'
import getCampgrounds from '@/helpers/getCampgrouds'
import Link from 'next/link'

// const BASE_URL = 'http://localhost:5000'

export async function getServerSideProps() {
    const campgrounds = await getCampgrounds()
    return {
        props: {
            campgrounds
        }
    }
}

export default function Home({ campgrounds }) {
    return (
        <>
            <h1>All Campgrounds</h1>
            <Link href='/campgrounds/new'>Add Campground</Link>
            <div>
                {campgrounds.map(camp => (
                    <CampgroundCard
                        key={camp._id}
                        id={camp._id}
                        image={camp.image}
                        title={camp.title}
                        description={camp.description}
                        location={camp.location} />
                ))}
            </div>
        </>
    )
}
