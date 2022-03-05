import { dataHighlight } from "../data/highlight"
import Image from "next/image"
import {VscEye} from 'react-icons/vsc'
const HighLight = (props) => {
  return (
    <>
      <div className="z-10 ">
          <div className="flex justify-center">
            <div className="w-full  max-w-[800px]">
              {
                dataHighlight.map((data, idx)=>{
                  return (
                    <div key={idx} className="border-b h-[400px] relative">
                      <div className="h-[50px] flex items-center mx-2 font-normal ">
                        <p>{data.title}</p>
                      </div>
                      <div className="h-[300px] relative">
                        <Image
                          src={data.cover}
                          layout="fill"
                          className="object-cover"
                        />
                      </div>
                      <div className="items-center flex flex-row mx-2 font-light h-[50px]">
                        <VscEye/>
                        <p className="px-2">{data.view}</p>
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

export default HighLight