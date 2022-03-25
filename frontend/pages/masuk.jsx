import PageContainer from "../components/PageContainer"
import Link from 'next/link'
import { useState } from "react"
import { useRouter } from "next/router"
import { api } from "../utils/api"
import jsCookie from 'js-cookie';

const Login = () => {

  const [FormState, setFormState] = useState({
    email: "",
    password: "",
  })

  const [PesanBox, setPesanBox] = useState("")

  const router = useRouter()

  const handleLoginButton = () => {
    var formData = new FormData();
    formData.append("email", FormState.email)
    formData.append("password", FormState.password)
    api().post("/api/login", formData)
      .then((res) => {
        setPesanBox("Berhasil Login, Mengarahkan ke Laman Terkait")
        jsCookie.set('auth', res.data.data.token)
        jsCookie.set('role', res.data.data.role)
        setTimeout(() => {
          if (res.data.data.role == "cs") {
            window.location.replace("/dashboard-cs");
            return
          }
          window.location.replace("/");
        }, 2000);
      })
      .catch((e) => {
        console.log(e)
        setPesanBox("Gagal untuk Login")
      })
  }


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
                  <input onChange={(e) => { setFormState({ ...FormState, email: e.target.value }) }} type="text" placeholder="fanzru@gmail.com" className="input input-bordered w-full "/>
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input onChange={(e) => { setFormState({ ...FormState, password: e.target.value }) }} type="password" placeholder="Minimal 1 simbol, 1 angka, 1 Kapital, dan 1 Non Kapital" className="input input-bordered w-full "/>
                  {PesanBox !== "" &&
                    <div className="border-2 border- w-full h-[50px] mt-4 rounded-md border-red-300 flex justify-center items-center">
                      {PesanBox}
                    </div>
                  }
                </form>
              </div>
              
              <div className="text-center mt-10">
                <button onClick={handleLoginButton} className="btn btn-outline">Masuk</button>
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

export async function getServerSideProps({ req, res }) {
  if (req.cookies.auth) {
    return {
      redirect : {
        destination: "/",
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}


export default Login