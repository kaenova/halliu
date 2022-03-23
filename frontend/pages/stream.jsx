import PageContainer from "../components/PageContainer"
import DragDrop from "../components/DragDrop"
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const HighlightForm = () => {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  const fileTypes = ["JPG"];
  return (
    <>
      <PageContainer>
        <div className="min-h-screen">
          <div className="flex justify-center items-center min-h-screen max-w-[1444px] mx-8">
            <div className=" w-full ">
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
                  <input type="text" placeholder="Masukkan judul paling menarik mu!" className="input input-bordered w-full " />
                  <label className="label">
                    <span className="label-text">Bukti (JPEG/MP4)</span>
                  </label>
                  <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
                    <button className="h-[200px] border-2 w-[100%] rounded-md border-dashed opacity-60">
                      Upload Disini
                    </button>
                  </FileUploader>
                  <div className="text-center mt-10 ">
                    <button className="btn btn-outline w-full">Start Stream!</button>
                  </div>
                </form>
                <label className="label">
                  <span className="label-text">Stream Key</span>
                </label>
                <input type="text" placeholder="Stream key akan ditampilkan di sini" className="input input-bordered w-full " readOnly />

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


export default HighlightForm