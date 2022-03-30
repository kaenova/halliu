import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PageContainer from "../../components/PageContainer"
import { api } from '../../utils/api'
import ReactPlayer from 'react-player'
import DataKosong from '../../components/DataKosong'
import LoadingPage from '../../components/LoadingPage'
import DataError from '../../components/DataError'

function HighlightID() {
  const router = useRouter()
  const { id } = router.query
  let backend = process.env.NEXT_PUBLIC_BACKEND || ""

  const [dataPesan, setDataPesan] = useState(null)

  useEffect(() => {
    if (id == undefined) {
      return
    }
    api().get("/api/stream/" + id)
      .then((res) => {
        setDataPesan(res.data.data)
      })
      .catch((e) => {
        setDataPesan("err")
      })
  }, [id])

  useEffect(() => {
    let interval = setInterval(() => {
      api().get("/live/" + id + ".m3u8")
        .then((res) => {
          setDataPesan(res.data.data)
        })
        .catch((e) => {
          setDataPesan("err")
        })
    }, 3000);
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <PageContainer>
      {
        dataPesan == null ?
          <LoadingPage />
          : dataPesan == "err" ?
            <DataError />
            : dataPesan.length == 0 ?
              <DataKosong />
              :
              <div className="h-screen flex flex-col items-center justify-center gap-2">
                <h1 className="text-center text-5xl font-bold">{dataPesan.title}</h1>
                <h2 className="text-center text-xl">{dataPesan["User"].name}</h2>
                <div className="w-full h-[90%]">
                  <ReactPlayer autoplay={true} controls playing
                    url={backend + "/live/" + dataPesan.id + ".m3u8"}
                    light={backend + "/static/" + dataPesan.cover}
                    width="100%"
                    height="90%"
                  />
                </div>
              </div>
      }
    </PageContainer>
  )
}

export default HighlightID