import '../styles/globals.css'
import NextNprogress from 'nextjs-progressbar';
function MyApp({ Component, pageProps }) {
  return (
    <div className="font-poppins">
      <NextNprogress color="#000000" />
      <Component {...pageProps} />
    </div>
  )
  
}

export default MyApp
