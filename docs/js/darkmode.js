const DARK_CLASS = "dark";
const THEME_STORAGE_KEY = "theme";
const TOGGLE_BUTTON_SELECTOR = "#toggleDarkMode";
const SUN_ICON_PATH =
	"M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z";
const MOON_ICON_PATH =
	"M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z";

const systemThemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function readStoredTheme() {
	const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
	return storedTheme === "dark" || storedTheme === "light" ? storedTheme : null;
}

function getCurrentTheme() {
	return readStoredTheme() || (systemThemeMediaQuery.matches ? "dark" : "light");
}

function renderTheme(theme) {
	const isDarkTheme = theme === "dark";
	document.documentElement.classList.toggle(DARK_CLASS, isDarkTheme);

	const iconPath = document.querySelector(`${TOGGLE_BUTTON_SELECTOR} svg path`);
	if (iconPath) {
		iconPath.setAttribute("d", isDarkTheme ? SUN_ICON_PATH : MOON_ICON_PATH);
	}
}

function syncTheme() {
	renderTheme(getCurrentTheme());
}

function toggleTheme() {
	const nextTheme = document.documentElement.classList.contains(DARK_CLASS)
		? "light"
		: "dark";
	localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
	renderTheme(nextTheme);
}

function handleThemeToggle(event) {
	if (!(event.target instanceof Element)) {
		return;
	}

	if (!event.target.closest(TOGGLE_BUTTON_SELECTOR)) {
		return;
	}

	event.preventDefault();
	toggleTheme();
}

function handleSystemThemeChange(event) {
	if (readStoredTheme()) {
		return;
	}

	renderTheme(event.matches ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", syncTheme);
document.addEventListener("htmx:afterSwap", syncTheme);
document.addEventListener("click", handleThemeToggle);
systemThemeMediaQuery.addEventListener("change", handleSystemThemeChange);
