import type { NextPage } from 'next'
import React from "react";
import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Climate-Smart Commodities</title>
        <meta name="description" content="welcome to this coding challenge" />
        <link rel="icon" href="/favicon.ico" /> 
      </Head> 
      <Script src="https://kit.fontawesome.com/bb07d650eb.js"></Script>
      <Link href="/field">
        <main className={styles.main}>
          <div className="line">
            <h1 className={styles.title}>
            <i className="fa-solid fa-money-bill-wheat fa-2xl fade-in"/> Climate-Smart Commodities <i className="fa-solid fa-cow fa-2xl fade-in"/>
            </h1>
          </div>
          <div className="line">
            <h2>Coding Challenge</h2>
          </div>
          <div className="line">
            <p><i className="fa-solid fa-paw fa-beat-fade fa-2xl fade-in"/> Click anywhere to continue.</p>
          </div>
        </main>
      </Link>
    </div>
  )
}

export default Home
