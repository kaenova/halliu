import { useRouter } from 'next/router'
import Link from 'next/link'

const Navbar = (props) => {
  const router = useRouter()
  return (
    <>
      <div className="navbar bg-base-100 border-b border z-50 fixed " >
        <div className="flex-1">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">HALLIU</a>
        </Link>
        </div>
        <div className="flex-none">
        <button className="btn btn-square btn-ghost w-[100px]" onClick={()=>{router.push("/")}}>
            <p className="">Timeline</p>
          </button>
          <button className="btn btn-square btn-ghost w-[100px]" onClick={()=>{router.push("/masuk")}}>
            <p className="">Masuk</p>
          </button>
          <button className="btn btn-square btn-ghost w-[100px]" onClick={()=>{router.push("/bantuan")}}>
            <p className="">Bantuan</p>
          </button>
        </div>
        
      </div>
      <div className='w-1 h-[66px]'></div>
    </>
  )
}

export default Navbar
