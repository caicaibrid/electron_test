let { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron',{
    changeSize: function (params){
        ipcRenderer.send('changeSize', params || {})
    },
    closeApp: function(){
        ipcRenderer.send('closeApp')
    },
    receive: (channel, func) => {
        if (channel === 'getParams'){
            ipcRenderer.send('getParams')
        }
        ipcRenderer.on(channel, (event, ...args) => {
            func(...args)
        });
    }
})
