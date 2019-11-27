//Modules to control application life and to create the Cromium instance
const {app, BrowserWindow,ipcMain} = require('electron')

//Create a global to Window
let mainWindow
global.sharedObj = {user:null}

function createWindow() {
    mainWindow = new BrowserWindow({width: 1280, height:800})

    //Loadfile gets the view in the browser
    mainWindow.loadFile('login.html')

    //Destroys windows
    mainWindow.on('closed', function(){
        mainWindow = null
    })
}

//When Electron finishes loading itself
//This is called
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow()
    }
})