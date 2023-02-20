import { useEffect } from "react"

const BASE_URL = 'http://localhost:5000'

export default function Home() {
  useEffect(() => {
    fetch(`${BASE_URL}/api`).then(res => console.log(res))
  }, [])

  return (
    <>
      <h1>hello yelp !</h1>
    </>
  )
}
