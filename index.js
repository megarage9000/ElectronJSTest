// https://www.electronjs.org/docs/tutorial/quick-start


const path = require('path');
const { app, browser, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false,
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


// Receiving the front end code
// We can actually modify it to specify which python files!
ipcMain.on("toMain", (event, args) => {
    var python = require('child_process').spawn('python', [`./python/${args[0]}`, args.slice(1)]);
    let result;
    python.stdout.on('data', function (data) {
        result = data.toString('utf8');
        console.log("Python response: ", result);
        event.reply('toMain', result);
    });

    python.stderr.on('data', (data) => {
        result = `stderr: ${data}`;
        console.error(result);
        event.reply('toMain', data);
    });

    python.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    })
});



