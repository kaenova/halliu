import PageContainer from "../components/PageContainer"
import Link from 'next/link'
import { useState } from "react"
import { useRouter } from "next/router"
import { api } from "../utils/api"


const RegisterAdmin = () => {
  const [FormState, setFormState] = useState({
    nama: "",
    email: "",
    password: "",
    repassword: "",
  })

  const [PesanBox, setPesanBox] = useState("")

  const router = useRouter()

  const handleDaftarButton = () => {
    let data = { ...FormState }
    if (data.password !== data.repassword) {
      setPesanBox("Password dan Repassword harus sama")
      return
    }
    var formData = new FormData();
    formData.append("name", data.nama)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("role", "cs")
    api().post("/api/register", formData)
      .then((res) => {
        setPesanBox("Berhasil mendaftar")
        setTimeout(() => {
          router.push("/masuk")
        }, 2000);
      })
      .catch((e) => {
        setPesanBox("Gagal untuk mendaftar. Periksa kembali form anda")
      })
  }

  return (
    <>
      <PageContainer>
        <div className="min-h-screen">
          <div className="flex justify-center items-center min-h-screen max-w-[1444px] mx-8">
            <div className=" w-full ">
              <div>
                <p className="text-5xl font-bold w-full text-center mb-10">
                  Daftarkan Dirimu sebagai Admin
                </p>
              </div>
              <div className="md:w-1/2 mx-auto">
                <form action="">
                <label className="label">
                    <span className="label-text">Nama</span>
                  </label>
                  <input onChange={(e) => { setFormState({ ...FormState, nama: e.target.value }) }} type="text" placeholder="Ananda Affan Fattahila" className="input input-bordered w-full "/>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input onChange={(e) => { setFormState({ ...FormState, email: e.target.value }) }} type="text" placeholder="fanzru@gmail.com" className="input input-bordered w-full "/>
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input onChange={(e) => { setFormState({ ...FormState, password: e.target.value }) }} type="password" placeholder="Minimal 1 simbol, 1 angka, 1 Kapital, dan 1 Non Kapital" className="input input-bordered w-full "/>
                  <label className="label">
                    <span className="label-text">Re-Password</span>
                  </label>
                  <input onChange={(e) => { setFormState({ ...FormState, repassword: e.target.value }) }} type="password" placeholder="Minimal 1 simbol, 1 angka, 1 Kapital, dan 1 Non Kapital" className="input input-bordered w-full "/>
                  {PesanBox !== "" &&
                    <div className="border-2 border- w-full h-[50px] mt-4 rounded-md border-red-300 flex justify-center items-center">
                      {PesanBox}
                    </div>
                  }
                </form>
              </div>
              
              <div className="text-center mt-10">
                <button onClick={handleDaftarButton} className="btn btn-outline">Daftar</button>
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


export default RegisterAdmin