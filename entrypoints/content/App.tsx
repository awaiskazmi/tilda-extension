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

const ALLOWED_KEYCODES = ['Backquote', 'KeyV']

const App = () => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  const indexRef = useRef(index);
  const timerRef = useRef(0);

  const videoAdModuleRef = useRef<Element | null>(null);
  const videoPlayerRef = useRef<Element | null>(null);
  const videoContainerRef = useRef<Element | null>(null);
  const videoRef = useRef<Element | null>(null);

  const resizeVideo = async (e?: any, manual?: string) => {
    if (e && ALLOWED_KEYCODES.indexOf(e.code) < 0) return;
    if (!videoContainerRef.current) return;

    if (indexRef.current >= CLASSLIST.length - 1) {
      updateIndex(0);
    } else {
      if (manual) {
        updateIndex(CLASSLIST.findIndex(el => el.className === manual))
      } else {
        updateIndex(indexRef.current + 1);
      }
    }

    // 1. remove all classes starting with dc_yt
    const classes = videoContainerRef.current.className
      .split(" ")
      .filter((c) => !c.startsWith(CLASS_PREFIX));
    videoContainerRef.current.className = classes.join(" ").trim();

    // 2. add next class in line from array
    if (manual) {
      videoContainerRef.current.classList.add(
        `${CLASS_PREFIX}${manual}`
      );
    } else {
      videoContainerRef.current.classList.add(
        `${CLASS_PREFIX}${CLASSLIST[indexRef.current].className}`
      );
    }

    // 3. Show current settings
    setShow(true);
  }

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

  const tilda = async (e?: any, manual?: string) => {
    await prepareElements();
    await resizeVideo(e, manual);
  }

  const eventListener = async (e: any) => {
    await tilda(e);
  };

  const locationChageListener = async () => {
    await storage.clear('local');

    if (videoContainerRef.current) {
      const classes = videoContainerRef.current?.className
        .split(" ")
        .filter((c) => !c.startsWith(CLASS_PREFIX));
      videoContainerRef.current.className = classes.join(" ").trim();

      updateIndex(0);
    }
  };

  useEffect(() => {
    browser.runtime.onMessage.addListener(async (message) => {
      if (message.type === 'TILDA') {
        await tilda();
      }
      if (message.type === 'SELECT') {
        await tilda(undefined, message.value)
      }
    })
  }, [])

  useEffect(() => {
    window.addEventListener("keypress", eventListener);
    window.addEventListener("yt-navigate-finish", locationChageListener);

    return () => {
      window.removeEventListener("keypress", eventListener);
      window.removeEventListener("yt-navigate-finish", locationChageListener);
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
          {CLASSLIST[index].label}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default App;
