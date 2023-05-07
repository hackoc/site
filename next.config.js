/** @type {import('next').NextConfig} */

const campaigns = {
  capo: 'https://hackoc.org/?utm_source=poster&utm_medium=physical&utm_campaign=capo&utm_content=qr',
  ihs: 'https://hackoc.org/?utm_source=poster&utm_medium=physical&utm_campaign=ihs&utm_content=qr',
  test: 'https://example.com/?utm_source=poster&utm_medium=physical&utm_campaign=test&utm_content=qr'
};

const releases = {
  '2023-03-13': '1.pdf'
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => {
    return [
	    {
	      source: "/bee.js",
	      destination: "https://cdn.splitbee.io/sb.js",
        
	    },
	    {
	      source: "/_hive/:slug",
	      destination: "https://hive.splitbee.io/:slug",
	    },
      {
        source: '/registration/link-discord/callback',
        destination: '/api/discord/link',
      },
      {
        source: '/s/:id',
      	destination: '/scrapbook',
      },
      {
        source: '/h/:id',
      	destination: '/ships',
      },
      ...Object.entries(releases).map(([ name, file ]) => ({
        source: `/press/releases/${name}`,
        destination: `/press/${file}`,
      }))
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
        source: '/lastchance',
        destination: 'https://hackoc.org/?utm_source=twitter&utm_campaign=lastchance&utm_medium=link&utm_content=lastchance',
        basePath: false,
        permanent: false
      },
      {
        source: '/event/1',
        destination: 'https://hackoc.org/discord',
        basePath: false,
        permanent: false
      },
      {
        source: '/branding',
        destination: 'https://www.figma.com/file/R1sQCpxFQqQ8laUmySwoZ3/Hack-OC-Branding-%7C-Public-Facing?node-id=0%3A1&t=sCjA6w0V7Q2b639x-1',
        basePath: false,
        permanent: false
      },
      {
        source: '/gh/:repo',
        destination: 'https://github.com/hackoc/:repo',
        basePath: false,
        permanent: false
      },
      {
        source: '/github/:repo',
        destination: 'https://github.com/hackoc/:repo',
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
      },
      {
        source: '/vote',
        destination: 'https://forms.gle/mM6ezbSRbWGJhfxb9',
        basePath: false,
        permanent: false
      },
      {
      	source: '/flyer1',
      	destination: 'https://drive.google.com/file/d/1VOOkyHptTRwy-sA1JrVfYu-Vu4Y0MEyw/view',
      	basePath: false,
      	permanent: false
      },
      ...Object.entries(campaigns).map(([campaign, url]) => ({
        source: `/c/${campaign}`,
        destination: url,
        basePath: false,
        permanent: false
      }))
    ]
  }
}

module.exports = nextConfig
