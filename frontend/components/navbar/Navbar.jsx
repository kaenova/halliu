import { useRouter } from 'next/router'
import Link from 'next/link'
import jsCookie from 'js-cookie';

const Navbar = (props) => {
  const router = useRouter()

  const handleKeluar = () => {
    jsCookie.remove('auth')
    jsCookie.remove('role')
    window.location.replace("/");
  }
  return (
    <>
      <div className="navbar bg-base-100 border-b border z-50 fixed mb-3" >
        <div className="flex-1">
          <Link href="/">
            <a className="btn btn-ghost normal-case text-xl">HALLIU</a>
          </Link>
        </div>
        <div className="flex-none">
          {
            jsCookie.get("role") !== "cs" &&
            <button className="btn btn-square btn-ghost w-[100px]" onClick={() => { router.push("/") }}>
              <p className="">Timeline</p>
            </button>
          }
          <button className="btn btn-square btn-ghost w-[100px]" onClick={() => { router.push("/bantuan") }}>
            <p className="">Bantuan</p>
          </button>
          {
            jsCookie.get("auth") ?
              <button onClick={handleKeluar} className="btn btn-square btn-ghost w-[100px]">
                <p className="">Keluar</p>
              </button>
              :
              <button className="btn btn-square btn-ghost w-[100px]" onClick={() => { router.push("/masuk") }}>
                <p className="">Masuk</p>
              </button>
          }
        </div>

      </div>
      <div className='w-1 h-[66px]'></div>
    </>
  )
}

export default Navbar
