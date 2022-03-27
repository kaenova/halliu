import React from 'react'
import Link from 'next/link'
import Image from "next/image"

function HighlightCard(data) {
  console.log(data.data)
  console.log(process.env.NEXT_PUBLIC_BACKEND || "" + "/static" + data.data.cover)
  return (
    <Link href="/highlight" passHref>
      <a className="relative">
        <div className="h-[50px] flex flex-col mx-2">
          <p className="font-semibold text-lg">{data.data.title}</p>
          {/* Should be persons name */}
          <p>{data.data["User"].name}</p>
        </div>
        <div className="h-[300px] w-full relative object-cover">
          <img
            src={process.env.NEXT_PUBLIC_BACKEND || "" + "/static" + data.data.cover}
            className='object-cover h-[300px] w-full rounded-md'
          />
        </div>
        <div className="border border-dashed w-full mt-2"></div>
      </a>
    </Link>
  )
}

export default HighlightCard