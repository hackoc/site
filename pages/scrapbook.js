import Masonry from 'react-masonry-css'

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Icon from '@hackclub/icons'
import Modal from '../components/Modal'
import { useEffect, useRef, useState } from 'react';
import splitbee from '@splitbee/web';
import with$, { withNodrag } from '../utils/cssUtils';
import useMedia, { useViewport } from '../utils/useMedia';
import Sidebar from '../components/Sidebar';

const meta_desc = "Orange County's first high school coding event since the pandemic. Join us for 12 hours of hacking, workshops, & friendship.";
const theme_color = '#FA7B33';
const social_image = '/social.png';

const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

// const timelapseId = "9x00RCb1N7WTpAl6cIN0000Kult00vyzslROW6A1RblWwxM"

const timelapseId = "402YMZJfp6kW02302E3r1RMe013Ub9AqlPwzr4VjD00HO7ME"

export function usePosts () {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        fetch('/api/posts').then(res => res.json()).then(posts => {
            setPosts(posts);
        });
    }, []);

    return [posts ?? [], posts == null];
}

export function BaseCard ({ children, style }) {
  return (
    <div style={{
      background: 'rgba(var(--orange-3-values), 0.3)',
      padding: '1rem',
      borderRadius: '6px',
      ...(style ? style : {}),
      }} className="post">
      {children}
    </div>
  )
}

export function Update ({ post, id }) {
    const [overwrite, setOverwrite] = useState(false);
    const ref = useRef();
    useEffect(() => {
        if (post.shortId == id) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                setOverwrite(true);
            }, 100);
        }
    }, [post.shortId, id])
    
  return (

    <BaseCard style={{...(((post.shortId == id) && !overwrite) ? {
            background: 'rgba(var(--orange-3-values), 0.6)',
        } : {
            background: 'rgba(var(--orange-3-values), 0.3)',
        }),

        transition: 'all 1s ease-in-out',

        ...(((post.shortId == id)) ? {
            border: '2px solid rgba(var(--orange-3-values), 1)',
        } : {})
        }}>
      <span style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'

      }}>

      <img style={{
        display: 'inline-block',
        maxWidth: '50px',
        maxHeight: '50px',
        borderRadius: '50%',
      }} src={post.avatar} />
      <h1 ref={ref} style={{
        margin: '0px',
        marginLeft: '10px',
        display: 'inline-block',
        verticalAlign: 'middle',
        fontSize: '24px'
      }}>{post.name ?? 'Unknown Author'}</h1>

      </span>
      <center>
      <img style={{
        maxWidth: '100%',
        maxHeight: '384px',
        borderRadius: '6px',
        marginTop: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }} src={post.image} />
</center>
<div style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
}}>
    <p style={{ marginBottom: '0px'}}>{new Date(parseInt(post._id.substring(0, 8), 16) * 1000).toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}</p>
    <span style={{ flexGrow: '1' }}></span>
</div>
    </BaseCard>
  )
}

export default function Home() {
  const [modal, setModal] = useState(false);
  const [posts, loading] = usePosts();
  const [id, setId] = useState(null);

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname.startsWith('/s/')) {
        setId(pathname.substring(3));
    }
  }, []);


  const { width, height } = useMedia();

  return (
    <>
    <Modal visible={modal} setVisible={setModal}>
      <iframe src="https://bank.hackclub.com/donations/start/hackoc" style={{
        width: '100%',
        height: '100%',
        border: 'none',
        borderRadius: '8px',
        border: '2px solid var(--orange)'
      }} onLoad={e => {
        if (!e.target.src.endsWith('donations/start/hackoc')) splitbee.track("Donation", {
          url: e.target.src
        });
      }}>

      </iframe>
    </Modal>
    <div className={styles.container} style={{
      position: 'relative',
      zIndex: '10',
      overflow: 'hidden'
    }}>
      <Head>
        <title>Hack OC - Orange County's high school hackathon</title>
        <meta name="description" content={meta_desc} />
        <link rel="icon" href="/favicon.ico" />
        <meta key="og_locale" property="og:locale" content="en_US" />
        <meta key="og_type" property="og:type" content="website" />
        <meta key="og_site" property="og:site_name" content="Hack OC" />
        <meta key="og_title" property="og:title" content="Hack OC - Orange County's high school hackathon" />
        <meta key="desc" name="description" content={meta_desc} />
        <meta key="og_desc" property="og:description" content={meta_desc} />
        <meta key="tw_desc" name="twitter:description" content={meta_desc} />
        <meta key="theme_color" name="theme-color" content={theme_color} />
        <meta key="og_img" property="og:image" content={social_image} />
        <meta key="tw_card" name="twitter:card" content="summary_large_image" />
        <meta key="tw_img" name="twitter:image" content={social_image} />
      </Head>

      <main >
        <div className="background-charcoal color-white" style={{
          width: '100%',
          padding: '5rem 2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h1 className={styles.title}> 
            Scrapbook
          </h1>
          <a href="/">
            <p className={styles.description} style={{
            marginTop: '40px',
            marginBottom: '0px'
          }}>
          Learn more about 
          <span className="color-orange">
            <b>{' '}
              Hack OC
              <Icon glyph="external" size={32} style={{
                transform: 'translate(2px, 6px)'
              }} />
            </b>
          </span></p>
        </a>

          <video
            autoPlay
            muted
            loop
            playsInline
            poster={`https://image.mux.com/${timelapseId}/thumbnail.png?width=214&height=121&fit_mode=pad`}
            duration={2000}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 'auto!important',
              width: '100% !important',
              minHeight: '600px',
              objectFit: 'cover',
              zIndex: -1
            }}
        >
          <source src={`https://stream.mux.com/${timelapseId}.m3u8`} />
          <source src={`https://stream.mux.com/${timelapseId}/medium.mp4`} />
        </video>
        </div>

        {/* <div style={{
          backgroundImage: "url('https://cloud-ff9d9ddrh-hack-club-bot.vercel.app/0dots_orange.svg')",
          // repeat
          backgroundRepeat: 'repeat',
          margin: '0px',
          // padding: '20px 70px',
          textAlign: 'center',
        }} className={styles.prizes}>
          <h1 style={{
            color: 'white',
            // big black text shadow, comic book style
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontWeight: 'bold',
            textShadow: `black 4px 4px 0px`
          }}>
            Progress updates from <span style={{
              textDecoration: 'underline'
            }}>Hack&nbsp;OC</span>
          </h1>
          <h2 style={{
            padding: '10px',
            // orange
            background: '#ffffff66',
            borderRadius: '10px',
            marginTop: '-10px',
            marginBottom: '24px',
            display: 'inline-block'
          }}>
            Hacekrs were given 12 hours to build something cool. Here's what they made!

          </h2>

        </div> */}

        {/* UNCOMMENT AFTER EVENT!!!!! */}

                  {/* 3 columns on large screens, 2 on medium, 1 on small */}

        {(() => {
            if (loading) {
                return (
                    <center>
                        <h1>
                            Loading...
                        </h1>
                    </center>
                )
            } else {
                return (
                    <Masonry
                    breakpointCols={{
                        10000: 4,
                        1500: 3,
                        800: 2,
                        520: 1,
                        default: 1
        
                    }}
                    className="masonry-posts"
                    columnClassName="masonry-posts-column"
        
                    >
        
                        {posts.map((post, index) => {
                            return (
                                <Update key={index} post={post} id={id} />
                            )
                        })}
        
                    </Masonry>
                )
            }

        })()}
    <style jsx global key="masonry-style">{`
      .masonry-posts {
        display: flex;
        width: 100%;
        box-sizing: border-box;
        max-width: 100%;
        margin-top: 2px;
      }

      .masonry-posts-column {
        background-clip: padding-box;
      }

      .post {
        margin-bottom: 2px;
      }

      @media (min-width: 32em) {
        .masonry-posts {
          padding-right: 12px;
          padding-top: 12px;
        }

        .masonry-posts-column {
          padding-left: 12px;
        }

        .post {
          border-radius: 12px;
          margin-bottom: 12px;
        }
      }

      @media (min-width: 64em) {
        .masonry-posts {
          padding-right: 24px;
          padding-top: 24px;
        }

        .masonry-posts-column {
          padding-left: 24px;
        }

        .post {
          margin-bottom: 24px;
        }
      }
    `}</style>

      </main>
      <div style={{
        background: '#ddd',
        fontWeight: '300',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        width: '100vw',
        flexDirection: 'column'
      }} className={styles.bottomFooter}>
        <div>
          Hack OC is fiscally sponsored by The Hack Foundation.
          Nonprofit EIN: 81-2908499.
        </div>
        <div style={{ marginTop: '10px', marginBottom: '-8px' }}>
          <a href="https://instagram.com/hack.oc" data-splitbee-event="Instagram Click" data-splitbee-event-location="footer">
            <Icon glyph='instagram' size={32} />
          </a>
          <a href="https://github.com/hackoc" data-splitbee-event="GitHub Click" data-splitbee-event-location="footer">
            <Icon glyph='github' size={32} />
          </a>
          <a href="https://bank.hackclub.com/hackoc" data-splitbee-event="Finances Click" data-splitbee-event-location="footer">
            <Icon glyph='bank-account' size={32} />
          </a>
          <a href="mailto:team@hackoc.org" data-splitbee-event="Email Click" data-splitbee-event-location="footer">
            <Icon glyph='email' size={32} />
          </a>
          <a href="https://twitter.com/letshackoc" data-splitbee-event="Twitter Click" data-splitbee-event-location="footer">
            <Icon glyph='twitter' size={32} />
          </a>
        </div>
      </div>
    </div>
    </>
  )
}
