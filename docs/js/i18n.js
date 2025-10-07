// i18n (internationalization) functionality
let currentLanguage = localStorage.getItem('language') || 'es';
let translations = {};
let languageListenerAttached = false;

// Load translations for a given language
async function loadTranslations(lang) {
	try {
		const response = await fetch(`./js/i18n/${lang}.json`);
		translations = await response.json();
		return translations;
	} catch (error) {
		console.error(`Failed to load translations for ${lang}:`, error);
		return {};
	}
}

// Get nested translation by key path (e.g., "nav.services")
function getTranslation(key) {
	const keys = key.split('.');
	let value = translations;

	for (const k of keys) {
		if (value && typeof value === 'object') {
			value = value[k];
		} else {
			return key; // Return key if translation not found
		}
	}

	return value || key;
}

// Update all elements with data-i18n attribute (excluding language button)
function updatePageTranslations() {
	document.querySelectorAll('[data-i18n]').forEach(element => {
		// Skip the language toggle button
		if (element.id === 'toggleLanguage') return;

		const key = element.getAttribute('data-i18n');
		const translation = getTranslation(key);

		if (translation) {
			element.textContent = translation;
		}
	});

	// Update HTML lang attribute
	document.documentElement.setAttribute('lang', currentLanguage);
}

// Switch language
async function switchLanguage(lang) {
	if (lang === currentLanguage) return;

	currentLanguage = lang;
	localStorage.setItem('language', lang);

	await loadTranslations(lang);
	updatePageTranslations();
	updateLanguageButton();
}

// Update language button flag emoji
function updateLanguageButton() {
	const button = document.getElementById('toggleLanguage');
	if (button) {
		// Show opposite flag (if Spanish, show UK flag to switch to English)
		button.textContent = currentLanguage === 'es' ? '🇬🇧' : '🇪🇸';
	}
}

// Attach language toggle listener (only once)
function attachLanguageListener() {
	if (languageListenerAttached) return;

	const toggleButton = document.getElementById('toggleLanguage');
	if (toggleButton) {
		toggleButton.addEventListener('click', () => {
			const newLang = currentLanguage === 'es' ? 'en' : 'es';
			switchLanguage(newLang);
		});
		languageListenerAttached = true;
	}
}

// Initialize i18n
async function initializeI18n() {
	await loadTranslations(currentLanguage);
	updatePageTranslations();
	updateLanguageButton();
	attachLanguageListener();
}

// Re-initialize when content is loaded via HTMX
document.body.addEventListener('htmx:afterSwap', () => {
	updatePageTranslations();
	updateLanguageButton();
	attachLanguageListener();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeI18n);
