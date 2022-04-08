import { dataLiveStream } from "../../data/livestream"
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from 'next/link'
import { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { api } from "../../utils/api";
import LiveStreamCircle from "./LiveStreamCircle";

const LiveStream = (props) => {
  const [dataPesan, setDataPesan] = useState(null)

  useEffect(() => {
    api().get("/api/stream")
    .then(res => {
      console.log(res.data.data)
      setDataPesan(res.data.data)
    })
    .catch(e => {
      setDataPesan("err")
    })
  }, [])


  return (
    <>
      <div className="z-index-0 border-b  ">
        <div className=" flex justify-center">
          <div className="flex flex-row  h-[100px]  mx-4 gap-[8px] items-center overflow-x-auto scroll-smoth w-full max-w-[800px] ">
            <div className="flex justify-center flex-col items-center">
              <Link href='/stream'>
                <a className="btn btn-circle btn-outline h-[60px] w-[60px] text-[30px] border-2 border-dashed border-gray-300 text-gray-300 ">
                  <HiOutlinePlusSm />
                </a>
              </Link>
              <div className=" text-center text-[12px] text-gray-500 mt-[2px]">
                {"Mulai Stream"}
              </div>
            </div>
            {
              dataPesan == null ?
                <div className="grow flex justify-center items-center">
                  <LoadingSpinner />
                </div>
                : dataPesan == "err" ?
                  <div className="grow flex justify-center items-center">
                    Tidak dapat mengambil data stream
                  </div>
                  : dataPesan.length == 0 ?
                    <></>
                    :
                    dataPesan.map((data, i) => {
                      return (
                        <LiveStreamCircle data={data} key={i}/>
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