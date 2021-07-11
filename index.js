// https://www.electronjs.org/docs/tutorial/quick-start
const path = require('path');
const { app, browser, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // Loading the preloader
            // - __dirname = path of the script
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // Loading html file
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    // Open a window if none are open (macOS)
    app.on('activate', function() {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

// Closing the app in Windows / Linux when all windows are closed
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
})




