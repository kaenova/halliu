import { dataPesan } from "../data/listpesan"
const ListPesan = (props) => {
  return (
    <>
      <div className="h-[80px]"></div>
      <div className="flex justify-center">
        <div className="w-[1440px] grid grid-cols-1 md:grid-cols-2 gap-4 mx-4">
          {
            dataPesan.map((data,idx)=> {
              return (
                <div key={idx}>
                  <div class="card bg-base-100 shadow-sm border-2 border-dashed">
                    <div class="card-body">
                      <h2 class="card-title">{data.Name}</h2>
                      <p>{`Pertanyaan : "${data.Question}`}</p>
                      <p>{`Jawaban    : "${data.Answer}`}</p>
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

export default ListPesan