import PageContainer from "../components/PageContainer"
import DragDrop from "../components/DragDrop"
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
const HighlightForm = () => {
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
                  <div className="flex gap-2 items-center justify-between">
                    <div className="grow">
                      <label className="label">
                        <span className="label-text">Cover (JPEG)</span>
                      </label>
                      <DragDrop className="w-[100%]" />
                    </div>
                    <div className="grow">
                      <label className="label">
                        <span className="label-text">Video (MP4)</span>
                      </label>
                      <DragDrop className="w-[100%]" />
                    </div>
                  </div>
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