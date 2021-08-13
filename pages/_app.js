import 'tailwindcss/tailwind.css'
import 'public/styles.css'
import { Head } from 'components'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
