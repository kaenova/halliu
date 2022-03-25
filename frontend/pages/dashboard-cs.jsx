import React from 'react'
import PageContainer from "../components/PageContainer"
import ListPesanCS from '../components/DashboardCS/ListPesanCS'

function DashboardCSBantuan() {
  return (
    <PageContainer>
        <div className="min-h-screen">
          <ListPesanCS/>
        </div>
      </PageContainer>
  )
}

export async function getServerSideProps({ req, res }) {
  if (req.cookies.auth && (req.cookies.role == "cs")) {
    return {
      props: {}
    }
  
  }
  return {
    redirect : {
      destination: "/masuk",
      permanent: false
    }
  }
}


export default DashboardCSBantuan