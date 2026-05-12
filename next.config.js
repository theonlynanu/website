/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
  },
};

// Using MDX with remark or rehype plugins requires a touch more setup for this
// requirement, see Next docs for more info
const withMDX = require("@next/mdx")();

module.exports = withMDX(nextConfig);
