import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../../assets/style.css";

import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Inter", "Space Grotesk"],
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
