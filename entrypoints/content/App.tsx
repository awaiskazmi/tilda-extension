import {
  CUSTOM_CLASS_AD_MODULE,
  CUSTOM_CLASS_PLAYER,
  CUSTOM_CLASS_CONTAINER,
  CUSTOM_CLASS_VIDEO,
  CLASSLIST,
  CLASS_PREFIX,
} from "@/data/constants";
import { useState, useEffect, useRef } from "react";

const App = () => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  const indexRef = useRef(index);
  const timerRef = useRef(0);

  const videoAdModule = document.querySelector(".ytp-ad-module");
  const videoPlayer = document.querySelector(".html5-video-player");
  const videoContainer = document.querySelector(".html5-video-container");
  const video = document.querySelector(".video-stream");

  videoAdModule?.classList.add(CUSTOM_CLASS_AD_MODULE);
  videoPlayer?.classList.add(CUSTOM_CLASS_PLAYER);
  videoContainer?.classList.add(CUSTOM_CLASS_CONTAINER);
  video?.classList.add(CUSTOM_CLASS_VIDEO);

  const updateIndex = (value: number) => {
    indexRef.current = value;
    setIndex(value);
  };

  const eventListener = (e: any) => {
    if (videoContainer && e.code === "Backquote") {
      if (indexRef.current >= CLASSLIST.length - 1) {
        updateIndex(0);
      } else {
        updateIndex(indexRef.current + 1);
      }

      // 1. remove all classes starting with dc_yt
      const classes = videoContainer?.className
        .split(" ")
        .filter((c) => !c.startsWith(CLASS_PREFIX));
      videoContainer.className = classes.join(" ").trim();

      // 2. add next class in line from array
      videoContainer.classList.add(
        `${CLASS_PREFIX}${CLASSLIST[indexRef.current]}`
      );

      // 3. Show current settings
      setShow(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", eventListener);
    return () => {
      document.removeEventListener("keypress", eventListener);
      clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      setShow(false);
    }, 300);

    return () => clearTimeout(timerRef.current);
  }, [show]);

  return show ? (
    <div className="fixed top-20 right-20 text-9xl text-white font-sans font-light">
      {CLASSLIST[index]}
    </div>
  ) : null;
};

export default App;
