import Head from 'next/head'
import styles from '../styles/Register.module.css'
import Icon from '@hackclub/icons'
import Modal from '../components/Modal'
import Text from '../components/Inputs/Text.js';
import Title from '../components/Inputs/Title.js';
import Select from '../components/Inputs/Select.js';
import { questions, sections } from '../lib/questions.js';
import { createRef, useEffect, useState } from 'react';

const meta_desc = "Orange County's first high school coding event since the pandemic. Join us for 12 hours of hacking, workshops, & friendship.";
const theme_color = '#FA7B33';
const social_image = '/social.png';

import ReCAPTCHA from "react-google-recaptcha";
import useProtection from '../utils/useProtection';
import splitbee from '@splitbee/web';

const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const timelapseId = "9x00RCb1N7WTpAl6cIN0000Kult00vyzslROW6A1RblWwxM"

// const timelapseId = "402YMZJfp6kW02302E3r1RMe013Ub9AqlPwzr4VjD00HO7ME"

export default function Register() {

  const [modal, setModal] = useState(false);
  const recaptchaRef = createRef();

  const [formData, setFormData] = useState({});

  function setValue (name, value) {
    let newFormData = JSON.parse(JSON.stringify(formData))
    newFormData[name] = value;
    setFormData(newFormData);
  }


  function validate () {
    const v = Object.values(questions); 
    let valid = true;
    let missing = [];
    for (let i = 0; i < v.length; i++) {
      const { required, verify, name } = v[i];
      const value = formData[name];
      const isValid = (
        (required ? (value instanceof Array ? value.length : value) : true)
        &&
        (verify?.(value))
      );
      console.log(value, name, isValid)
      if (!isValid && v[i].special !== 'text') {
        valid = false;
        missing.push(name)
      }
    }
    return {valid,missing};
  }

  const [valid, setValid] = useState(validate());

  useEffect(() => {
    setValid(validate());
  }, [formData]);

  const [key, setKey] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [captchaCode, setCaptchaCode] = useState(null);
  const [discordTag, setDiscordTag] = useState('');
  const [discordId, setDiscordId] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const tag = localStorage.getItem('hoc-discord-tag');
      const id = localStorage.getItem('hoc-discord-id');
      const ts = localStorage.getItem('hoc-discord-ts');

      if (tag && id && ts && (Date.now() - ts < 1000 * 5)) {
        setDiscordTag(tag);
        setDiscordId(id);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    try {
      rdt('track', 'Lead', {
    });
  
    } catch (err) {}
  }, []);

  useEffect(() => {
    console.log('Discord stuff changed');
  }, discordTag, discordId)

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Execute the reCAPTCHA when the form is submitted
  //   recaptchaRef.current.execute();
  // };
  const handleSubmit = async () => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    try {
      await splitbee.user.set({
        ...Object.fromEntries(Object.entries(formData).map(([k,v]) => ['FormData' + k.split(' ').join(''), v]))
      });
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ data: {
          ...formData,
          ['Discord Tag']: discordTag,
          ['Discord ID']: discordId,
        }, captcha: captchaCode }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        
        // If the response is ok than show the success alert
        window.location.href = '/registration/success?name=' + encodeURIComponent(formData['Full Name']);
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message)
      }
    } catch (error) {
      alert(error?.message || "Something went wrong");
    } finally {
      // Reset the reCAPTCHA when the request has failed or succeeeded
      // so that it can be executed again if user submits another email.
    }
  };


  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    if (params?.email) setEmail(params?.email);
    if (params?.key) setKey(params?.key);
    setShowForm(process.env.NODE_ENV !== "production" || key == process.env.NEXT_PUBLIC_KEY);
  }, []);
  if (false) return (
    <>
      <div style={{
        width: '100vw',
        height: '100vh',
        background: 'var(--orange)'
      }}>
        <Head>
          <title>Hack OC</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Modal visible={true} setVisible={() => ''} hideCloseButton={true}>
          <div style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '8px',
            border: '2px solid var(--orange)',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center'
          }}>
            <h1 style={{ marginBottom: '0px' }}>Registrations will open soon!</h1>
            <p>In the meantime, check out our <a href="/" style={{ color: 'var(--orange)', textDecoration: 'underline' }}>homepage</a>.</p>
          </div>
        </Modal>
      </div>
    </>
  );
  const isDiscordMissing = !discordTag;
  const missingLength = valid.missing.length + (isDiscordMissing ? 1 : 0);

  return (
    <>
    <Head>
      <title>Register for Hack OC</title>
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


      <div className={styles.container} style={{
        position: 'relative',
        zIndex: '10',
        overflow: 'hidden'
      }}>

        <main className={styles.main}>
          <h1 className={styles.title} style={{ color: 'black' }}>
            Hack <span className="color-orange" style={{
              marginLeft: '-4px',
              position: 'relative',
              marginTop: '4rem',
              marginBottom: '6rem'
            }}>
              OC
              <img src="/orange.svg" style={{
                position: 'absolute',
                bottom: '50%',
                left: '-2px',
                height: 'calc(100% - 10px)',
                transform: 'translate(10%, 44.5%)'
              }} className="noselect" />
            </span>
            <span style={{ marginLeft: '-6px' }}>{' '}Registration</span>
          </h1>
          <h2 style={{
            textAlign: 'center',
            color: '#444'
          }}>May 6th • Anduril HQ • 9am-9pm</h2>
          <form onSubmit={e => e.preventDefault()}>
            {sections.map((section, i) => {
              return (
                <div style={{
                  padding: '1rem',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    filter: 'opacity(0.6)',
                    top: '0px',
                    left: '0px',
                    zIndex: '10',
                    background: i % 4 === 1 ? 'url("https://cloud-2zvigj1zd-hack-club-bot.vercel.app/0water.jpeg")' : undefined,
                    backgroundSize: 'cover',

                  }}></div>
                  <div style={{
                    position: 'relative',
                    zIndex: '20',
                  }}>


                    <center>
                      <div style={{
                        width: '500px',
                        maxWidth: 'calc(100vw - 60px)',
                        textAlign: 'left',
                        marginLeft: '20px',
                        marginTop: i == 0 ? '6rem' : '2rem'
                      }}>
                        <h2>{section.title}</h2>
                        <p>{section.description}</p>
                      </div>
                    </center>
                    <center>
                      <div style={{
                        width: '500px',
                        maxWidth: 'calc(100vw - 60px)',
                        textAlign: 'left',
                        marginLeft: '20px',
                        marginTop: i == 0 ? '6rem' : '2rem'
                      }}>
                        {
                          section.questions.map((question, i) => {
                            return (
                              <>
                                <div style={{
                                  marginBottom: '3rem',
                                  marginTop: '3rem',
                                }}>
                                  {(question.special == 'multiSelect' || question.special == 'select') ?
                                    <Select {...{
                                      setValue,
                                      options: question.options,
                                      multi: question.special == 'multiSelect',
                                      name: question.name,
                                      description: question.description,
                                      help: question.help,
                                      width: 'min(calc(100% - 20px), 400px)',
                                      type: question.type,
                                      placeholder: question.placeholder,
                                      validate: question.verify,
                                      required: question.required,
                                      dontDisplayAll: question.dontDisplayAll
                                    }} />
                                    : question.special == 'text' ? <Title {...{
                                      name: question.name,
                                      description: question.description,
                                      help: question.help,
                                      width: 'min(calc(100% - 20px), 400px)',
                                    }} /> :
                                      <Text {...{
                                        name: question.name,
                                        setValue,
                                        description: question.description,
                                        help: question.help,
                                        width: 'min(calc(100% - 20px), 400px)',
                                        type: question.type,
                                        placeholder: question.placeholder,
                                        validate: question.verify,
                                        required: question.required
                                      }} />
                                  }
                                </div>
                              </>

                            )

                          })

                        }


                      </div>
                    </center>
                  </div>
                </div>
              );
            })}
            <center>
            <div style={{
                        width: '500px',
                        maxWidth: 'calc(100vw - 60px)',
                        textAlign: 'left',
                        marginLeft: '20px',
                        marginTop: '-1rem'
                      }}>
                      <Title {...{
                                    name: 'Discord Account',
                                    description: `Link your Discord account and join the Hack OC server for team formation, updates, project submissions, and more!`,
                                    width: 'min(calc(100% - 20px), 400px)',
                                    required: true
                                  }} />
                                  <div style={{
                                    marginTop: '2rem',
                                    marginBottom: '2rem'
                                  }}>
                                    <button style={{

marginBottom: '4rem',
borderRadius: '0.25rem',
borderColor: '#414bb1',
borderWidth: '2px',
borderStyle: 'solid',
fontSize: '1em',
fontFamily: 'system-ui, Inter',
padding: '0.5rem',
backgroundColor: '#5865f2',
color: 'white',
display: 'flex',
gap: '8px',
cursor: 'pointer',
            }} aria-label="a" className="tooltipped" type="button" onClick={(() => {
              window.open('https://discord.api.hackoc.org/onboarding', '', 'width=500,height=700,top=100,left=100');
            })}>{discordTag ? (
              <>
              <Icon glyph="checkmark" size="20px" />
              {' '}{discordTag}
              </>
            ) : (
              'Link Discord Account'
            )}</button>
                                    </div>
                        <Title {...{
                                      name: 'Confirm You\'re Human',
                                      description: `We don't have anything against robots, but only humans can attend Hack OC.`,
                                      width: 'min(calc(100% - 20px), 400px)'
                                    }} />
                                    <div style={{
                                      marginTop: '2rem',
                                      marginBottom: '2rem'
                                    }}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={setCaptchaCode}
            />
            </div>
            <button type="submit" style={{

marginBottom: '4rem',
borderRadius: '0.25rem',
borderColor: '#d3d3d4',
borderWidth: '2px',
borderStyle: 'solid',
fontSize: '1em',
fontFamily: 'system-ui, Inter',
padding: '0.5rem',
cursor: (valid.valid && !isDiscordMissing) ? 'pointer' : 'default'
            }} onClick={(valid.valid && !isDiscordMissing) ? handleSubmit : () => {

            }} aria-label="a" className="tooltipped" disabled={!(valid.valid && !isDiscordMissing)}>{(valid.valid && !isDiscordMissing) ? 'Register' : `${missingLength} incomplete field${missingLength == 1 ? '' : 's'}`}</button>
            </div>
            </center>
          </form>
        </main>
      </div>
    </>
  )
}