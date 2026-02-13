const LANGUAGE_STORAGE_KEY = "language";
const DEFAULT_LANGUAGE = "es";
const LANGUAGE_BUTTON_SELECTOR = "#toggleLanguage";

let currentLanguage = readStoredLanguage();
let translations = {};

function readStoredLanguage() {
	const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
	return storedLanguage === "en" ? "en" : DEFAULT_LANGUAGE;
}

async function loadTranslations(language) {
	try {
		const response = await fetch(`./js/i18n/${language}.json`);
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		translations = await response.json();
	} catch (error) {
		console.error(`Failed to load translations for ${language}:`, error);
		translations = {};
	}
}

function getTranslation(key) {
	const translation = key
		.split(".")
		.reduce(
			(value, segment) =>
				value && typeof value === "object" ? value[segment] : null,
			translations,
		);

	return translation || key;
}

function renderTranslations() {
	if (!Object.keys(translations).length) {
		return;
	}

	document.querySelectorAll("[data-i18n]").forEach((element) => {
		if (element.id === "toggleLanguage") {
			return;
		}

		element.textContent = getTranslation(element.dataset.i18n || "");
	});

	document.documentElement.lang = currentLanguage;
}

function renderLanguageButton() {
	const button = document.querySelector(LANGUAGE_BUTTON_SELECTOR);
	if (!button) {
		return;
	}

	const spanishIsActive = currentLanguage === "es";
	button.textContent = spanishIsActive ? "🇬🇧" : "🇪🇸";
	button.setAttribute(
		"aria-label",
		spanishIsActive ? "Switch language to English" : "Cambiar idioma a español",
	);
}

async function applyLanguage(language) {
	const safeLanguage = language === "en" ? "en" : "es";
	currentLanguage = safeLanguage;
	localStorage.setItem(LANGUAGE_STORAGE_KEY, safeLanguage);
	await loadTranslations(safeLanguage);
	renderTranslations();
	renderLanguageButton();
}

function toggleLanguage() {
	const nextLanguage = currentLanguage === "es" ? "en" : "es";
	applyLanguage(nextLanguage);
}

function handleLanguageToggle(event) {
	if (!(event.target instanceof Element)) {
		return;
	}

	if (!event.target.closest(LANGUAGE_BUTTON_SELECTOR)) {
		return;
	}

	event.preventDefault();
	toggleLanguage();
}

function handleHtmxSwap() {
	renderTranslations();
	renderLanguageButton();
}

document.addEventListener("DOMContentLoaded", () => {
	applyLanguage(currentLanguage);
});
document.addEventListener("click", handleLanguageToggle);
document.addEventListener("htmx:afterSwap", handleHtmxSwap);
