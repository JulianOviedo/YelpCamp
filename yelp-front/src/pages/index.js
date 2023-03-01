import MainLayout from "@/components/MainLayout"
import getCampgrounds from "@/helpers/getCampgrouds"
import Link from "next/link"

const BASE_URL = 'http://localhost:5000'

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
    <MainLayout>
      <h1>All Campgrounds</h1>
      <Link href='/campgrounds/new'>Add Campground</Link>
      <div>
        <ul>
          {campgrounds.map(camp => (
            <Link key={camp._id} href={`/campgrounds/${camp._id}`}>
              <li >
                <h2>{camp.title}</h2>
                <p>{camp.location}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      </MainLayout>
  )
}
