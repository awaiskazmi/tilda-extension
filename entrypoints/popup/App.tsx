import Symbol from "@/components/Symbol";

function App() {
  return (
    <div className="py-12 px-10 min-w-72 flex flex-col items-center gap-3">
      <Symbol className="w-12 h-12 mb-3" />
      <p className="text-base text-black font-sans font-bold whitespace-nowrap">
        Say Goodbye to Black Bars!
      </p>
      <p className="text-center text-xs text-zinc-600 font-sans leading-relaxed">
        Press the{" "}
        <span className="h-5 w-5 inline-flex items-center justify-center rounded-md bg-zinc-100 font-bold">
          ~
        </span>{" "}
        key while watching a YouTube video to resize and enjoy it in true
        full-screen!
      </p>
    </div>
  );
}

export default App;
