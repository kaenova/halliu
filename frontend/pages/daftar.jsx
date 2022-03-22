import PageContainer from "../components/PageContainer"
import Link from 'next/link'

const Register = () => {
  return (
    <>
      <PageContainer>
        <div className="min-h-screen">
          <div className="flex justify-center items-center min-h-screen max-w-[1444px] mx-8">
            <div className=" w-full ">
              <div>
                <p className="text-5xl font-bold w-full text-center mb-10">
                  Daftarkan Dirimu!!
                </p>
              </div>
              <div className="md:w-1/2 mx-auto">
                <form action="">
                <label className="label">
                    <span className="label-text">Nama</span>
                  </label>
                  <input type="text" placeholder="Ananda Affan Fattahila" className="input input-bordered w-full "/>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="text" placeholder="fanzru@gmail.com" className="input input-bordered w-full "/>
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="affanganteng" className="input input-bordered w-full "/>
                  <label className="label">
                    <span className="label-text">Re-Password</span>
                  </label>
                  <input type="password" placeholder="affanganteng" className="input input-bordered w-full "/>
                </form>
              </div>
              
              <div className="text-center mt-10">
                <button className="btn btn-outline">Daftar</button>
              </div>
              <div className="text-center mt-6 text-gray-400">
                <p>
                  Sudah punya akun ?
                  <Link  href="/masuk">
                    <a className="text-black">Masuk</a>
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


export default Register