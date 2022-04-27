import PageContainer from "../components/PageContainer"
import DragDrop from "../components/DragDrop"
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { authApi } from "../utils/api";

const HighlightForm = () => {
  const [Form, setForm] = useState({
    title: "",
    cover: null
  })
  const [StreamKey, setStreamKey] = useState("")
  const [PesanBox, setPesanBox] = useState("")
  const [StreamKeySuccess, setStreamKeySuccess] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (Form.title == "" || Form.cover == null) {
      setPesanBox("Judul dan Cover harus diisi")
      return
    }

    let form = new FormData()
    form.append("title", Form.title)
    form.append("cover", Form.cover)
    authApi().post("/api/stream", form)
      .then((res) => {
        setPesanBox("Jangan tutup laman ini!\nGunakan Stream Key untuk melakukan Stream, Baca petunjuk Cara Melakukan Stream")
        let streamKey = `${res.data.data.id}?key=${res.data.data.streamKey}`
        setStreamKey(streamKey)
      })
      .catch((e) => {
        setPesanBox("Gagal dalam membuat stream, kembali ke laman awal")
        if (e.response) {
          if (e.response.status == 400) {
            setPesanBox(e.response.data.message)
            setStreamKeySuccess(true)
          }
        }
        setTimeout(() => {
          window.location.replace("/");
        }, 3000);
      })
  }

  const fileTypes = ["JPG", "JPEG"];
  return (
    <>
      <PageContainer>
        <div className="min-h-screen">
          <div className="flex justify-center items-center min-h-screen  mx-8">
            <div className=" w-full max-w-[1444px]">
              <div>
                <p className="text-5xl font-bold w-full text-center mb-10">
                  Stream Penampilan Terbaikmu
                </p>
              </div>
              <div className="md:w-1/2 mx-auto">
                <form action="">
                  <label className="label">
                    <span className="label-text">Judul</span>
                  </label>
                  <input onChange={(e) => { setForm({ ...Form, title: e.target.value }) }} type="text" placeholder="Masukkan judul paling menarik mu!" className="input input-bordered w-full " />
                  <label className="label">
                    <span className="label-text">Bukti (JPEG/MP4)</span>
                  </label>
                  <FileUploader handleChange={(file) => { setForm({ ...Form, cover: file }) }} name="file" types={fileTypes}>
                    <button onClick={(e) => (e.preventDefault())} className="h-[200px] border-2 w-[100%] rounded-md border-dashed opacity-60">
                      <p>Upload Disini</p>
                      <p>Max. 10 MB</p>
                      {Form.cover && <p>File Terunggah</p>}
                    </button>
                  </FileUploader>
                  {PesanBox !== "" &&
                    <div className="border-2 border- w-full mt-4 rounded-md border-red-300 flex justify-center items-center text-center p-3">
                      {PesanBox}
                    </div>
                  }
                  <div className="text-center mt-5 ">
                    {
                      !StreamKeySuccess ?
                      <button onClick={handleSubmit} className={"btn btn-outline w-full "}>Start Stream!</button>
                      :
                      <button className={ "btn btn-disabled w-full "}>Create Stream Success!</button>
                    }
                    
                  </div>
                </form>
                <label className="label">
                  <span className="label-text">Stream Key</span>
                </label>
                <input value={StreamKey} type="text" placeholder="Stream key akan ditampilkan di sini" className="input input-bordered w-full " readOnly />

                <div className="mt-10">
                  <h2 className="text-center font-bold">Cara Melakukan Stream</h2>
                  <ol className="list-decimal">
                    <li>Masukkan judul dan pilihlah cover yang sesuai untuk stream anda. Disarankan untuk mengupload file berukuran HD</li>
                    <li>Ketika judul dan cover sudah terupload. Tekan tombol START STREAM!</li>
                    <li>Tunggu Hingga Stream key Keluar. Ketika sudah keluar, copy seluruh text tersebut dan persiapkan software streaming mu. Disarankan OBS (Open Broadcaster Software).</li>
                    <li>Setting stream mu dengan <span className="font-bold">server</span> <div className="bg-black p-2 rounded-md"><p className="text-white">rtmp://[IP]:1935/live</p></div> dengan Stream Key yang didapatkan pada langkah 3 </li>
                    <li>Lalu Tekan Start Stream dan Streaming mu akan otomatis terdaftar pada daftar stream di beranda.</li>
                    <li>Stream akan otomatis mati ketika anda matikan pada aplikasi streaming anda</li>
                  </ol>
                </div>

              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  )
}

// export async function getServerSideProps({ req, res }) {
//   if (req.cookies.auth && (req.cookies.role == "reg")) {
//     return {
//       props: {}
//     }

//   }
//   return {
//     redirect: {
//       destination: "/masuk?need_login",
//       permanent: false
//     }
//   }
// }

export default HighlightForm