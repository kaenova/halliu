import { dataPesan } from "../data/listpesan"

const ListPesanCS = (props) => {

  return (
    <>
      <div className="h-[30px]"></div>

      <div className="flex flex-col justify-center mx-4">
        <div className="flex flex-col gap-5">
          {
            dataPesan.map((data, idx) => {
              return (
                <div key={idx} className="card bg-base-100 shadow-sm border-2 border-dashed">
                  <div className="card-body">
                    <h2 className="card-title">{data.Name}</h2>
                    <p>{`Pertanyaan : "${data.Question}`}</p>
                    <div className="flex flex-row gap-2">
                      <input type="text" placeholder="Masukkan Balasan Anda" className="input input-bordered w-full " />
                      <button className="btn btn-outline">Balas</button>
                    </div>
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

export default ListPesanCS