import windowStateManager from 'electron-window-state';
import { app, BrowserWindow, ipcMain } from 'electron';
import contextMenu from 'electron-context-menu';
import path, { dirname } from 'path';
import { enable, initialize } from '@electron/remote/main/index.js';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import fs from 'fs';

initialize();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const appDir = path.join(app.getPath('userData'), 'MarkIn');
const configPath = path.join(appDir, 'config.json');

const defaultConfig = {
	personal: {
		startUp: {
			startUpPage: "default",
			default: "home"
		},
		privacy: {
			history: true
		}
	},
	notification: {
		notification: true
	},
	shortcuts: {
		file: {
			id: "file",
			active: true,
			command: "",
			isChange: false,
			system: "System",
			description: "File operations",
			title: "File",
			shortcuts: {
				new: {
					id: "new",
					active: true,
					command: "Control+N",
					isChange: false,
					system: "System",
					description: "Create a new file",
					title: "New File"
				},
				open: {
					id: "open",
					active: true,
					command: "Control+O",
					isChange: false,
					system: "System",
					description: "Open an existing file",
					title: "Open File"
				},
				save: {
					id: "save",
					active: true,
					command: "Control+S",
					isChange: false,
					system: "System",
					description: "Save the current file",
					title: "Save File"
				},
				saveAs: {
					id: "saveAs",
					active: true,
					command: "Control+Shift+S",
					isChange: false,
					system: "System",
					description: "Save the current file with a new name",
					title: "Save File As"
				},
				close: {
					id: "close",
					active: true,
					command: "Control+W",
					isChange: false,
					system: "System",
					description: "Close the current file",
					title: "Close File"
				}
			}
		},
		edit: {
			id: "edit",
			active: true,
			command: "",
			isChange: false,
			system: "System",
			description: "Edit operations",
			title: "Edit",
			shortcuts: {
				undo: {
					id: "undo",
					active: true,
					command: "Control+Z",
					isChange: false,
					system: "System",
					description: "Undo the last action",
					title: "Undo"
				},
				redo: {
					id: "redo",
					active: true,
					command: "Control+Shift+Z",
					isChange: false,
					system: "System",
					description: "Redo the last undone action",
					title: "Redo"
				},
				cut: {
					id: "cut",
					active: true,
					command: "Control+X",
					isChange: false,
					system: "System",
					description: "Cut the selected text",
					title: "Cut"
				},
				copy: {
					id: "copy",
					active: true,
					command: "Control+C",
					isChange: false,
					system: "System",
					description: "Copy the selected text",
					title: "Copy"
				},
				paste: {
					id: "paste",
					active: true,
					command: "Control+V",
					isChange: false,
					system: "System",
					description: "Paste the clipboard content",
					title: "Paste"
				},
				selectAll: {
					id: "selectAll",
					active: true,
					command: "Control+A",
					isChange: false,
					system: "System",
					description: "Select all text",
					title: "Select All"
				}
			}
		},
		view: {
			id: "view",
			active: true,
			command: "",
			isChange: false,
			system: "System",
			description: "View operations",
			title: "View",
			shortcuts: {
				zoomIn: {
					id: "zoomIn",
					active: true,
					command: "Control+Plus",
					isChange: false,
					system: "System",
					description: "Zoom in",
					title: "Zoom In"
				},
				zoomOut: {
					id: "zoomOut",
					active: true,
					command: "Control+-",
					isChange: false,
					system: "System",
					description: "Zoom out",
					title: "Zoom Out"
				},
				fullScreen: {
					id: "fullScreen",
					active: true,
					command: "F11",
					isChange: false,
					system: "System",
					description: "Toggle full screen mode",
					title: "Full Screen"
				},
				toggleDevTools: {
					id: "toggleDevTools",
					active: true,
					command: "Control+Shift+I",
					isChange: false,
					system: "System",
					description: "Toggle developer tools",
					title: "Toggle Developer Tools"
				}
			}
		},
		help: {
			id: "help",
			active: true,
			command: "",
			isChange: false,
			system: "System",
			description: "Help operations",
			title: "Help",
			shortcuts: {
				toggleHelp: {
					id: "toggleHelp",
					active: true,
					command: "F1",
					isChange: false,
					system: "System",
					description: "Toggle help",
					title: "Help"
				}
			}
		}
	},
	appearance: {
		theme: "light",
		accentColor: "#000000",
		font: {
			name: "Arial",
			id: "arial"
		},
		fontSize: "14px"
	},
	plugins: [],
	language: 'en'
};

const require = createRequire(import.meta.url);

if (process.env.NODE_ENV === 'development') {
	try {
		require('electron-reloader')(module, {});
	} catch {
		console.log('Error: electron-reloaded not found');
	}
}

const port = process.env.PORT || 5173;
const dev = !app.isPackaged;
let mainWindow;

function createWindow() {
	let windowState = windowStateManager({
		defaultWidth: 800,
		defaultHeight: 600,
	});

	const mainWindow = new BrowserWindow({
		backgroundColor: 'whitesmoke',
		titleBarStyle: 'hidden',
		autoHideMenuBar: true,
		enableRemoteModule: true,
		trafficLightPosition: {
			x: 17,
			y: 32,
		},
		minHeight: 450,
		minWidth: 500,
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: dev,
			preload: path.join(__dirname, 'preload.cjs'),
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
	});

	enable(mainWindow.webContents);

	windowState.manage(mainWindow);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.on('close', () => {
		windowState.saveState(mainWindow);
	});

	return mainWindow;
}

contextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyImage: false,
	prepend: () => [
		{
			label: 'Make App 💻',
		},
	],
});

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

function createMainWindow() {
	mainWindow = createWindow();
	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (dev) loadVite(port);
}

function checkSettingFile() {
	if (!fs.existsSync(appDir)) {
		fs.mkdirSync(appDir);
	}

	if (!fs.existsSync(configPath)) {
		fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
	}
}

app.once('ready', () => {
	checkSettingFile();
	createMainWindow();
});
app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow();
	}
});
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('to-main', (event, count) => {
	return mainWindow.webContents.send('from-main', `next count is ${count + 1}`);
});

// window
ipcMain.on('window-close', () => {
	mainWindow.close();
});
ipcMain.on('window-minimize', () => {
	mainWindow.minimize();
});
ipcMain.on('window-maximize', () => {
	if (mainWindow.isMaximized()) {
		mainWindow.unmaximize();
	} else {
		mainWindow.maximize();
	}
});

//config
ipcMain.on('config:get', (event) => {
	event.returnValue = JSON.parse(fs.readFileSync(configPath).toString());
});

ipcMain.on('config:set', (event, config) => {
	fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
	event.returnValue = true;
});
