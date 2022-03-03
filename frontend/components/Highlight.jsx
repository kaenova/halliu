import {dataHighlight} from "../data/highlight"
import { HiOutlinePlusSm } from "react-icons/hi";
const Highlight = (props) => {
  return (
    <>
      <div className="z-index-0 ">
        <div className=" h-[65px]"/>
        <div className="border-b">
          <div className="flex flex-row  h-[100px]  mx-4 gap-[8px] items-center overflow-x-auto scroll-smoth">
            <button className="btn btn-circle btn-outline h-[60px] w-[60px] text-[30px] border-2 border-dashed border-gray-300 text-gray-300">
              <HiOutlinePlusSm/>
            </button>
            {
              dataHighlight.map((data,i)=> {
                return (
                  <div key={i} className="">
                    <button className="h-[60px] w-[60px] border-2  rounded-full border-gray-300">
                      {/* <Image
                          src={data.link_photo}
                          alt="Picture of the author"
                          width={60}
                          height={60}
                      /> */}
                      <img src={data.link_photo} className="object-cover h-[60px] w-[60px] rounded-full"/>
                    </button>
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

export default Highlight