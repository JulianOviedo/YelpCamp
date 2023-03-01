import axios from 'axios'

export default async function getCampgrounds () {
    const response = await axios.get('http://localhost:5000/campgrounds')
    return response.data
}
