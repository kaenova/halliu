import { dataHighlight } from "../../data/highlight"
import { useRouter } from 'next/router'
import Link from 'next/link'
import DataKosong from '../DataKosong'
import LoadingPage from '../LoadingPage'
import DataError from '../DataError'
import HighlightCard from "./HighlightCard"
import { useState, useEffect } from "react"
import { api } from "../../utils/api"


const HighLight = (props) => {
  const router = useRouter()
  const [dataPesan, setDataPesan] = useState(null)

  useEffect(() => {
    api().get("/api/highlight")
    .then((res) => {
      setDataPesan(res.data.data)
    })
    .catch((e) => {
      console.log(e)
      setDataPesan("err")
    })
  }, [])

  return (
    <>
      <div className="z-10 ">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full max-w-[800px]">
            <div className="w-full flex items-center justify-center mb-3">
              <Link href="/highlight-form">
                <button className="btn btn-outline w-full mt-5 mx-auto">Upload Moment Terbaik Mu!</button>
              </Link>
            </div>
            {
              dataPesan == null ?
                <LoadingPage />
                : dataPesan == "err" ?
                  <DataError />
                  : dataPesan.length == 0 ?
                    <DataKosong />
                    :
                    <div className="flex flex-col gap-2">
                      {
                        dataPesan.map((data, idx) => {
                          return (
                            <HighlightCard key={idx} data={data} />
                          )
                        })
                      }
                    </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default HighLight