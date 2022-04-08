import React from 'react'
import { useState } from 'react'
import { authApi } from '../../utils/api'

function CardPertanyaan(data) {
  const [PesanBalasasn, setPesanBalasasn] = useState("")
  const [Terbalas, setTerbalas] = useState(false)
  let backend = process.env.NEXT_PUBLIC_BACKEND || ""

  const handleBalasButton = () => {
    if (PesanBalasasn == "") {
      alert(`Balasan tidak valid pada pesan ${data.data["User"].name}`)
      return
    }
    let formData = new FormData()
    formData.append("reply", PesanBalasasn)
    authApi().post(`/api/support/${data.data.id}`, formData)
      .then(setTerbalas(true))
      .catch((e) => alert(`Gagal dalam membalas pada pesan ${data.data["User"].name}. Mohon coba lagi nanti`))
  }

  return (
    <div className="card bg-base-100 shadow-sm border-2 border-dashed">
      <div className="card-body">
        <h2 className="card-title">{data.data["User"].name}</h2>
        <p>{`Pertanyaan : ${data.data.message}`}</p>
        <div className='flex flex-row gap-3'>
          {data.data.image &&
            <img width={300} src={ backend + "/static" + data.data.image} alt="" />
          }
          {data.data.video &&
            <video width={300} src={backend + "/static" + data.data.video} controls alt="" />
          }
        </div>
        <div className="flex flex-row gap-2">
          {
            Terbalas ?
              <p>Balasan : {PesanBalasasn}</p>
              :
              <>
                <input onChange={(e) => { setPesanBalasasn(e.target.value) }} type="text" placeholder="Masukkan Balasan Anda" className="input input-bordered w-full " />
                <button onClick={handleBalasButton} className="btn btn-outline">Balas</button>
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default CardPertanyaan