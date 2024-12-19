import 'styles/styles.css'
import { Head } from 'components'

function MyApp({ Component, pageProps }) {
  return (
    <html>
      <Head />
      <body>
        <div id="app">
          <Component {...pageProps} />
        </div>
      </body>
    </html>
  )
}

export default MyApp
