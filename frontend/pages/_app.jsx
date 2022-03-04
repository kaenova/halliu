import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <div className="font-poppins">
      <Component {...pageProps} />
    </div>
  )
  
}

export default MyApp
