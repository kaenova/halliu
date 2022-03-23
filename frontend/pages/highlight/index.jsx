import PageContainer from "../../components/PageContainer"

export default function Home() {
  return (
    <>
      <PageContainer>
        <div className="h-screen flex flex-col items-center justify-center gap-5">
            <h1 className="text-center text-5xl font-bold">Highlight</h1>
            <div className="w-full h-[70%]">
                <img src="/kiseki-no-sedai.jpeg" alt="" className="object-cover h-full w-full"/>
            </div>
        </div>
      </PageContainer>
    </>
  )
}
