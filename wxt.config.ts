import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: {
    author: {
      email: "awais.k.ali@gmail.com",
    },
    name: "tilda: YouTube Black Bars Remover",
    description: "Say Goodbye to Black Bars!",
    icons: {
      16: "/icon16.png",
      32: "/icon32.png",
      48: "/icon48.png",
      128: "/icon128.png",
    },
    host_permissions: ["http://*/*", "https://*/*"],
    permissions: ["background"],
  },
});
