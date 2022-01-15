import axios from 'axios';
const KEY = 'AIzaSyC5hpNTsYEx_HKO3lKRY01acojXcdHkdDY'; // mention your youtube API key here

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults:3,
        key: KEY
    }
})