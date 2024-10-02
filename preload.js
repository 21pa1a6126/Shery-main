const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  fromPython: (callback) =>
    ipcRenderer.on("fromPython", (event, data) => callback(data)),
  showBreakNotification: () => ipcRenderer.invoke("show-break-notification"),
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  closeWindow: () => ipcRenderer.send("close-window"),
  getAppUsage: () => ipcRenderer.invoke("get-app-usage"),
  saveOnboardingData: (data) => ipcRenderer.send("save-onboarding-data", data),
  onOnboardingDataSaved: (callback) =>
    ipcRenderer.on("onboarding-data-saved", (event, response) =>
      callback(response)
    ),
  onNavigateTo: (callback) =>
    ipcRenderer.on("navigate-to", (event, url) => callback(url)), // Added
});
