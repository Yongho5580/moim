export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-screen-sm  shadow-lg p-5 rounded-2xl flex flex-col gap-5">
        {["H", "ME", "YOU", "YOURSELF", ""].map((person, index) => (
          <div key={index} className="flex items-center gap-5 group">
            <div className="group flex flex-col">
              <input
                className="bg-gray-200 w-full"
                placeholder="write your email"
              />
              <span className="group-focus-within:block hidden">에러!!</span>
              <button>submit</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
