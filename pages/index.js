import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Icon from '@hackclub/icons'
import Modal from '../components/Modal'
import { useEffect, useState } from 'react';
import splitbee from '@splitbee/web';
import with$, { withNodrag } from '../utils/cssUtils';
import useMedia, { useViewport } from '../utils/useMedia';
import Sidebar from '../components/Sidebar';
import { FilloutStandardEmbed } from "@fillout/react";

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

  const { width, height } = useMedia();

  const cardSize = '380px';
  const cardGap = '20px';

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
      <Head>
        <title>Hack OC 2025</title>
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

      <div style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: '-1',
        background: "url('https://hc-cdn.hel1.your-objectstorage.com/s/v3/10fab01a330c7cb8b6b6ac35ebcaa1355a15dd5a_image_2__7___1_.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: "white",
        userSelect: 'none',
      }}>
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(50px)",
          overflow: "hidden",
        }}>
          <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/74e446abead96c481c704b0cdb332df8e90f6f16_group_47.svg" />
          <h1 style={{
            marginBottom: "40px"
          }}>Coming Soon</h1>
          <FilloutStandardEmbed filloutId="6FWy549Jjgus" dynamicResize />
        </div>
      </div>
    </>
  )
}
