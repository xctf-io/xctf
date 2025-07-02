/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net'],
  },
  webpack: (config, { isServer }) => {
    // Handle SQLite3 on the server side
    if (isServer) {
      config.externals.push('sqlite3');
    }
    return config;
  },
};

module.exports = nextConfig;