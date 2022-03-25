import { dataPesan } from "../../data/listpesan"
import { useState, useEffect } from 'react'
import LoadingPage from "../LoadingPage"
import DataKosong from "../DataKosong"
import DataError from "../DataError"
import { authApi } from "../../utils/api"
import CardPertanyaan from "./CardPertanyaan"

const ListPesan = (props) => {
  const dataDropdown = ["Pesan Bantuan Saya", "Pesan Bantuan Orang Lain"]
  const [IdxDropdown, setIdxDropdown] = useState(0)
  const [dataPesan, setDataPesan] = useState(null)

  useEffect(() => {
    let url
    if (IdxDropdown == 0) {
      url = "/api/support/self"
    } else {
      url = "/api/support"
    }
    authApi().get(url)
      .then((res) => {
        setDataPesan(res.data.data)
      })
      .catch((e) => {
        setDataPesan("err")
      })
  }, [IdxDropdown])


  return (
    <>
      <div className="h-[30px]"></div>
      <div className="flex flex-col justify-center mx-4">
        <div className="dropdown mb-5">
          <label tabIndex="0" className="btn m-1 min-w-[500px] justify-start">{dataDropdown[IdxDropdown]}</label>
          <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box min-w-[500px] ">
            {dataDropdown.map((data, idx) => {
              return <li key={idx} onClick={() => { setIdxDropdown(idx) }}><a>{data}</a></li>
            })}
          </ul>
        </div>

        {
          dataPesan == null ?
            <LoadingPage />
            : dataPesan == "err" ?
              <DataError />
              : dataPesan.length == 0 ?
                <DataKosong />
                :
                <div className="flex flex-col gap-5">
                  {
                    dataPesan.map((data, idx) => {
                      return <CardPertanyaan key={idx} data={data} />
                    })
                  }
                </div>
        }

      </div>
    </>
  )
}

export default ListPesan