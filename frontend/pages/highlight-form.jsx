import PageContainer from "../components/PageContainer"
import DragDrop from "../components/DragDrop"
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
const HighlightForm = () => {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  const fileTypes = ["JPG"];
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
                  <input type="text" placeholder="Masukkan Pertanyaan Anda" className="input input-bordered w-full " />
                  
                  <label className="label">
                    <span className="label-text">Cover (JPEG)</span>
                  </label>
                  <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
                    <button className="h-[200px] border-2 w-[100%] rounded-md border-dashed opacity-60">
                      Upload Disini
                    </button>
                  </FileUploader>

                  <label className="label">
                    <span className="label-text">Video (MP4)</span>
                  </label>
                  <FileUploader handleChange={handleChange} name="file" types={fileTypes2}>
                    <button className="h-[200px] border-2 w-[100%] rounded-md border-dashed opacity-60">
                      Upload Disini
                    </button>
                  </FileUploader>
                 
                  <div className="text-center mt-10">
                    <button className="btn btn-outline w-full">Upload</button>
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


export default HighlightForm