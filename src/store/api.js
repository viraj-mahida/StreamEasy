import axios from 'axios';

const request = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    params: {
        key: process.env.YT_API_KEY_2,
        maxResults: 12,
        regionCode: "IN",
    },
})

export default request;