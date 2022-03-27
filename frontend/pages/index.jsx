import PageContainer from "../components/PageContainer"
import LiveStream from "../components/HomePage/LiveStreamSection"
import HighLight from "../components/HomePage/HighlightSection"
export default function Home() {
  return (
    <>
      <PageContainer>
        <div className="min-h-screen">
          <LiveStream/>
          <HighLight/>
        </div>
      </PageContainer>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  if (req.cookies.role == "cs") {
    return {
      redirect : {
        destination: "/dashboard-cs",
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}