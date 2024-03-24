const os = require('os');
const path = require('path');
const Toastify =require('toastify-js');
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('os', {
  homedir: () => os.homedir()
  // también podemos exponer variables, no solo funciones
});

contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args),
    // también podemos exponer variables, no solo funciones
});

contextBridge.exposeInMainWorld('Toastify', {
  toast: (options) => Toastify(options).showToast(),
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel,data) => ipcRenderer.send(channel,data),
  on: (channel,func) => 
    ipcRenderer.on(channel,(event, ...args)=> func(...args)),
});