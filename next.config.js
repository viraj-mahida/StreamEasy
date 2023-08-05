/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com', 'yt3.ggpht.com', 'lh3.googleusercontent.com']
  },
  env: {
    YT_API_KEY_1: process.env.YT_API_KEY_1,
    YT_API_KEY_2: process.env.YT_API_KEY_2,
    YT_API_KEY_3: process.env.YT_API_KEY_3,
    YT_API_KEY_4: process.env.YT_API_KEY_4,
    YT_API_KEY_5: process.env.YT_API_KEY_5,
    AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID
  }
}


module.exports = nextConfig
