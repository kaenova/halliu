import PageContainer from "../components/PageContainer"
import DragDrop from "../components/DragDrop"
const BantuanForm = () => {
  return (
    <>
      <PageContainer>
        <div className="min-h-screen">
          <div className="flex justify-center items-center min-h-screen max-w-[1444px] mx-8">
            <div className=" w-full ">
              <div>
                <p className="text-5xl font-bold w-full text-center mb-10">
                  Pengajuan Pesan Bantuan
                </p>
              </div>
              <div className="md:w-1/2 mx-auto">
                <form action="">
                  <label className="label">
                    <span className="label-text">Pertanyaan</span>
                  </label>
                  <textarea type="text" placeholder="Masukkan Pertanyaan Anda" className="input input-bordered w-full min-h-[250px] " />
                  <label className="label">
                    <span className="label-text">Bukti (JPEG/MP4)</span>
                  </label>
                  <DragDrop className="w-[100%]"/>
                  <div className="text-center mt-10">
                    <button className="btn btn-outline">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  )
}


export default BantuanForm