import Icon from "@hackclub/icons";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";


export default function Sidebar () {
    const [donor, setDonor] = useState('');
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
        <a href="/scrapbook" data-splitbee-event="Scrapbook Click" data-splitbee-event-location="sidebar">
          <button className={styles.altButton}>Scrapbook</button>
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
        <h1>Sponsored by</h1>
        <a href="https://anduril.com">
        <img className={styles.sponsor} src="https://cdn.sanity.io/images/z5s3oquj/production/ed722e0559833f0a6d4e33c83bcc74f4f1add21a-1000x194.png" />
        </a>
        {/* <p>Hack OC wouldn't be possible without help from our sponsors. Want to help make Hack OC incredible? Email us at <a href="mailto:team@hackoc.org" style={{ color: 'var(--orange)', textDecoration: 'underline' }} data-splitbee-event="Email Click" data-splitbee-event-location="sidebar">team@hackoc.org</a> or check out our <a href="/prospectus" style={{ color: 'var(--orange)', textDecoration: 'underline' }} target="_blank" onClick={e => {
          e.preventDefault();
          splitbee.track("Prospectus Download", {
            ...(email ? { email } : {})
          });
          window.open('/prospectus');
        }}>prospectus</a> to get involved!</p> */}
        <br />
        <h2 style={{
          marginBottom: '0px'
        }}>SPECIAL THANKS TO</h2>
        <div style={{
          display: 'flex',
          // vertical align middle
          alignItems: 'center',
          // enable line wrap
          flexWrap: 'wrap',
        }}>
          <a href="https://hackclub.com/bank" style={{
            marginTop: '20px',
            marginBottom: '20px'
          }}>
          <img className={styles.sponsor} src="/sponsor-assets/bank.svg" />
          </a>
          <a href="https://bank.hackclub.com/hackathon-grant-fund">
          <img className={styles.sponsor} src="https://lelandhacks.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbank_grant.fa04d410.png&w=1920&q=75" />
          </a>
          <a href="https://bank.hackclub.com/hackoc/donations" target="_blank" style={{
            maxWidth: '100%',
          }}>
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
      </div>
    );
}