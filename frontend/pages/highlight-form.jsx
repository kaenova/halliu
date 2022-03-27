import PageContainer from "../components/PageContainer"
import { authApi } from "../utils/api";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
const HighlightForm = () => {

  const [FormInput, setFormInput] = useState({
    title: "",
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

  const handleSubmitButton = (e) => {
    e.preventDefault()
    setPesanBox("Mohon Tunggu. Sedang Mengunggah...")
    if (FormInput.title == "" || FormInput.video == null || FormInput.image == null) {
      setPesanBox("Judul, Cover dan Video tidak boleh kosong")
      return
    }

    let formData = new FormData();
    formData.append("title", FormInput.title)
    formData.append("image", FormInput.image)
    formData.append("video", FormInput.video)

    authApi().post("/api/highlight", formData)
      .then((res) => {
        console.log(res)
        if (res) {
          setPesanBox("Berhasil mengunggah ")
          setTimeout(() => {
            window.location.replace("/");
          }, 3000);
          return
        }
        throw new Error("gagal")
      })
      .catch((e) => {
        setPesanBox("Gagal dalam mengirimkan data, harap coba lagi")
        setTimeout(() => {
          window.location.replace("/");
        }, 3000);
      })
  }

  const fileTypes = ["JPG", "JPEG"];
  const fileTypes2 = ["MP4"];

  return (
    <>
      <PageContainer>
        <div className="min-h-screen">
          <div className="flex justify-center items-center min-h-screen max-w-[1444px] mx-8">
            <div className=" w-full ">
              <div>
                <p className="text-5xl font-bold w-full text-center mb-10">
                  Upload Penampilan Terbaikmu
                </p>
              </div>
              <div className="md:w-1/2 mx-auto">
                <form action="">
                  <label className="label">
                    <span className="label-text">Judul</span>
                  </label>
                  <input onChange={(e) => {setFormInput({...FormInput, title: e.target.value})}} type="text" placeholder="Masukkan Judul Anda" className="input input-bordered w-full " />

                  <label className="label">
                    <span className="label-text">Cover (JPEG)</span>
                  </label>
                  <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
                    <button onClick={(e) => {e.preventDefault()}} className="h-[200px] border-2 w-[100%] rounded-md border-dashed opacity-60">
                    <p>Upload Disini (Max. 10MB)</p> 
                      {
                        FormInput.image &&
                        <p>Cover Terunggah</p>
                      }
                    </button>
                  </FileUploader>

                  <label className="label">
                    <span className="label-text">Video (MP4)</span>
                  </label>
                  <FileUploader handleChange={handleChange} name="file" types={fileTypes2}>
                    <button onClick={(e) => {e.preventDefault()}} className="h-[200px] border-2 w-[100%] rounded-md border-dashed opacity-60">
                      <p>Upload Disini (Max. 1GB)</p> 
                      {
                        FormInput.video &&
                        <p>Video Terunggah</p>
                      }
                    </button>
                  </FileUploader>

                  {PesanBox !== "" &&
                    <div className="border-2 border- w-full h-[50px] mt-4 rounded-md border-red-300 flex justify-center items-center">
                      {PesanBox}
                    </div>
                  }

                  <div className="text-center mt-10">
                    <button onClick={handleSubmitButton} className="btn btn-outline w-full">Upload</button>
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
  if (req.cookies.auth && (req.cookies.role == "reg")) {
    return {
      props: {}
    }

  }
  return {
    redirect: {
      destination: "/masuk?need_login",
      permanent: false
    }
  }
}

export default HighlightForm