import { resetMode, setMode } from 'mode-watcher';

export function setTheme(theme: string) {
	if (theme === 'dark' || theme === 'light') {
		setMode(theme);
	} else {
		resetMode();
	}
}