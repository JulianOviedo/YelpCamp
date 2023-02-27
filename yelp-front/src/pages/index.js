import getCampgrounds from "@/helpers/getCampgrouds"

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

  console.log(campgrounds)
  return (
    <>
      <h1>All Campgrounds</h1>
      <div>
        <ul>
          {campgrounds.map(camp => {
            <>
              <li>
                <h2>camp.title</h2>
                <p>camp.description</p>
              </li>
            </>
          })}
        </ul>
      </div>
    </>
  )
}
