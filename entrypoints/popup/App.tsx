import { useState, useEffect } from "react";
import Symbol from "@/components/Symbol";
import {
  CLASSLIST,
} from "@/data/constants";

function App() {
  const [select, setSelect] = useState('');

  const handleChange = async (e: any) => {
    setSelect(e.target.value);

    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      browser.tabs.sendMessage(tabs[0].id!, {
        type: 'SELECT',
        value: e.target.value
      })
    })

    await storage.setItem<string>('local:aspectRatio', e.target.value)
  }

  useEffect(() => {
    (async () => {
      const preSelect = await storage.getItem<string>('local:aspectRatio')
      if (preSelect) setSelect(preSelect);
    })()
  }, [])

  return (
    <div className="py-12 px-7 min-w-80 flex flex-col items-center gap-3">
      <Symbol className="w-12 h-12 mb-3" />
      <p className="text-base text-black font-sans font-bold whitespace-nowrap">
        Say Goodbye to Black Bars!
      </p>
      <p className="text-center text-xs text-zinc-600 font-sans leading-relaxed">
        Press{" "}
        <span className="h-5 w-5 inline-flex items-center justify-center rounded-md bg-zinc-100 font-bold">
          ~
        </span>{" "}
        to resize YouTube videos.
        <br />
        <br />
        You can also use <span className="h-5 px-2 inline-flex items-center justify-center rounded-md bg-zinc-100 font-bold">
          Ctrl/Cmd+Shift+V
        </span> or open your chrome extension settings to assign a custom keyboard shortcut as well.
        <br />
        <br />
        Resize directly by choosing an aspect ratio from the options below:
      </p>
      <fieldset className="grid w-full mt-3">
        <label className="text-sm">Aspect Ratio</label>
        <select value={select || ''} onChange={handleChange} className="h-8 px-1 border rounded text-base">
          {CLASSLIST.map(c => (
            <option key={c.className} value={c.className}>{c.label}</option>
          ))}
        </select>
      </fieldset>
    </div>
  );
}

export default App;
