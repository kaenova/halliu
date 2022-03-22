import PageContainer from "../components/PageContainer"
import Link from 'next/link'

const Login = () => {
  return (
    <>
      <PageContainer>
        <div className="min-h-screen">
          <div className="flex  justify-center items-center min-h-screen  mx-8">
            <div className=" w-full max-w-[1444px] ">
              <div>
                <p className="text-5xl font-bold w-full text-center mb-10">
                  Bagikan Momentmu!!
                </p>
              </div>
              <div className="md:w-1/2 mx-auto">
                <form action="">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="text" placeholder="fanzru@gmail.com" className="input input-bordered w-full "/>
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="affanganteng" className="input input-bordered w-full "/>
                </form>
              </div>
              
              <div className="text-center mt-10">
                <button className="btn btn-outline">Masuk</button>
              </div>
              <div className="text-center mt-6 text-gray-400">
                <p>
                  Belum punya akun ?
                  <Link  href="/daftar">
                    <a className="text-black">Daftar</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  )
}


export default Login