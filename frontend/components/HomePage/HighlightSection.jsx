import { dataHighlight } from "../../data/highlight"
import Image from "next/image"
import { VscEye } from 'react-icons/vsc'
import { useRouter } from 'next/router'
import Link from 'next/link'


const HighLight = (props) => {
  const router = useRouter()
  return (
    <>
      <div className="z-10 ">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full max-w-[800px]">
            <div className="w-full flex items-center justify-center">
              <Link href="/highlight-form">
              <button className="btn btn-outline w-full mt-5 mx-auto">Upload Moment Terbaik Mu!</button>
              </Link>
            </div>
            <div className="gap-4">
              {
                dataHighlight.map((data, idx) => {
                  return (
                    <Link href="/highlight" key={idx} passHref>
                      <a className="h-[405px] relative ">
                        <div className="h-[50px] flex items-center mx-2 font-semibold  ">
                          {/* Should be persons name */}
                          <p>{data.title}</p> 
                        </div>
                        <div className="h-[300px] relative">
                          <Image
                            src={data.cover}
                            layout="fill"
                            className="object-cover"
                          />
                        </div>
                        <div className="border border-dashed w-full mt-4"></div>
                      </a>
                    </Link>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HighLight