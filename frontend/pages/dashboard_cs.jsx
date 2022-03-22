import React from 'react'
import PageContainer from "../components/PageContainer"
import ListPesanCS from '../components/ListPesanCS'

function DashboardCSBantuan() {
  return (
    <PageContainer>
        <div className="min-h-screen">
          <ListPesanCS/>
        </div>
      </PageContainer>
  )
}

export default DashboardCSBantuan