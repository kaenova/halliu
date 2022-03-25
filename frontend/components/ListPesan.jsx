import { dataPesan } from "../data/listpesan"
import { useState } from 'react'

const ListPesan = (props) => {
  const dataDropdown = ["Pesan Bantuan Saya", "Pesan Bantuan Orang Lain"]
  const [IdxDropdown, setIdxDropdown] = useState(0)

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

        <div className="flex flex-col gap-5">
          {
            dataPesan.map((data, idx) => {
              return (
                <div key={idx} className="card bg-base-100 shadow-sm border-2 border-dashed">
                  <div className="card-body">
                    <h2 className="card-title">{data.Name}</h2>
                    <p>{`Pertanyaan : "${data.Question}`}</p>
                    <p>{`Jawaban    : "${data.Answer}`}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

    </>
  )
}

export default ListPesan