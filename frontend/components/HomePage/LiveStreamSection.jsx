import {dataLiveStream} from "../../data/livestream"
import { HiOutlinePlusSm } from "react-icons/hi";
import {useRouter} from 'next/router'
const LiveStream = (props) => {
  const router = useRouter()
  return (
    <>
      <div className="z-index-0 border-b  ">
        <div className=" flex justify-center">
          <div className="flex flex-row  h-[100px]  mx-4 gap-[8px] items-center overflow-x-auto scroll-smoth w-full max-w-[800px] ">
            <div className="flex justify-center flex-col items-center">
              <button onClick={() => {router.push("/stream")}} className="btn btn-circle btn-outline h-[60px] w-[60px] text-[30px] border-2 border-dashed border-gray-300 text-gray-300 ">
                <HiOutlinePlusSm/>
              </button>
              <div className=" text-center text-[12px] text-gray-500 mt-[2px]"> 
                {"Mulai Stream"}
              </div>
            </div>
            
            {
              dataLiveStream.map((data,i)=> {
                return (
                  <div key={i} className="">
                    <button className="h-[60px] w-[60px] border-2 rounded-full border-blue-300 flex items-center justify-center">
                      <img src={data.link_photo} className="object-cover h-[52px] w-[52px] rounded-full"/>
                    </button>
                    <div className=" text-center text-[12px] text-gray-500 mt-[2px]"> 
                      {data.nama}
                    </div>
                  </div>
                )
              })
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default LiveStream