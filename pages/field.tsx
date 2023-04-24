
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MapboxDrawComponent from "../components/mapboxDrawComponent";

const Field: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Draw Field Boundaries</title>
        <meta name="description" content="draw your field boundaries here and export" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://kit.fontawesome.com/bb07d650eb.js" crossOrigin="anonymous"></script>
      </Head>
      <main className={styles.main}>
        <MapboxDrawComponent/>
      </main>
    </div>
  )
}

export default Field
