import PageContainer from "../components/PageContainer"
export default function Bantuan() {
  return (
    <>
      <PageContainer>
        <div className="min-h-screen">
        <div class="hero min-h-screen">
          <div class="text-center hero-content">
            <div class="max-w-md">
              <h1 class="text-5xl font-bold">Hello Semuanya!!</h1>
              <p class="py-6">Jangan lupa saling membantu dan menolong, karena kamu membantu seseorang hidupmu akan dipermudah bestie.</p>
              <div className="flex p-4 justify-center gap-4">
               <button class="btn btn-outline">List Bantuan</button>
               <button class="btn btn-outline">Minta Bantuan</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </PageContainer>
    </>
  )
}
