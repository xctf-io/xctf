/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net'],
  },
  webpack: (config, { isServer }) => {
    // Handle SQLite3 and PostgreSQL on the server side
    if (isServer) {
      config.externals.push('sqlite3');
      config.externals.push('pg');
    }
    return config;
  },
};

module.exports = nextConfig;