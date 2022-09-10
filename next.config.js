/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/cPfHW8SQ5B',
        basePath: false
      },
      {
        source: '/finances',
        destination: 'https://bank.hackclub.com/hackoc',
        basePath: false
      },
      {
        source: '/github',
        destination: 'https://github.com/hackoc',
        basePath: false
      },
      {
        source: '/donate',
        destination: 'https://bank.hackclub.com/donations/start/hackoc',
        basePath: false
      },
      {
        source: '/register',
        destination: 'https://hackoc.org',
        basePath: false
      },
      {
        source: '/contact',
        destination: 'mailto:team@hackoc.org',
        basePath: false
      }
    ]
  }
}

module.exports = nextConfig
