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
	theme: 'light',
	ui: {
		fontSize: 14,
		fontFamily: 'Arial, sans-serif',
	},
	shortcuts: {
		file: {
			new: 'CmdOrCtrl+N',
			open: 'CmdOrCtrl+O',
			save: 'CmdOrCtrl+S',
			saveAs: 'CmdOrCtrl+Shift+S',
			close: 'CmdOrCtrl+W',
		},
		edit: {
			undo: 'CmdOrCtrl+Z',
			redo: 'CmdOrCtrl+Y',
			cut: 'CmdOrCtrl+X',
			copy: 'CmdOrCtrl+C',
			paste: 'CmdOrCtrl+V',
			selectAll: 'CmdOrCtrl+A',
		},
		view: {
			toggleFullscreen: 'F11',
			toggleDevTools: 'F12',
			zoomIn: 'CmdOrCtrl+Plus',
			zoomOut: 'CmdOrCtrl+-',
			resetZoom: 'CmdOrCtrl+0',
		},
		help: 'F1',
	},
	preview: {
		theme: 'github',
	},
	editor: {
		theme: 'vs-dark',
		fontSize: 14,
		fontFamily: 'Menlo, Monaco, "Courier New", monospace',
	},
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
	fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
});
