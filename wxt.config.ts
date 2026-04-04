import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    author: {
      email: "awais.k.ali@gmail.com",
    },
    name: "Tilda: Remove Black Bars on YouTube",
    description:
      "Tilda is a browser extension that resizes YouTube videos and removes black bars so you can enjoy your videos in true full-screen.",
    icons: {
      16: "/icon16.png",
      32: "/icon32.png",
      48: "/icon48.png",
      128: "/icon128.png",
    },
    permissions: ['activeTab', 'storage'],
    commands: {
      'tilda': {
        suggested_key: {
          default: 'Ctrl+Shift+V',
          mac: 'Command+Shift+V',
        },
        description: 'Activate Tilda'
      }
    }
  },
});
