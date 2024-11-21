export default defineBackground(() => {
  let reasons = [
    chrome.runtime.OnInstalledReason.INSTALL,
    chrome.runtime.OnInstalledReason.UPDATE,
  ];

  /**
   * run on install
   */
  chrome.runtime.onInstalled.addListener(async (details) => {
    const { reason } = details;

    if (reasons.indexOf(reason) >= 0) {
      // chrome.tabs.create({
      //   url: "onboarding.html",
      // });

      let manifest = await chrome.runtime.getManifest();

      if (manifest.content_scripts) {
        for (const cs of manifest.content_scripts) {
          for (const tab of await chrome.tabs.query({ url: cs.matches })) {
            if (tab.url!.match(/(chrome|chrome-extension):\/\//gi)) {
              continue;
            }
            chrome.scripting.executeScript({
              files: cs.js!,
              target: { tabId: tab.id!, allFrames: cs.all_frames },
              injectImmediately: cs.run_at === "document_start",
              // world: cs.world, // uncomment if you use it in manifest.json in Chrome 111+
            });
          }
        }
      }
    }
  });
});
