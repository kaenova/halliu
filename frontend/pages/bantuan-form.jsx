import PageContainer from "../components/PageContainer"
import DragDrop from "../components/DragDrop"
import { FileUploader } from "react-drag-drop-files";
import {useState} from 'react'

const BantuanForm = () => {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  const fileTypes = ["JPG", "MP4"];
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
                  <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
                    <button className="h-[200px] border-2 w-[100%] rounded-md border-dashed opacity-60">
                      Upload Disini
                    </button>
                  </FileUploader>

                  <div className="text-center mt-10 mb-4">
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

// export async function getServerSideProps({ req, res }) {
//   if (!req.cookies.auth) {
//     return {
//       redirect : {
//         destination: "/masuk",
//         permanent: false
//       }
//     }
//   }
//   return {
//     props: {}
//   }
// }



export default BantuanForm