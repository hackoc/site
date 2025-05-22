import { FilloutFullScreenEmbed } from "@fillout/react";
import Head from "next/head";

const meta_desc = "Orange County's high school hackathon";
const theme_color = '#FA7B33';
const social_image = 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/777fe734e848f3b800c7ea600764edf9ddd5c2ac_open-graph.png';

export default function Register () {
    return (
        <div>

      <Head>
        <title>Hack OC 2025 | Registration</title>
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
            <FilloutFullScreenEmbed filloutId="tfWn7gwSj4us" inheritParameters />
        </div>
    )
}