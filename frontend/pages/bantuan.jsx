import PageContainer from "../components/PageContainer"
import { useRouter } from 'next/router'
import jsCookie from 'js-cookie';
import Link from 'next/link'

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
                <div className="flex flex-wrap p-4 justify-center gap-4 border-2 border-dashed rounded-md ">
                  {
                    jsCookie.get("role") !== "cs" &&
                    <>
                      <Link href="/list-bantuan">
                        <a className="w-[180px] btn btn-outline">List Bantuan</a>
                      </Link>
                      <Link href="/bantuan-form">
                        <a className="w-[180px] btn btn-outline">Minta Bantuan</a>
                      </Link>
                    </>
                  }
                  {
                    !jsCookie.get("auth") &&
                    <Link href="/daftar-admin">
                      <a className="w-[180px] btn btn-outline">Daftar Admin</a>
                    </Link>
                  }

                  {
                    jsCookie.get("role") == "cs" &&
                    <Link href="/dashboard-cs">
                      <a className="w-[180px] btn btn-outline">Dashboard Admin</a>
                    </Link>
                  }
                </div>
                <div className="flex p-4 justify-center gap-4">

                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  )
}