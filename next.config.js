// const withTM = require("next-transpile-modules")(["@react-three/drei"]);
// module.exports = withTM({});
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeFonts: true,
  },
};

module.exports = nextConfig;
