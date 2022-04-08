import React from 'react'
import Link from 'next/link'

function LiveStreamCircle({ data }) {
  let backend = process.env.NEXT_PUBLIC_BACKEND || ""

  return (
    <Link href={`/stream/${data.id}`}>
      <a className="">
        <button className="h-[60px] w-[60px] border-2 rounded-full border-blue-300 flex items-center justify-center">
          <img src={backend + "/static" + data.cover} className="object-cover h-[52px] w-[52px] rounded-full" />
        </button>
        <div className=" text-center text-[12px] text-gray-500 mt-[2px] w-[60px] overflow-hidden line-clamp-1">
          {data["User"].name}
        </div>
      </a>
    </Link>
  )
}

export default LiveStreamCircle