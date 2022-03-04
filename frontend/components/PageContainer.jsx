import Navbar from "./navbar/Navbar"
import Footer from "./footer/Footer"
const PageContainer = ({children, props}) => {
  return (
    <>
      <div > 
        <Navbar/>
        {children}
        <Footer/>
      </div>
    </>
  )
}

export default PageContainer