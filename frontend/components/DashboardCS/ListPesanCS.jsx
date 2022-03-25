import { useState, useEffect } from "react"
import LoadingPage from "../LoadingPage"
import DataKosong from "../DataKosong"
import DataError from "../DataError"
import { authApi } from "../../utils/api"
import CardPertanyaan from "./CardPertanyaan"

const ListPesanCS = () => {
  const [dataPesan, setDataPesan] = useState(null)

  useEffect(() => {
    authApi().get("/api/support/no-reply")
      .then((res) => {
        setDataPesan(res.data.data)
      })
      .catch((e) => {
        setDataPesan("err")
      })
  }, [])

  if (dataPesan == "err") {
    return <DataError />
  }

  if (dataPesan == null) {
    return <LoadingPage />
  }

  if (dataPesan.length == 0) {
    return <DataKosong />
  }

  console.log("kok masuk sini")
  return (
    <>
      <div className="h-[30px]"></div>
      <div className="flex flex-col justify-center mx-4">
        <div className="flex flex-col gap-5">
          {
            dataPesan.map((data, idx) => {
              return <CardPertanyaan key={idx} data={data}/>
            })
          }
        </div>
      </div>

    </>
  )
}

export default ListPesanCS