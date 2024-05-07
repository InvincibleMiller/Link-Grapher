import IndexBar from "@/components/IndexBar";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <>
      <header className="bg-blue-100/75 p-4 flex flex-row border-b-2 border-blue-300">
        <Logo />
      </header>
      <main className="flex justify-center items-center grow p-8">
        <div className="w-[600px] bg-white p-12 rounded-2xl shadow-2xl border border-black/25">
          <div className="text-center">
            <h1 className="text-4xl font-semibold mb-6 text-blue-400 -mt-10 pt-10">
              Link Grapher
            </h1>
          </div>
          <IndexBar />
        </div>
      </main>
      <footer className="">
        <p className="">&copy; 2024 by Isaac Miller</p>
      </footer>
    </>
  );
}
