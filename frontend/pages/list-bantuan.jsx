import PageContainer from "../components/PageContainer"
import ListPesan from "../components/ListBantuan/ListPesan"
export default function ListBantuan() {
  return (
    <>
      <PageContainer>
        <div className="min-h-screen">
          <ListPesan/>
        </div>
      </PageContainer>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  if (!req.cookies.auth) {
    return {
      redirect : {
        destination: "/masuk",
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
