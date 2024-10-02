const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

// Global handler for unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Check if in development mode
const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;

// If in development, enable electron-reload
if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
  });
}

// Track the Python process and window object
let pythonProcess;
let win;

// Function to show break notification
const showBreakNotification = () => {
  const notification = new Notification({
    title: "Take a Break Reminder",
    body: "You've been working for a long time. It's time to take a break.",
    actions: [
      { type: "button", text: "Ignore" },
      { type: "button", text: "Take Break" },
    ],
    closeButtonText: "Dismiss",
  });

  notification.show();

  // Handle button actions
  notification.on("action", (event, index) => {
    if (index === 0) {
      console.log("Ignore button clicked");
    } else if (index === 1) {
      console.log("Take Break button clicked");
      win.webContents.send("reset-timer"); // Send an event to reset or perform other actions
    }
  });

  notification.on("click", () => {
    // Open the URL in the default browser
  
    const { shell } = require("electron");
    shell.openExternal("https://nehra-projects.vercel.app/");
  });

  notification.on("close", () => {
    console.log("Notification dismissed");
  });
};

// Timer for pop-up notifications
const startBreakNotificationTimer = () => {
  setInterval(showBreakNotification, 60000); // 120,000 milliseconds = 2 minutes
};

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    fullscreenable: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load the appropriate URL or HTML file based on the environment
  if (isDev) {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "public/index.html"));
  }

  win.maximize();
  win.setFullScreenable(true);
}

app.whenReady().then(() => {
  createWindow();
  
  // Start the timer for break notifications
  startBreakNotificationTimer();

  // Spawn the Python script that continuously updates usage_log.json
  pythonProcess = spawn("python", [path.join(__dirname, "main.py")]);

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
  if (pythonProcess) {
    pythonProcess.kill();
  }
});

// Path to your usage_log.json file
const usageFilePath = path.join(__dirname, "usage_log.json");

// IPC handler to get app usage data from usage_log.json
ipcMain.handle("get-app-usage", async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(usageFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading usage_log.json file:", err);
        return reject("Error reading usage log");
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData); // Send the data back to the renderer process
      } catch (parseError) {
        console.error("Error parsing usage_log.json:", parseError);
        return reject("Error parsing usage log");
      }
    });
  });
});

// IPC handler for saving onboarding data
ipcMain.on("save-onboarding-data", (event, data) => {
  const onboardingFilePath = path.join(__dirname, "onboardingData.json");

  fs.writeFile(onboardingFilePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error saving onboarding data:", err);
      event.reply("onboarding-data-saved", {
        success: false,
        message: "Failed to save data",
      });
      return;
    }
    console.log("Onboarding data saved successfully");
    event.reply("onboarding-data-saved", {
      success: true,
      message: "Data saved successfully",
    });
  });
});

// IPC handler to show a custom notification
ipcMain.handle("show-break-notification", showBreakNotification);
