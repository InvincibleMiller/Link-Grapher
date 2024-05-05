import IndexBar from "@/components/IndexBar";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-[100vh] bg-gray-950 p-8">
      <div className="w-[600px]">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-4 text-gray-300">
            Link Grapher
          </h1>
        </div>
        <IndexBar />
      </div>
    </main>
  );
}
