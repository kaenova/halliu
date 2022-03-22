import PageContainer from "../components/PageContainer"
import {useRouter} from 'next/router'
export default function Bantuan() {
  const router = useRouter()
  return (
    <>
      <PageContainer>
        <div className="min-h-screen">
        <div className="hero min-h-screen">
          <div className="text-center hero-content">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello Semuanya!!</h1>
              <p className="py-6">Jangan lupa saling membantu dan menolong, karena kamu membantu seseorang hidupmu akan dipermudah bestie.</p>
              <div className="flex p-4 justify-center gap-4">
               <button onClick={()=> {router.push('/list-bantuan')}} className="btn btn-outline">List Bantuan</button>
               <button onClick={() => {router.push("/bantuan_form")}} className="btn btn-outline">Minta Bantuan</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </PageContainer>
    </>
  )
}
