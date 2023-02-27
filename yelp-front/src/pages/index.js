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
    <>
      <h1>All Campgrounds</h1>
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
    </>
  )
}
