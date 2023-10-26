// The app module, which controls your application's event lifecycle.
// The BrowserWindow module, which creates and manages application windows.

const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

//Variable To check Mac Os
const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV !== "production";

//creating a function To Run Electron
function createMainWindow() {
  //mainWindow Create a new instace for browserWindow
  const mainWindow = new BrowserWindow({
    //specifing width and height for window instance
    title: "Image Resizer",
    width: isDev ? 1000 : 500,
    height: 600,
  });

  //Open dev tools if in Dev Env
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  //Loading File Using Dirname and giving file path this renders all the things present in index.html
  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

//Creating About window
//creating a function To Run Electron
function createAboutWindow() {
  //mainWindow Create a new instace for browserWindow
  const AboutWindow = new BrowserWindow({
    //specifing width and height for window instance
    title: "About window",
    width: 300,
    height: 300,
  });

  //Loading File Using Dirname and giving file path this renders all the things present in index.html
  AboutWindow.loadFile(path.join(__dirname, "./renderer/about.html"));
}

//using when ready function on app to run create New Window Instance
app.whenReady().then(() => {
  //calling function here
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  //if No Window is opened then run this code
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length == 0) {
      createMainWindow();
    }
  });
});

//Menu Template
const menu = [
  ...(isMac
    ? [
        {
          label: "app.name",
          submenu: [
            {
              label: "about",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),

  {
    role: "fileMenu",
  },

  ...(!isMac
    ? [
        {
          label: "Help",
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
];

//This  app.on listner insures that if ismac is true then dont quit
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});


//Taha
//Aliasger mill wala
//Desktop
//Branch It