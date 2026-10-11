const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  launch:       (opts) => ipcRenderer.send('launch', opts),
  loadSettings: ()     => ipcRenderer.invoke('load-settings'),
  getPaths:     ()     => ipcRenderer.invoke('get-paths'),
  setBroadcastBg:   (bg) => ipcRenderer.invoke('set-broadcast-bg', bg),
  setTimerBg:       (bg) => ipcRenderer.invoke('set-timer-bg', bg),
  setItemTrackerBg: (bg) => ipcRenderer.invoke('set-itemtracker-bg', bg),
  registerNewgameHotkey:   (accel) => ipcRenderer.invoke('register-newgame-hotkey', accel),
  unregisterNewgameHotkey: ()      => ipcRenderer.invoke('unregister-newgame-hotkey'),
  onNewgame: (cb) => ipcRenderer.on('newgame', cb),
  getAppVersion:   ()  => ipcRenderer.invoke('get-app-version'),
  checkForUpdates: ()  => ipcRenderer.invoke('check-for-updates'),
  installUpdate:   ()  => ipcRenderer.invoke('install-update'),
  applyPatch:      ()  => ipcRenderer.invoke('apply-patch'),
  openExternal:    (url) => ipcRenderer.invoke('open-external', url),
  openCheckList:     ()  => ipcRenderer.send('open-checklist'),
  saveEntState: (json) => ipcRenderer.invoke('save-ent-state', json),
  loadEntState: async (cb) => {
    const result = await ipcRenderer.invoke('load-ent-state');
    if (result && result.ok) cb(result.json);
  },
  openBcastSounds:   ()  => ipcRenderer.invoke('open-bcast-sounds'),
  openBcastSettings: ()  => ipcRenderer.invoke('open-bcast-settings'),
  saveBcastBgImage:  (dataUrl) => ipcRenderer.invoke('save-bcast-bg-image', dataUrl),
  clearBcastBgImage: ()        => ipcRenderer.invoke('clear-bcast-bg-image'),
  sendApiItems: (snap) => ipcRenderer.send('api-items-update', snap),
  sendApiConnection: (info) => ipcRenderer.send('api-connection-status', info),
  onUpdateStatus:  (cb) => ipcRenderer.on('update-status', (_e, data) => cb(data)),
  isElectron:   true,
});
