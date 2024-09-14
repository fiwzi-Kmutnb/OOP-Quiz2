const {ipcRenderer, contextBridge} = require('electron');


const WINDOWS_API = {
    minimizeWindow: () => ipcRenderer.send('minimizeApp'),
    closeWindow: () => ipcRenderer.send('closeApp')
}

contextBridge.exposeInMainWorld('api', WINDOWS_API);