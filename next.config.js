/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        mdxRs: true,
    },
    env: {
        API_KEY: process.env.API_KEY
    }
}
const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
