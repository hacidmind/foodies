import Layout from '../components/Layout';
import "bootstrap/dist/css/bootstrap.css";
import '../styles/globals.css';
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap")
  }, [])
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default MyApp
