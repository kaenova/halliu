import React from 'react'

function CardPertanyaan(data) {
  let backend = process.env.NEXT_PUBLIC_BACKEND || ""
  
  return (
    <div className="card bg-base-100 shadow-sm border-2 border-dashed">
      <div className="card-body">
        <h2 className="card-title">{data.data["reqUser"].name}</h2>
        <p>{`Pertanyaan : ${data.data.message}`}</p>
        <p>Jawaban : {data.data.reply? data.data.reply : "Masih belum dibalas"}</p>
        <div className='flex flex-row gap-3'>
          {data.data.image &&
            <img width={300} src={backend+ "/static" + data.data.image} alt="" />
          }
          {data.data.video &&
            <video width={300} src={backend + "/static" + data.data.video} controls alt="" />
          }
        </div>
      </div>
    </div>
  )
}

export default CardPertanyaan