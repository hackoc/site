import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Icon from '@hackclub/icons'
import Modal from '../components/Modal'
import { useEffect, useState } from 'react';
import splitbee from '@splitbee/web';
import with$, { withNodrag } from '../utils/cssUtils';
import useMedia, { useViewport } from '../utils/useMedia';

const meta_desc = "Orange County's first high school coding event since the pandemic. Join us for 12 hours of hacking, workshops, & friendship.";
const theme_color = '#FA7B33';
const social_image = '/social.png';

const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

// const timelapseId = "9x00RCb1N7WTpAl6cIN0000Kult00vyzslROW6A1RblWwxM"

const timelapseId = "402YMZJfp6kW02302E3r1RMe013Ub9AqlPwzr4VjD00HO7ME"

export function BaseCard ({ children, style }) {
  return (
    <div style={{
      background: 'rgba(var(--orange-3-values), 0.3)',
      padding: '1rem',
      borderRadius: '6px',
      ...(style ? style : {}),
      }}>
      {children}
    </div>
  )
}

export function ImageCard ({ style, src, alt, caption, left }) {
  return (
    <BaseCard style={{

      position: 'relative',
      ...(style ? style : {}),
    }}>
      <img src={src} alt={alt} style={with$('noselect', 'nodrag', {
        margin: '-1rem',
        width: 'calc(100% + 2rem)',
        height: 'calc(100% + 2rem)',
        boxSizing: 'border-box',
        borderRadius: '6px',
      })} />
      {caption && <p style={{
        fontSize: '1.2rem',
        position: 'absolute',
        color: 'white',
        bottom: '10px',
        margin: '10px',
        ...(left ? { left: '0px' } : { right: '10px' }),
      }}>{caption}</p>}
    </BaseCard>
  )
}

export function Card ({ title, icon, children, style }) {
  return (

    <BaseCard style={style}>
      <span style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'


      }}>

      
      <h1 style={{
        margin: '0px',
        display: 'inline-block',
        verticalAlign: 'middle'
      }}>{title}</h1>
                  <Icon style={{
                    display: 'inline-block'
                  }} glyph={icon} size={50} color="#fa7b33" />

      </span>
      <p style={{
        fontSize: '1.4rem',
      }}>{children}</p>

    </BaseCard>
  )
}

export default function Home() {
  const [modal, setModal] = useState(false);
  const handleFormEnter = () => { 
    if (regex.test(email) && !loading) {
      return window.location.href = '/register?email=' + encodeURIComponent(email);
      
      setLoading(true);
      fetch('https://ip.yodacode.xyz').then(res => res.json()).then(({ geo }) => {
        splitbee.track("Email Subscribe", {
          email,
          city: geo.city
        });
        fetch('/api/v2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            city: geo.city
          })
        }).then(() => {
          fetch('/api/webhook').then(() => {
            setSubmitted(true);
          });
        });
      })
    }
  };
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [donor, setDonor] = useState('');

  const { width, height } = useMedia();

  const cardSize = '380px';
  const cardGap = '20px';

  useEffect(() => {
    fetch('/api/donor').then(res => res.text()).then(setDonor);
    if (!localStorage.getItem('hackoc-analytics')) {
      fetch('https://ip.yodacode.xyz').then(res => res.json()).then(({ geo }) => {
        splitbee.user.set({
          city: geo.city
        });
        localStorage.setItem('hackoc-analytics', true);
      });
    }
  }, []);
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

      <main className={styles.main}>
        <div className="background-charcoal color-white" style={{
          width: '100%',
          padding: '5rem 2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h1 className={styles.title}> 
            Hack <span className="color-orange" style={{
              marginLeft: '-12px',
              position: 'relative'
            }}>
              OC
              <img src="/orange.svg" style={{
                position: 'absolute',
                bottom: '50%',
                left: '0px',
                transform: 'translate(10%, 44.5%)'
              }} className="noselect" />
            </span>
          </h1>
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
        <p className={styles.description}>
          <span className="color-orange">
            <b>
              <Icon glyph="pin" size={32} style={{
                transform: 'translate(2px, 6px)'
              }} />
              Orange County
            </b>
          </span>'s First Post-Pandemic Hackathon
        </p>
        <p className={styles.description} style={{
          marginTop: '-16px'
        }}>
          <span style={{
            color: '#ccc'
          }}>
            <b>
              <Icon glyph="event-code" size={32} style={{
                transform: 'translate(2px, 6px)',
                marginRight: '6px'
              }} />
              May 6th 9am-9pm
            </b>
          </span> at Anduril
        </p>
        <center style={{
          position: 'relative',
          height: '55px'
        }}>
          <p style={{opacity: submitted ? 1 : 0.7, color: submitted ? 'rgb(34, 191, 116)' : 'white'}}>{submitted ? 'Loading...' : 'Register here!'}</p>
          {!submitted &&
        <center className={styles.inputCenter} style={{
          display: 'block',
          marginTop: '2rem',
          display: 'flex',
          position: 'absolute',
          top: '0px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <div style={{
            background: 'black',
            padding: '0px',
            borderRadius: '6px',
            maxWidth: '300px',
            height: '53px',
            textAlign: 'center',
            boxSizing: 'border-box',
            width: '300px'
          }}>
          <div className={styles.input} style={{
            background:  'rgba(var(--orange-3-values), 0.3)',
            cursor: 'text',
            textAlign: 'center',
            transform: 'translate(0px, 0px)',
            margin: '0px',
            fontSize: '18px',
            padding: '13px',
            position: 'relative',
            boxSizing: 'border-box',
            ...(loading ? {
              border: '2px solid #803c1c'
            } : {}),
            height: '52px'
          }}>
            <input placeholder="Email" type="email" style={{
              position: 'absolute',
              border: 'none',
              width: 'calc(100% - 50px)',
              background: 'transparent',
              height: '100%',
              top: '0px',
              left: '0px',
              outline: 'none',
              fontSize: '18px',
              padding: '13px',
              color: 'white',
              fontFamily: 'var(--font-stack)'
            }} value={email} onKeyUp={e => {
              if (e?.key == 'Enter') handleFormEnter();
            }} onChange={e => setEmail(e.target.value)} disabled={loading} />
          <button className={styles.button} style={{
            width: '40px',
            height: '40px',
            fontSize: '20px',
            padding: '6px',
            border: '1px solid var(--orange)',
            marginLeft: '20px',
            position: 'absolute',
            borderRadius: '2px',
            top: '4px',
            right: '4px',
            fontWeight: 'bolder',
            ...(loading ? {
              filter: 'brightness(0.5)',
              cursor: 'default'
            } : {})
          }} onClick={handleFormEnter} disabled={loading}>
            →
          </button>
          </div>
          </div>

          </center>
}
          </center>
        </div>

        <div style={{
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
            Over <span style={{
              textDecoration: 'underline'
            }}>$4,000</span> in prizes across <span style={{
              textDecoration: 'underline'
            }}>6&nbsp;tracks</span>!
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
            Prizes include mechanical&nbsp;keyboards, game&nbsp;consoles, AirPods&nbsp;Pro, 3D&nbsp;printers, and&nbsp;more!

          </h2>

        </div>

        <div className={styles.content} style={{
          position: 'relative'
        }}>
          <div style={{
            position: 'relative',
            zIndex: '20'
          }} className={styles.innerContent}>
          <h2>What's Hack OC?</h2>
          <p>Hack OC is the first in-person high school hackathon after the pandemic in Orange County, California. We're inviting all high schoolers to participate in <span>12 hours</span> of <span>coding</span>, <span>building</span>, <span>learning</span>, and <span>fun</span>. Whether you're technical and experienced or haven't ever written a line of code, Hack OC will be a fun and welcoming event for everyone.</p>

          </div>
          </div>
                  {/* 3 columns on large screens, 2 on medium, 1 on small */}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(' + cardSize + ', 100%), 1fr))',
          gridGap: cardGap,
          padding: '30px',
          margin: '0 auto',
          maxWidth: `calc(calc(${cardSize} * 2) + ${cardGap} + 60px + 200px)`
        }}>
          
            <Card title="Build something" icon="idea">
              By the end, you’ll have built something new and unique with your team.
            </Card>
            <ImageCard src="https://cloud-hmw10hgy3-hack-club-bot.vercel.app/0hack_club_assemble_ltnj_01371.jpg" caption="Hackers collaborating on a project" />

            {width((
              <>
                <Card title="Learn new skills" icon="code">
                  Whether you're new to coding or a seasoned developer, you'll learn new skills and technologies at our workshops.
                </Card>
                <ImageCard src="https://cloud-6fqxfny8b-hack-club-bot.vercel.app/0hack_club_assemble_ltnj_01770.jpg" caption="Workshop at Assemble in 2022" left={true} />
              </>
            ), 840, (
              <>
                <ImageCard src="https://cloud-6fqxfny8b-hack-club-bot.vercel.app/0hack_club_assemble_ltnj_01770.jpg" caption="Workshop at Assemble in 2022" left={true} />
                <Card title="Learn new skills" icon="code">
                  Whether you're new to coding or a seasoned developer, you'll learn new skills and technologies at our workshops.
                </Card>
              </>
            ))}
            <Card title="Make connections" icon="person">
              You'll meet other hackers and programmers from all over Orange County.
            </Card>
            <Card title="Have fun" icon="sticker">
              Hack OC has stickers, swag, food, and prizes to make your time coding exciting and fun.
            </Card>

          

        </div>
        <div className={styles.content} style={{
          position: 'relative'
        }}>
          <div style={{
            position: 'relative',
            zIndex: '20'
          }} className={styles.innerContent}>
          <h2>What's a "hackathon"?</h2>
          <p>Hackathons are in-person coding events where teenagers come together to learn new skills, create fun projects, and make memories. There's also food, snacks, and drinks to fuel your creativity. Instead of hacking bank accounts like you hear in the news, you'll build something meaningful to you.</p>
          <h2>Who can participate in Hack OC?</h2>
          <p>We're inviting all high school students to participate in Hack OC <span>completely free</span>. If you'd still like to support us, however, <a href="#" onClick={e => { e.preventDefault(); setModal(true); splitbee.track("Donate Click", { location: 'copy' }); }}>you can donate here</a>. Since this hackathon is geared toward just high school students, we aren't allowing any college students or older to participate.</p>
          </div>

      <img src="/orange.png" style={with$('nodrag', 'noselect', {
        position: 'absolute',
        bottom: '-20px',
        right: '-40px',
        width: '300px',
        zIndex: '15',
        filter: 'opacity(0.7)'
      })} />
      
        </div>

      <div style={{
        overflowY: 'scroll',
        background: 'white',
        borderTop: '5px solid var(--orange)',
        color: 'black',

      }} className={styles.content}>
      <h2 style={{ color: 'black' }}>Questions?</h2>
      <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gridGap: cardGap,
          margin: '0 auto',
          paddingBottom: '30px',
          paddingLeft: '-30px',
          paddingRight: '-30px',
          maxWidth: `calc(calc(300px * 3) + ${cardGap} * 3 + 60px + 200px)`
        }}>
          {Object.entries({
            'Can I join?': <>
              If you're in middle school or high school, yes, you can attend! If you're unsure or have questions, shoot us a message at <a href="mailto:team@hackoc.org">team@hackoc.org</a>.
            </>,
            'What can I make?': <>
              Anything! Apps, games, websites, art, and hardware projects are all welcome. Check out what <a href="https://hackclub.com/ship" target="_blank">other hackers are making</a>.
            </>,
            'How much does it cost?': <>
              Nothing! Hack OC is free for all attendees. We'll cover meals, snacks, swag, and prizes, as well as other fun mini-events.
            </>,
            'Who is judging?': <>
              Judging is done by the people that matter most– the attendees. When it's time for demo, you'll get to vote for your favorite projects in each category.
            </>,
            'I\'m not that good at coding...': <>
              Everybody starts somewhere! At Hack OC, we'll have workshops and mentors to help you learn new skills and build something awesome. If you want to explore some resources before the event, check out <a href="https://hackclub.com/workshops" target="_blank">Hack Club's Workshops</a>.
            </>,
            'Is there anything in place to help prevent COVID-19 from spreading?': <>
              We'll screen for COVID-19 symptoms before the event, and we'll have hand sanitizer and masks available for all attendees. Masks are not required, but they are strongly recommended.
            </>
          }).map(([title, content]) => (
            <BaseCard style={{
              padding: '20px'
            }}>
              <h3 style={{
                marginTop: '0px',
                fontWeight: '500'
              }}>{title}</h3>
              <p style={{
                fontWeight: '350',
                marginBottom: '0px',
                fontSize: '18px'
              }}>{content}</p>
            </BaseCard>
          ))}
          </div>
        </div>
      </main>
      <div className={styles.sponsors} style={{
        overflowY: 'scroll'
      }}>
        <a href="/register" target="_blank">
          <button className={styles.altButton} style={{
            background:  'rgba(var(--orange-3-values), 1)',
            position: 'relative',
          }}>Register
            <Icon glyph="external" style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)'
            }} />
          </button>
        </a>
        <button className={styles.altButton} onClick={() => {
          setModal(true);
        }} data-splitbee-event="Donate Click" data-splitbee-event-location="sidebar">Donate</button>
        <a href="/discord" target="_blank" data-splitbee-event="Discord Click" data-splitbee-event-location="sidebar">
          <button className={styles.altButton}>Discord</button>
        </a>
        <a href="/finances" target="_blank" data-splitbee-event="Finances Click" data-splitbee-event-location="sidebar">
          <button className={styles.altButton}>Finances</button>
        </a>
        <a href="/github" target="_blank">
          <button className={styles.altButton}>GitHub</button>
        </a>
        <h1>Sponsors</h1>
        <a href="https://anduril.com">
        <img className={styles.sponsor} src="https://cdn.sanity.io/images/z5s3oquj/production/ed722e0559833f0a6d4e33c83bcc74f4f1add21a-1000x194.png" />
        </a>
        <p>Hack OC wouldn't be possible without help from our sponsors. Want to help make Hack OC incredible? Email us at <a href="mailto:team@hackoc.org" style={{ color: 'var(--orange)', textDecoration: 'underline' }} data-splitbee-event="Email Click" data-splitbee-event-location="sidebar">team@hackoc.org</a> or check out our <a href="/prospectus" style={{ color: 'var(--orange)', textDecoration: 'underline' }} target="_blank" onClick={e => {
          e.preventDefault();
          splitbee.track("Prospectus Download", {
            ...(email ? { email } : {})
          });
          window.open('/prospectus');
        }}>prospectus</a> to get involved!</p>
        <br />
        <h2>SPECIAL THANKS TO</h2>
        <a href="https://hackclub.com/bank">
        <img className={styles.sponsor} src="/sponsor-assets/bank.svg" />
        </a>
        <a href="https://vercel.com">
        <img className={styles.sponsor} src="/sponsor-assets/vercel.svg" />
        </a>
        <a href="https://bank.hackclub.com/hackoc/donations" target="_blank">
        <div style={{
          width: '300px',
          maxWidth: '100%',
          height: '100px',
          border: '2px solid transparent',
          marginTop: '10px',
          background: '#8899aa33',
          borderRadius: '8px'
        }} className={styles.sponsor}>
          <center>
            <h2 style={{
              marginBottom: '0px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              width: 'calc(100% - 60px)',
              overflow: 'hidden'
            }}>{donor}</h2>
            <p style={{
              textTransform: 'uppercase',
              marginTop: '8px',
              fontSize: '12px',
              color: '#8899aa',
              lineHeight: '0px'
            }}>and other generous donors
              <Icon glyph="external" size={16} style={{
                transform: 'translate(1px, 3px)'
              }} />
            </p>
          </center>
        </div>
        </a>
      </div>
      <div style={{
        background: '#ddd',
        fontWeight: '300',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
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
