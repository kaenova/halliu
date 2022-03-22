import { dataHighlight } from "../data/highlight"
import Image from "next/image"
import { VscEye } from 'react-icons/vsc'
import { useRouter } from 'next/router'
const HighLight = (props) => {
  const router = useRouter()
  return (
    <>
      <div className="z-10 ">
        <div className="flex flex-row justify-center">
          <div className="w-full  max-w-[800px] flex flex-col">
            <button onClick={() => { router.push("/highlight_form") }} className="btn btn-outline w-full mt-5">Upload Moment Terbaik Mu!</button>
            {
              dataHighlight.map((data, idx) => {
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