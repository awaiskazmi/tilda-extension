export default defineBackground(() => {
  let reasons = [
    "install",
    "update"
  ];

  browser.runtime.onInstalled.addListener(async (details) => {
    const { reason } = details;

    if (reasons.indexOf(reason) >= 0) {
      let manifest = await browser.runtime.getManifest();

      if (manifest.content_scripts) {
        for (const cs of manifest.content_scripts) {
          for (const tab of await browser.tabs.query({ url: cs.matches })) {
            if (tab.url!.match(/(browser|browser-extension):\/\//gi)) {
              continue;
            }
            browser.scripting.executeScript({
              files: cs.js! as ScriptPublicPath[],
              target: { tabId: tab.id!, allFrames: cs.all_frames },
              injectImmediately: cs.run_at === "document_start",
              // world: cs.world, // uncomment if you use it in manifest.json in Browser 111+
            });
          }
        }
      }
    }
  });

  browser.commands.onCommand.addListener((command) => {
    if (command === 'tilda') {
      browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        browser.tabs.sendMessage(tabs[0].id!, {
          type: 'TILDA'
        })
      })
    }
    return true;
  })
});
