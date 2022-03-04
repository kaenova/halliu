import PageContainer from "../components/PageContainer"
import LiveStream from "../components/LiveStream"
import HighLight from "../components/HighLight"
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
