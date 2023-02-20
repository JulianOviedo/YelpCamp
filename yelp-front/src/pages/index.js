import { useEffect } from "react"

const BASE_URL = 'http://localhost:5000'
const test = process.env.BASE_URL
console.log(test)

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
