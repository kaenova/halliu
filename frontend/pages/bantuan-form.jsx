import PageContainer from "../components/PageContainer"
import DragDrop from "../components/DragDrop"
import { FileUploader } from "react-drag-drop-files";
import { useState, useEffect } from 'react'
import { authApi } from "../utils/api";

const BantuanForm = () => {
  const [FormInput, setFormInput] = useState({
    message: "",
    video: null,
    image: null,
  })

  const [PesanBox, setPesanBox] = useState("")

  const handleChange = (file) => {
    if (file.type == "video/mp4") {
      setFormInput({ ...FormInput, video: file })
    }
    if (file.type == "image/jpeg") {
      setFormInput({ ...FormInput, image: file })
    }
  };
  const fileTypes = ["JPG", "MP4"];

  const handleSubmitButton = (e) => {
    e.preventDefault()
    if (FormInput.message == "") {
      setPesanBox("Pertanyaann tidak boleh kosong")
      return
    }

    let formData = new FormData();
    formData.append("message", FormInput.message)
    formData.append("image", FormInput.image)
    formData.append("video", FormInput.video)

    authApi().post("/api/support", formData)
      .then((res) => {
        if (res) {
          setPesanBox("Berhasil memasukkan data, akan segera dibalas")
          setTimeout(() => {
            window.location.replace("/list-bantuan");
          }, 3000);
          return
        }
        throw new Error("Error when uploading forms")
      })
      .catch((e) => {
        setPesanBox("Gagal dalam mengirimkan data, harap coba lagi")
        setTimeout(() => {
          window.location.replace("/bantuan");
        }, 3000);
      })
  }


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
                    <span className="label-text">Pertanyaan*</span>
                  </label>
                  <textarea onChange={(e) => { setFormInput({ ...FormInput, message: e.target.value }) }} type="text" placeholder="Masukkan Pertanyaan Anda" className="input input-bordered w-full min-h-[250px] " />

                  <label className="label">
                    <span className="label-text">Bukti (JPEG/MP4)</span>
                  </label>
                  <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
                    <button onClick={(e) => e.preventDefault()} className="h-[200px] border-2 w-[100%] rounded-md border-dashed opacity-60">
                      <p>Upload Disini</p>
                      <p>JPEG (Max. 10MB)</p>
                      <p>MP4 (Max. 1GB)</p>
                      {FormInput.image != null && <p>Foto Terupload</p>}
                      {FormInput.video != null && <p>Video Terupload</p>}
                    </button>
                  </FileUploader>
                  {PesanBox !== "" &&
                    <div className="border-2 border- w-full h-[50px] mt-4 rounded-md border-red-300 flex justify-center items-center">
                      {PesanBox}
                    </div>
                  }
                  <div className="text-center mt-10 mb-4">
                    <button onClick={handleSubmitButton} className="btn btn-outline">Submit</button>
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

export async function getServerSideProps({ req, res }) {
  if (!req.cookies.auth) {
    return {
      redirect: {
        destination: "/masuk?need_login",
        permanent: false
      }
    }
  }
  return {
    props: {
    }
  }
}



export default BantuanForm