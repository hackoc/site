/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
	    {
	      source: "/bee.js",
	      destination: "https://cdn.splitbee.io/sb.js",
	    },
	    {
	      source: "/_hive/:slug",
	      destination: "https://hive.splitbee.io/:slug",
	    },
	  ];
  },
  redirects: async () => {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/cPfHW8SQ5B',
        basePath: false,
        permanent: false
      },
      {
        source: '/finances',
        destination: 'https://bank.hackclub.com/hackoc',
        basePath: false,
        permanent: false
      },
      {
        source: '/bank',
        destination: 'https://hackoc.org/finances',
        basePath: false,
        permanent: false
      },
      {
        source: '/money',
        destination: 'https://hackoc.org/finances',
        basePath: false,
        permanent: false
      },
      {
        source: '/github',
        destination: 'https://github.com/hackoc',
        basePath: false,
        permanent: false
      },
      {
        source: '/donate',
        destination: 'https://bank.hackclub.com/donations/start/hackoc',
        basePath: false,
        permanent: false
      },
      {
        source: '/register',
        destination: 'https://hackoc.org',
        basePath: false,
        permanent: false
      },
      {
        source: '/contact',
        destination: 'mailto:team@hackoc.org',
        basePath: false,
        permanent: false
      },
      {
        source: '/prospectus',
        destination: 'https://hackoc.org/prospectus.pdf',
        basePath: false,
        permanent: false
      },
      {
        source: '/sponsorship-prospectus',
        destination: 'https://hackoc.org/prospectus.pdf',
        basePath: false,
        permanent: false
      },
      {
        source: '/email',
        destination: 'mailto:team@hackoc.org',
        basePath: false,
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
