import {
  CUSTOM_CLASS_AD_MODULE,
  CUSTOM_CLASS_PLAYER,
  CUSTOM_CLASS_CONTAINER,
  CUSTOM_CLASS_VIDEO,
  CLASSLIST,
  CLASS_PREFIX,
} from "@/data/constants";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

const App = () => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  const indexRef = useRef(index);
  const timerRef = useRef(0);

  const videoAdModuleRef = useRef<Element | null>(null);
  const videoPlayerRef = useRef<Element | null>(null);
  const videoContainerRef = useRef<Element | null>(null);
  const videoRef = useRef<Element | null>(null);

  const prepareElements = () => {
    if (!videoAdModuleRef.current) {
      videoAdModuleRef.current = document.querySelector(".ytp-ad-module");
      videoAdModuleRef.current?.classList.add(CUSTOM_CLASS_AD_MODULE);
    }

    if (!videoPlayerRef.current) {
      videoPlayerRef.current = document.querySelector(".html5-video-player");
      videoPlayerRef.current?.classList.add(CUSTOM_CLASS_PLAYER);
    }

    if (!videoContainerRef.current) {
      videoContainerRef.current = document.querySelector(
        ".html5-video-container"
      );
      videoContainerRef.current?.classList.add(CUSTOM_CLASS_CONTAINER);
    }

    if (!videoRef.current) {
      videoRef.current = document.querySelector(".video-stream");
      videoRef.current?.classList.add(CUSTOM_CLASS_VIDEO);
    }
  };

  const updateIndex = (value: number) => {
    indexRef.current = value;
    setIndex(value);
  };

  const eventListener = async (e: any) => {
    await prepareElements();

    if (videoContainerRef.current && e.code === "Backquote") {
      if (indexRef.current >= CLASSLIST.length - 1) {
        updateIndex(0);
      } else {
        updateIndex(indexRef.current + 1);
      }

      // 1. remove all classes starting with dc_yt
      const classes = videoContainerRef.current?.className
        .split(" ")
        .filter((c) => !c.startsWith(CLASS_PREFIX));
      videoContainerRef.current.className = classes.join(" ").trim();

      // 2. add next class in line from array
      videoContainerRef.current.classList.add(
        `${CLASS_PREFIX}${CLASSLIST[indexRef.current]}`
      );

      // 3. Show current settings
      setShow(true);
    }
  };

  const locationChageListener = () => {
    if (videoContainerRef.current) {
      const classes = videoContainerRef.current?.className
        .split(" ")
        .filter((c) => !c.startsWith(CLASS_PREFIX));
      videoContainerRef.current.className = classes.join(" ").trim();

      updateIndex(0);
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", eventListener);
    window.addEventListener("yt-navigate-start", locationChageListener);

    return () => {
      window.removeEventListener("keypress", eventListener);
      window.removeEventListener("yt-navigate-start", locationChageListener);
      clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timerRef.current);
  }, [index]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-20 right-20 text-8xl 2xl:text-9xl text-white text-shadow font-sans font-light"
        >
          {CLASSLIST[index]}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default App;
